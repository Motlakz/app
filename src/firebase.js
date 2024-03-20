import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdWcE_LbTlTx-hMCTLK3YTAXvZ29uZX3k",
  authDomain: "repay-smart.firebaseapp.com",
  databaseURL: "https://repay-smart-default-rtdb.firebaseio.com",
  projectId: "repay-smart",
  storageBucket: "repay-smart.appspot.com",
  messagingSenderId: "783584558845",
  appId: "1:783584558845:web:76559ad817b1261df0c894",
  measurementId: "G-2GSJPTFP17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Initialize authentication providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const authStateChanged = onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log('User is signed in');
  } else {
    // User is signed out
    console.log('User is signed out');
  }
});

// Export the services, providers, and authStateChanged
export { app, analytics, auth, firestore, googleProvider, githubProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, authStateChanged, signOut };
