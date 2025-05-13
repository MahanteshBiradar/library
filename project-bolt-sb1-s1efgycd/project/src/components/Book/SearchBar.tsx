import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { getAllGenres } from '../../services/bookService';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onGenreFilter: (genre: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onGenreFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [genres, setGenres] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await getAllGenres();
        setGenres(genreList);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    
    fetchGenres();
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    onGenreFilter(genre);
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, or genre..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        
        <div className="w-full md:w-48">
          <select
            value={selectedGenre}
            onChange={handleGenreChange}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="All">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;