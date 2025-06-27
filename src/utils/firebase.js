// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArYEEjb1PN0ihaAOvRzaklYx2pa_NXo1Q",
  authDomain: "netflixgpt-bc87c.firebaseapp.com",
  projectId: "netflixgpt-bc87c",
  storageBucket: "netflixgpt-bc87c.firebasestorage.app",
  messagingSenderId: "980188446725",
  appId: "1:980188446725:web:d1da97c1eacc8f055edc6c",
  measurementId: "G-D7NWHHGC1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();