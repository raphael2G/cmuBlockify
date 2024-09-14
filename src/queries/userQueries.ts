// queries/userQueries.ts

import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { User } from "../models/User";

const usersCollection = collection(db, "users");

export const addUserToFirestore = async (userData: User): Promise<void> => {
  try {
    await addDoc(usersCollection, userData);
    console.log("User added to Firestore successfully");
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    throw error;
  }
};
