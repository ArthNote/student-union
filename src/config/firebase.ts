
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAYn-IlvTDBRKwSlixzqN3-0CAGGKTaGPc",
  authDomain: "student-union-ba888.firebaseapp.com",
  projectId: "student-union-ba888",
  storageBucket: "student-union-ba888.appspot.com",
  messagingSenderId: "780918373261",
  appId: "1:780918373261:web:f5f3038b30e0bab6701bc4",
  measurementId: "G-7CKLT79JMY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);