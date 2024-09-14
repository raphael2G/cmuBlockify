// queries/userQueries.ts

import { db } from "../firebase/firebase";
import { collection, addDoc, query, where, getDocs, limit} from "firebase/firestore";
import { User } from "../models/user";

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

export const queryUserByUid = async (uid: string): Promise<User | null> => {
  try {
    const q = query(usersCollection, where("uid", "==", uid), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) { 
      return null; 
    } 

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data() as User;

    return userData;

  } catch (error) {
    console.error("Error searching for user by UID:", error);
    throw error;
  }
};