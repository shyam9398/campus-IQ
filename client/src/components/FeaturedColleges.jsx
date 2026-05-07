import React from 'react';
import { Star, Award } from 'lucide-react';
import './FeaturedColleges.css';

const FEATURED = [
  {
    name: "SRM Institute of Science and Technology",
    location: "Chennai, Tamil Nadu",
    rating: 4.5,
    tag: "Premium Institution",
    imgColor: "#e0f2fe"
  },
  {
    name: "VIT University",
    location: "Vellore, Tamil Nadu",
    rating: 4.6,
    tag: "High Placement",
    imgColor: "#dcfce7"
  },
  {
    name: "Manipal Academy of Higher Education",
    location: "Manipal, Karnataka",
    rating: 4.4,
    tag: "Global Alumni",
    imgColor: "#f3e8ff"
  }
];

const FeaturedColleges = () => {
  return (
    <section className="featured-colleges">
      <div className="container">
        <div className="fc-header">
          <div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Featured Institutions</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: 0 }}>Discover premium partner colleges</p>
          </div>
          <button className="btn-primary" style={{ padding: '0.5rem 1.5rem' }}>View All Featured</button>
        </div>

        <div className="fc-grid">
          {FEATURED.map(college => (
            <div key={college.name} className="fc-card">
              <div className="fc-image" style={{ backgroundColor: college.imgColor }}>
                 <Award size={48} color="rgba(0,0,0,0.1)" />
                 <span className="fc-tag">{college.tag}</span>
              </div>
              <div className="fc-content">
                <h3 className="fc-name">{college.name}</h3>
                <p className="fc-location">{college.location}</p>
                <div className="fc-rating">
                  <Star size={14} className="star-icon" />
                  <span>{college.rating} Rating</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedColleges;
