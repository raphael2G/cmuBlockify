// FilterButtons.tsx
import React from 'react';
import { Button } from "@/components/ui/button";

interface FilterButtonsProps {
  showVenmo: boolean;
  showZelle: boolean;
  toggleVenmo: () => void;
  toggleZelle: () => void;
  toggleAll: () => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  showVenmo,
  showZelle,
  toggleVenmo,
  toggleZelle,
  toggleAll,
}) => (
  <div className="flex justify-between">
    <Button
      onClick={toggleAll}
      className={`w-[32%] ${
        showVenmo && showZelle ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
      } text-white`}
    >
      {showVenmo && showZelle ? 'Displaying all orders' : 'Hiding some orders'}
    </Button>

    <Button
      onClick={toggleVenmo}
      className={`w-[32%] ${
        showVenmo ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
      } text-white`}
    >
      {showVenmo ? 'Displaying Venmo' : 'Hiding Venmo'}
    </Button>

    <Button
      onClick={toggleZelle}
      className={`w-[32%] ${
        showZelle ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
      } text-white`}
    >
      {showZelle ? 'Displaying Zelle' : 'Hiding Zelle'}
    </Button>
  </div>
);

export default FilterButtons;
