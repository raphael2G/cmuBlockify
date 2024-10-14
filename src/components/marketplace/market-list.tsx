// MarketList.tsx
import { Order } from '@/models/order';

interface MarketListProps {
  sellers: Array<{ quantity: number; price: number }>;
  buyers: Array<{ quantity: number; price: number }>;
  onSellerClick: () => void;
}

const MarketList: React.FC<MarketListProps> = ({ sellers, buyers, onSellerClick }) => (
  <div className="mb-4 overflow-y-auto max-h-[60vh]">
    {sellers.map((seller, index) => (
      <div
        key={`seller-${index}`}
        className="flex justify-between items-center mb-2 bg-gradient-to-r from-green-400 to-green-500 p-2 rounded-lg shadow-md"
      >
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold text-sm">
          {seller.quantity}
        </div>
        <span className="text-white font-medium text-sm">sellers at</span>
        <div className="bg-white px-2 py-1 rounded-full text-green-600 font-bold text-sm">${seller.price}</div>
      </div>
    ))}
    {buyers.map((buyer, index) => (
      <div
        key={`buyer-${index}`}
        onClick={onSellerClick}
        className="flex justify-between items-center mb-2 bg-gradient-to-r from-red-400 to-red-500 p-2 rounded-lg shadow-md"
      >
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-600 font-bold text-sm">
          {buyer.quantity}
        </div>
        <span className="text-white font-medium text-sm">buyers at</span>
        <div className="bg-white px-2 py-1 rounded-full text-red-600 font-bold text-sm">${buyer.price}</div>
      </div>
    ))}
  </div>
);

export default MarketList;
