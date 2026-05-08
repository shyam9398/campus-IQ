import React from 'react';
import { Search } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <h1 className="hero-title fade-in-up">Find the right college faster</h1>
        <p className="hero-subtitle fade-in-up">Search, compare and decide — without the noise.</p>
        
        <div className="w-full max-w-3xl mx-auto mt-10 mb-6 fade-in-up">
          <div className="relative group flex shadow-2xl rounded-full overflow-hidden border-2 border-white/50 focus-within:border-blue-400 transition-all duration-300">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search size={24} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input 
              type="text" 
              className="w-full bg-gradient-to-r from-gray-50 to-white text-gray-900 text-lg md:text-xl pl-16 pr-6 py-5 focus:outline-none transition-all" 
              placeholder="Search by college name, course, or city..." 
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
