import React, { useState } from 'react';
import axios from 'axios';
import { Target, Activity, ShieldCheck, ArrowRight, Loader2, Sparkles, Crosshair, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './RankPredictorPage.css';

const RankPredictorPage = () => {
  const { API_URL } = useAuth();
  const navigate = useNavigate();
  const [predicting, setPredicting] = useState(false);
  const [results, setResults] = useState(null);

  const handlePredict = async (e) => {
    e.preventDefault();
    setPredicting(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await axios.post(`${API_URL}/tools/predict-rank`, data);
      setResults(res.data);
    } catch (err) {
      console.error("Prediction failed");
    } finally {
      setPredicting(false);
    }
  };

  const ResultCard = ({ college, type }) => {
    const config = {
      dream: { label: 'Dream', colorClass: 'red' },
      target: { label: 'Target', colorClass: 'orange' },
      safe: { label: 'Safe', colorClass: 'green' }
    }[type];

    return (
      <div 
        className={`rp-card ${config.colorClass}`}
        onClick={() => navigate(`/college/${college.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <div className="rp-card-header">
          <span className={`rp-badge ${config.colorClass}`}>{config.label}</span>
          <div className="rp-match">
            <Activity size={14} /> 92% Match
          </div>
        </div>

        <h3 className="rp-c-name">{college.name}</h3>
        <span className="rp-exam-tag">{college.exams}</span>

        <div className="rp-stats">
          <div className="rp-stat">
            <span className="rp-lbl">Fees</span>
            <span className="rp-val">{college.fees}</span>
          </div>
          <div className="rp-stat">
            <span className="rp-lbl">Avg Pkg</span>
            <span className="rp-val">{college.avg_package}</span>
          </div>
          <div className="rp-stat">
            <span className="rp-lbl">Rank</span>
            <span className="rp-val">#{college.nirf_rank}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rank-predictor">
      <div className="container">
        
        <header className="rp-header">
          <h1 className="section-title">Predict Your Colleges</h1>
          <p className="section-subtitle">Discover the best institutions based on your entrance rank and category.</p>
        </header>

        <div className="rp-form-container">
          <form onSubmit={handlePredict}>
            <div className="rp-form-grid">
              <div className="rp-input-group">
                <label>Entrance Rank</label>
                <input name="rank" type="number" placeholder="e.g. 5000" required />
              </div>
              <div className="rp-input-group">
                <label>Category</label>
                <select name="category">
                  <option>General</option>
                  <option>OBC</option>
                  <option>SC/ST</option>
                  <option>EWS</option>
                </select>
              </div>
              <div className="rp-input-group">
                <label>Preferred Course</label>
                <select name="course">
                  <option value="Engineering">B.Tech (Engineering)</option>
                  <option value="Management">MBA (Management)</option>
                  <option value="Medicine">MBBS (Medicine)</option>
                </select>
              </div>
              <div className="rp-input-group">
                <label>Preferred Location</label>
                <input name="location" type="text" placeholder="e.g. Mumbai" />
              </div>
            </div>
            <div className="rp-btn-container">
              <button 
                type="submit" 
                disabled={predicting}
                className="btn-primary rp-submit"
              >
                {predicting ? 'Processing...' : 'Predict My Colleges'}
              </button>
            </div>
          </form>
        </div>

        {results && (
          <div className="rp-results fade-in-up">
            {/* Result Sections */}
            {[
              { title: 'Dream Colleges', data: results.dream, icon: <Crosshair className="red-txt" />, color: 'red' },
              { title: 'Target Colleges', data: results.target, icon: <Award className="orange-txt" />, color: 'orange' },
              { title: 'Safe Colleges', data: results.safe, icon: <ShieldCheck className="green-txt" />, color: 'green' }
            ].map((section) => (
              <div key={section.title} className="rp-section">
                <div className="rp-section-header">
                  {section.icon}
                  <h2>{section.title}</h2>
                  <span className={`section-info ${section.color}-txt`}>{section.data.length} found</span>
                </div>
                <div className="rp-result-grid">
                  {section.data.length > 0 ? (
                    section.data.map(c => <ResultCard key={c.id} college={c} type={section.title.split(' ')[0].toLowerCase()} />)
                  ) : (
                    <div className="no-res-box">No results in this category.</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RankPredictorPage;
