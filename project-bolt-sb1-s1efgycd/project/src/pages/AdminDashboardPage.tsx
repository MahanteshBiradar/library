import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import BookForm from '../components/Admin/BookForm';
import IssuedBooksTable from '../components/Admin/IssuedBooksTable';
import { useAuth } from '../context/AuthContext';
import { 
  getAllBooks, 
  addBook, 
  updateBook, 
  deleteBook,
  getAllIssuedBooks
} from '../services/bookService';
import { Book, IssuedBook } from '../types';
import { BookPlus, Library, Users, BookCheckIcon, AlertCircle, CheckCircle, BookOpenCheck, Pencil, Trash2 } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const { auth } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [activeTab, setActiveTab] = useState<'books' | 'issues'>('books');
  
  // Redirect if not logged in or not admin
  if (!auth.isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }
  
  if (!auth.isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allBooks, allIssues] = await Promise.all([
          getAllBooks(),
          getAllIssuedBooks()
        ]);
        
        setBooks(allBooks);
        setIssuedBooks(allIssues);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleAddBook = async (bookData: Omit<Book, 'id'>) => {
    try {
      const newBook = await addBook(bookData);
      setBooks([...books, newBook]);
      setIsAddingBook(false);
      setSuccess('Book added successfully!');
      
      // Clear success message after a few seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };
  
  const handleUpdateBook = async (bookData: Book) => {
    try {
      const updatedBook = await updateBook(bookData);
      setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
      setEditingBook(null);
      setSuccess('Book updated successfully!');
      
      // Clear success message after a few seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };
  
  const handleDeleteBook = async (bookId: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(bookId);
        setBooks(books.filter(book => book.id !== bookId));
        setSuccess('Book deleted successfully!');
        
        // Clear success message after a few seconds
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };
  
  const handleViewBookDetails = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setEditingBook(book);
    }
  };
  
  // Calculate statistics
  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.available).length;
  const totalIssues = issuedBooks.length;
  const activeIssues = issuedBooks.filter(issue => !issue.isReturned).length;
  const overdueIssues = issuedBooks.filter(issue => {
    if (issue.isReturned) return false;
    const dueDate = new Date(issue.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today > dueDate;
  }).length;
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage library books, user activities, and monitor system metrics.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-800">
                <Library className="h-6 w-6" />
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
                <BookCheckIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Available</p>
                <p className="text-2xl font-semibold text-gray-900">{availableBooks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-800">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Issues</p>
                <p className="text-2xl font-semibold text-gray-900">{totalIssues}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-800">
                <BookOpenCheck className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Issues</p>
                <p className="text-2xl font-semibold text-gray-900">{activeIssues}</p>
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
                <p className="text-2xl font-semibold text-gray-900">{overdueIssues}</p>
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
        
        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('books')}
              className={`${
                activeTab === 'books'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Manage Books
            </button>
            <button
              onClick={() => setActiveTab('issues')}
              className={`${
                activeTab === 'issues'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Book Issues
            </button>
          </nav>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <svg className="animate-spin h-8 w-8 text-blue-900 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'books' && (
              <div>
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Book Management</h2>
                  {!isAddingBook && !editingBook && (
                    <button
                      onClick={() => setIsAddingBook(true)}
                      className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 flex items-center"
                    >
                      <BookPlus className="w-5 h-5 mr-2" />
                      Add New Book
                    </button>
                  )}
                </div>
                
                {isAddingBook ? (
                  <BookForm 
                    onSubmit={handleAddBook}
                    onCancel={() => setIsAddingBook(false)}
                  />
                ) : editingBook ? (
                  <BookForm 
                    initialData={editingBook}
                    onSubmit={handleUpdateBook}
                    onCancel={() => setEditingBook(null)}
                  />
                ) : (
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Book
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Author
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Genre
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Stock
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {books.map((book) => (
                            <tr key={book.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    <img 
                                      className="h-10 w-10 object-cover rounded" 
                                      src={book.coverImage} 
                                      alt="" 
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                    <div className="text-sm text-gray-500">ISBN: {book.isbn}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {book.author}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {book.genre}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {book.stockQuantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  book.available 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {book.available ? 'Available' : 'Out of Stock'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-3">
                                  <button
                                    onClick={() => setEditingBook(book)}
                                    className="text-indigo-600 hover:text-indigo-900 flex items-center"
                                  >
                                    <Pencil className="w-4 h-4 mr-1" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBook(book.id)}
                                    className="text-red-600 hover:text-red-900 flex items-center"
                                  >
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'issues' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Book Issues</h2>
                </div>
                
                <IssuedBooksTable 
                  issuedBooks={issuedBooks}
                  onViewBook={handleViewBookDetails}
                />
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;