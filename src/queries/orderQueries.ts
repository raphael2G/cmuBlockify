// queries/orderQueries.ts

import { db } from "../firebase/firebase";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { Order } from "../models/Order";

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
