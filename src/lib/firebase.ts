import { initializeApp, getApps } from "@firebase/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const firebaseConfig = {

};

// Initialize Firebase
const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const FireStore = getFirestore(firebase_app);
export const FireAuth = getAuth(firebase_app);

export default firebase_app;