import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import RepaymentsTracker from './components/Tracker';
import About from './components/About';
import Home from './components/Home';
import { auth, db, collection, addDoc, getDocs, signOut, onAuthStateChanged } from "./firebase-config";

function App() {
    const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
    const [hasSignedUpBefore, setHasSignedUpBefore] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        return loggedInStatus === 'true';
    });
    const [dataEntryCount, setDataEntryCount] = useState(() => {
        const storedExpenses = localStorage.getItem('expenses');
        return storedExpenses && storedExpenses !== "undefined" ? JSON.parse(storedExpenses).length : 0;
    });
    const [showLoginPromptAfterSignOut, setShowLoginPromptAfterSignOut] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            // User is signed in
            setIsLoggedIn(true);
            if (!hasSignedUpBefore) {
              setHasSignedUpBefore(true);
            }
      
            // Fetch expenses from Firestore when the user is signed in
            const userId = user.uid;
            const expensesRef = collection(db, "users", userId, "expenses");
            const querySnapshot = await getDocs(expensesRef);
            const fetchedExpenses = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setDataEntryCount(fetchedExpenses.length);
      
            // Check if there are any expenses in local storage and migrate them to Firestore
            const storedExpenses = localStorage.getItem('expenses');
            if (storedExpenses) {
              const localExpenses = JSON.parse(storedExpenses);
              await Promise.all(localExpenses.map(async (expense) => {
                try {
                  await addDoc(expensesRef, expense);
                } catch (e) {
                  console.error("Error migrating expense: ", e);
                }
              }));
              localStorage.removeItem('expenses');
            }
          } else {
            // User is signed out
            setIsLoggedIn(false);
            setDataEntryCount(0);
          }
        });
      
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [hasSignedUpBefore]);

    useEffect(() => {
        if (isLoggedIn) {
            setShowSignUpPrompt(false);
        } else {
            const randomChance = Math.random();
            setShowSignUpPrompt(dataEntryCount >= 3 || randomChance < 0.2);
        }
    }, [dataEntryCount, isLoggedIn]);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    const handleLogin = () => {
        setShowSignUpPrompt(false);
        setIsLoggedIn(true);
      
        // Get the user's UID after successful sign-in
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
      
          // Retrieve data from local storage
          const storedExpenses = localStorage.getItem('expenses');
          const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
      
          console.log('Expenses in local storage:', expenses);
      
          if (expenses.length > 0) {
            // Move data from local storage to Firestore
            const expensesRef = collection(db, "users", userId, "expenses");
            expenses.forEach(async (expense) => {
              try {
                await addDoc(expensesRef, expense);
              } catch (error) {
                console.error("Error adding document: ", error);
              }
            });
      
            // Clear local storage after moving data to Firestore
            localStorage.removeItem('expenses');
          } else {
            console.log('No expenses in local storage to move to Firestore.');
          }
        } else {
          console.error("User not authenticated");
        }
      };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setDataEntryCount(0);
        const randomChance = Math.random();
        setShowSignUpPrompt(randomChance < 0.2);
        setShowLoginPromptAfterSignOut(true);
        setTimeout(() => {
          setIsLoggedIn(false);
        }, 1500);
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

    return (
        <div className="bg-indigo-100 flex flex-col justify-center items-center min-h-screen">
            <Router>
                <Navbar
                    isLoggedIn={isLoggedIn}
                    showSignUpPrompt={showSignUpPrompt}
                    setShowSignUpPrompt={setShowSignUpPrompt}
                    handleLogin={handleLogin}
                    handleLogout={handleSignOut}
                    setDataEntryCount={setDataEntryCount}
                    showLoginPromptAfterSignOut={showLoginPromptAfterSignOut}
                    setShowLoginPromptAfterSignOut={setShowLoginPromptAfterSignOut}
                />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route
                        path="/tracker"
                        element={
                            <RepaymentsTracker
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                                dataEntryCount={dataEntryCount}
                                setDataEntryCount={setDataEntryCount}
                                showSignUpPrompt={showSignUpPrompt}
                                setShowSignUpPrompt={setShowSignUpPrompt}
                            />
                        }
                    />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
