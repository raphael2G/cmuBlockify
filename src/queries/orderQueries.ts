// queries/orderQueries.ts

import { db } from "../firebase/firebase";
import { collection, addDoc, doc, deleteDoc, getDocs, Timestamp, query, where } from "firebase/firestore";
import { Order } from "../models/order";

const ordersCollection = collection(db, "orders");

export const addOrderToFirestore = async (orderData: Order): Promise<void> => {
  try {
    await addDoc(ordersCollection, orderData);
    console.log("Order added to Firestore successfully");
  } catch (error) {
    console.error("Error adding order to Firestore:", error);
    throw error;
  }
};

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    // Get the current timestamp
    const now = Timestamp.now();

    // Reference to the 'orders' collection
    const ordersRef = collection(db, "orders");

    // Create a query where 'expiration' is greater than 'now'
    const q = query(ordersRef, where("expiration", ">", now));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Map the documents to the Order interface
    const orders: Order[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data
      } as Order;
    });

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; // Re-throw the error after logging it
  }
};

export const deleteOrderFromFirestore = async (orderId: string): Promise<void> => {
    const orderDocRef = doc(db, "orders", orderId);
    try {
      await deleteDoc(orderDocRef);
      console.log("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order from Firestore:", error);
      throw error;
    }
  };
