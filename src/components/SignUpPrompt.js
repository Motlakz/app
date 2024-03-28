import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { auth, db, doc, setDoc, collection, googleProvider, githubProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase-config';
import { FaGithub, FaGoogle } from 'react-icons/fa';

function SignUpPrompt({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      if (isSignUp) {
        // Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = userCredential.user;
  
        // Store user information in Firestore
        const userRef = doc(collection(db, 'users'), user.uid);
        await setDoc(userRef, {
          username: data.username, // Assuming you have a 'username' field in your form data
          email: data.email,
          // Add any other relevant user data here
        });
  
        console.log('Sign up successful!');
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        console.log('Sign in successful!');
      }
  
      onClose();
      navigate('/tracker');
    } catch (error) {
      console.error('Error:', isSignUp ? 'signing up' : 'signing in', error);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      console.log('Sign in successful!');
      onClose();
      navigate('/tracker');
    } catch (error) {
      console.error('Error with GitHub sign-in:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log('Sign in successful!');
      onClose();
      navigate('/tracker');
    } catch (error) {
      console.error('Error with Google sign-in:', error);
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
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
                {isSignUp ? (
                  <SignUpForm onSubmit={handleSubmit(onSubmit)} errors={errors} register={register} />
                ) : (
                  <SignInForm onSubmit={handleSubmit(onSubmit)} errors={errors} register={register} />
                )}

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
                  <span
                    onClick={toggleForm}
                    className="cursor-pointer text-indigo-500 hover:text-indigo-700 font-semibold"
                  >
                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                  </span>
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
