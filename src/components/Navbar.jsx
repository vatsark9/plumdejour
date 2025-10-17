import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthModal from './../utils/AuthModal';

const Navbar = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <nav className="w-full max-w-4xl mb-8 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-xl font-bold text-indigo-600">PlumDeJour</span>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-white">@{user.username}</span>
            <button
              onClick={() => logout()}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Login / Sign Up
          </button>
        )}

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </nav>
  );
};

export default Navbar;