// ActionButtons.tsx
import React from 'react';
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  isSeller: boolean;
  zellePrice: number;
  venmoPrice: number;
  onFulfillVenmo: () => void;
  onFulfillZelle: () => void;
  onPlaceOrder: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isSeller,
  zellePrice,
  venmoPrice,
  onFulfillVenmo,
  onFulfillZelle,
  onPlaceOrder,
}) => (
  <>
    {isSeller ? (
      <>
        <Button
          onClick={onFulfillVenmo}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white"
        >
          Fulfill Venmo Order (${venmoPrice})
        </Button>
        <Button
          onClick={onFulfillZelle}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white"
        >
          Fulfill Zelle Order (${zellePrice})
        </Button>
      </>
    ) : (
      <Button
        onClick={onPlaceOrder}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
      >
        Place Order
      </Button>
    )}
  </>
);

export default ActionButtons;
