import { useEffect, useState, useRef } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button";
import { FiSettings } from "react-icons/fi";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { UserAuth } from "@/context/AuthContext";
import { searchUserByUid } from "@/services/userService";

import { SellerDetails } from "@/models/sellerDetails";
import { searchForSellerDetailsByUid, modifySellerDetails } from '@/services/sellerDetailsService';




export default function AccountSettingsDialog() {

  const { user } = UserAuth();
  const [userData, setUserData] = useState(user);
  const [sellerDetails, setSellerDetails] = useState<SellerDetails | null>(null);


  const [notify, setNotify] = useState(false);
  const [zelle, setZelle] = useState('');
  const [venmo, setVenmo] = useState('');
  const [price, setPrice] = useState('');
  const [maxBlocks, setMaxBlocks] = useState('');

  const updateNotify = (checked: boolean) => {
    setNotify(checked);
  };

  const updateZelle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZelle(e.target.value);
  };

  const updateVenmo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVenmo(e.target.value);
  };

  const updatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  }

  const updateMaxBlocks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxBlocks(e.target.value);
  }

  
  // Fetch user and seller details
  useEffect(() => { 
    async function fetchData() {
      try {
        const userData = await searchUserByUid(user.uid);
        setUserData(userData);
        const sellerData = await searchForSellerDetailsByUid(user.uid);
        setSellerDetails(sellerData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [user.uid]);

  // Update state variables when sellerDetails change
  useEffect(() => {
    if (sellerDetails) {
      setNotify(sellerDetails.isEligible);
      setZelle(sellerDetails.zelle || '');
      setVenmo(sellerDetails.venmo || '');
      setPrice(String(sellerDetails.minimumPriceToNotify) || '');
      setMaxBlocks(String(sellerDetails.maxSalesInWeek) || '');
    }
  }, [sellerDetails]);
  


  const handleSaveChanges = () => {
    console.log('Save changes');

    if (sellerDetails?.id){
      modifySellerDetails(sellerDetails.id, {
        isEligible: notify,
        venmo: venmo,
        zelle: zelle,
        minimumPriceToNotify: price == "" ? sellerDetails?.minimumPriceToNotify : parseInt(price),
        maxSalesInWeek: maxBlocks == "" ? sellerDetails?.maxSalesInWeek : parseInt(maxBlocks)
      });
    }

  } 
  
  const handleSellerSignUp = () => {
    console.log('Seller sign up')
    
  }

  return (
    <Dialog>
          <DialogTrigger asChild>

        <Button variant="ghost"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 rounded-full p-2"
        >
          <FiSettings size={24} />
        </Button>
        
          </DialogTrigger>
          <DialogContent className="sm:max-w-md w-full bg-white shadow-md rounded-lg text-black w-3/4">
            <DialogHeader>
              <DialogTitle>Account Settings</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <Label htmlFor="andrewId">Andrew ID </Label>
                <Input id="andrewId" value={userData.andrewId} disabled />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={userData.email} disabled />
              </div>
              
              {sellerDetails && (
                <>
                  {/* <div className="flex items-center justify-between">
                    <Label htmlFor="notify">Notify if orders are available</Label>
                    <Switch
                      id="notify"
                      checked={sellerDetails.isEligible}
                      onChange={updateNotify}
                    />
                  </div> */}

                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify">Notify</Label>
                    <Switch
                      id="notify"
                      checked={notify}
                      onCheckedChange={updateNotify}
                    />
                  </div>

                  <div>
                    <Label htmlFor="venmo">Venmo</Label>
                    <Input
                      id="venmo"
                      type="string"
                      placeholder={String(sellerDetails.venmo || '')}
                      value={venmo}
                      onChange={updateVenmo}
                    />

                  </div>

                  <div>
                    <Label htmlFor="zelle">Zelle</Label>
                    <Input
                      id="zelle"
                      type="string"
                      placeholder={String(sellerDetails.zelle || '')}
                      value={zelle}
                      onChange={updateZelle}
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder={String(sellerDetails.minimumPriceToNotify || '')}
                      value={price}
                      onChange={updatePrice}
                    />
                  </div>
                  
                  <div>
                      <Label htmlFor="maxBlocks">Maximum blocks to sell in week</Label>
                      <Input
                        id="maxBlocks"
                        type="string"
                        placeholder={String(sellerDetails.maxSalesInWeek || '')}
                        value={maxBlocks}
                        onChange={updateMaxBlocks}
                      />
                  </div>

                  <Button onClick={handleSaveChanges} className="w-full bg-green-500 hover:bg-green-600 text-white">
                    Save Changes
                  </Button>
                </>
              )}
               {/* : (
                <Button onClick={handleSellerSignUp} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Sign Up as Seller
                </Button>
              )} */}

              
              
            </div>
          </DialogContent>
        </Dialog>

  );

}
    