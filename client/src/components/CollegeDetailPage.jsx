import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Star, Heart, GitCompare, Share2, Send, CheckCircle, AlertTriangle, Building, BookOpen, TrendingUp, Award, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import './CollegeDetailPage.css';

const CollegeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API_URL } = useAuth();
  const { savedColleges, toggleSaveCollege, addToCompare, compareTray } = useAppContext();
  
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await axios.get(`${API_URL}/colleges/${id}`);
        setCollege(res.data);
      } catch (err) {
        console.error("Fetch failed");
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id, API_URL]);

  if (loading) return (
    <div className="container py-20 text-center">
      <div className="loader mx-auto"></div>
      <p style={{ marginTop: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Loading college details...</p>
    </div>
  );
  
  if (!college) return <div className="container py-20 text-center">College Not Found</div>;

  const isSaved = savedColleges.some(c => c.id === college.id);
  const isComparing = compareTray.some(c => c.id === college.id);
  const tabs = ['Overview', 'Courses & Fees', 'Placements', 'Rankings', 'Facilities', 'Reviews'];

  return (
    <div className="college-detail">
      {/* Banner */}
      <div className="cd-banner">
        <div className="banner-overlay"></div>
      </div>

      <div className="container cd-header-container">
        <div className="cd-header-card">
          <div className="cd-logo-wrapper">
            {college.name.charAt(0)}
          </div>
          <div className="cd-header-content">
            <div className="cd-title-row">
              <h1>{college.name}</h1>
              <div className="cd-rating">
                <Star size={16} fill="currentColor" />
                <span>{college.rating}</span>
              </div>
            </div>
            <div className="cd-meta-row">
              <div className="cd-meta"><MapPin size={16} /> {college.location}</div>
              <div className="cd-meta badge blue">NIRF #{college.nirf_rank}</div>
              <div className="cd-meta badge">{college.type}</div>
            </div>
          </div>
          <div className="cd-actions">
             <div className="cd-action-group">
                <button 
                  className={`icon-btn-outline ${isSaved ? 'active-save' : ''}`}
                  onClick={() => toggleSaveCollege(college)}
                >
                  <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
                  {isSaved ? 'Saved' : 'Save'}
                </button>
                <button 
                  className={`icon-btn-outline ${isComparing ? 'active-compare' : ''}`}
                  onClick={() => addToCompare(college)}
                >
                  <GitCompare size={18} />
                  Compare
                </button>
                <button className="icon-btn-outline">
                  <Share2 size={18} />
                </button>
             </div>
             <button className="btn-primary apply-btn">Apply Now</button>
          </div>
        </div>
      </div>

      <div className="container cd-main-layout">
        <div className="cd-left-content">
          
          {/* AI Highlights */}
          <div className="ai-insights-card">
            <div className="ai-header">
              <h3>Why this college?</h3>
              <span className="ai-badge">AI Insights</span>
            </div>
            <div className="ai-points">
              <div className="ai-point success">
                <CheckCircle size={18} /> Excellent Placement ROI
              </div>
              <div className="ai-point success">
                <CheckCircle size={18} /> Top-tier Faculty & Research
              </div>
              <div className="ai-point success">
                <CheckCircle size={18} /> Modern Infrastructure
              </div>
              <div className="ai-point warning">
                <AlertTriangle size={18} /> High Entrance Competition
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="cd-tabs">
            {tabs.map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`cd-tab-btn ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="cd-tab-content">
            {activeTab === 'Overview' && (
              <div className="tab-pane fade-in">
                <h2>About the Institution</h2>
                <p className="about-text">
                  {college.about || `${college.name} is one of India's premier educational institutions located in ${college.location}. Established with a vision to provide quality education and foster innovation.`}
                </p>
                <div className="quick-facts">
                  <div className="qf-item"><Building size={18} /> {college.ownership}</div>
                  <div className="qf-item"><BookOpen size={18} /> {college.exams} Accepted</div>
                  <div className="qf-item"><TrendingUp size={18} /> NIRF #{college.nirf_rank}</div>
                </div>
              </div>
            )}

            {activeTab === 'Placements' && (
              <div className="tab-pane fade-in">
                <h2>Placement Statistics</h2>
                <div className="placement-grid">
                  <div className="p-stat-card">
                    <span className="p-lbl">Avg Package</span>
                    <span className="p-val">{college.avg_package}</span>
                  </div>
                  <div className="p-stat-card">
                    <span className="p-lbl">Highest Package</span>
                    <span className="p-val">45.0 LPA</span>
                  </div>
                  <div className="p-stat-card">
                    <span className="p-lbl">Placement %</span>
                    <span className="p-val">{college.placement_rate}</span>
                  </div>
                </div>
                <h3 className="sub-heading">Top Recruiters</h3>
                <div className="recruiters-list">
                  {['Google', 'Microsoft', 'Amazon', 'Adobe', 'TCS', 'Infosys', 'Deloitte', 'Apple'].map(r => (
                    <span key={r} className="recruiter-tag">{r}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTab !== 'Overview' && activeTab !== 'Placements' && (
              <div className="py-10 text-center text-slate-400">
                Data for {activeTab} will be available soon.
              </div>
            )}
          </div>
        </div>

        <aside className="cd-sidebar">
          <div className="cd-sidebar-card">
            <h3>Interested in Admission?</h3>
            <p>Get personalized guidance from our experts for {college.name}.</p>
            <form className="lead-form">
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email ID" required />
              <input type="tel" placeholder="Phone Number" required />
              <button type="submit" className="btn-primary w-full">Request Callback</button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CollegeDetailPage;
