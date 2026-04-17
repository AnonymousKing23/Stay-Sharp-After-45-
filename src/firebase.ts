import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqps0Ul03Iu7grg428AyRgUP5x2xfswyo",
  authDomain: "stay-sharp-after-45.firebaseapp.com",
  projectId: "stay-sharp-after-45",
  storageBucket: "stay-sharp-after-45.firebasestorage.app",
  messagingSenderId: "966107071016",
  appId: "1:966107071016:web:09b304af0dc14a0d13ab1d",
  measurementId: "G-QZS6R8FR3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
