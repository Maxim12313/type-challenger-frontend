import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv5GhIXLrhbep7TtrwSDkQ6FhoZpNZfuU",
  authDomain: "type-challenger-auth.firebaseapp.com",
  projectId: "type-challenger-auth",
  storageBucket: "type-challenger-auth.appspot.com",
  messagingSenderId: "459821767827",
  appId: "1:459821767827:web:000d10fde0682651360166",
  measurementId: "G-XCPZBGHDBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };