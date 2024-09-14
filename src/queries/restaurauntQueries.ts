import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Restaurant } from "@/models/restauraunt";

export const queryRestauraunts = async (): Promise<Array<Restaurant>> => {

    const restaurauntCollection = collection(db, "restauraunts");
    const output: Array<Restaurant> = [];
    try {
        const querySnapshot = await getDocs(restaurauntCollection);
        querySnapshot.docs.map((doc) => doc.data() as Restaurant).forEach((restauraunt) => {
            output.push(restauraunt);
        });
        return output;
    } catch (error) {
        console.error("Error querying restauraunts from Firestore:", error);
        throw error
    }
};