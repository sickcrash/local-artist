import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiArg_d0xJKmz12J0-Pqqf076cCWzZj4w",
  authDomain: "progettoingsw-5b2d4.firebaseapp.com",
  projectId: "progettoingsw-5b2d4",
  storageBucket: "progettoingsw-5b2d4.appspot.com",
  messagingSenderId: "1047111161478",
  appId: "1:1047111161478:web:c97d2b826c672a9155e307"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);