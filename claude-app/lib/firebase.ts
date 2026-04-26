import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAG5EJ2mYHbNp30PvkSxrE2AHnxkb9IYcg",
  authDomain: "prismaai-4e321.firebaseapp.com",
  projectId: "prismaai-4e321",
  storageBucket: "prismaai-4e321.firebasestorage.app",
  messagingSenderId: "122572053012",
  appId: "1:122572053012:web:ec13bdfc0ece77cda82501",
  measurementId: "G-CT3WD9Z5KT",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
