export interface SellerDetails {
    id?: string;
    user: string;
    isEligible: boolean;
    maxSalesInWeek: number;
    venmo: string;
    minimumPriceToNotify: number;
    salesThisWeek: number;
  }
  