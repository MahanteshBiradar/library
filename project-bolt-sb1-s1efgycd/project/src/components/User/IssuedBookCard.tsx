import React from 'react';
import { IssuedBook } from '../../types';
import { Calendar, ArrowUpRight, AlertCircle, Check } from 'lucide-react';

interface IssuedBookCardProps {
  issuedBook: IssuedBook;
  onReturn: (issueId: string) => void;
}

const IssuedBookCard: React.FC<IssuedBookCardProps> = ({ issuedBook, onReturn }) => {
  // Check if the book is overdue
  const isOverdue = () => {
    if (issuedBook.isReturned) return false;
    
    const dueDate = new Date(issuedBook.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison
    
    return today > dueDate;
  };
  
  const getDaysRemaining = () => {
    const dueDate = new Date(issuedBook.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison
    
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const daysRemaining = getDaysRemaining();
  const overdue = isOverdue();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
      {/* Book cover image */}
      <div className="md:w-1/4 h-40 md:h-auto">
        <img 
          src={issuedBook.book?.coverImage} 
          alt={`${issuedBook.book?.title} cover`} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Book details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg mb-1">{issuedBook.book?.title}</h3>
          <p className="text-gray-600 text-sm mb-3">by {issuedBook.book?.author}</p>
          
          <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-gray-600">Issued: {issuedBook.issueDate}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-gray-600">Due: {issuedBook.dueDate}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap items-center justify-between">
          {issuedBook.isReturned ? (
            <div className="flex items-center text-green-600">
              <Check className="h-5 w-5 mr-1" />
              <span>Returned on {issuedBook.returnDate}</span>
            </div>
          ) : (
            <>
              <div>
                {overdue ? (
                  <div className="flex items-center text-red-600">
                    <AlertCircle className="h-5 w-5 mr-1" />
                    <span>Overdue by {Math.abs(daysRemaining)} days</span>
                  </div>
                ) : (
                  <div className="flex items-center text-blue-600">
                    <Calendar className="h-5 w-5 mr-1" />
                    <span>{daysRemaining} days remaining</span>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => onReturn(issuedBook.id)}
                className="mt-2 sm:mt-0 px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded flex items-center text-sm transition-colors"
              >
                Return Book
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssuedBookCard;