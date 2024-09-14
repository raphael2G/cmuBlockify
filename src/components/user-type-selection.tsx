import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function UserType() {
  const [selectedUserType, setSelectedUserType] = useState({ buyer: false, seller: false })

  const handleUserTypeToggle = (type) => {
    setSelectedUserType((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }))
  }

  const handleConfirm = () => {
    const { buyer, seller } = selectedUserType
    if (!buyer && !seller) {
      alert("Please select at least one option.")
      return
    }
    // Proceed with the next steps
    console.log("User type confirmed:", selectedUserType)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md flex flex-col h-full">
        <div className="flex flex-col flex-grow">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">What best describes you?</CardTitle>
            <CardDescription className="text-center">
              Select one or both options to proceed
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4 flex-grow">
            <Button
              onClick={() => handleUserTypeToggle('buyer')}
              className={`w-full h-16 text-lg transition-all ${
                selectedUserType.buyer
                  ? 'bg-primary text-primary-foreground shadow-lg hover:scale-105'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Buyer
            </Button>
            <Button
              onClick={() => handleUserTypeToggle('seller')}
              className={`w-full h-16 text-lg transition-all ${
                selectedUserType.seller
                  ? 'bg-primary text-primary-foreground shadow-lg hover:scale-105'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Seller
            </Button>
          </CardContent>
        </div>
        <CardFooter className="flex justify-center mt-auto">
          <Button
            onClick={handleConfirm}
            className={`w-full h-12 text-lg font-semibold`}
            disabled={!selectedUserType.buyer && !selectedUserType.seller}
          >
            Confirm
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}