import React, { useState } from 'react';
import { Target, CheckCircle, AlertTriangle, XCircle, Sparkles } from 'lucide-react';
import './DecisionAnalysis.css';

const DecisionAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    setAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        score: 82,
        status: 'Moderate Match',
        statusColor: 'orange', // green, orange, red
        insights: [
          "Your rank is slightly below the general cutoff for this course, but state quota might help.",
          "The ROI is excellent given your budget range.",
          "Placement strength in your chosen specialization is above average here."
        ],
        alternatives: {
          better: "NIT Surathkal (Higher placements)",
          safer: "VIT Vellore (High probability)",
          dream: "IIT Roorkee (Stretch goal)"
        }
      });
    }, 1500);
  };

  return (
    <section className="decision-analysis">
      <div className="container">
        <div className="da-header">
          <div className="da-icon-wrapper">
            <Target size={32} className="da-icon" />
          </div>
          <h2 className="section-title">AI Decision Analysis</h2>
          <p className="section-subtitle">Check whether your college choice matches your rank, course and career goals</p>
        </div>

        <div className="da-content">
          <div className="da-form-card">
            <form onSubmit={handleAnalyze} className="da-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Your Rank</label>
                  <input type="number" placeholder="e.g. 15000" required />
                </div>
                <div className="form-group">
                  <label>Preferred Course</label>
                  <select required>
                    <option value="">Select Course</option>
                    <option>B.Tech</option>
                    <option>MBA</option>
                    <option>MBBS</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Specialization</label>
                  <input type="text" placeholder="e.g. Computer Science" required />
                </div>
                <div className="form-group">
                  <label>Preferred College</label>
                  <input type="text" placeholder="e.g. NIT Trichy" required />
                </div>
                <div className="form-group">
                  <label>Budget Range</label>
                  <select required>
                    <option value="">Select Budget</option>
                    <option>Under 5 Lakhs</option>
                    <option>5 - 10 Lakhs</option>
                    <option>10 - 20 Lakhs</option>
                    <option>Above 20 Lakhs</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Location</label>
                  <input type="text" placeholder="e.g. Bangalore" required />
                </div>
              </div>
              <button type="submit" className="btn-primary da-submit-btn" disabled={analyzing}>
                {analyzing ? 'Analyzing...' : 'Analyze My Decision'}
              </button>
            </form>
          </div>

          {result && (
            <div className="da-result-card animate-fade-in">
              <div className="result-header">
                <div className="score-ring" style={{ '--score': result.score, '--color': `var(--${result.statusColor === 'orange' ? 'warning' : result.statusColor === 'green' ? 'success' : 'danger'})` }}>
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path className="circle"
                      strokeDasharray={`${result.score}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage">{result.score}%</text>
                  </svg>
                </div>
                <div className="status-info">
                  <h3>Decision Score</h3>
                  <div className={`status-badge ${result.statusColor}`}>
                    {result.statusColor === 'green' && <CheckCircle size={16} />}
                    {result.statusColor === 'orange' && <AlertTriangle size={16} />}
                    {result.statusColor === 'red' && <XCircle size={16} />}
                    {result.status}
                  </div>
                </div>
              </div>

              <div className="ai-insights-box">
                <div className="ai-insights-header">
                  <Sparkles size={18} />
                  <h4>AI Insights</h4>
                </div>
                <ul className="insights-list">
                  {result.insights.map((insight, idx) => (
                    <li key={idx}>{insight}</li>
                  ))}
                </ul>
              </div>

              <div className="suggestions-panel">
                <h4>Suggested Alternatives</h4>
                <div className="suggestion-item">
                  <span className="s-label dream">Dream</span>
                  <span className="s-value">{result.alternatives.dream}</span>
                </div>
                <div className="suggestion-item">
                  <span className="s-label better">Better</span>
                  <span className="s-value">{result.alternatives.better}</span>
                </div>
                <div className="suggestion-item">
                  <span className="s-label safer">Safer</span>
                  <span className="s-value">{result.alternatives.safer}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DecisionAnalysis;
