import React, { useState } from 'react';
import logo from '../repay-smart-logo-secondary.jpeg';
import SignUpPrompt from './SignUpPrompt';
import { Link } from 'react-router-dom';
import UserDropdown from './Dropdown';
import Profile from './Profile';
import FlashMessage from './FlashMessage';

function Navbar({ isLoggedIn, showSignUpPrompt, setShowSignUpPrompt, showLoginPromptAfterDelay, setShowLoginPromptAfterDelay, handleLogin, handleLogout, username, email, setDataEntryCount }) {
  const [showProfile, setShowProfile] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);

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
      }, 1500);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed top-0 bg-indigo-400 w-full p-2 z-10 flex justify-between items-center px-5">
      <div className="logo">
        <img src={logo} className="max-w-20 max-h-16 object-cover rounded-xl" alt="app logo" />
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:bg-indigo-200 hover:text-indigo-700 py-1 px-2">
            Home
          </Link>
        </li>
        <li>
          <Link to="/tracker" className="text-white hover:bg-indigo-200 hover:text-indigo-700 py-1 px-2">
            Loan Tracker
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-white hover:bg-indigo-200 hover:text-indigo-700 py-1 px-2">
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
            username={username}
            email={email}
            handleProfileClick={handleProfileClick}
          />
        )}
      </div>
      {(showSignUpPrompt || showLoginPromptAfterDelay) && (
        <SignUpPrompt
          isOpen={showSignUpPrompt || showLoginPromptAfterDelay}
          onClose={() => {
            setShowSignUpPrompt(false);
            setShowLoginPromptAfterDelay(false);
          }}
          onLogin={handleLogin}
        />
      )}
      {showProfile && (
        <Profile
          onClose={closeProfile}
          setDataEntryCount={setDataEntryCount}
          setShowSignUpPrompt={setShowSignUpPrompt}
        />
      )}
      <FlashMessage flashMessage={flashMessage} />
    </nav>
  );
}

export default Navbar;
