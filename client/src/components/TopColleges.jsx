import React, { useEffect, useState } from 'react';
import { MapPin, Star, Heart, GitCompare, IndianRupee, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import './TopColleges.css';

const TopColleges = () => {
  const navigate = useNavigate();
  const { API_URL } = useAuth();
  const { savedColleges, toggleSaveCollege, addToCompare, compareTray } = useAppContext();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axios.get(`${API_URL}/colleges`);
        setColleges(res.data.slice(0, 3)); 
      } catch (err) {
        console.error("Fetch colleges failed");
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, [API_URL]);

  if (loading) return (
    <div className="container py-12 text-center">
      <p className="loading-text">Loading Top Colleges...</p>
    </div>
  );

  return (
    <section className="top-colleges">
      <div className="container">
        <h2 className="section-title">Top Colleges For You</h2>
        <p className="section-subtitle">Recommended based on historical trends and success rates</p>

        <div className="college-grid">
          {colleges.map(college => {
            const isSaved = savedColleges.some(c => c.id === college.id);
            const isComparing = compareTray.some(c => c.id === college.id);

            return (
              <div key={college.id} className="college-card">
                {college.nirf_rank <= 5 && <div className="badge-recommended">Recommended</div>}
                
                <div className="college-card-header">
                  <h3 className="college-name">{college.name}</h3>
                  <div className="college-location">
                    <MapPin size={16} />
                    <span>{college.location}</span>
                  </div>
                </div>

                <div className="college-rating">
                  <Star size={16} className="star-icon" />
                  <span>{college.rating}</span>
                </div>

                <div className="college-tags">
                  <span className="c-tag nirf-tag">NIRF Rank #{college.nirf_rank}</span>
                  <span className="c-tag exam-tag">{college.exams}</span>
                </div>

                <div className="college-stats-grid">
                  <div className="c-stat">
                    <div>
                      <p className="c-stat-label">Fees</p>
                      <p className="c-stat-value">{college.fees}</p>
                    </div>
                  </div>
                  <div className="c-stat">
                    <div>
                      <p className="c-stat-label">Avg Package</p>
                      <p className="c-stat-value">{college.avg_package}</p>
                    </div>
                  </div>
                  <div className="c-stat">
                    <div>
                      <p className="c-stat-label">Placement</p>
                      <p className="c-stat-value">{college.placement_rate}</p>
                    </div>
                  </div>
                  <div className="c-stat">
                    <div>
                      <p className="c-stat-label">Type</p>
                      <p className="c-stat-value">{college.type}</p>
                    </div>
                  </div>
                </div>

                <div className="college-actions">
                  <div className="icon-actions">
                    <button 
                      className={`icon-btn ${isSaved ? 'active-save' : ''}`}
                      onClick={() => toggleSaveCollege(college)}
                    >
                      <Heart size={20} fill={isSaved ? "currentColor" : "none"} />
                    </button>
                    <button 
                      className={`icon-btn ${isComparing ? 'active-compare' : ''}`}
                      onClick={() => addToCompare(college)}
                    >
                      <GitCompare size={20} />
                    </button>
                  </div>
                  <button 
                    className="btn-primary view-details-btn"
                    onClick={() => navigate(`/college/${college.id}`)}
                  >
                    Details <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopColleges;
