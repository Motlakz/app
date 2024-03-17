import React from 'react';
import logo from '../repay-smart-logo-secondary.jpeg';
import { Link } from 'react-router-dom';

function Navbar() {
    return(
        <nav className="fixed top-0 bg-indigo-400 w-full p-2 z-10 flex justify-between items-center px-5">
            <div className="logo">
                <img src={logo} className="max-w-20 max-h-16 object-cover rounded-xl" alt="app logo" />
            </div>
            <ul className="flex space-x-4">
                <Link to="/" className="text-white hover:bg-indigo-200 hover:text-indigo-700 py-1 px-2">Home</Link>
                <Link to="/tracker" className="text-white hover:bg-indigo-200 hover:text-indigo-700 py-1 px-2">Loan Tracker</Link>
                <Link to="/about" className="text-white hover:bg-indigo-200 hover:text-indigo-700 py-1 px-2">About</Link>
                <a href="#Contact" className="text-white hover:bg-indigo-200 hover:text-indigo-700 py-1 px-2">Contact</a>
            </ul>
        </nav>
    )
}

export default Navbar;
