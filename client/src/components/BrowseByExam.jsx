import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import './BrowseByExam.css';

const EXAMS = [
  { name: 'JEE Main', type: 'Engineering', colleges: '1500+ Colleges', color: '#3b82f6' },
  { name: 'NEET', type: 'Medical', colleges: '500+ Colleges', color: '#10b981' },
  { name: 'CAT', type: 'Management', colleges: '800+ Colleges', color: '#f59e0b' },
  { name: 'CLAT', type: 'Law', colleges: '120+ Colleges', color: '#8b5cf6' },
  { name: 'GATE', type: 'Engineering', colleges: '900+ Colleges', color: '#ec4899' },
  { name: 'CUET', type: 'Undergrad', colleges: '250+ Univs', color: '#06b6d4' }
];

const BrowseByExam = () => {
  return (
    <section className="browse-exam">
      <div className="container">
        <h2 className="section-title">Browse by Top Exams</h2>
        <p className="section-subtitle">Find colleges accepting scores from major entrance tests</p>

        <div className="exam-grid">
          {EXAMS.map(exam => (
            <div key={exam.name} className="exam-card">
              <div className="exam-card-header">
                <h3 className="exam-name">{exam.name}</h3>
                <span className="exam-type" style={{ color: exam.color, backgroundColor: `${exam.color}15` }}>
                  {exam.type}
                </span>
              </div>
              <div className="exam-info">
                <CheckCircle size={14} className="exam-icon" />
                <span>Accepted in {exam.colleges}</span>
              </div>
              <button className="exam-action">
                View Details <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByExam;
