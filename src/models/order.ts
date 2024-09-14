import { Timestamp } from "firebase/firestore";

export interface Order {
  id?: string;
  uid: string;
  andrewId: string;
  price: number;
  restaurant: string;
  order: string;
  createdAt: Timestamp;
  expiration: Timestamp;
}


