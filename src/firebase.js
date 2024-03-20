import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseUrl: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
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
