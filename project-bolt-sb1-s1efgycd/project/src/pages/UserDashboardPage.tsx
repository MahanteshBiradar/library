import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import IssuedBookCard from '../components/User/IssuedBookCard';
import { useAuth } from '../context/AuthContext';
import { IssuedBook } from '../types';
import { getIssuedBooksByUserId, returnBook } from '../services/bookService';
import { BookOpen, CheckCircle, AlertCircle, BookOpenCheck } from 'lucide-react';

const UserDashboardPage: React.FC = () => {
  const { auth } = useAuth();
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([]);
  const [activeBooks, setActiveBooks] = useState<IssuedBook[]>([]);
  const [returnedBooks, setReturnedBooks] = useState<IssuedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Redirect if not logged in
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Redirect admin to admin dashboard
  if (auth.isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }
  
  useEffect(() => {
    const fetchIssuedBooks = async () => {
      if (auth.user) {
        try {
          const books = await getIssuedBooksByUserId(auth.user.id);
          setIssuedBooks(books);
          
          // Split into active and returned
          setActiveBooks(books.filter(book => !book.isReturned));
          setReturnedBooks(books.filter(book => book.isReturned));
          
          setLoading(false);
        } catch (err) {
          setError('Failed to load your books. Please try again.');
          setLoading(false);
        }
      }
    };
    
    fetchIssuedBooks();
  }, [auth.user]);
  
  const handleReturnBook = async (issueId: string) => {
    setSuccess('');
    setError('');
    
    try {
      const returned = await returnBook(issueId);
      
      // Update state
      setIssuedBooks(prevBooks => 
        prevBooks.map(book => 
          book.id === issueId ? { ...book, isReturned: true, returnDate: returned.returnDate } : book
        )
      );
      
      // Update active and returned books
      setActiveBooks(prevBooks => prevBooks.filter(book => book.id !== issueId));
      setReturnedBooks(prevBooks => [
        ...prevBooks, 
        ...issuedBooks.filter(book => book.id === issueId).map(book => ({
          ...book,
          isReturned: true,
          returnDate: returned.returnDate
        }))
      ]);
      
      setSuccess('Book returned successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError((err as Error).message);
    }
  };
  
  // Calculate statistics
  const totalBooks = issuedBooks.length;
  const activeCount = activeBooks.length;
  const returnedCount = returnedBooks.length;
  const overdueCount = activeBooks.filter(book => {
    const dueDate = new Date(book.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today > dueDate;
  }).length;
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome, {auth.user?.name}
          </h1>
          <p className="text-gray-600">
            Manage your borrowed books and reading activities.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-800">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Books</p>
                <p className="text-2xl font-semibold text-gray-900">{totalBooks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-800">
                <BookOpenCheck className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Borrowings</p>
                <p className="text-2xl font-semibold text-gray-900">{activeCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-800">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Overdue</p>
                <p className="text-2xl font-semibold text-gray-900">{overdueCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-800">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Returned</p>
                <p className="text-2xl font-semibold text-gray-900">{returnedCount}</p>
              </div>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <div className="flex">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
            <div className="flex">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>{success}</span>
            </div>
          </div>
        )}
        
        {/* Current Books Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Currently Borrowed Books</h2>
          
          {loading ? (
            <div className="text-center py-10">
              <svg className="animate-spin h-8 w-8 text-blue-900 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-4 text-gray-600">Loading your books...</p>
            </div>
          ) : activeBooks.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No books currently borrowed</h3>
              <p className="text-gray-600 mb-4">Visit our catalog to discover and borrow books.</p>
              <a 
                href="/catalog" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Catalog
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {activeBooks.map((issuedBook) => (
                <IssuedBookCard 
                  key={issuedBook.id} 
                  issuedBook={issuedBook} 
                  onReturn={handleReturnBook} 
                />
              ))}
            </div>
          )}
        </div>
        
        {/* History Section */}
        {returnedBooks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reading History</h2>
            <div className="space-y-4">
              {returnedBooks.map((issuedBook) => (
                <IssuedBookCard 
                  key={issuedBook.id} 
                  issuedBook={issuedBook} 
                  onReturn={handleReturnBook} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserDashboardPage;