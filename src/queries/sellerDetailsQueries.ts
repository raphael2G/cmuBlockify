// queries/sellerDetailsQueries.ts

import { db } from "../firebase/firebase";
import { collection, addDoc, doc, updateDoc, deleteDoc, query, getDocs, where, limit } from "firebase/firestore";
import { SellerDetails } from "../models/sellerDetails";

const sellerDetailsCollection = collection(db, "sellerDetails");

export const addSellerDetailsToFirestore = async (
  sellerData: SellerDetails
): Promise<void> => {
  try {
    await addDoc(sellerDetailsCollection, sellerData);
    console.log("Seller details added to Firestore successfully");
  } catch (error) {
    console.error("Error adding seller details to Firestore:", error);
    throw error;
  }
};

export const updateSellerDetailsInFirestore = async (
    sellerId: string,
    updateData: Partial<SellerDetails>
  ): Promise<void> => {
    const sellerDocRef = doc(db, "sellerDetails", sellerId);
    try {
      await updateDoc(sellerDocRef, updateData);
      console.log("Seller details updated successfully");
    } catch (error) {
      console.error("Error updating seller details in Firestore:", error);
      throw error;
    }
};

export const deleteSellerDetailsFromFirestore = async (
sellerId: string
): Promise<void> => {
const sellerDocRef = doc(db, "sellerDetails", sellerId);
try {
    await deleteDoc(sellerDocRef);
    console.log("Seller details deleted successfully");
} catch (error) {
    console.error("Error deleting seller details from Firestore:", error);
    throw error;
}
};

export const queryEligibleSellerDetails = async (): Promise<SellerDetails[]> => {
        const q = query(sellerDetailsCollection, where("isEligible", "==", true));
    try {
      const querySnapshot = await getDocs(q);
      const eligibleSellers: SellerDetails[] = [];
      
      querySnapshot.forEach((doc) => {
            const sellerData = doc.data() as SellerDetails;
            sellerData.id = doc.id;
            eligibleSellers.push(sellerData);
        });

      return eligibleSellers;
    } catch (error) {
      console.error("Error querying eligible seller details:", error);
      throw error;
    }
  };

export const querySellerDetailsByUid = async (uid: string): Promise<SellerDetails | null> => {
    const q = query(sellerDetailsCollection, where("user", "==", uid), limit(1));
    try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const sellerDoc = querySnapshot.docs[0];
        const sellerData = sellerDoc.data() as SellerDetails;
        sellerData.id = sellerDoc.id;

        return sellerData;
    } catch (error) {
        console.error("Error querying seller details by UID:", error);
        throw error;
    }
};

export const getNumberOfSellers = async (): Promise<number> => {
    try {
        const querySnapshot = await getDocs(sellerDetailsCollection);
        return querySnapshot.size;
    } catch (error) {
        console.error("Error getting number of sellers:", error);
        throw error;
    }
}