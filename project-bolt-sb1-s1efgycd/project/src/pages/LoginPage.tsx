import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import LoginForm from '../components/Auth/LoginForm';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome Back</h1>
            <p className="text-gray-600 mb-6">
              Log in to your BookBase account to access your personalized dashboard, issue books, and manage your reading list.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">Benefits of a BookBase account:</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Issue and return books online</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Bookmark favorite books for later</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Track your reading history</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Receive notifications about due dates</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:w-1/2 w-full">
            <LoginForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;