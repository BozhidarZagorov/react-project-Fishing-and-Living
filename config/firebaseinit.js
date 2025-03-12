// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHQ5HjtMbRcGyncskp7Kqo3pV14XKpQI0",
  authDomain: "fishing-and-living.firebaseapp.com",
  projectId: "fishing-and-living",
  storageBucket: "fishing-and-living.firebasestorage.app",
  messagingSenderId: "357172725695",
  appId: "1:357172725695:web:f1279c0265c5bbe139830a"
};

// Initialize Firebase
const apps = initializeApp(firebaseConfig);

export default apps