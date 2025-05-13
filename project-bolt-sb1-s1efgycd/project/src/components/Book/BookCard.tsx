import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../types';
import { Star, BookOpen, Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface BookCardProps {
  book: Book;
  isBookmarked?: boolean;
  onBookmark?: (bookId: string) => void;
  onRemoveBookmark?: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  isBookmarked = false,
  onBookmark,
  onRemoveBookmark
}) => {
  const { auth } = useAuth();
  
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <Star className="absolute w-4 h-4 text-yellow-400" />
            <div className="absolute w-2 h-4 overflow-hidden">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />);
      }
    }
    
    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };
  
  const handleBookmarkToggle = () => {
    if (isBookmarked && onRemoveBookmark) {
      onRemoveBookmark(book.id);
    } else if (!isBookmarked && onBookmark) {
      onBookmark(book.id);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      <div className="relative h-48 bg-gray-200">
        <img 
          src={book.coverImage} 
          alt={`${book.title} cover`} 
          className="w-full h-full object-cover"
        />
        {auth.isAuthenticated && (
          <button
            onClick={handleBookmarkToggle}
            className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
            title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-teal-600" />
            ) : (
              <Bookmark className="w-5 h-5 text-gray-600" />
            )}
          </button>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-2">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-900/80">
            {book.genre}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
        
        <div className="mb-3">
          {renderRating(book.rating)}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              book.available 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {book.available ? 'Available' : 'Out of Stock'}
            </span>
          </div>
          
          <Link 
            to={`/book/${book.id}`}
            className="text-blue-600 hover:text-blue-800 transition-colors flex items-center text-sm font-medium"
          >
            <BookOpen className="w-4 h-4 mr-1" />
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;