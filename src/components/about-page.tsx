'use client'

import Image from 'next/image'
import blueberries from '@/public/blueberries.jpg';
import { useRouter } from 'next/navigation'

import { Button } from './ui/button';
import { Share2, UserPlus, Home } from 'lucide-react';

export function AboutPageComponent() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="relative h-40">
          <Image
            // src="/placeholder.svg?height=160&width=384"
            src={blueberries}
            alt="App background"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">CMU Blockify</h1>
          <p className="text-gray-600 text-center">
            Making meal blocks a tradable commodity.
          </p>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-700">How does it work? </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Sellers: List your extra blocks at your own price.</li>
              <li>Buyers: Purchase blocks directly from students.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-700">Why use CMU Blockify?</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Convenient: No more searching through group chats or social media to find meal blocks.</li>
              <li>Safe and Secure: Built by CMU students, for CMU students, ensuring safe transactions.</li>
              <li>Flexible: Customize your listings, set your own prices, and manage your blocks easily.</li>
            </ul>
          </div>
          <p className="text-sm text-gray-500 text-center">
          Sign up today to start trading blocks!
        </p>
          <div className="grid grid-cols-1 gap-4 w-full">
            {/* <button onClick={() => router.push("/sign-up")} className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
              Sign Up
            </button> */}
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" onClick={() => router.push("/sign-up")}>
              <UserPlus className="w-4 h-4 mr-2" />
              Sign Up
            </Button>
            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white" onClick={() => router.push("/about")}>
              <Share2 className="w-4 h-4 mr-2" />
              Share with Friends
            </Button>
            <Button variant="outline" className="w-full text-black" onClick={() => router.push("/")}>
              <Home className="w-4 h-4 mr-2"/>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}