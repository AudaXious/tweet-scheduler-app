// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzNEuVVuwwJz1yZGxCp7WFhztEuV30a1A",
  authDomain: "audaxious-auth.firebaseapp.com",
  projectId: "audaxious-auth",
  storageBucket: "audaxious-auth.appspot.com",
  messagingSenderId: "27733786599",
  appId: "1:27733786599:web:8f6b776d5ebf4f6f470742",
  measurementId: "G-ESW3TXH7PL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
