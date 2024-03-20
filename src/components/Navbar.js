import React from 'react';
import logo from '../repay-smart-logo-secondary.jpeg';
import SignUpPrompt from './SignUpPrompt';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, showSignUpPrompt, setShowSignUpPrompt, showLoginPromptAfterDelay, setShowLoginPromptAfterDelay, handleLogin, handleLogout }) {

  return (
    <nav className="fixed top-0 bg-indigo-400 w-full p-2 z-10 flex justify-between items-center px-5">
      <div className="logo">
        <img src={logo} className="max-w-20 max-h-16 object-cover rounded-xl" alt="app logo" />
      </div>
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white hover:bg-indigo-200 hover:text-indigo-700 py-1 px-2">Home</Link></li>
        <li><Link to="/tracker" className="text-white hover:bg-indigo-200 hover:text-indigo-700 py-1 px-2">Loan Tracker</Link></li>
        <li><Link to="/about" className="text-white hover:bg-indigo-200 hover:text-indigo-700 py-1 px-2">About</Link></li>
        <li><Link to="/Contact" className="text-white hover:bg-indigo-200 hover:text-indigo-700 py-1 px-2">Contact</Link></li>
      </ul>
      <div className="buttons flex items-center gap-4">
        {!isLoggedIn && (
          <>
            <button onClick={() => setShowSignUpPrompt(true)} className="bg-purple-600 text-white hover:bg-purple-700 py-1 px-2">
              Sign Up
            </button>
            <button onClick={() => setShowSignUpPrompt(true)} className="bg-indigo-600 text-white hover:bg-indigo-700 py-1 px-2">
              Sign In
            </button>
          </>
        )}
        {isLoggedIn && (
          <button onClick={handleLogout} className="bg-violet-500 hover:bg-white text-white hover:text-violet-700 hover:border-violet-700 border border-transparent px-2 py-1">
            Sign Out
          </button>
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
    </nav>
  );
}

export default Navbar;
