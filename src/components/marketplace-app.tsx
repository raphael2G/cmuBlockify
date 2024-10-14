'use client'

import { useEffect, useState } from 'react'

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react"


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import AccountSettingsDialog from './account-settings-dialog';

import { UserAuth } from "@/context/AuthContext";
import { createOrder } from '@/services/orderService';
import { Order } from '@/models/order';

import { getEligibleSellerDetails } from '@/services/sellerDetailsService';
import { fetchUnexpiredOrders, deleteOrder } from '@/services/orderService';
import { Restaurant } from '@/models/restauraunt';
import { getRestauraunts } from '@/services/restaurauntService';



// add isSeller as prop with boolean
export function MarketplaceApp({isSeller}: {isSeller: boolean}) {
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [showFulfillmentForm, setShowFulfillmentForm] = useState(false)
  const [order, setOrder] = useState({ price: '', restaurant: '', details: '' })
  const {user} = UserAuth();

  const [currentSellers, setCurrentSellers] = useState<Array<{quantity: number, price: number}>>([]);
  const [venmoSellers, setVenmoSellers]=  useState<Array<{quantity: number, price: number}>>([]);
  const [zelleSellers, setZelleSellers] = useState<Array<{quantity: number, price: number}>>([]);
  const [venmoOrZelleSellers, setVenmoOrZelleSellers] = useState<Array<{quantity: number, price: number}>>([]);
  const [showVenmo, setShowVenmo] = useState(true);
  const [showZelle, setShowZelle] = useState(true);

  const [buyers, setBuyers] = useState<Array<{quantity: number, price: number}>>([]);
  const [potentialOrderToBeFulfilled,  setPotentialOrderToBeFulfilled] = useState<Order | null>(null);
  const [restauraunts, setRestauraunts] = useState<Array<Restaurant>>([]);


  const [accountSettings, setAccountSettings] = useState({
    name: '',
    email: '',
    phone: ''
  })

const handleAccountSettingsChange = (field: string, value: string | number) => {
    setAccountSettings(prev => ({ ...prev, [field]: value }))
}

  useEffect(() => {
    if (showVenmo && showZelle) {
      setCurrentSellers(venmoOrZelleSellers); // Show both Venmo and Zelle sellers
    } else if (showVenmo) {
      setCurrentSellers(venmoSellers); // Show Venmo sellers
    } else if (showZelle) {
      setCurrentSellers(zelleSellers); // Show Zelle sellers
    } else {
      setCurrentSellers([]); // No sellers to show
    }
  }, [showVenmo, showZelle, venmoSellers, zelleSellers, venmoOrZelleSellers]); // Re-run effect when any of these change



  useEffect(() => {
    const groupByPrice = (items: Array<{ price: number }>): Array<{ quantity: number; price: number }> => {
      const priceMap = new Map<number, number>();

      // Group items by price
      items.forEach((item) => {
        const { price } = item;
        if (typeof price === 'number' && !isNaN(price)) {
          priceMap.set(price, (priceMap.get(price) || 0) + 1);
        } else {
          console.error('Invalid price detected:', price);
        }
      });

      // Convert Map to desired array format and sort by price
      return Array.from(priceMap.entries())
        .map(([price, quantity]) => ({ price, quantity }))
        .sort((a, b) => b.price - a.price);
    };

    // Fetch eligible sellers and group by price
    getEligibleSellerDetails().then((eligibleSellers) => {

      const zelleOnlySellers = eligibleSellers.filter(seller => seller.zelle);
      const venmoOnlySellers = eligibleSellers.filter(seller => seller.venmo);
      const venmoOrZelleSellers = eligibleSellers.filter(seller => seller.venmo || seller.zelle);

      const zelleOnlySellersGrouped = groupByPrice(
        zelleOnlySellers.map((seller) => ({ price: seller.minimumPriceToNotify }))
      );

      const venmoOnlySellersGrouped = groupByPrice(
        venmoOnlySellers.map((seller) => ({ price: seller.minimumPriceToNotify }))
      );

      const venmoOrZelleSellersGrouped = groupByPrice(
        venmoOrZelleSellers.map((seller) => ({ price: seller.minimumPriceToNotify }))
      );

      setVenmoSellers(venmoOnlySellersGrouped);
      setZelleSellers(zelleOnlySellersGrouped);
      setVenmoOrZelleSellers(venmoOrZelleSellersGrouped);
      

    });

    // Fetch unexpired orders and group by price
    fetchUnexpiredOrders().then((orders) => {
      const groupedBuyers = groupByPrice(orders.map((order) => ({ price: order.price })));
      setBuyers(groupedBuyers);
    });

    getRestauraunts().then(restaurauntes => {
      setRestauraunts(restaurauntes);
    });

  }, [showFulfillmentForm, showOrderForm ]);




  const handlePlaceOrder = () => {
    try {

      const orderData: Omit<Order, "createdAt" | "expiration"> = {
        uid: user.uid,
        andrewId: user.email.split('@')[0],
        price: parseFloat(order.price), // Convert price to a number
        restaurant: order.restaurant,
        order: order.details
      };

      if (!orderData.price || !orderData.restaurant || !orderData.order) {
        throw Error('Fill out all parts of the order form');
      }

      const expirationMinutes = 30;
      console.log('Order placed:', order)


      createOrder(orderData, expirationMinutes);


      setShowOrderForm(false)
      setOrder({ price: '', restaurant: '', details: '' })
    } catch (error) {
      console.error('Error placing order:', error);
    }

  }


  const sellerFulfilment = () => {
    if (isSeller){
      console.log('Seller clicked this!');
      setShowFulfillmentForm(true);

      fetchUnexpiredOrders().then((orders) => {
        // filter out all of the orders that are not price buyers[index].price
        // find the highest price out of all the orders: 
        const potentialOrders = orders.filter(order => order.price === buyers[0].price);
        // sort by nearest expiration date
        potentialOrders.sort((a, b) => a.expiration.toMillis() - b.expiration.toMillis());
        setPotentialOrderToBeFulfilled(potentialOrders[0]);
      });
    } else {
      console.log('non seller clicked this!');
    }
  }


  const handleOrderFulfilment = () => {
    // delete the order from the database
    if (potentialOrderToBeFulfilled?.id){
      deleteOrder(potentialOrderToBeFulfilled.id);
      setShowFulfillmentForm(false);
      console.log("successfully completed fulfilled order");
      console.log(potentialOrderToBeFulfilled);

    }

    // make call for backend to send email so the two can communicate

  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden h-[90vh] p-4 flex flex-col relative">
        <h1 className="text-xl font-bold mb-4 text-center text-gray-800">
          {showOrderForm ? 'Place an Order' : (showFulfillmentForm ? 'Fulfill this Order?' : 'Current Market')}
        </h1>

        
        
        <div className="flex-grow overflow-y-auto mb-4">
        <AccountSettingsDialog />

          {!showOrderForm && !showFulfillmentForm && (
            <div className="mb-4 overflow-y-auto max-h-[60vh]">
              {currentSellers.map((seller, index) => (
                <div key={`seller-${index}`} className="flex  justify-between items-center mb-2 bg-gradient-to-r from-green-400 to-green-500 p-2 rounded-lg shadow-md">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold text-sm">
                    {seller.quantity}
                  </div>
                  <span className="text-white font-medium text-sm"> sellers at </span>
                  <div className="bg-white px-2 py-1 rounded-full text-green-600 font-bold text-sm">
                    ${seller.price}
                  </div>
                </div>
              ))}
              {buyers.map((buyer, index) => (
                <div key={`buyer-${index}`} onClick={sellerFulfilment} className="flex  justify-between items-center mb-2 bg-gradient-to-r from-red-400 to-red-500 p-2 rounded-lg shadow-md">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-600 font-bold text-sm">
                    {buyer.quantity}
                  </div>
                  <span className="text-white font-medium text-sm">buyers at</span>
                  <div className="bg-white px-2 py-1 rounded-full text-red-600 font-bold text-sm">
                    ${buyer.price}
                  </div>
                </div>
              ))}
            </div>
          )}

          {showFulfillmentForm && (
            <div className="bg-white rounded-lg shadow-lg p-4 text-black">
              <Input
                type="number"
                placeholder="Price"
                value={potentialOrderToBeFulfilled?.price}
                onChange={(e) => setOrder({ ...order, price: e.target.value })}
                className="mb-3 text-black"
              />
              <Select >
                <SelectTrigger className="mb-3">
                  <SelectValue placeholder={potentialOrderToBeFulfilled?.restaurant} />
                </SelectTrigger>

              </Select>
              <textarea
                placeholder={potentialOrderToBeFulfilled?.order}
                value={potentialOrderToBeFulfilled?.order}
                onChange={(e) => setOrder({ ...order, details: e.target.value })}
                className="w-full p-2 border rounded mb-3 resize-none text-sm text-black "
                rows={3}
              />
              <Button onClick={handleOrderFulfilment} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Fulfil this Order
              </Button>
            </div>
          )}

          {showOrderForm && (
            <div className="bg-white rounded-lg shadow-lg p-4 text-black">
              <Input
                type="number"
                placeholder="Price"
                value={parseInt(order.price, 10)}
                onChange={(e) => setOrder({ ...order, price: e.target.value })}
                className="mb-3 text-black"
              />
              <Select onValueChange={(value) => setOrder({ ...order, restaurant: value })}>
                <SelectTrigger className="mb-3">
                  <SelectValue placeholder="Select Restaurant" />
                </SelectTrigger>
                <SelectContent>
                  {restauraunts.map((restaurant, index) => (
                    <SelectItem key={`restaurant-${index}`} value={restaurant.name}>
                      {restaurant.name}
                    </SelectItem>
                  ))}
                  {/* <SelectItem value="restaurant1">Restaurant 1</SelectItem>
                  <SelectItem value="restaurant2">Restaurant 2</SelectItem>
                  <SelectItem value="restaurant3">Restaurant 3</SelectItem> */}
                </SelectContent>
              </Select>
              <textarea
                placeholder="Order details"
                value={order.details}
                onChange={(e) => setOrder({ ...order, details: e.target.value })}
                className="w-full p-2 border rounded mb-3 resize-none text-sm"
                rows={3}
              />
              <Button onClick={handlePlaceOrder} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Place Order
              </Button>
            </div>
          )} 
        </div>

        {!showOrderForm && !showFulfillmentForm && (
          <div className="mt-auto mb-2">
            <div className="flex justify-between mb-2">
              <Button 
                onClick={() => setShowVenmo(!showVenmo)} 
                className={`w-[48%] ${showVenmo ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'} text-white`}
              >
                Venmo {showVenmo ? 'ON' : 'OFF'}
              </Button>
              <Button 
                onClick={() => setShowZelle(!showZelle)} 
                className={`w-[48%] ${showZelle ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'} text-white`}
              >
                Zelle {showZelle ? 'ON' : 'OFF'}
              </Button>
            </div>
            <Button 
              onClick={() => setShowOrderForm(true)} 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Place Order
            </Button>
          </div>
        )}
      </div>

    </div>
  )
}