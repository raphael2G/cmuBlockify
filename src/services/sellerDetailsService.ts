// services/sellerDetailsService.ts

import { SellerDetails } from "../models/sellerDetails";
import { 
    addSellerDetailsToFirestore, 
    updateSellerDetailsInFirestore, 
    deleteSellerDetailsFromFirestore, 
    queryEligibleSellerDetails, 
    querySellerDetailsByUid,
    getNumberOfSellers
} from "../queries/sellerDetailsQueries";

export const createSellerDetails = async (
        sellerData: SellerDetails
    ): Promise<void> => {
            validateSellerDetails(sellerData);

            // Initialize salesThisWeek if not set
            if (sellerData.salesThisWeek === undefined) {
                sellerData.salesThisWeek = 0;
            }

            await addSellerDetailsToFirestore(sellerData);
};

export const modifySellerDetails = async (
        sellerId: string,
        updateData: Partial<SellerDetails>
    ) : Promise<void> => {
            validateSellerDetailsUpdate(updateData);
            await updateSellerDetailsInFirestore(sellerId, updateData);
};

export const deleteSellerDetails = async (sellerId: string): Promise<void> => {
    await deleteSellerDetailsFromFirestore(sellerId);
};

export const getEligibleSellerDetails = async (): Promise<SellerDetails[]> => {
    return queryEligibleSellerDetails();
};

export const searchForSellerDetailsByUid = async (uid: string): Promise<SellerDetails | null> => {
  return querySellerDetailsByUid(uid);
};

export const getNumberOfSellersInDatabase = async (): Promise<number> => {
  return getNumberOfSellers();
}

const validateSellerDetails = (sellerData: SellerDetails) => {
  if (!sellerData.user) {
    throw new Error("User ID is required.");
  }
  if (sellerData.isEligible === undefined) {
    throw new Error("Eligibility status is required.");
  }
  if (sellerData.maxSalesInWeek === undefined) {
    throw new Error("Maximum sales per week is required.");
  }
  if (!sellerData.venmo) {
    throw new Error("Venmo username is required.");
  }
  if (sellerData.minimumPriceToNotify === undefined) {
    throw new Error("Minimum price to notify is required.");
  }
};

const validateSellerDetailsUpdate = (updateData: Partial<SellerDetails>) => {
    if (updateData.maxSalesInWeek !== undefined && updateData.maxSalesInWeek < 0) {
      throw new Error("Maximum sales per week cannot be negative.");
    }
  };
