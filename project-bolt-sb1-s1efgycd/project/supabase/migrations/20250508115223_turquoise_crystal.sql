/*
  # Library Management System Database Schema

  1. Tables Created
    - `books` - Stores book information
    - `authors` - Stores author details
    - `book_authors` - Junction table for books and authors (many-to-many)
    - `members` - Stores library member information
    - `librarians` - Stores library staff information
    - `loans` - Tracks book borrowing
    - `reservations` - Manages book reservations
    - `categories` - Book categories/genres
    - `book_categories` - Junction table for books and categories
    - `activity_log` - Audit logging for system activities

  2. Features
    - Comprehensive indexing for performance
    - Foreign key constraints for referential integrity
    - Triggers for automated operations
    - Status enums for standardized state management
    - Audit logging capabilities

  3. Security
    - RLS enabled on all tables
    - Basic policies for data access
*/

-- Create custom types for status fields
CREATE TYPE member_status AS ENUM ('active', 'suspended', 'expired');
CREATE TYPE loan_status AS ENUM ('active', 'returned', 'overdue');
CREATE TYPE reservation_status AS ENUM ('pending', 'fulfilled', 'cancelled');
CREATE TYPE librarian_role AS ENUM ('admin', 'librarian', 'assistant');

-- Books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  isbn varchar(13) UNIQUE NOT NULL,
  publisher text,
  publication_date date,
  synopsis text,
  available_copies integer NOT NULL DEFAULT 0,
  total_copies integer NOT NULL DEFAULT 0,
  cover_image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_books_title ON books USING gin (to_tsvector('english', title));
CREATE INDEX idx_books_isbn ON books (isbn);

-- Authors table
CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  birthdate date,
  bio text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_authors_name ON authors (last_name, first_name);

-- Book-Authors junction table
CREATE TABLE IF NOT EXISTS book_authors (
  book_id uuid REFERENCES books(id) ON DELETE CASCADE,
  author_id uuid REFERENCES authors(id) ON DELETE CASCADE,
  PRIMARY KEY (book_id, author_id),
  created_at timestamptz DEFAULT now()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Book-Categories junction table
CREATE TABLE IF NOT EXISTS book_categories (
  book_id uuid REFERENCES books(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (book_id, category_id),
  created_at timestamptz DEFAULT now()
);

-- Members table
CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone varchar(20),
  address text,
  membership_date date NOT NULL DEFAULT CURRENT_DATE,
  status member_status NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_members_email ON members (email);
CREATE INDEX idx_members_status ON members (status);

-- Librarians table
CREATE TABLE IF NOT EXISTS librarians (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role librarian_role NOT NULL DEFAULT 'librarian',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Loans table
CREATE TABLE IF NOT EXISTS loans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES books(id) ON DELETE RESTRICT,
  member_id uuid REFERENCES members(id) ON DELETE RESTRICT,
  loan_date timestamptz NOT NULL DEFAULT now(),
  due_date timestamptz NOT NULL,
  return_date timestamptz,
  status loan_status NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_loans_member ON loans (member_id);
CREATE INDEX idx_loans_status ON loans (status);
CREATE INDEX idx_loans_due_date ON loans (due_date) WHERE status = 'active';

-- Reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES books(id) ON DELETE CASCADE,
  member_id uuid REFERENCES members(id) ON DELETE CASCADE,
  reservation_date timestamptz NOT NULL DEFAULT now(),
  status reservation_status NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_reservations_status ON reservations (status);
CREATE INDEX idx_reservations_member ON reservations (member_id);

-- Activity log table
CREATE TABLE IF NOT EXISTS activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type text NOT NULL,
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_activity_log_action ON activity_log (action_type);
CREATE INDEX idx_activity_log_user ON activity_log (user_id);

-- Enable Row Level Security
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE librarians ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public books are viewable by everyone" ON books
  FOR SELECT USING (true);

CREATE POLICY "Librarians can manage books" ON books
  FOR ALL USING (
    auth.uid() IN (SELECT auth_id FROM librarians)
  );

CREATE POLICY "Members can view their own data" ON members
  FOR SELECT USING (auth.uid() = auth_id);

CREATE POLICY "Librarians can view all member data" ON members
  FOR SELECT USING (
    auth.uid() IN (SELECT auth_id FROM librarians)
  );

CREATE POLICY "Members can view their own loans" ON loans
  FOR SELECT USING (
    auth.uid() IN (SELECT auth_id FROM members WHERE id = member_id)
  );

CREATE POLICY "Librarians can manage loans" ON loans
  FOR ALL USING (
    auth.uid() IN (SELECT auth_id FROM librarians)
  );

-- Create functions and triggers
CREATE OR REPLACE FUNCTION update_book_availability()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Decrease available copies when book is loaned
    IF NEW.status = 'active' THEN
      UPDATE books 
      SET available_copies = available_copies - 1
      WHERE id = NEW.book_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Increase available copies when book is returned
    IF OLD.status = 'active' AND NEW.status = 'returned' THEN
      UPDATE books 
      SET available_copies = available_copies + 1
      WHERE id = NEW.book_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_book_availability
AFTER INSERT OR UPDATE ON loans
FOR EACH ROW
EXECUTE FUNCTION update_book_availability();

-- Function to check and update overdue loans
CREATE OR REPLACE FUNCTION update_overdue_loans()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE loans
  SET status = 'overdue'
  WHERE status = 'active'
    AND due_date < CURRENT_TIMESTAMP;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_overdue_loans
AFTER INSERT OR UPDATE ON loans
FOR EACH STATEMENT
EXECUTE FUNCTION update_overdue_loans();

-- Function to log activities
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO activity_log (action_type, table_name, record_id, user_id, details)
  VALUES (
    TG_OP,
    TG_TABLE_NAME,
    CASE 
      WHEN TG_OP = 'DELETE' THEN OLD.id
      ELSE NEW.id
    END,
    auth.uid(),
    jsonb_build_object(
      'old_data', to_jsonb(OLD),
      'new_data', to_jsonb(NEW)
    )
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create activity logging triggers for main tables
CREATE TRIGGER trg_log_books_activity
AFTER INSERT OR UPDATE OR DELETE ON books
FOR EACH ROW EXECUTE FUNCTION log_activity();

CREATE TRIGGER trg_log_loans_activity
AFTER INSERT OR UPDATE OR DELETE ON loans
FOR EACH ROW EXECUTE FUNCTION log_activity();

CREATE TRIGGER trg_log_members_activity
AFTER INSERT OR UPDATE OR DELETE ON members
FOR EACH ROW EXECUTE FUNCTION log_activity();

-- Insert sample data
INSERT INTO categories (name, description) VALUES
  ('Fiction', 'Fictional literature and novels'),
  ('Non-Fiction', 'Educational and factual books'),
  ('Science Fiction', 'Science fiction and fantasy novels'),
  ('Mystery', 'Mystery and detective novels'),
  ('Biography', 'Biographical works');

INSERT INTO authors (first_name, last_name, birthdate, bio) VALUES
  ('Jane', 'Austen', '1775-12-16', 'English novelist known for romantic fiction'),
  ('George', 'Orwell', '1903-06-25', 'English novelist and essayist'),
  ('Isaac', 'Asimov', '1920-01-02', 'American writer and professor of biochemistry');

-- Note: Additional sample data for books, members, and loans would be added here
-- but is omitted to keep the migration file focused on structure