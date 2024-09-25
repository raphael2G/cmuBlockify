'use client'

import { Mail } from "lucide-react"

export function ThankYouScreenComponent() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Mail className="w-16 h-16 text-purple-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-6">
            We appreciate your interest. We'll send you an email when sign-ups are open.
          </p>
          <div className="w-16 h-1 bg-purple-500 rounded mb-6"></div>
          <p className="text-sm text-gray-500">
            Keep an eye on your inbox for exciting updates!
          </p>
        </div>
      </div>
    </div>
  )
}