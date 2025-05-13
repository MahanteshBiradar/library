import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  isAdmin?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isAdmin = false }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const user = await loginUser({ username, password });
      
      // Check if trying to access admin page but not an admin
      if (isAdmin && !user.isAdmin) {
        setError('You do not have admin privileges');
        setLoading(false);
        return;
      }
      
      login(user);
      
      // Redirect based on user type
      if (user.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isAdmin ? 'Admin Login' : 'Login to Your Account'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex justify-end mt-1">
            <Link to="#" className="text-sm text-blue-600 hover:text-blue-800">
              Forgot Password?
            </Link>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : (
            <span className="flex items-center">
              <LogIn className="w-5 h-5 mr-2" />
              Login
            </span>
          )}
        </button>
      </form>
      
      {!isAdmin && (
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
              Register here
            </Link>
          </p>
        </div>
      )}
      
      {/* Demo credentials info */}
      <div className="mt-6 p-3 bg-gray-100 rounded-md">
        <p className="text-sm text-gray-600 font-medium mb-1">Demo Credentials:</p>
        {isAdmin ? (
          <p className="text-sm text-gray-600">
            Username: <span className="font-medium">admin</span><br />
            Password: <span className="font-medium">password</span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Username: <span className="font-medium">johndoe</span> or <span className="font-medium">janesmith</span><br />
            Password: <span className="font-medium">password</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;