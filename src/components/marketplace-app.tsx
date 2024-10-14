'use client'

import { useEffect, useState } from 'react'

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react"


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import AccountSettingsDialog from './account-settings-dialog';
import HelpDialog from './help-dialog';

import { UserAuth } from "@/context/AuthContext";
import { createOrder } from '@/services/orderService';
import { Order } from '@/models/order';

import { getEligibleSellerDetails } from '@/services/sellerDetailsService';
import { fetchUnexpiredOrders, deleteOrder } from '@/services/orderService';

import MarketplaceHeader from '@/components/marketplace/marketplace-header';
import MarketList from '@/components/marketplace/market-list';
import OrderForm from '@/components/marketplace/order-placement-form';
import FulfillmentForm from '@/components/marketplace/FullfilmentForm';
import FilterButtons from '@/components/marketplace/market-filter-butons';
import ActionButtons from '@/components/marketplace/Market-Action-Buttons';

// add isSeller as prop with boolean
export function MarketplaceApp({isSeller}: {isSeller: boolean}) {
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [showMakretDisplay, setShowMarketDisplay] = useState(false)
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






  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden h-[90vh] p-4 flex flex-col relative">

        <MarketplaceHeader title={showOrderForm ? 'Place an Order' : (showFulfillmentForm ? 'Fulfill this Order?' : 'Current Market')} />
        
        <div className="flex-grow overflow-y-auto mb-4">
        
          {/* // market display */}
          {!showOrderForm && !showFulfillmentForm && (
            <MarketList 
              sellers={currentSellers}
              buyers={buyers}
              onSellerClick={sellerFulfilment}
            />
          )}

          {/* // fulfilment form */}
          {showFulfillmentForm && (
            <FulfillmentForm
              onFulfillmentComplete={() => setShowFulfillmentForm(false)}
            />
          )}

          {/* // order form */}
          {showOrderForm && (
            <OrderForm 
              order={order}
              setOrder={setOrder}
              onSubmit={handlePlaceOrder}
            />
          )} 

        </div>
        
        {/* // Buttons for seller and buyer on bottom of screen */}
        {!showOrderForm && !showFulfillmentForm && (
          <div className="mt-auto mb-2">
              <div className="space-y-2">
                <FilterButtons
                  showVenmo={showVenmo}
                  showZelle={showZelle}
                  toggleVenmo={() => setShowVenmo(!showVenmo)}
                  toggleZelle={() => setShowZelle(!showZelle)}
                  toggleAll={() => {setShowVenmo(!(showVenmo && showZelle)); setShowZelle(!(showVenmo && showZelle))}}/>

                <ActionButtons 
                  isSeller={isSeller}
                  venmoPrice={10}
                  zellePrice={10}
                  onFulfillVenmo={() => alert("fulfil venmo needs implemented")} 
                  onFulfillZelle={() => alert("fulfil zelle needs implemented")} 
                  onPlaceOrder={() => setShowOrderForm(true)}/>

              </div>
          </div>
        )}

      </div>

    </div>
  )
}