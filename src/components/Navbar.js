import React, { useState } from 'react';
import logo from '../repay-smart-logo-secondary.jpeg';
import SignUpPrompt from './SignUpPrompt';
import { Link } from 'react-router-dom';
import UserDropdown from './Dropdown';
import Profile from './Profile';
import FlashMessage from './FlashMessage';

function Navbar({ isLoggedIn, showSignUpPrompt, setShowSignUpPrompt, showLoginPromptAfterSignOut, setShowLoginPromptAfterSignOut, handleLogin, handleLogout, username, email, setDataEntryCount }) {
  const [showProfile, setShowProfile] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  const handleSignOut = async () => {
    try {
      await handleLogout();
      setFlashMessage({ type: 'success', message: 'Sign out successful!' });
      setTimeout(() => {
        setFlashMessage(null);
      }, 500);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed top-0 bg-indigo-400 w-full p-2 z-10 flex justify-between items-center px-5">
      <div className="logo">
        <img src={logo} className="max-w-20 max-h-16 object-cover rounded-xl" alt="app logo" />
      </div>
      <ul className={`flex ${showMobileMenu ? 'flex-col' : 'hidden'} mobile-menu bg-indigo-800 sm:bg-transparent rounded-xl p-2 sm:relative absolute right-0 sm:top-0 top-20 sm:flex sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 transition-all duration-400 transform origin-top-right scale-${showMobileMenu ? '100' : '0'}`}>
        <li>
          <Link to="/" className="text-white hover:bg-indigo-200 hover:text-indigo-700 py-1 px-2 block">
            Home
          </Link>
        </li>
        <li>
          <Link to="/tracker" className="text-white hover:bg-indigo-200 hover:text-indigo-700 py-1 px-2 block">
            Loan Tracker
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-white hover:bg-indigo-200 hover:text-indigo-700 py-1 px-2 block">
            About
          </Link>
        </li>
      </ul>
      <div className="buttons flex items-center gap-4">
        {!isLoggedIn && (
          <>
            <button
              onClick={() => setShowSignUpPrompt(true)}
              className="bg-purple-600 text-white hover:bg-purple-700 py-1 px-2"
            >
              Sign Up
            </button>
            <button
              onClick={() => setShowSignUpPrompt(true)}
              className="bg-indigo-600 text-white hover:bg-indigo-700 py-1 px-2"
            >
              Sign In
            </button>
          </>
        )}
        {isLoggedIn && (
          <UserDropdown
            handleLogout={handleSignOut}
            setFlashMessage={setFlashMessage}
            setDataEntryCount={setDataEntryCount}
            username={username}
            email={email}
            handleProfileClick={handleProfileClick}
          />
        )}
      </div>
      <button 
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="sm:hidden bg-indigo-600 text-white p-2 rounded-full focus:outline-none"
      >
        {showMobileMenu ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>
      {(showSignUpPrompt || showLoginPromptAfterSignOut) && (
        <SignUpPrompt
          isOpen={showSignUpPrompt || showLoginPromptAfterSignOut}
          onClose={() => {
            setShowSignUpPrompt(false);
            setShowLoginPromptAfterSignOut(false);
          }}
          onLogin={handleLogin}
          setFlashMessage={setFlashMessage}
        />
      )}
      {showProfile && (
        <Profile
          onClose={closeProfile}
          setDataEntryCount={setDataEntryCount}
          setShowSignUpPrompt={setShowSignUpPrompt}
          setFlashMessage={setFlashMessage}
        />
      )}
      <FlashMessage flashMessage={flashMessage} />
    </nav>
  );
}

export default Navbar;
