/*
  # Add Books and Bookmarks Tables

  1. New Tables
    - `books` - Stores book information including downloadable content
    - `bookmarks` - Stores user bookmarks for books

  2. Security
    - RLS enabled on both tables
    - Policies for user access control
*/

-- Create books table first
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  cover_image text,
  genre text NOT NULL,
  rating numeric(3,1) DEFAULT 0,
  synopsis text,
  publication_date date,
  language text NOT NULL,
  isbn text UNIQUE NOT NULL,
  available boolean DEFAULT true,
  stock_quantity integer DEFAULT 0,
  download_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on books
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Create policies for books
CREATE POLICY "Books are viewable by everyone"
  ON books FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify books"
  ON books FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id uuid REFERENCES books(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, book_id)
);

-- Enable RLS on bookmarks
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Create policies for bookmarks
CREATE POLICY "Users can manage their own bookmarks"
  ON bookmarks FOR ALL
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_books_title ON books USING gin(to_tsvector('english', title));
CREATE INDEX idx_books_author ON books USING gin(to_tsvector('english', author));
CREATE INDEX idx_books_genre ON books(genre);
CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);

-- Insert sample books with download URLs
INSERT INTO books (title, author, cover_image, genre, rating, synopsis, publication_date, language, isbn, available, stock_quantity, download_url) VALUES
(
  'The Great Gatsby',
  'F. Scott Fitzgerald',
  'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=800',
  'Classic',
  4.5,
  'A story of decadence and excess, Gatsby explores the American Dream through the eyes of Nick Carraway.',
  '1925-04-10',
  'English',
  '9780743273565',
  true,
  5,
  'https://www.gutenberg.org/files/64317/64317-h/64317-h.htm'
),
(
  '1984',
  'George Orwell',
  'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Science Fiction',
  4.7,
  'A dystopian social science fiction novel that examines the consequences of totalitarianism.',
  '1949-06-08',
  'English',
  '9780451524935',
  true,
  3,
  'https://www.gutenberg.org/ebooks/67424'
),
(
  'Pride and Prejudice',
  'Jane Austen',
  'https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Romance',
  4.6,
  'A romantic novel following the emotional development of Elizabeth Bennet.',
  '1813-01-28',
  'English',
  '9780141439518',
  true,
  4,
  'https://www.gutenberg.org/files/1342/1342-h/1342-h.htm'
),
(
  'The Art of War',
  'Sun Tzu',
  'https://images.pexels.com/photos/2873479/pexels-photo-2873479.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Philosophy',
  4.8,
  'An ancient Chinese military treatise dating from the 5th century BC.',
  '2000-01-01',
  'English',
  '9781590302255',
  true,
  6,
  'https://www.gutenberg.org/files/132/132-h/132-h.htm'
),
(
  'Frankenstein',
  'Mary Shelley',
  'https://images.pexels.com/photos/1752806/pexels-photo-1752806.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Gothic Fiction',
  4.4,
  'A Gothic novel about a young scientist who creates a sapient creature in an unorthodox experiment.',
  '1818-01-01',
  'English',
  '9780486282114',
  true,
  2,
  'https://www.gutenberg.org/files/84/84-h/84-h.htm'
),
(
  'The Picture of Dorian Gray',
  'Oscar Wilde',
  'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Gothic Fiction',
  4.3,
  'A philosophical novel about a man who sells his soul for eternal youth and beauty.',
  '1890-07-01',
  'English',
  '9780486278070',
  true,
  4,
  'https://www.gutenberg.org/files/174/174-h/174-h.htm'
),
(
  'Little Women',
  'Louisa May Alcott',
  'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Coming-of-age',
  4.5,
  'The story follows the lives of the four March sisters.',
  '1868-01-01',
  'English',
  '9780140390698',
  true,
  3,
  'https://www.gutenberg.org/files/514/514-h/514-h.htm'
),
(
  'The Adventures of Sherlock Holmes',
  'Arthur Conan Doyle',
  'https://images.pexels.com/photos/1438248/pexels-photo-1438248.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Mystery',
  4.6,
  'A collection of twelve short stories featuring the famous detective.',
  '1892-10-14',
  'English',
  '9780486474915',
  true,
  5,
  'https://www.gutenberg.org/files/1661/1661-h/1661-h.htm'
),
(
  'Dracula',
  'Bram Stoker',
  'https://images.pexels.com/photos/1270184/pexels-photo-1270184.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Gothic Horror',
  4.4,
  'The classic vampire novel that defined the genre.',
  '1897-05-26',
  'English',
  '9780486411095',
  true,
  3,
  'https://www.gutenberg.org/files/345/345-h/345-h.htm'
),
(
  'The Jungle Book',
  'Rudyard Kipling',
  'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Children''s Literature',
  4.3,
  'A collection of stories about the adventures of Mowgli.',
  '1894-01-01',
  'English',
  '9780486278605',
  true,
  4,
  'https://www.gutenberg.org/files/236/236-h/236-h.htm'
)