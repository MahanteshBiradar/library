// Type definitions for BookBase application

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  isAdmin: boolean;
}

// Book types
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  genre: string;
  rating: number;
  synopsis: string;
  publicationDate: string;
  language: string;
  isbn: string;
  available: boolean;
  stockQuantity: number;
}

// Issued Book types
export interface IssuedBook {
  id: string;
  bookId: string;
  userId: string;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
  isReturned: boolean;
  book?: Book;
}

// Bookmark types
export interface Bookmark {
  id: string;
  userId: string;
  bookId: string;
  createdAt: string;
  book?: Book;
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Form types
export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}