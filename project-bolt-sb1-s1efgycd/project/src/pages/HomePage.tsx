import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { books } from '../data/books';
import { BookOpen, Users, Library, Star, Search, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  // Get a few featured books
  const featuredBooks = books.slice(0, 3);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Discover, Borrow, and Explore with BookBase
              </h1>
              <p className="text-blue-100 text-lg mb-6">
                Your digital library where you can explore thousands of books,
                borrow your favorites, and track your reading journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/catalog"
                  className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-md font-medium transition-colors inline-flex items-center"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Browse Books
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 bg-blue-800 hover:bg-blue-700 rounded-md font-medium transition-colors inline-flex items-center"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join Now
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-64 h-80 bg-yellow-600 rounded-lg transform -rotate-6"></div>
                <div className="absolute -top-2 -left-2 w-64 h-80 bg-blue-800 rounded-lg transform rotate-3"></div>
                <img
                  src="https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=800"
                  alt="Books Collage"
                  className="relative z-10 w-64 h-80 object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose BookBase?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our digital library offers a seamless experience from discovery to reading,
              with features designed to enhance your literary journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Extensive Collection</h3>
              <p className="text-gray-600">
                Access thousands of books across various genres, from classics to contemporary bestsellers.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mb-4">
                <Library className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Borrowing</h3>
              <p className="text-gray-600">
                Borrow books with just a click and manage your loans through your personal dashboard.
              </p>
            </div>
            
            <div className="bg-teal-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Experience</h3>
              <p className="text-gray-600">
                Bookmark your favorites, track your reading history, and get recommendations based on your interests.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Books Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Books</h2>
            <Link 
              to="/catalog" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View All 
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={book.coverImage}
                    alt={`${book.title} cover`}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(book.rating) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">({book.rating.toFixed(1)})</span>
                  </div>
                  <Link
                    to={`/book/${book.id}`}
                    className="block w-full bg-blue-900 text-white text-center py-2 rounded hover:bg-blue-800 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our community of readers and book lovers about their experience with BookBase.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold">
                  SM
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Sarah M.</h4>
                  <p className="text-gray-500 text-sm">Book Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "BookBase has transformed how I discover new books. The interface is intuitive, and I love being able to track my reading progress."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-800 font-bold">
                  JD
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">James D.</h4>
                  <p className="text-gray-500 text-sm">Literature Professor</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As an educator, I appreciate the extensive catalog and how easy it is to recommend books to my students. A valuable resource!"
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-teal-200 flex items-center justify-center text-teal-800 font-bold">
                  RL
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Rebecca L.</h4>
                  <p className="text-gray-500 text-sm">Avid Reader</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The bookmark feature helps me keep track of books I want to read next. BookBase has become an essential part of my reading routine."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Reading Journey?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-3xl mx-auto">
            Join thousands of readers who have discovered their next favorite book with BookBase.
            Sign up today and get access to our entire collection.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-md font-medium transition-colors"
            >
              Create an Account
            </Link>
            <Link
              to="/catalog"
              className="px-6 py-3 bg-blue-800 hover:bg-blue-700 rounded-md font-medium transition-colors"
            >
              Explore Books
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;