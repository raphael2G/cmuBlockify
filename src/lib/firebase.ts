import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDHnmlvGyjnw7GFdcC4Hh8R8Y8PR2sIbLc",
    authDomain: "cmublockify.firebaseapp.com",
    projectId: "cmublockify",
    storageBucket: "cmublockify.appspot.com",
    messagingSenderId: "162354639711",
    appId: "1:162354639711:web:85d813484131f94cbcbcea"
};

// Initialize Firebase
const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const FireStore = getFirestore(firebase_app);

export const FireStorage = getStorage(firebase_app);

export const FireAuth = getAuth(firebase_app);

export default firebase_app;