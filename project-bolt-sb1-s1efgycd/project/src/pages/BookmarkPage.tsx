import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import BookCard from '../components/Book/BookCard';
import { useAuth } from '../context/AuthContext';
import { Bookmark, Book } from '../types';
import { getBookmarksByUserId, removeBookmark } from '../services/bookService';
import { AlertCircle, BookmarkPlus } from 'lucide-react';

const BookmarkPage: React.FC = () => {
  const { auth } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Redirect if not logged in
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Redirect admin to admin dashboard
  if (auth.isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }
  
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (auth.user) {
        try {
          const userBookmarks = await getBookmarksByUserId(auth.user.id);
          setBookmarks(userBookmarks);
          setLoading(false);
        } catch (err) {
          setError('Failed to load your bookmarks. Please try again.');
          setLoading(false);
        }
      }
    };
    
    fetchBookmarks();
  }, [auth.user]);
  
  const handleRemoveBookmark = async (bookId: string) => {
    if (!auth.user) return;
    
    try {
      await removeBookmark(auth.user.id, bookId);
      setBookmarks(bookmarks.filter(bookmark => bookmark.bookId !== bookId));
    } catch (err) {
      setError((err as Error).message);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Bookmarks
          </h1>
          <p className="text-gray-600">
            Books you've saved for later. Browse your collection and find your next read.
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <div className="flex">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-12">
            <svg className="animate-spin h-8 w-8 text-blue-900 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-gray-600">Loading your bookmarks...</p>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <BookmarkPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarked books</h3>
            <p className="text-gray-600 mb-4">
              Browse our catalog and bookmark books you're interested in for easy access later.
            </p>
            <Link 
              to="/catalog" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarks.map((bookmark) => bookmark.book && (
              <BookCard 
                key={bookmark.id} 
                book={bookmark.book as Book} 
                isBookmarked={true}
                onRemoveBookmark={handleRemoveBookmark}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookmarkPage;