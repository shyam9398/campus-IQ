import React from 'react';
import { Heart, GitCompare, ArrowRight, Trash2, MapPin, IndianRupee, TrendingUp, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import './SavedPage.css';

const SavedPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { savedColleges, toggleSaveCollege, addToCompare, compareTray } = useAppContext();

  if (!user) {
    return (
      <div className="container py-20 text-center">
        <div className="empty-icon-wrapper mx-auto">
          <Bookmark size={48} />
        </div>
        <h2 className="section-title">Login Required</h2>
        <p className="section-subtitle">Please log in to manage your saved colleges.</p>
        <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="saved-page">
      <div className="container">
        <header className="saved-header">
           <h1 className="section-title" style={{ textAlign: 'left' }}>Saved Colleges</h1>
           <p className="section-subtitle" style={{ textAlign: 'left' }}>You have {savedColleges.length} institutions in your shortlist</p>
        </header>

        {savedColleges.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon-wrapper">
              <Bookmark size={40} />
            </div>
            <h2>No saved colleges yet</h2>
            <p>Start exploring and save colleges to compare them later.</p>
            <button className="btn-primary mt-md" onClick={() => navigate('/browse')}>Start Browsing</button>
          </div>
        ) : (
          <div className="saved-grid">
            {savedColleges.map(college => {
              const isComparing = compareTray.some(c => c.id === college.id);
              return (
                <div key={college.id} className="saved-card">
                  <div className="saved-card-top">
                    <div>
                       <h3 className="s-name">{college.name}</h3>
                       <div className="s-loc"><MapPin size={14} /> {college.location}</div>
                    </div>
                    <button className="remove-saved-btn" onClick={() => toggleSaveCollege(college)}>
                       <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="s-stats">
                     <div className="s-stat-item">
                        <IndianRupee size={16} />
                        <span>{college.fees}</span>
                     </div>
                     <div className="s-stat-item">
                        <TrendingUp size={16} />
                        <span>{college.avg_package} Avg Package</span>
                     </div>
                  </div>

                  <div className="saved-actions">
                     <button 
                       className={`s-action-btn ${isComparing ? 'primary' : ''}`}
                       onClick={() => addToCompare(college)}
                     >
                       <GitCompare size={16} />
                       {isComparing ? 'Comparing' : 'Compare'}
                     </button>
                     <button 
                       className="s-action-btn primary"
                       onClick={() => navigate(`/college/${college.id}`)}
                     >
                       View Details
                     </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPage;
