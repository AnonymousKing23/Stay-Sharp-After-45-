import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvwGBKb1DbRmEAjCrtKYjuM7tLUtWtK-Q",
  authDomain: "studio-mdgst.firebaseapp.com",
  projectId: "studio-mdgst",
  storageBucket: "studio-mdgst.firebasestorage.app",
  messagingSenderId: "774460774874",
  appId: "1:774460774874:web:9d5751d72b4a9b33bfc8e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
