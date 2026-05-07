import React from 'react';
import { Search } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <h1 className="hero-title fade-in-up">Find the right college faster</h1>
        <p className="hero-subtitle fade-in-up">Search, compare and decide — without the noise.</p>
        
        <div className="search-container fade-in-up">
          <div className="search-bar">
            <Search className="search-icon" size={24} />
            <input type="text" className="search-input" placeholder="Search by college name, course, or city..." />
            <button className="btn-primary search-btn">Search</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
