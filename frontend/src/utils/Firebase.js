import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginapnacart-d18fc.firebaseapp.com",
  projectId: "loginapnacart-d18fc",
  storageBucket: "loginapnacart-d18fc.firebasestorage.app",
  messagingSenderId: "101575005736",
  appId: "1:101575005736:web:67f8e8e7634c12ee34471d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider };