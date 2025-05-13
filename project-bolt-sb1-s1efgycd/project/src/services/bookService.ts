import { Book, IssuedBook, Bookmark } from '../types';
import { books as initialBooks } from '../data/books';
import { issuedBooks as initialIssuedBooks, bookmarks as initialBookmarks } from '../data/users';

// Simulate database tables
let books = [...initialBooks];
let issuedBooks = [...initialIssuedBooks];
let bookmarks = [...initialBookmarks];

// Get all books
export const getAllBooks = (): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books);
    }, 500); // Simulate network delay
  });
};

// Get book by ID
export const getBookById = (id: string): Promise<Book | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const book = books.find(book => book.id === id);
      resolve(book);
    }, 300);
  });
};

// Search books
export const searchBooks = (query: string): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = books.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) || 
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.genre.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
};

// Filter books by genre
export const filterBooksByGenre = (genre: string): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = genre === 'All' 
        ? books 
        : books.filter(book => book.genre === genre);
      resolve(results);
    }, 300);
  });
};

// Add new book (admin only)
export const addBook = (book: Omit<Book, 'id'>): Promise<Book> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBook: Book = {
        ...book,
        id: (books.length + 1).toString()
      };
      books = [...books, newBook];
      resolve(newBook);
    }, 500);
  });
};

// Update book (admin only)
export const updateBook = (book: Book): Promise<Book> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      books = books.map(b => b.id === book.id ? book : b);
      resolve(book);
    }, 500);
  });
};

// Delete book (admin only)
export const deleteBook = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      books = books.filter(book => book.id !== id);
      resolve();
    }, 500);
  });
};

// Get issued books by user ID
export const getIssuedBooksByUserId = (userId: string): Promise<IssuedBook[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userIssuedBooks = issuedBooks
        .filter(issued => issued.userId === userId)
        .map(issued => {
          const book = books.find(b => b.id === issued.bookId);
          return { ...issued, book };
        });
      resolve(userIssuedBooks);
    }, 300);
  });
};

// Issue a book to a user
export const issueBook = (bookId: string, userId: string): Promise<IssuedBook> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if book exists and is available
      const book = books.find(b => b.id === bookId);
      if (!book) {
        reject(new Error('Book not found'));
        return;
      }
      
      if (!book.available || book.stockQuantity <= 0) {
        reject(new Error('Book not available'));
        return;
      }
      
      // Check if user already has this book issued
      const alreadyIssued = issuedBooks.some(
        issued => issued.bookId === bookId && issued.userId === userId && !issued.isReturned
      );
      
      if (alreadyIssued) {
        reject(new Error('You already have this book issued'));
        return;
      }
      
      // Create issue record with due date (14 days from now)
      const issueDate = new Date();
      const dueDate = new Date(issueDate);
      dueDate.setDate(dueDate.getDate() + 14);
      
      const newIssue: IssuedBook = {
        id: (issuedBooks.length + 1).toString(),
        bookId,
        userId,
        issueDate: issueDate.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        returnDate: null,
        isReturned: false,
        book
      };
      
      // Update book's availability/stock
      books = books.map(b => {
        if (b.id === bookId) {
          const newStockQuantity = b.stockQuantity - 1;
          return {
            ...b,
            stockQuantity: newStockQuantity,
            available: newStockQuantity > 0
          };
        }
        return b;
      });
      
      // Add to issued books
      issuedBooks = [...issuedBooks, newIssue];
      resolve(newIssue);
    }, 500);
  });
};

// Return a book
export const returnBook = (issueId: string): Promise<IssuedBook> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Find the issue record
      const issueIndex = issuedBooks.findIndex(issue => issue.id === issueId);
      if (issueIndex === -1) {
        reject(new Error('Issue record not found'));
        return;
      }
      
      const issue = issuedBooks[issueIndex];
      if (issue.isReturned) {
        reject(new Error('Book already returned'));
        return;
      }
      
      // Update the issue record
      const returnDate = new Date();
      const updatedIssue: IssuedBook = {
        ...issue,
        returnDate: returnDate.toISOString().split('T')[0],
        isReturned: true
      };
      
      // Update the issue in the array
      issuedBooks = [
        ...issuedBooks.slice(0, issueIndex),
        updatedIssue,
        ...issuedBooks.slice(issueIndex + 1)
      ];
      
      // Update book's availability/stock
      books = books.map(b => {
        if (b.id === updatedIssue.bookId) {
          const newStockQuantity = b.stockQuantity + 1;
          return {
            ...b,
            stockQuantity: newStockQuantity,
            available: true
          };
        }
        return b;
      });
      
      resolve(updatedIssue);
    }, 500);
  });
};

// Get bookmarks by user ID
export const getBookmarksByUserId = (userId: string): Promise<Bookmark[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userBookmarks = bookmarks
        .filter(bookmark => bookmark.userId === userId)
        .map(bookmark => {
          const book = books.find(b => b.id === bookmark.bookId);
          return { ...bookmark, book };
        });
      resolve(userBookmarks);
    }, 300);
  });
};

// Add bookmark
export const addBookmark = (userId: string, bookId: string): Promise<Bookmark> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if book exists
      const book = books.find(b => b.id === bookId);
      if (!book) {
        reject(new Error('Book not found'));
        return;
      }
      
      // Check if already bookmarked
      const alreadyBookmarked = bookmarks.some(
        bookmark => bookmark.bookId === bookId && bookmark.userId === userId
      );
      
      if (alreadyBookmarked) {
        reject(new Error('Book already bookmarked'));
        return;
      }
      
      // Create bookmark
      const newBookmark: Bookmark = {
        id: (bookmarks.length + 1).toString(),
        userId,
        bookId,
        createdAt: new Date().toISOString(),
        book
      };
      
      // Add to bookmarks
      bookmarks = [...bookmarks, newBookmark];
      resolve(newBookmark);
    }, 300);
  });
};

// Remove bookmark
export const removeBookmark = (userId: string, bookId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      bookmarks = bookmarks.filter(
        bookmark => !(bookmark.userId === userId && bookmark.bookId === bookId)
      );
      resolve();
    }, 300);
  });
};

// Get all genres
export const getAllGenres = (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const genres = [...new Set(books.map(book => book.genre))];
      resolve(genres);
    }, 300);
  });
};

// Admin: Get all issued books
export const getAllIssuedBooks = (): Promise<IssuedBook[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allIssuedBooks = issuedBooks.map(issued => {
        const book = books.find(b => b.id === issued.bookId);
        return { ...issued, book };
      });
      resolve(allIssuedBooks);
    }, 500);
  });
};