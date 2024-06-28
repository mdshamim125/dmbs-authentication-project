// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeB2equkfeEKXQ-5sVhIq6UoN-0dXCXKw",
  authDomain: "dbms-5e78c.firebaseapp.com",
  projectId: "dbms-5e78c",
  storageBucket: "dbms-5e78c.appspot.com",
  messagingSenderId: "288074464411",
  appId: "1:288074464411:web:fa3cc754207f21d4ae9a3e",
  measurementId: "G-W22Q28JFVC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
