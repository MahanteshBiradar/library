import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import LoginForm from '../components/Auth/LoginForm';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

const AdminLoginPage: React.FC = () => {
  const { auth } = useAuth();
  
  // Redirect if already logged in as admin
  if (auth.isAuthenticated && auth.isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }
  
  // Redirect regular users to their dashboard
  if (auth.isAuthenticated && !auth.isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-900 text-white p-4 rounded-full">
                <ShieldAlert className="h-20 w-20" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Access</h1>
            <p className="text-gray-600 mb-6">
              This area is restricted to library administrators. Please log in with your admin credentials to access the management dashboard.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    If you are a regular user, please use the <a href="/login" className="font-medium underline text-yellow-700 hover:text-yellow-600">standard login page</a> instead.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 w-full">
            <LoginForm isAdmin={true} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLoginPage;