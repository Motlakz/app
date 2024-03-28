import React from "react";

export const SignInForm = ({ onSubmit, errors, register }) => (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          {...register('username', { required: true })}
          className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          placeholder="Enter your username"
        />
        {errors.username && <span className="text-red-500">Username is required</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
          className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          placeholder="Your email"
        />
        {errors.email?.type === 'required' && <span className="text-red-500">Email is required</span>}
        {errors.email?.type === 'pattern' && <span className="text-red-500">Invalid email format</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register('password', { required: true, minLength: 6 })}
          className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          placeholder="Your password"
        />
        {errors.password?.type === 'required' && <span className="text-red-500">Password is required</span>}
        {errors.password?.type === 'minLength' && <span className="text-red-500">Password should be at least 6 characters long</span>}
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-500 border border-transparent hover:bg-white hover:border-purple-600 hover:text-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Sign In
      </button>
    </form>
);
