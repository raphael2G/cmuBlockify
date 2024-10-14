import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"


export default function HelpDialog() {

    const [showSellerInfo, setShowSellerInfo] = useState(false)

    return (
    <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-10 h-10 p-0 rounded-full absolute top-2 left-2">
              <HelpCircle className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>How to Use Our App</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between">
                {/* <Label htmlFor="role-toggle" className="text-sm font-medium">
                  Show {showSellerInfo ? 'Buyer' : 'Seller'} Info
                </Label> */}
                {/* <Switch
                  id="role-toggle"
                  checked={showSellerInfo}
                  onCheckedChange={setShowSellerInfo}
                /> */}
              </div>
              {showSellerInfo ? (
                <>
                  <h3 className="font-semibold">For Sellers:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>View current buyer requests in the market.</li>
                    <li>Click on a buyer's request to fulfill an order.</li>
                    <li>Use the "Fulfill Venmo Order" or "Fulfill Zelle Order" buttons to complete transactions.</li>
                    <li>Set your price and maximum blocks to sell in the Account Settings.</li>
                  </ul>
                </>
              ) : (
                <>
                  <h3 className="font-semibold">For Buyers:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>View available sellers and their prices in the market.</li>
                    <li>Click "Place Order" to create a new order.</li>
                    <li>Toggle Venmo and Zelle buttons to set your payment preferences.</li>
                    <li>Fill in order details including price, restaurant, and any specific instructions.</li>
                  </ul>
                </>
              )}
              <p>Access your account settings by clicking the gear icon in the top-right corner.</p>
            </div>

            <Button 
                onClick={() => setShowSellerInfo(!showSellerInfo)} 
                className={`w-full text-white 
                    ${showSellerInfo ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}
            >

                {showSellerInfo ? 'Show Buyer Info' : 'Show Seller Info'}
              </Button>

          </DialogContent>
        </Dialog>

    );
}