import { Restaurant } from "@/models/restauraunt";
import { queryRestauraunts } from "@/queries/restaurauntQueries";

export const getRestauraunts = async (): Promise<Array<Restaurant>> => {
    return queryRestauraunts();
};
