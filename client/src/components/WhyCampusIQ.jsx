import React from 'react';
import { ShieldCheck, Cpu, Banknote } from 'lucide-react';
import './WhyCampusIQ.css';

const WhyCampusIQ = () => {
  return (
    <section className="why-campusiq">
      <div className="container">
        <h2 className="section-title">Why CampusIQ?</h2>
        <p className="section-subtitle">The smartest way to make your college decision</p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon bg-blue">
              <Cpu size={28} />
            </div>
            <h3>AI-Powered Insights</h3>
            <p>Our advanced algorithms analyze your profile, rank, and preferences to predict your best college matches with high accuracy.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon bg-green">
              <ShieldCheck size={28} />
            </div>
            <h3>Verified Data</h3>
            <p>We source placement records, fee structures, and reviews directly from verified alumni and official NIRF reports.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon bg-orange">
              <Banknote size={28} />
            </div>
            <h3>Transparent ROI</h3>
            <p>Get clear breakdowns of your total investment vs expected returns to ensure you make a financially sound decision.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCampusIQ;
