import React from 'react';
import { Building2, MapPin, BookOpen, Star } from 'lucide-react';
import './Stats.css';

const Stats = () => {
  const statItems = [
    { icon: Building2, number: '10+', label: 'Colleges', color: '#3b82f6' },
    { icon: MapPin, number: '9+', label: 'Locations', color: '#10b981' },
    { icon: BookOpen, number: '19+', label: 'Courses', color: '#8b5cf6' },
    { icon: Star, number: '4.4', label: 'Avg Rating', color: '#f59e0b' },
  ];

  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {statItems.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="stat-item">
                <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                  <Icon size={24} />
                </div>
                <div className="stat-info">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
