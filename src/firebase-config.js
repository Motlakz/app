import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, addDoc, getDocs, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Existing sign-in and sign-up operations
  })
  .catch((error) => {
    // Handle Errors here.
    console.error(error);
});
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const getCurrentUser = () => {
  return auth.currentUser;
};

export { db, collection, doc, addDoc, getDocs, deleteDoc, updateDoc, onSnapshot, signOut, auth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, githubProvider, googleProvider };
