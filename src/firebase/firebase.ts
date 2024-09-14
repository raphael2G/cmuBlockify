import { initializeApp, getApps } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    
};

// Initialize Firebase
// const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const firebase_app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];


export const db = getFirestore(firebase_app);
export const FireAuth = getAuth(firebase_app);
