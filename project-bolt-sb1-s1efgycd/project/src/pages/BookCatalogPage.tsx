import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import BookCard from '../components/Book/BookCard';
import SearchBar from '../components/Book/SearchBar';
import BookDetailModal from '../components/Book/BookDetailModal';
import { Book } from '../types';
import { 
  getAllBooks, 
  searchBooks, 
  filterBooksByGenre, 
  addBookmark, 
  removeBookmark, 
  getBookmarksByUserId,
  issueBook
} from '../services/bookService';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

const BookCatalogPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [issueSuccess, setIssueSuccess] = useState('');
  const [issueError, setIssueError] = useState('');
  
  const { auth } = useAuth();
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const allBooks = await getAllBooks();
        setBooks(allBooks);
        setLoading(false);
      } catch (err) {
        setError('Failed to load books. Please try again later.');
        setLoading(false);
      }
    };
    
    const fetchBookmarks = async () => {
      if (auth.isAuthenticated && auth.user) {
        try {
          const userBookmarks = await getBookmarksByUserId(auth.user.id);
          setBookmarks(userBookmarks.map(bookmark => bookmark.bookId));
        } catch (err) {
          console.error('Error fetching bookmarks:', err);
        }
      }
    };
    
    fetchBooks();
    fetchBookmarks();
  }, [auth.isAuthenticated, auth.user]);
  
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      // If search is empty, reset to all books
      const allBooks = await getAllBooks();
      setBooks(allBooks);
      return;
    }
    
    try {
      setLoading(true);
      const results = await searchBooks(query);
      setBooks(results);
      setLoading(false);
    } catch (err) {
      setError('Search failed. Please try again.');
      setLoading(false);
    }
  };
  
  const handleGenreFilter = async (genre: string) => {
    try {
      setLoading(true);
      const results = await filterBooksByGenre(genre);
      setBooks(results);
      setLoading(false);
    } catch (err) {
      setError('Filter failed. Please try again.');
      setLoading(false);
    }
  };
  
  const handleViewBookDetails = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };
  
  const handleAddBookmark = async (bookId: string) => {
    if (!auth.isAuthenticated || !auth.user) {
      setError('You must be logged in to bookmark books');
      return;
    }
    
    try {
      await addBookmark(auth.user.id, bookId);
      setBookmarks([...bookmarks, bookId]);
    } catch (err) {
      setError((err as Error).message);
    }
  };
  
  const handleRemoveBookmark = async (bookId: string) => {
    if (!auth.isAuthenticated || !auth.user) return;
    
    try {
      await removeBookmark(auth.user.id, bookId);
      setBookmarks(bookmarks.filter(id => id !== bookId));
    } catch (err) {
      setError((err as Error).message);
    }
  };
  
  const handleIssueBook = async (bookId: string) => {
    if (!auth.isAuthenticated || !auth.user) {
      setError('You must be logged in to issue books');
      return;
    }
    
    setIssueSuccess('');
    setIssueError('');
    
    try {
      await issueBook(bookId, auth.user.id);
      setIssueSuccess('Book issued successfully! Check your dashboard for details.');
      
      // Update the books list to reflect the new availability
      const updatedBooks = books.map(book => {
        if (book.id === bookId) {
          const newQuantity = book.stockQuantity - 1;
          return {
            ...book,
            stockQuantity: newQuantity,
            available: newQuantity > 0
          };
        }
        return book;
      });
      
      setBooks(updatedBooks);
      
      // Also update the selected book if in modal
      if (selectedBook && selectedBook.id === bookId) {
        const newQuantity = selectedBook.stockQuantity - 1;
        setSelectedBook({
          ...selectedBook,
          stockQuantity: newQuantity,
          available: newQuantity > 0
        });
      }
      
      setTimeout(() => {
        setIssueSuccess('');
        handleCloseModal();
      }, 3000);
    } catch (err) {
      setIssueError((err as Error).message);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Catalog</h1>
          <p className="text-gray-600">
            Browse through our collection of books. Use the search bar to find specific titles or filter by genre.
          </p>
        </div>
        
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} onGenreFilter={handleGenreFilter} />
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <div className="flex">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}
        
        {issueSuccess && (
          <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
            <div className="flex">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{issueSuccess}</span>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-12">
            <svg className="animate-spin h-8 w-8 text-blue-900 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-gray-600">Loading books...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <div key={book.id} onClick={() => handleViewBookDetails(book)}>
                <BookCard 
                  book={book} 
                  isBookmarked={bookmarks.includes(book.id)}
                  onBookmark={handleAddBookmark}
                  onRemoveBookmark={handleRemoveBookmark}
                />
              </div>
            ))}
          </div>
        )}
        
        {selectedBook && (
          <BookDetailModal 
            book={selectedBook} 
            isOpen={isModalOpen} 
            onClose={handleCloseModal} 
            onIssue={handleIssueBook}
          />
        )}
      </div>
    </Layout>
  );
};

export default BookCatalogPage;