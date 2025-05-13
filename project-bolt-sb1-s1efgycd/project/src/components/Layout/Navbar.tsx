import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Library, BookOpen, Menu, X, LogIn, LogOut, User, Bookmark } from 'lucide-react';

const Navbar: React.FC = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Library className="h-8 w-8 mr-2 text-yellow-400" />
              <span className="font-bold text-xl">BookBase</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-blue-800 transition-colors">
              Home
            </Link>
            <Link to="/catalog" className="px-3 py-2 rounded-md hover:bg-blue-800 transition-colors">
              Book Catalog
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md hover:bg-blue-800 transition-colors">
              About
            </Link>
            
            {auth.isAuthenticated ? (
              <>
                {auth.isAdmin ? (
                  <Link 
                    to="/admin/dashboard" 
                    className="px-3 py-2 rounded-md bg-blue-700 hover:bg-blue-600 transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="px-3 py-2 rounded-md hover:bg-blue-800 transition-colors"
                    >
                      My Dashboard
                    </Link>
                    <Link 
                      to="/bookmarks" 
                      className="px-3 py-2 rounded-md hover:bg-blue-800 transition-colors flex items-center"
                    >
                      <Bookmark className="h-4 w-4 mr-1" /> Bookmarks
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md hover:bg-blue-800 transition-colors flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-3 py-2 rounded-md hover:bg-blue-800 transition-colors flex items-center"
                >
                  <LogIn className="h-4 w-4 mr-1" /> Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-3 py-2 rounded-md bg-yellow-600 hover:bg-yellow-500 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-800">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/catalog" 
              className="block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Catalog
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            {auth.isAuthenticated ? (
              <>
                {auth.isAdmin ? (
                  <Link 
                    to="/admin/dashboard" 
                    className="block px-3 py-2 rounded-md bg-blue-700 hover:bg-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Dashboard
                    </Link>
                    <Link 
                      to="/bookmarks" 
                      className="block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Bookmark className="h-4 w-4 mr-1" /> Bookmarks
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4 mr-1" /> Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md bg-yellow-600 hover:bg-yellow-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;