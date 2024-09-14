export interface SellerDetails {
    id?: string;
    user: string;
    email: string;
    isEligible: boolean;
    maxSalesInWeek: number;
    venmo: string;
    minimumPriceToNotify: number;
    salesThisWeek: number;
  }
  