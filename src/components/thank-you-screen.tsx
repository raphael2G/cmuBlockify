'use client'

import { Mail, Share2, Home, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

// confetti
import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'


export function ThankYouScreenComponent() {

  const { width, height } = useWindowSize()


  const router = useRouter()

  const handleShare = () => {
    // This is where you'd implement the sharing functionality
    if (navigator.share) {
      navigator.share({
        title: "CMU Blockify - Launching Soon!",
        text: "The block market is going live soon! Sign up now!",
        url: "https://www.blockify.online",
      })
    } else {
      alert("Sharing is not supported on this browser. Please copy the URL manually.")
    }
  }


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <Confetti
      width={width}
      height={height}
      />
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Mail className="w-16 h-16 text-purple-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-6">
            We appreciate your interest. We'll send you an email when the CMU Blockify goes live. 
          </p>
          <div className="w-16 h-1 bg-purple-500 rounded mb-6"></div>
          <p className="text-sm text-gray-500 mb-6">
            Share with your friends! Your blocks will thank you. 
          </p>
          <div className="grid grid-cols-1 gap-4 w-full">
            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share with Friends
            </Button>
            <Button variant="outline" className="w-full text-black" onClick={() => router.push("/")}>
              <Home className="w-4 h-4 mr-2"/>
              Back to Home
            </Button>
            <Button variant="ghost" className="w-full text-black" onClick={() => router.push("/about")}>
              <Info className="w-4 h-4 mr-2" />
              About
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}