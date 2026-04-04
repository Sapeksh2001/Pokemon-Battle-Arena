import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

// Firebase Configuration for Pokémon Battle Arena
// Keys provided by the user for the "pokemon-1248" project.

export const firebaseConfig = {
  apiKey: "AIzaSyBJAsIW9w1Sa7NKO8tzODPOPFWKNPtr-yM",
  authDomain: "pokemon-1248.firebaseapp.com",
  databaseURL: "https://pokemon-1248-default-rtdb.firebaseio.com",
  projectId: "pokemon-1248",
  storageBucket: "pokemon-1248.firebasestorage.app",
  messagingSenderId: "185001376620",
  appId: "1:185001376620:web:4358f1204a5fe1a7615149",
  measurementId: "G-G07TP1ENV6"
};

// Initialize Firebase App globally to avoid double initialization
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
