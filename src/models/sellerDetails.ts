export interface SellerDetails {
    id?: string;
    user: string;
    email: string;
    isEligible: boolean;
    maxSalesInWeek: number;
    venmo: string;
    zelle: string;
    minimumPriceToNotify: number;
    salesThisWeek: number;
  }
  