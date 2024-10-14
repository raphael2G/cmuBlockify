// FulfillmentForm.tsx
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Order } from '@/models/order';
import { fetchUnexpiredOrders, deleteOrder } from '@/services/orderService';

interface FulfillmentFormProps {
  onFulfillmentComplete: () => void;
}

const FulfillmentForm: React.FC<FulfillmentFormProps> = ({ onFulfillmentComplete }) => {
  const [potentialOrder, setPotentialOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch unexpired orders to find potential orders for fulfillment
    fetchUnexpiredOrders().then((orders) => {
      // Find the highest price order with the nearest expiration
      const sortedOrders = orders.sort(
        (a, b) => b.price - a.price || a.expiration.toMillis() - b.expiration.toMillis()
      );
      setPotentialOrder(sortedOrders[0] || null);
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching orders:", error);
      setLoading(false);
    });
  }, []);

  const handleOrderFulfillment = () => {
    if (potentialOrder?.id) {
      deleteOrder(potentialOrder.id)
        .then(() => {
          console.log("Successfully fulfilled order:", potentialOrder);
          onFulfillmentComplete(); // Notify parent component
        })
        .catch((error) => {
          console.error("Error fulfilling order:", error);
        });
    }
  };

  if (loading) {
    return <div>Loading order to fulfill...</div>;
  }

  if (!potentialOrder) {
    return <div>No orders available for fulfillment.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 text-black">
      <Input
        type="number"
        placeholder="Price"
        value={potentialOrder.price}
        className="mb-3 text-black"
        disabled
      />
      <Select>
        <SelectTrigger className="mb-3">
          <SelectValue placeholder={potentialOrder.restaurant} />
        </SelectTrigger>
      </Select>
      <textarea
        placeholder={potentialOrder.order}
        value={potentialOrder.order}
        className="w-full p-2 border rounded mb-3 resize-none text-sm text-black"
        rows={3}
        disabled
      />
      <Button onClick={handleOrderFulfillment} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
        Fulfill this Order
      </Button>
    </div>
  );
};

export default FulfillmentForm;
