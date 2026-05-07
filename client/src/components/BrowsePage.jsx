import React, { useState, useEffect } from 'react';
import { Search, MapPin, SlidersHorizontal, ChevronDown, Heart, GitCompare, ArrowRight, X, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import './BrowsePage.css';

const BrowsePage = () => {
  const navigate = useNavigate();
  const { API_URL } = useAuth();
  const { savedColleges, toggleSaveCollege, addToCompare, compareTray } = useAppContext();
  
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    fetchColleges();
  }, [searchQuery, activeFilters]);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/colleges?search=${searchQuery}`;
      
      const courses = ['Engineering', 'Management', 'Medicine', 'Law', 'Science'].filter(c => activeFilters.includes(c));
      const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune'].filter(l => activeFilters.includes(l));
      const types = ['Public', 'Private'].filter(t => activeFilters.includes(t));

      if (courses.length > 0) url += `&course=${courses.join(',')}`;
      if (locations.length > 0) url += `&location=${locations.join(',')}`;
      if (types.length > 0) url += `&type=${types.join(',')}`;
      
      const res = await axios.get(url);
      setColleges(res.data);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const clearFilters = () => setActiveFilters([]);

  const SkeletonCard = () => (
    <div className="list-card skeleton">
      <div className="s-logo"></div>
      <div className="s-content">
        <div className="s-line s-title"></div>
        <div className="s-line s-short"></div>
        <div className="s-grid">
          <div className="s-box"></div>
          <div className="s-box"></div>
          <div className="s-box"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="browse-page">
      <div className="container browse-container">
        
        {/* Sidebar Filters */}
        <aside className="browse-sidebar">
          <div className="filter-header">
            <h3>Filters</h3>
            <SlidersHorizontal size={18} />
          </div>

          <div className="filter-group">
            <h4>Location</h4>
            {['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune'].map(loc => (
              <label key={loc}>
                <input 
                  type="checkbox" 
                  checked={activeFilters.includes(loc)}
                  onChange={() => toggleFilter(loc)}
                />
                {loc}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Course</h4>
            {['Engineering', 'Management', 'Medicine', 'Law', 'Science'].map(course => (
              <label key={course}>
                <input 
                  type="checkbox" 
                  checked={activeFilters.includes(course)}
                  onChange={() => toggleFilter(course)}
                />
                {course}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>College Type</h4>
            {['Public', 'Private'].map(type => (
              <label key={type}>
                <input 
                  type="checkbox" 
                  checked={activeFilters.includes(type)}
                  onChange={() => toggleFilter(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="browse-content">
          <div className="browse-top-bar">
            <div className="search-wrapper">
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search colleges, cities..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="sort-wrapper">
              <span className="result-count">{colleges.length} Results Found</span>
              <div className="sort-dropdown">
                Sort by: <strong>Relevance</strong>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          {activeFilters.length > 0 && (
            <div className="active-filters">
              {activeFilters.map(filter => (
                <div key={filter} className="active-tag">
                  {filter}
                  <button onClick={() => toggleFilter(filter)}><X size={14} /></button>
                </div>
              ))}
              <button className="clear-all" onClick={clearFilters}>Clear All</button>
            </div>
          )}

          {/* College List */}
          <div className="college-list">
            {loading ? (
              [1, 2, 3].map(i => <SkeletonCard key={i} />)
            ) : colleges.length === 0 ? (
              <div className="no-results">
                <p>No colleges found matching your criteria.</p>
                <button className="btn-primary" onClick={clearFilters}>Clear All Filters</button>
              </div>
            ) : (
              colleges.map(college => {
                const isSaved = savedColleges.some(c => c.id === college.id);
                const isComparing = compareTray.some(c => c.id === college.id);

                return (
                  <div key={college.id} className="list-card">
                    <div className="lc-logo">
                      {college.name.charAt(0)}
                    </div>

                    <div className="lc-body">
                      <div className="lc-header">
                        <div>
                          <h3 className="lc-name">{college.name}</h3>
                          <div className="lc-location">
                            <MapPin size={14} /> {college.location}
                          </div>
                        </div>
                        <div className="lc-ai-match">
                          <span className="match-score">92%</span>
                          <span className="match-label">AI Match</span>
                        </div>
                      </div>

                      <div className="lc-tags">
                        <span className="t-badge t-nirf">NIRF #{college.nirf_rank}</span>
                        <span className="t-badge t-exam">{college.exams}</span>
                        <span className="t-badge t-course">{college.college_type}</span>
                      </div>

                      <div className="lc-stats">
                        <div className="l-stat">
                          <span className="l-lbl">Fees</span>
                          <span className="l-val">{college.fees}</span>
                        </div>
                        <div className="l-stat">
                          <span className="l-lbl">Avg Package</span>
                          <span className="l-val">{college.avg_package}</span>
                        </div>
                        <div className="l-stat">
                          <span className="l-lbl">Rating</span>
                          <span className="l-val rating-val">
                            <Star size={14} fill="#d97706" /> {college.rating}
                          </span>
                        </div>
                      </div>

                      <div className="lc-actions">
                        <div className="lc-action-icons">
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
                          className="btn-primary view-btn"
                          onClick={() => navigate(`/college/${college.id}`)}
                        >
                          View Details <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrowsePage;
