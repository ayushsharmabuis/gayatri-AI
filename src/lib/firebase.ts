// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5aHaj_mH1_4QPEV0sHFLoba5W00-ilhI",
  authDomain: "gayatriai44.firebaseapp.com",
  projectId: "gayatriai44",
  storageBucket: "gayatriai44.firebasestorage.app",
  messagingSenderId: "254688705728",
  appId: "1:254688705728:web:ec33c6e28e94e5c8c60125",
  measurementId: "G-HM0DZDFFLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export auth functions
export { auth, googleProvider, onAuthStateChanged, signOut };
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signUpWithEmail = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);
export const signInWithEmail = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
