// services/userService.ts

import { User } from "../models/user";
import { 
  addUserToFirestore, 
  queryUserByUid 
} from "../queries/userQueries";

export const createUser = async (userData: User): Promise<void> => {
  validateUserData(userData);
  await addUserToFirestore(userData);
};

export const searchUserByUid = async (uid: string): Promise<User | null> => {
  return queryUserByUid(uid);
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
