
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATFO4r9b0XIXA9tONImc6wlOj09VoQcLQ",
  authDomain: "harrypotterproject-544f0.firebaseapp.com",
  projectId: "harrypotterproject-544f0",
  storageBucket: "harrypotterproject-544f0.appspot.com",
  messagingSenderId: "466734140410",
  appId: "1:466734140410:web:023968d83bfebab027f243",
  measurementId: "G-8PH4N25472"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };