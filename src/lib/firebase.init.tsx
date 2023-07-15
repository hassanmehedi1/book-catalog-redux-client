// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHnGL1-SJXi-Dsv5EsJr5w1PdNqxNwrJo",
  authDomain: "book-verse-90697.firebaseapp.com",
  projectId: "book-verse-90697",
  storageBucket: "book-verse-90697.appspot.com",
  messagingSenderId: "756388047603",
  appId: "1:756388047603:web:7f446d0070225989fce586",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
