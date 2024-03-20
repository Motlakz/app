import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, githubProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import FlashMessage from './FlashMessage';

function SignUpPrompt({ isOpen, onClose, onLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    // Username validation
    if (username.trim().length === 0) {
      setErrorMessage('Please enter a username');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    // Password validation
    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters long');
      return;
    }
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMessage('Sign up successful!');
        setErrorMessage('');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMessage('Sign in successful!');
        setErrorMessage('');
      }
      onClose(); // Close the prompt
      navigate('/tracker'); // Redirect to the tracker route
      onLogin(); // Call the onLogin function to update the login status
    } catch (error) {
      console.error('Error:', isSignUp ? 'signing up' : 'signing in', error);
      setErrorMessage(error.message); // Set the error message
      setSuccessMessage('');
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      setSuccessMessage('Sign in successful!');
      setErrorMessage('');
      onClose(); // Close the prompt
      navigate('/tracker'); // Redirect to the tracker route
      onLogin(); // Call the onLogin function to update the login status
    } catch (error) {
      console.error('Error with GitHub sign-in:', error);
      setErrorMessage(error.message); // Set the error message
      setSuccessMessage('');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccessMessage('Sign in successful!');
      setErrorMessage('');
      onClose(); // Close the prompt
      navigate('/tracker'); // Redirect to the tracker route
      onLogin(); // Call the onLogin function to update the login status
    } catch (error) {
      console.error('Error with Google sign-in:', error);
      setErrorMessage(error.message); // Set the error message
      setSuccessMessage('');
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
    setUsername('');
    setError(''); // Clear any existing error
  };

  return (
    <>
      {isOpen && (
        <div className="form-modal square-in-center fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
            <div className="bg-white relative rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-0 border hover:border-indigo-500 hover:text-indigo-500 hover:bg-purple-200 bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className="form-body px-6 py-4">
                <div className="text-xl font-semibold text-indigo-900 my-4 flex items-center">
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                  <div className="ml-2 text-indigo-500">
                    {isSignUp ? (
                      <span role="img" aria-label="Sign Up">
                        🆕
                      </span>
                    ) : (
                      <span role="img" aria-label="Sign In">
                        🔑
                      </span>
                    )}
                  </div>
                </div>
                <FlashMessage message={successMessage} type="success" />
                <FlashMessage message={errorMessage} type="error" />
                <form onSubmit={handleSubmit}>
                  {isSignUp && (
                      <p className="my-4 text-gray-600">
                        By signing up, you'll get access to the full user experience and all the features our app has to offer.
                      </p>
                  )}

                  <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      placeholder="Choose a username"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      placeholder="Your email"
                      required
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                      placeholder="Your password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-500 border border-transparent hover:bg-white hover:border-purple-600 hover:text-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </button>
                </form>

                <div className="line-container flex items-center my-4">
                  <div className="line flex-grow h-px bg-gray-300"></div>
                  <p className="center-text px-4 text-gray-500">OR</p>
                  <div className="line flex-grow h-px bg-gray-300"></div>
                </div>
                <div className="mt-4 flex flex-col space-y-2">
                  <button
                    onClick={handleGitHubSignIn}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                  >
                    <FaGithub className="mr-2" />
                    {isSignUp ? 'Sign Up with GitHub' : 'Sign In with GitHub'}
                  </button>
                  <button
                    onClick={handleGoogleSignIn}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                  >
                    <FaGoogle className="mr-2" />
                    {isSignUp ? 'Sign Up with Google' : 'Sign In with Google'}
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <button
                    onClick={toggleForm}
                    className="text-indigo-500 hover:text-indigo-700 font-semibold"
                  >
                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUpPrompt;