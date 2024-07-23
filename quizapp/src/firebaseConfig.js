// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXhWyaJbNpO84_bNSNZQ7PHmRVU9yq9oM",
  authDomain: "formsubmit-a6b3c.firebaseapp.com",
  projectId: "formsubmit-a6b3c",
  storageBucket: "formsubmit-a6b3c.appspot.com",
  messagingSenderId: "483469849213",
  appId: "1:483469849213:web:8394650f9cf9807c8ef714"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app)