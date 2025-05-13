import React from 'react';
import { IssuedBook } from '../../types';
import { ClockIcon, CheckCircle, AlertCircle, Search } from 'lucide-react';

interface IssuedBooksTableProps {
  issuedBooks: IssuedBook[];
  onViewBook: (bookId: string) => void;
}

const IssuedBooksTable: React.FC<IssuedBooksTableProps> = ({ issuedBooks, onViewBook }) => {
  // Get today's date for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check if a book is overdue
  const isOverdue = (dueDate: string, isReturned: boolean) => {
    if (isReturned) return false;
    
    const dueDateObj = new Date(dueDate);
    return today > dueDateObj;
  };
  
  // Get status color
  const getStatusColor = (dueDate: string, isReturned: boolean) => {
    if (isReturned) return 'bg-green-100 text-green-800';
    return isOverdue(dueDate, isReturned) 
      ? 'bg-red-100 text-red-800' 
      : 'bg-blue-100 text-blue-800';
  };
  
  // Get status text
  const getStatusText = (dueDate: string, isReturned: boolean, returnDate: string | null) => {
    if (isReturned) return `Returned on ${returnDate}`;
    return isOverdue(dueDate, isReturned) 
      ? 'Overdue' 
      : 'Active';
  };
  
  // Get status icon
  const getStatusIcon = (dueDate: string, isReturned: boolean) => {
    if (isReturned) return <CheckCircle className="w-4 h-4" />;
    return isOverdue(dueDate, isReturned) 
      ? <AlertCircle className="w-4 h-4" />
      : <ClockIcon className="w-4 h-4" />;
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Book
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
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
            {issuedBooks.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  No books have been issued yet.
                </td>
              </tr>
            ) : (
              issuedBooks.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img 
                          className="h-10 w-10 object-cover rounded" 
                          src={issue.book?.coverImage} 
                          alt="" 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{issue.book?.title}</div>
                        <div className="text-sm text-gray-500">{issue.book?.author}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">User ID: {issue.userId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {issue.issueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {issue.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(issue.dueDate, issue.isReturned)}`}>
                      <span className="flex items-center">
                        {getStatusIcon(issue.dueDate, issue.isReturned)}
                        <span className="ml-1">{getStatusText(issue.dueDate, issue.isReturned, issue.returnDate)}</span>
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onViewBook(issue.bookId)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <Search className="w-4 h-4 mr-1" />
                      View Book
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuedBooksTable;