import React from 'react';
import { MapPin } from 'lucide-react';
import './TopCities.css';

const CITIES = [
  { name: 'Bangalore', colleges: '450+ Colleges', color: '#10b981' },
  { name: 'Delhi NCR', colleges: '520+ Colleges', color: '#3b82f6' },
  { name: 'Pune', colleges: '380+ Colleges', color: '#f59e0b' },
  { name: 'Mumbai', colleges: '300+ Colleges', color: '#ec4899' },
  { name: 'Chennai', colleges: '250+ Colleges', color: '#8b5cf6' },
  { name: 'Hyderabad', colleges: '280+ Colleges', color: '#06b6d4' }
];

const TopCities = () => {
  return (
    <section className="top-cities">
      <div className="container">
        <h2 className="section-title">Explore Top Education Hubs</h2>
        <p className="section-subtitle">Find the best colleges in your preferred city</p>

        <div className="city-grid">
          {CITIES.map(city => (
            <div key={city.name} className="city-card">
              <div className="city-icon" style={{ backgroundColor: `${city.color}15`, color: city.color }}>
                <MapPin size={24} />
              </div>
              <div className="city-details">
                <h3 className="city-name">{city.name}</h3>
                <p className="city-colleges">{city.colleges}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCities;
