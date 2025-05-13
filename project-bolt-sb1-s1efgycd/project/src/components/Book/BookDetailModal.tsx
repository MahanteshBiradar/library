import React from 'react';
import { Book } from '../../types';
import { Star, X, Calendar, BookCopy, Globe, Hash } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface BookDetailModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onIssue: (bookId: string) => void;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({ 
  book, 
  isOpen, 
  onClose,
  onIssue
}) => {
  const { auth } = useAuth();
  
  if (!isOpen) return null;
  
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-5 h-5">
            <Star className="absolute w-5 h-5 text-yellow-400" />
            <div className="absolute w-2.5 h-5 overflow-hidden">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-yellow-400" />);
      }
    }
    
    return (
      <div className="flex items-center mt-1">
        {stars}
        <span className="ml-2 text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };
  
  const handleIssue = () => {
    onIssue(book.id);
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 p-6 bg-gray-50 flex justify-center items-start">
              <div className="w-full max-w-xs">
                <img 
                  src={book.coverImage} 
                  alt={`${book.title} cover`} 
                  className="w-full h-auto object-cover rounded shadow-lg"
                />
                <div className="mt-4">
                  {renderRating(book.rating)}
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{book.title}</h2>
              <h3 className="text-lg text-gray-600 mb-4">by {book.author}</h3>
              
              <div className="mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  book.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {book.available ? `Available (${book.stockQuantity} in stock)` : 'Out of Stock'}
                </span>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Synopsis</h4>
                <p className="text-gray-700 leading-relaxed">{book.synopsis}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Publication Date</p>
                    <p className="font-medium">{book.publicationDate}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Language</p>
                    <p className="font-medium">{book.language}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BookCopy className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Genre</p>
                    <p className="font-medium">{book.genre}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Hash className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">ISBN</p>
                    <p className="font-medium">{book.isbn}</p>
                  </div>
                </div>
              </div>
              
              {auth.isAuthenticated && !auth.isAdmin && (
                <div className="mt-6">
                  <button
                    onClick={handleIssue}
                    disabled={!book.available}
                    className={`w-full md:w-auto px-4 py-2 rounded-md text-white font-medium ${
                      book.available 
                        ? 'bg-blue-900 hover:bg-blue-800' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {book.available ? 'Issue This Book' : 'Currently Unavailable'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;