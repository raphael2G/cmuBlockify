import { useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button";
import { FiSettings } from "react-icons/fi";
import { Settings } from "lucide-react"


export default function AccountSettingsDialog() {

    const [accountSettings, setAccountSettings] = useState({
        name: '',
        email: '',
        phone: ''
      })

    const handleAccountSettingsChange = (field: string, value: string | number) => {
        setAccountSettings(prev => ({ ...prev, [field]: value }))
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
            <div className="py-4">
              <Input
                type="text"
                placeholder="Name"
                value={accountSettings.name}
                onChange={(e) => handleAccountSettingsChange('name', e.target.value)}
                className="mb-3"
              />
              <Input
                type="email"
                placeholder="Email"
                value={accountSettings.email}
                onChange={(e) => handleAccountSettingsChange('email', e.target.value)}
                className="mb-3"
              />
              <Input
                type="tel"
                placeholder="Phone"
                value={accountSettings.phone}
                onChange={(e) => handleAccountSettingsChange('phone', e.target.value)}
                className="mb-3"
              />
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Save Settings
              </Button>
            </div>
          </DialogContent>
        </Dialog>
  );

}
    