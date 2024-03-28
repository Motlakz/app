import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import RepaymentsTracker from './components/Tracker';
import About from './components/About';
import Home from './components/Home';
import { auth, db, collection, getDocs, signOut, onAuthStateChanged } from "./firebase-config";

function App() {
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    return loggedInStatus && loggedInStatus !== "undefined" ? JSON.parse(loggedInStatus) : false;
  });
  
  const [dataEntryCount, setDataEntryCount] = useState(() => {
    const storedExpenses = localStorage.getItem('expenses');
    return storedExpenses && storedExpenses !== "undefined" ? JSON.parse(storedExpenses).length : 0;
  });
  
  const [showLoginPromptAfterDelay, setShowLoginPromptAfterDelay] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setIsLoggedIn(true);
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
        const fetchExpenses = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "expenses"));
                const fetchedExpenses = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setDataEntryCount(fetchedExpenses.length);
            } catch (error) {
                console.error("Error fetching expenses: ", error);
            }
        };
        fetchExpenses();
    } else {
        setDataEntryCount(0);
    }
  }, [isLoggedIn]);
  
  useEffect(() => {
    if (dataEntryCount >= 3 && !isLoggedIn) {
      setShowSignUpPrompt(true);
    } else if (isLoggedIn) {
      setShowSignUpPrompt(false);
    } else {
      const randomChance = Math.random();
      setShowSignUpPrompt(randomChance < 0.2);
    }
  }, [dataEntryCount, isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const handleLogin = () => {
    setShowSignUpPrompt(false);
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setShowSignUpPrompt(false);
        setShowLoginPromptAfterDelay(true);
        setTimeout(() => {
          setIsLoggedIn(false);
        }, 1500);
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const memoizedSetShowSignUpPrompt = useCallback(setShowSignUpPrompt, [setShowSignUpPrompt]);

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
          showLoginPromptAfterDelay={showLoginPromptAfterDelay}
          setShowLoginPromptAfterDelay={setShowLoginPromptAfterDelay}
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
                setShowSignUpPrompt={memoizedSetShowSignUpPrompt}
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
