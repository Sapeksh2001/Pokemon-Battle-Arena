// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBJAsIW9w1Sa7NKO8tzODPOPFWKNPtr-yM",
  authDomain: "pokemon-1248.firebaseapp.com",
  databaseURL: "https://pokemon-1248-default-rtdb.firebaseio.com",
  projectId: "pokemon-1248",
  storageBucket: "pokemon-1248.firebasestorage.app",
  messagingSenderId: "185001376620",
  appId: "1:185001376620:web:4358f1204a5fe1a7615149",
  measurementId: "G-G07TP1ENV6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app;
