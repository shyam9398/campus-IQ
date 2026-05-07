import React, { useState } from 'react';
import axios from 'axios';
import { Target, Activity, Zap, TrendingUp, AlertCircle, ArrowRight, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './DecisionAnalysisPage.css';

const DecisionAnalysisPage = () => {
  const { API_URL } = useAuth();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    setAnalyzing(true);
    
    // Simulation of AI logic
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        score: 82,
        status: "High Potential Match",
        metrics: {
          matchQuality: 88,
          roiScore: 94,
          placementStrength: 91,
          competitionLevel: "High"
        },
        insights: [
          "Historical data suggests your rank is highly competitive for this specific specialization.",
          "ROI is categorized as 'Elite' due to the low tuition fees relative to average package.",
          "This college has seen a 12% increase in top-tier recruiters over the last 3 years."
        ],
        alternatives: {
          better: { id: 1, name: "IIT Roorkee", reason: "Slightly better research infrastructure for AI/ML." },
          safer: { id: 4, name: "VIT Vellore", reason: "Guaranteed admission with 99.9% confidence." }
        }
      });
    }, 2000);
  };

  const ProgressBar = ({ label, value, color }) => (
    <div className="da-metric">
      <div className="da-metric-lbl">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="da-progress-bg">
        <div 
          className="da-progress-fill" 
          style={{ width: `${value}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="da-page">
      <div className="container">
        
        <header className="da-page-header">
          <div className="icon-badge">
            <Sparkles size={32} />
          </div>
          <h1 className="section-title">AI Decision Analysis</h1>
          <p className="section-subtitle">Validate your college choices with our proprietary data models.</p>
        </header>

        <div className="da-layout">
          
          {/* Left Form Area */}
          <aside className="da-form-section">
            <div className="da-card">
              <h3>Parameters</h3>
              <form onSubmit={handleAnalyze} className="da-detailed-form">
                <div className="input-group">
                  <label>Entrance Rank</label>
                  <input type="number" placeholder="e.g. 5000" required />
                </div>
                
                <div className="input-group">
                  <label>Budget (Total)</label>
                  <select required>
                    <option value="">Select Budget</option>
                    <option>Under 5L</option>
                    <option>5L - 10L</option>
                    <option>Above 10L</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Selected College</label>
                  <input type="text" placeholder="e.g. NIT Trichy" required />
                </div>

                <div className="input-group">
                  <label>Specialization</label>
                  <select required>
                    <option value="">Select Field</option>
                    <option>Computer Science</option>
                    <option>Electronics</option>
                    <option>Mechanical</option>
                    <option>Data Science</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Location Preference</label>
                  <input type="text" placeholder="e.g. Bangalore" required />
                </div>

                <button 
                  type="submit" 
                  disabled={analyzing}
                  className="btn-primary da-submit-btn"
                  style={{ marginTop: '1rem' }}
                >
                  {analyzing ? 'Analyzing...' : 'Generate AI Report'}
                </button>
              </form>
            </div>
          </aside>

          {/* Right Results Dashboard */}
          <main className="da-results-section">
            {!result && !analyzing ? (
              <div className="da-empty-state">
                <Activity size={48} />
                <h3>Awaiting Analysis</h3>
                <p>Input your details on the left to generate your report.</p>
              </div>
            ) : analyzing ? (
              <div className="da-loading-state">
                <div className="loader"></div>
                <p>Simulating outcomes...</p>
              </div>
            ) : (
              <div className="da-results-dashboard fade-in">
                {/* Score Card */}
                <div className="da-score-card">
                  <div className="score-circle">
                    <svg viewBox="0 0 36 36" className="circular-chart green">
                      <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="circle" strokeDasharray={`${result.score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <text x="18" y="20.35" className="percentage">{result.score}%</text>
                    </svg>
                  </div>
                  <div className="score-details">
                    <div className="status-badge green">
                       {result.status}
                    </div>
                    <h3>AI Suitability Score</h3>
                    <p>This college is a high-potential match for your rank and career goals.</p>
                  </div>
                </div>

                {/* Metrics & Insights */}
                <div className="da-metrics-grid">
                  <div className="da-card metric-box">
                    <div className="box-header">
                      <TrendingUp size={18} />
                      <h4>Metrics</h4>
                    </div>
                    <ProgressBar label="Match Quality" value={result.metrics.matchQuality} color="#2563eb" />
                    <ProgressBar label="ROI Score" value={result.metrics.roiScore} color="#10b981" />
                    <ProgressBar label="Placement Power" value={result.metrics.placementStrength} color="#4f46e5" />
                  </div>

                  <div className="da-card insights-box">
                    <div className="box-header">
                      <Zap size={18} className="li-icon" />
                      <h4>AI Observations</h4>
                    </div>
                    <ul className="insight-list">
                      {result.insights.map((insight, i) => (
                        <li key={i}>
                          <ArrowRight size={14} className="li-icon" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Alternatives */}
                <div style={{ marginTop: '2rem' }}>
                  <h3 className="section-heading">Suggested Alternatives</h3>
                  <div className="alternatives-grid">
                    <div className="da-card alt-card">
                      <div className="alt-header better">Better ROI</div>
                      <h4>{result.alternatives.better.name}</h4>
                      <p>{result.alternatives.better.reason}</p>
                      <button className="alt-btn">Compare Details</button>
                    </div>
                    <div className="da-card alt-card">
                      <div className="alt-header safer">Safer Choice</div>
                      <h4>{result.alternatives.safer.name}</h4>
                      <p>{result.alternatives.safer.reason}</p>
                      <button className="alt-btn">Compare Details</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};

export default DecisionAnalysisPage;
