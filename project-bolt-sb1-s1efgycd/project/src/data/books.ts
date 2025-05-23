import { Book } from '../types';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Classic',
    rating: 4.5,
    synopsis: 'Set in the Jazz Age, this novel tells the story of the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.',
    publicationDate: '1925-04-10',
    language: 'English',
    isbn: '9780743273565',
    available: true,
    stockQuantity: 3
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Classic',
    rating: 4.8,
    synopsis: 'The story of young Scout Finch and her father, a lawyer who defends a Black man accused of a terrible crime in a small Alabama town.',
    publicationDate: '1960-07-11',
    language: 'English',
    isbn: '9780061120084',
    available: true,
    stockQuantity: 5
  },
  {
    id: '3',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverImage: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Fantasy',
    rating: 4.7,
    synopsis: 'The adventure of Bilbo Baggins, a hobbit who embarks on an unexpected journey with a group of dwarves to reclaim their mountain home from a dragon.',
    publicationDate: '1937-09-21',
    language: 'English',
    isbn: '9780547928227',
    available: true,
    stockQuantity: 2
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: 'https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Romance',
    rating: 4.6,
    synopsis: 'The story follows the character development of Elizabeth Bennet, who learns about the repercussions of hasty judgments.',
    publicationDate: '1813-01-28',
    language: 'English',
    isbn: '9780141439518',
    available: false,
    stockQuantity: 0
  },
  {
    id: '5',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    coverImage: 'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Science Fiction',
    rating: 4.3,
    synopsis: 'A dystopian novel imagining a future society where people are genetically bred and pharmaceutically conditioned to serve societal roles.',
    publicationDate: '1932-01-01',
    language: 'English',
    isbn: '9780060850524',
    available: true,
    stockQuantity: 4
  },
  {
    id: '6',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverImage: 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Fiction',
    rating: 4.4,
    synopsis: 'A philosophical novel about a young Andalusian shepherd named Santiago who dreams of finding a worldly treasure.',
    publicationDate: '1988-01-01',
    language: 'Portuguese',
    isbn: '9780062315007',
    available: true,
    stockQuantity: 6
  },
  {
    id: '7',
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Dystopian',
    rating: 4.7,
    synopsis: 'A dystopian social science fiction novel that examines the consequences of totalitarianism, mass surveillance, and repressive regimentation.',
    publicationDate: '1949-06-08',
    language: 'English',
    isbn: '9780451524935',
    available: true,
    stockQuantity: 3
  },
  {
    id: '8',
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    coverImage: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800',
    genre: 'Fantasy',
    rating: 4.9,
    synopsis: 'The first novel in the Harry Potter series, featuring a young wizard, Harry Potter, and his friends at Hogwarts School of Witchcraft and Wizardry.',
    publicationDate: '1997-06-26',
    language: 'English',
    isbn: '9780590353427',
    available: true,
    stockQuantity: 1
  }
];