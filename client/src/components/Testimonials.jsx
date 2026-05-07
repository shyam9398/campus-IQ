import React from 'react';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    name: "Rohan Sharma",
    college: "NIT Surathkal",
    text: "The AI Match feature exactly predicted my chances. I wouldn't have applied to NIT otherwise!",
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  {
    name: "Priya Patel",
    college: "IIM Ahmedabad",
    text: "CampusIQ's detailed ROI breakdown helped me convince my parents about the education loan.",
    avatar: "https://i.pravatar.cc/150?u=2"
  },
  {
    name: "Amit Kumar",
    college: "VIT Vellore",
    text: "Far cleaner and less confusing than other college sites. Got my admission sorted stress-free.",
    avatar: "https://i.pravatar.cc/150?u=3"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">Trusted by Students</h2>
        <p className="section-subtitle">See how CampusIQ helped others find their dream college</p>

        <div className="test-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="test-card">
              <Quote size={32} className="quote-icon" />
              <p className="test-text">"{t.text}"</p>
              <div className="test-user">
                <img src={t.avatar} alt={t.name} className="test-avatar" />
                <div className="test-user-info">
                  <h4>{t.name}</h4>
                  <span>Placed at {t.college}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
