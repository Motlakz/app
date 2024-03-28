import React, { useState, useRef } from 'react';
import Profile from './Profile';

const UserDropdown = ({ handleLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add your logic to toggle dark mode here
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleLogout}
        className="bg-violet-500 hover:bg-white text-white hover:text-violet-700 hover:border-violet-700 border border-transparent px-2 py-1"
      >
        Sign Out
      </button>
      <button
        className="ml-2 bg-violet-500 hover:bg-white text-white hover:text-violet-700 hover:border-violet-700 border border-transparent px-2 py-1"
        onClick={() => setShowDropdown(!showDropdown)}
      > Settings
        <svg
          className="h-4 w-4 fill-current inline"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>
      {showDropdown && (
        <div className="dropdown absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-10">
          <div className="py-2">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => setShowProfileModal(true)}
            >
              Profile
            </button>
            <button
              className="relative w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              <span className="tag absolute bottom-0 right-0 text-xs bg-green-400 rounded font-semibold">Coming Soon</span>
            </button>
          </div>
        </div>
      )}
      {showProfileModal && <Profile onClose={() => setShowProfileModal(false)} />}
    </div>
  );
};

export default UserDropdown;
