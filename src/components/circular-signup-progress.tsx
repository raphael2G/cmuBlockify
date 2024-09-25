"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Share2, UserPlus, BookText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import {getNumberOfSellersInDatabase} from "@/services/sellerDetailsService"


export function CircularSignupProgress() {
  const [progress, setProgress] = useState<number | null>(null)
  const [numberOfSellers, setNumberOfSellers] = useState(0)
  const signupGoal = useRef(50);
  const router = useRouter()

  useEffect(() => {
    getNumberOfSellersInDatabase().then((num) => {
      setNumberOfSellers(num)
      setProgress((num / signupGoal.current) * 100)
    })
  }, [])

  const handleSignUp = () => {
    // This is where you'd handle the actual sign-up process
    // setsignupGoal((prev) => Math.max(0, prev - 1))
  }

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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex flex-col items-center justify-center p-4">
      <div className="max-w-80 flex flex-col items-center justify-center p-8 bg-white rounded-lg text-black">
      <div className="relative w-64 h-64 mb-8">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-blue-200 stroke-current"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="48"
            fill="transparent"
          />
          <motion.circle
            className="text-blue-500 stroke-current"
            strokeWidth="4"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="48"
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: (progress ? progress : 0) / 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {progress &&
              <>
                <span className="text-6xl font-bold text-blue-600">{signupGoal.current - numberOfSellers}</span>
                <span className="sr-only">more sellers till launch</span>
              </>
            }
          </motion.div>
          {progress && <p className="text-sm text-gray-600">more sellers</p>}
        </div>
      </div>
      <h1 className="text-2xl font-bold text-center mb-4">Join the block market</h1>
      <p className="text-center text-sm text-gray-600 mb-8 max-w-xs">
        CMU Blockify goes live at 50 sellers. 
      </p>
      <div className="space-y-4 w-full max-w-xs">

        <Button  className="w-full bg-blue-500 " onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" /> Share with Friends
          </Button>

        <Button className="w-full" onClick={() => router.push("/sign-up")}>
          <UserPlus className="mr-2 h-4 w-4" /> Sign Up Now
        </Button>
        
        <Button variant="outline" className="w-full" onClick={() => router.push("/about")}>
            <BookText className="mr-2 h-4 w-4" /> Learn More
          </Button>






        
      </div>
      </div>
    </div>
  )
}