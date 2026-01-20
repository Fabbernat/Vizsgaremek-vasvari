// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqepd_1Cs4KkXbhIHxmN19sP3wmiZN8rA",
  authDomain: "royal-delivery-1.firebaseapp.com",
  projectId: "royal-delivery-1",
  storageBucket: "royal-delivery-1.firebasestorage.app",
  messagingSenderId: "927398504420",
  appId: "1:927398504420:web:9f11da73ae9d35d09349f1",
  measurementId: "G-D4EVB3YDJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);