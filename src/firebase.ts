import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// These values should be provided by the user in their environment variables or manually updated here.
const firebaseConfig = {
  apiKey: "AIzaSyDOUThHmMkvqHZOE47KnYvyUE0tF96dZFE",
  authDomain: "stay-sharp-after-45-ed494.firebaseapp.com",
  projectId: "stay-sharp-after-45-ed494",
  storageBucket: "stay-sharp-after-45-ed494.firebasestorage.app",
  messagingSenderId: "465743953611",
  appId: "1:465743953611:web:9ab1fc074512384b21e54e",
  measurementId: "G-73N8ND789B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
