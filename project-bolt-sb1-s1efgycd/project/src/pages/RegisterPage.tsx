import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import RegisterForm from '../components/Auth/RegisterForm';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const { auth } = useAuth();
  
  // Redirect if already logged in
  if (auth.isAuthenticated) {
    return <Navigate to={auth.isAdmin ? '/admin/dashboard' : '/dashboard'} />;
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Your Account</h1>
            <p className="text-gray-600 mb-6">
              Join BookBase to access our library services, borrow books, and keep track of your reading journey.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">Why create an account?</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Access to our full catalog</h3>
                    <p className="text-gray-600 text-sm">Browse and search thousands of books across all genres</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Borrow books online</h3>
                    <p className="text-gray-600 text-sm">Issue books with a few clicks and manage returns from your dashboard</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Personalized bookshelf</h3>
                    <p className="text-gray-600 text-sm">Create a collection of favorites and track your reading history</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm">
                    4
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Smart reminders</h3>
                    <p className="text-gray-600 text-sm">Get notifications about due dates and available books</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:w-1/2 w-full">
            <RegisterForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;