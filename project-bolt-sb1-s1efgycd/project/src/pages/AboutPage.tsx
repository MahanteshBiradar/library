import React from 'react';
import Layout from '../components/Layout/Layout';
import { Mail, MapPin, Phone, Clock, Calendar, AlertOctagon, Users, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About BookBase</h1>
            <p className="text-blue-100 text-lg max-w-3xl">
              Your modern digital library platform providing access to thousands of books 
              and a seamless reading experience.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At BookBase, we believe that access to knowledge should be easy and convenient. 
                Our mission is to create a digital library experience that connects readers with the 
                books they love, while providing a modern, user-friendly platform for discovering 
                new titles.
              </p>
              <p className="text-gray-600">
                We're dedicated to promoting literacy and a love of reading in our community. 
                Through our digital platform, we aim to make the borrowing process simple and efficient, 
                allowing our users to focus on what matters most - the joy of reading.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                    <Book className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Digital Access</h3>
                  <p className="text-gray-600">
                    Providing access to thousands of books through our intuitive digital platform.
                  </p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Community Focus</h3>
                  <p className="text-gray-600">
                    Building a community of readers and promoting literacy for all.
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quality Content</h3>
                  <p className="text-gray-600">
                    Curating high-quality literature across genres for diverse readers.
                  </p>
                </div>
                <div className="bg-teal-50 p-6 rounded-lg">
                  <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                    <AlertOctagon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-gray-600">
                    Continuously improving our platform with modern technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Library Hours Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Library Hours & Information</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              While BookBase provides digital access to our collection, our physical library
              locations are also available for those who prefer the traditional library experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-blue-900 mr-3" />
                <h3 className="text-xl font-semibold">Operating Hours</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">12:00 PM - 5:00 PM</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  * Holiday hours may vary. Please check our announcements for special schedules.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-blue-900 mr-3" />
                <h3 className="text-xl font-semibold">Borrowing Policies</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-700 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Standard loan period: 14 days</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-700 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Maximum of 5 books at once</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-700 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Renewals: up to 2 times if no holds</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-700 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Late fees: $0.25 per day per book</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-900 mr-3" />
                <h3 className="text-xl font-semibold">Contact & Location</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-900 mr-2 mt-0.5" />
                  <span className="text-gray-600">123 Library St, Book City, BC 12345</span>
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-900 mr-2 mt-0.5" />
                  <span className="text-gray-600">(123) 456-7890</span>
                </li>
                <li className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-900 mr-2 mt-0.5" />
                  <span className="text-gray-600">info@bookbase.com</span>
                </li>
              </ul>
              <div className="mt-4">
                <a 
                  href="#" 
                  className="text-blue-900 hover:text-blue-700 font-medium flex items-center"
                >
                  <span>View on map</span>
                  <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions or feedback about our services? We'd love to hear from you!
                Please fill out the form and we'll get back to you as soon as possible.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">More Ways to Connect</h3>
                <p className="text-gray-600 mb-4">
                  Looking for specific departments? You can reach out directly:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Mail className="w-5 h-5 text-blue-900 mr-2 mt-0.5" />
                    <div>
                      <span className="block font-medium text-gray-900">Membership Services</span>
                      <span className="text-gray-600">membership@bookbase.com</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Mail className="w-5 h-5 text-blue-900 mr-2 mt-0.5" />
                    <div>
                      <span className="block font-medium text-gray-900">Technical Support</span>
                      <span className="text-gray-600">support@bookbase.com</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Mail className="w-5 h-5 text-blue-900 mr-2 mt-0.5" />
                    <div>
                      <span className="block font-medium text-gray-900">Book Recommendations</span>
                      <span className="text-gray-600">recommendations@bookbase.com</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <form className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Custom Book icon component
const Book: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      stroke="currentColor"
    >
      <path 
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AboutPage;