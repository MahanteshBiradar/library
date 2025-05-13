import { User, IssuedBook, Bookmark } from '../types';
import { books } from './books';

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    isAdmin: false
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    username: 'janesmith',
    isAdmin: false
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@bookbase.com',
    username: 'admin',
    isAdmin: true
  }
];

// Generate a date that is days from now
const getDateFromNow = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

export const issuedBooks: IssuedBook[] = [
  {
    id: '1',
    bookId: '1',
    userId: '1',
    issueDate: getDateFromNow(-10),
    dueDate: getDateFromNow(4),
    returnDate: null,
    isReturned: false,
    book: books.find(book => book.id === '1')
  },
  {
    id: '2',
    bookId: '3',
    userId: '1',
    issueDate: getDateFromNow(-20),
    dueDate: getDateFromNow(-6),
    returnDate: null,
    isReturned: false,
    book: books.find(book => book.id === '3')
  },
  {
    id: '3',
    bookId: '5',
    userId: '2',
    issueDate: getDateFromNow(-5),
    dueDate: getDateFromNow(9),
    returnDate: null,
    isReturned: false,
    book: books.find(book => book.id === '5')
  }
];

export const bookmarks: Bookmark[] = [
  {
    id: '1',
    userId: '1',
    bookId: '2',
    createdAt: new Date().toISOString(),
    book: books.find(book => book.id === '2')
  },
  {
    id: '2',
    userId: '1',
    bookId: '7',
    createdAt: new Date().toISOString(),
    book: books.find(book => book.id === '7')
  },
  {
    id: '3',
    userId: '2',
    bookId: '6',
    createdAt: new Date().toISOString(),
    book: books.find(book => book.id === '6')
  }
];