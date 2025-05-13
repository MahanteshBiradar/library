import React, { useState, useEffect } from 'react';
import { Book } from '../../types';
import { AlertCircle, BookPlus, Save } from 'lucide-react';
import { getAllGenres } from '../../services/bookService';

interface BookFormProps {
  initialData?: Book;
  onSubmit: (data: Omit<Book, 'id'> | Book) => Promise<void>;
  onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const defaultBookData: Omit<Book, 'id'> = {
    title: '',
    author: '',
    coverImage: '',
    genre: '',
    rating: 0,
    synopsis: '',
    publicationDate: '',
    language: '',
    isbn: '',
    available: true,
    stockQuantity: 1
  };
  
  const [formData, setFormData] = useState<Omit<Book, 'id'> | Book>(
    initialData || defaultBookData
  );
  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await getAllGenres();
        setGenres(genreList);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };
    
    fetchGenres();
  }, []);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (name === 'stockQuantity') {
      const quantity = parseInt(value, 10);
      setFormData({
        ...formData,
        stockQuantity: isNaN(quantity) ? 0 : quantity,
        available: isNaN(quantity) ? false : quantity > 0
      });
    } else if (name === 'rating') {
      const rating = parseFloat(value);
      setFormData({
        ...formData,
        [name]: isNaN(rating) ? 0 : Math.min(5, Math.max(0, rating))
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await onSubmit(formData);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? 'Edit Book' : 'Add New Book'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="author" className="block text-gray-700 font-medium mb-1">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="coverImage" className="block text-gray-700 font-medium mb-1">
              Cover Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="isbn" className="block text-gray-700 font-medium mb-1">
              ISBN <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="genre" className="block text-gray-700 font-medium mb-1">
              Genre <span className="text-red-500">*</span>
            </label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select a genre</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="language" className="block text-gray-700 font-medium mb-1">
              Language <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="publicationDate" className="block text-gray-700 font-medium mb-1">
              Publication Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="publicationDate"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="rating" className="block text-gray-700 font-medium mb-1">
              Rating (0-5) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="stockQuantity" className="block text-gray-700 font-medium mb-1">
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="stockQuantity"
              name="stockQuantity"
              min="0"
              value={formData.stockQuantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="synopsis" className="block text-gray-700 font-medium mb-1">
              Synopsis <span className="text-red-500">*</span>
            </label>
            <textarea
              id="synopsis"
              name="synopsis"
              value={formData.synopsis}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            ></textarea>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              <span className="flex items-center">
                {initialData ? (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <BookPlus className="w-5 h-5 mr-2" />
                    Add Book
                  </>
                )}
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;