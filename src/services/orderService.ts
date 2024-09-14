// services/orderService.ts

import { Order } from "../models/order";
import { Timestamp } from "firebase/firestore";
import { 
    addOrderToFirestore, 
    deleteOrderFromFirestore , 
    getAllOrders
} from "../queries/orderQueries";


export const createOrder = async (
  orderData: Omit<Order, "createdAt" | "expiration">,
  expirationMinutes: number
): Promise<void> => {

  if (expirationMinutes <= 0) {
    throw new Error("Expiration time must be greater than zero.");
  }

  const createdAt = Timestamp.now();
  const expiration = Timestamp.fromMillis(
    createdAt.toMillis() + expirationMinutes * 60 * 1000
  );

  const order: Order = {
    ...orderData,
    createdAt,
    expiration,
  };

  validateOrderData(order);

  await addOrderToFirestore(order);
};

export const deleteOrder = async (orderId: string): Promise<void> => {
    // Additional logic like permission checks can be added here
    await deleteOrderFromFirestore(orderId);
};

export const fetchUnexpiredOrders = async (): Promise<Array<Order>>=> {
  try {
    const orders = await getAllOrders();
    return orders;
    console.log('Unexpired Orders:', orders);
  } catch (error) {
    console.error('Error retrieving unexpired orders:', error);
    throw error;
  }
};

const validateOrderData = (orderData: Order) => {
  if (!orderData.uid) {
    throw new Error("User ID is required.");
  }
  if (!orderData.andrewId) {
    throw new Error("Andrew ID is required.");
  }
  if (orderData.price <= 0) {
    throw new Error("Price must be greater than zero.");
  }
  if (!orderData.restaurant) {
    throw new Error("Restaurant is required.");
  }
  if (!orderData.order) {
    throw new Error("Order details are required.");
  }
  if (!orderData.expiration) {
    throw new Error("Expiration time is required.");
  }
};
