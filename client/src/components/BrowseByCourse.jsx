import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, GraduationCap, Gavel, Microscope, HeartPulse, TrendingUp, ArrowRight } from 'lucide-react';
import './BrowseByCourse.css';

const BrowseByCourse = () => {
  const navigate = useNavigate();

  const courses = [
    { name: 'Engineering', icon: <TrendingUp size={28} />, color: '#3b82f6', path: '/browse?course=Engineering' },
    { name: 'Management', icon: <Briefcase size={28} />, color: '#6366f1', path: '/browse?course=Management' },
    { name: 'Medicine', icon: <HeartPulse size={28} />, color: '#ef4444', path: '/browse?course=Medicine' },
    { name: 'Law', icon: <Gavel size={28} />, color: '#334155', path: '/browse?course=Law' },
    { name: 'Science', icon: <Microscope size={28} />, color: '#10b981', path: '/browse?course=Science' },
    { name: 'Commerce', icon: <GraduationCap size={28} />, color: '#f59e0b', path: '/browse?course=Commerce' },
  ];

  return (
    <section className="browse-course">
      <div className="container">
        <h2 className="section-title">Browse By Course</h2>
        <p className="section-subtitle">Explore top institutions categorized by specialized fields of study.</p>

        <div className="course-grid">
          {courses.map(course => (
            <div 
              key={course.name}
              onClick={() => navigate(course.path)}
              className="course-card"
            >
              <div className="course-icon-wrapper" style={{ color: course.color }}>
                {course.icon}
              </div>
              <span className="course-name">{course.name}</span>
            </div>
          ))}
        </div>

        <div className="view-all-container">
          <button onClick={() => navigate('/browse')} className="view-all-btn">
             View All Courses <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCourse;
