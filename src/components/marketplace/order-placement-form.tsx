// OrderForm.tsx
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Restaurant } from '@/models/restauraunt';
import { getRestauraunts } from '@/services/restaurauntService';


interface OrderFormProps {
    order: { price: string; restaurant: string; details: string };
    // write the type for setOrder
    setOrder: (order: { price: string; restaurant: string; details: string }) => void;
    onSubmit: () => void;
  }

const OrderForm:React.FC<OrderFormProps> = ({ order, setOrder, onSubmit }) => {

  const [restaurants, setRestauraunts] = useState<Array<Restaurant>>([]);
  const [loadingRestauraunts, setLoadingRestauraunts] = useState(true);

  useEffect(() => {
    getRestauraunts().then(restaurauntes => {
        setRestauraunts(restaurauntes);
        setLoadingRestauraunts(false);
      });
  }, []);

  if (loadingRestauraunts) {
    return <div>Loading restaurants...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 text-black">
      <Input
        type="number"
        placeholder="Price"
        value={order.price}
        onChange={(e) => setOrder({ ...order, price: e.target.value })}
        className="mb-3 text-black"
      />
      <Select onValueChange={(value) => setOrder({ ...order, restaurant: value })}>        <SelectTrigger className="mb-3">
          <SelectValue placeholder="Select Restaurant" />
        </SelectTrigger>
        <SelectContent>
          {restaurants.map((restaurant, index) => (
            <SelectItem key={`restaurant-${index}`} value={restaurant.name}>
              {restaurant.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <textarea
        placeholder="Order details"
        value={order.details}
        onChange={(e) => setOrder({ ...order, details: e.target.value })}
        className="w-full p-2 border rounded mb-3 resize-none text-sm"
        rows={3}
      />
      <Button onClick={onSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
        Place Order
      </Button>
    </div>
  );
};

export default OrderForm;
