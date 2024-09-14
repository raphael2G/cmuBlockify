// services/userService.ts

import { addUserToFirestore } from "../queries/userQueries";
import { User } from "../models/User";

export const createUser = async (userData: User): Promise<void> => {
  validateUserData(userData);
  await addUserToFirestore(userData);
};

const validateUserData = (userData: User) => {
  if (!userData.uid) {
    throw new Error("User UID is required.");
  }
  if (!userData.andrewId) {
    throw new Error("Andrew ID is required.");
  }
  if (!userData.email) {
    throw new Error("Email is required.");
  }
};
