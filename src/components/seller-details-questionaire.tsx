'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

import { createSellerDetails } from '@/services/sellerDetailsService'
import { UserAuth } from "../context/AuthContext"


interface SellerDetailsQuestionaireProps {
  onSellerDetailsSubmit: () => void; // Function prop with no arguments and no return value
}

// type of setShowSellerDetailsScreen
export default function SellerDetailsQuestionaire({ onSellerDetailsSubmit }: SellerDetailsQuestionaireProps) {

  const [blocks, setBlocks] = useState<string>('1');
  const [minPrice, setMinPrice] = useState<string>('1');
  const [venmo, setVenmo] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const { user } = UserAuth();

  useEffect(() => {
    const blocksNumber = parseInt(blocks, 10);
    const minPriceNumber = parseInt(minPrice, 10);

    setIsFormValid(
      blocks.trim() !== '' &&
        minPrice.trim() !== '' &&
        !isNaN(blocksNumber) &&
        blocksNumber > 0 &&
        Number.isInteger(blocksNumber) &&
        !isNaN(minPriceNumber) &&
        minPriceNumber > 0 &&
        Number.isInteger(minPriceNumber) &&
        venmo.trim() !== ''
    );
  }, [blocks, minPrice, venmo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const blocksNumber = parseInt(blocks, 10);
    const minPriceNumber = parseInt(minPrice, 10);

    if (isFormValid) {
      console.log({ blocksNumber, minPriceNumber, venmo })

      // add data to seller preferences
      if (!user?.uid) {
        throw Error("User not logged in");
      }
      const sellerData = {
        user: user.uid,
        isEligible: true,
        maxSalesInWeek: blocksNumber,
        venmo: venmo.trim(),
        minimumPriceToNotify: minPriceNumber,
        salesThisWeek: 0
      };

      await createSellerDetails(sellerData);

      onSellerDetailsSubmit();

    }
  }

  const handleBlocksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBlocks(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Card className="w-full max-w-sm bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">Seller Details Questionaire</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="blocks" className="text-sm font-medium block text-gray-700">
                How many blocks can you sell per week?
              </label>
              <p className="text-xs text-gray-500 mb-1">
                (rounds all numbers down to the nearest whole number)
              </p>
              <Input
                id="blocks"
                type="number"
                placeholder="Enter number of blocks"
                value={blocks}
                onChange={(e) => handleBlocksChange(e)}
                required
                className="w-full h-12 text-lg bg-white/50 backdrop-blur-sm border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="minPrice" className="text-sm font-medium block text-gray-700">
                Minimum price to sell blocks
              </label>
              <p className="text-xs text-gray-500 mb-1">
                (will only notify if order above this price)
              </p>
              <Input
                id="minPrice"
                type="number"
                step="0.01"
                placeholder="Enter minimum price"
                value={minPrice}
                onChange={(e) => handleMinPriceChange(e)}
                required
                className="w-full h-12 text-lg bg-white/50 backdrop-blur-sm border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="venmo" className="text-sm font-medium block text-gray-700">
                Venmo?
              </label>
              <Input
                id="venmo"
                type="text"
                placeholder="Enter your Venmo username"
                value={venmo}
                onChange={(e) => setVenmo(e.target.value)}
                required
                className="w-full h-12 text-lg bg-white/50 backdrop-blur-sm border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}