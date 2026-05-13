// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqg7oAZPF6M4yskr6TVU9mNBBwOxaezNc",
  authDomain: "aitraveler-fee26.firebaseapp.com",
  projectId: "aitraveler-fee26",
  storageBucket: "aitraveler-fee26.firebasestorage.app",
  messagingSenderId: "391372880475",
  appId: "1:391372880475:web:dda95088e7405fd13add7e",
  measurementId: "G-F3M6PWTWTL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
