import React from 'react';
import { Link } from 'react-router-dom';
import { Library, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and about section */}
          <div>
            <div className="flex items-center mb-4">
              <Library className="h-8 w-8 text-yellow-400 mr-2" />
              <span className="font-bold text-xl">BookBase</span>
            </div>
            <p className="text-blue-100 mb-4">
              Your go-to place for books. Browse our extensive catalog, borrow books,
              and discover new favorites.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-100 hover:text-yellow-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-yellow-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-yellow-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-yellow-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/catalog" className="text-blue-100 hover:text-yellow-400 transition-colors">Book Catalog</Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-100 hover:text-yellow-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/login" className="text-blue-100 hover:text-yellow-400 transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-blue-100 hover:text-yellow-400 transition-colors">Register</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="text-blue-100">123 Library St, Book City, BC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="text-blue-100">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-yellow-400 mr-2" />
                <a href="mailto:info@bookbase.com" className="text-blue-100 hover:text-yellow-400 transition-colors">
                  info@bookbase.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} BookBase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;