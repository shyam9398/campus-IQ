import React from 'react';
import { GitCompare, Plus, ShieldCheck, TrendingUp, Award, Zap, ArrowRight, X, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './ComparePage.css';

const ComparePage = () => {
  const navigate = useNavigate();
  const { compareTray, addToCompare } = useAppContext();

  if (compareTray.length === 0) {
    return (
      <div className="container py-20 text-center">
        <div className="empty-state-icon mx-auto" style={{ width: '80px', height: '80px', background: '#eff6ff', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'var(--primary-blue)', marginBottom: '1.5rem', margin: '0 auto' }}>
           <GitCompare size={40} style={{ margin: 'auto' }} />
        </div>
        <h2 className="section-title">No colleges selected</h2>
        <p className="section-subtitle">Select up to 3 colleges to see a detailed side-by-side comparison.</p>
        <button onClick={() => navigate('/browse')} className="btn-primary">Browse Colleges</button>
      </div>
    );
  }

  const sections = [
    { label: "Overview", keys: [
      { name: "Location", key: "location" },
      { name: "Ownership", key: "ownership" },
      { name: "Type", key: "type" },
      { name: "NIRF Rank", key: "nirf_rank" },
    ]},
    { label: "Placements", keys: [
      { name: "Avg Package", key: "avg_package" },
      { name: "Placement Rate", key: "placement_rate" },
    ]},
    { label: "Fees & Exams", keys: [
      { name: "Fees/yr", key: "fees" },
      { name: "Exams Accepted", key: "exams" },
    ]}
  ];

  return (
    <div className="compare-page">
      <div className="container">
        
        <header className="compare-header">
           <h1 className="page-title">Comparison Analysis</h1>
           <p className="page-subtitle">Detailed evaluation of your top {compareTray.length} choices</p>
        </header>

        {/* AI Recommendations */}
        <div className="ai-rec-box">
           <div className="ai-rec-header">
              <Sparkles size={24} className="sparkle-icon" />
              <h2>AI Verdict</h2>
           </div>
           <div className="ai-rec-grid">
              <div className="rec-card best-overall">
                 <Award size={20} />
                 <div className="rec-info">
                    <span>Best Overall</span>
                    <strong>{compareTray[0].name}</strong>
                 </div>
              </div>
              <div className="rec-card best-roi">
                 <TrendingUp size={20} />
                 <div className="rec-info">
                    <span>Best ROI</span>
                    <strong>{compareTray[1]?.name || compareTray[0].name}</strong>
                 </div>
              </div>
           </div>
        </div>

        {/* Comparison Table */}
        <div className="compare-table-wrapper">
          <table className="compare-table">
             <thead className="sticky-header">
                <tr>
                   <th className="feature-col">Parameters</th>
                   {compareTray.map(college => (
                      <th key={college.id} className="college-col">
                         <button className="remove-col" onClick={() => addToCompare(college)}>
                            <X size={14} />
                         </button>
                         <div className="comp-logo">{college.name.charAt(0)}</div>
                         <h3>{college.name}</h3>
                         <p>{college.location}</p>
                      </th>
                   ))}
                   {Array(3 - compareTray.length).fill(0).map((_, i) => (
                      <th key={i} className="college-col empty">
                         <div className="comp-logo" style={{ borderStyle: 'dashed', background: 'transparent', color: '#cbd5e1' }}>
                            <Plus size={24} />
                         </div>
                         <button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }} onClick={() => navigate('/browse')}>Add College</button>
                      </th>
                   ))}
                </tr>
             </thead>
             <tbody>
                {sections.map(section => (
                   <React.Fragment key={section.label}>
                      <tr className="section-row">
                         <td colSpan="4">{section.label}</td>
                      </tr>
                      {section.keys.map(item => (
                         <tr key={item.name}>
                            <td className="feature-col">{item.name}</td>
                            {compareTray.map(college => (
                               <td key={college.id}>{college[item.key]}</td>
                            ))}
                            {Array(3 - compareTray.length).fill(0).map((_, i) => (
                               <td key={i}>—</td>
                            ))}
                         </tr>
                      ))}
                   </React.Fragment>
                ))}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
