import React, { useState } from 'react';
import { Target, Activity, Zap, TrendingUp, AlertCircle, ArrowRight, ShieldCheck, Award, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DecisionAnalysisPage = () => {
  const { API_URL } = useAuth();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    setAnalyzing(true);
    
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

  const ProgressBar = ({ label, value, colorClass }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-bold text-gray-700">{label}</span>
        <span className="text-sm font-black text-gray-900">{value}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${colorClass}`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <header className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Sparkles size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Decision Analysis</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Validate your college choices with our proprietary predictive models and get comprehensive placement insights.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Area */}
          <aside className="lg:col-span-4 bg-white rounded-3xl shadow-md border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Parameters</h3>
            <form onSubmit={handleAnalyze} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Entrance Rank</label>
                <input type="number" placeholder="e.g. 5000" required className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Budget (Total)</label>
                <select required className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-700">
                  <option value="">Select Budget</option>
                  <option>Under 5L</option>
                  <option>5L - 10L</option>
                  <option>Above 10L</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Selected College</label>
                <input type="text" placeholder="e.g. NIT Trichy" required className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Specialization</label>
                <select required className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-700">
                  <option value="">Select Field</option>
                  <option>Computer Science</option>
                  <option>Electronics</option>
                  <option>Mechanical</option>
                  <option>Data Science</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location Preference</label>
                <input type="text" placeholder="e.g. Bangalore" required className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
              </div>

              <button 
                type="submit" 
                disabled={analyzing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 mt-4"
              >
                {analyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  <>Generate AI Report <ArrowRight size={20} /></>
                )}
              </button>
            </form>
          </aside>

          {/* Right Results Dashboard */}
          <main className="lg:col-span-8 h-full">
            {!result && !analyzing ? (
              <div className="h-full min-h-[500px] bg-white rounded-3xl border border-gray-100 border-dashed flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-6">
                  <Activity size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Awaiting Analysis</h3>
                <p className="text-gray-500 max-w-sm">Input your details on the left to generate your comprehensive AI decision report.</p>
              </div>
            ) : analyzing ? (
              <div className="h-full min-h-[500px] bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Simulating Outcomes...</h3>
                <p className="text-gray-500 max-w-sm">Cross-referencing your profile with historical placement and admission data.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Score Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-8">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-green-500" strokeDasharray={`${result.score}, 100`} strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-black text-gray-900 leading-none">{result.score}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold bg-green-50 text-green-700 border border-green-200 mb-3">
                       <CheckCircle size={18} />
                       {result.status}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Suitability Score</h3>
                    <p className="text-gray-600 text-lg">This college is a high-potential match for your rank and career goals based on historical success rates.</p>
                  </div>
                </div>

                {/* Metrics & Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-2 mb-6 text-gray-900">
                      <TrendingUp size={24} className="text-blue-600" />
                      <h4 className="text-xl font-bold">Metrics</h4>
                    </div>
                    <ProgressBar label="Match Quality" value={result.metrics.matchQuality} colorClass="bg-blue-500" />
                    <ProgressBar label="ROI Score" value={result.metrics.roiScore} colorClass="bg-green-500" />
                    <ProgressBar label="Placement Power" value={result.metrics.placementStrength} colorClass="bg-purple-500" />
                  </div>

                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-2 mb-6 text-gray-900">
                      <Zap size={24} className="text-yellow-500" />
                      <h4 className="text-xl font-bold">AI Observations</h4>
                    </div>
                    <ul className="space-y-4">
                      {result.insights.map((insight, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <ArrowRight size={18} className="text-yellow-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Alternatives */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Suggested Alternatives</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-md mb-3 inline-block">Better ROI</span>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{result.alternatives.better.name}</h4>
                      <p className="text-gray-600 mb-5">{result.alternatives.better.reason}</p>
                      <button className="text-blue-600 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">Compare Details <ArrowRight size={16}/></button>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                      <span className="text-xs font-bold uppercase tracking-wider text-green-600 bg-green-100 px-3 py-1 rounded-md mb-3 inline-block">Safer Choice</span>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{result.alternatives.safer.name}</h4>
                      <p className="text-gray-600 mb-5">{result.alternatives.safer.reason}</p>
                      <button className="text-green-600 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">Compare Details <ArrowRight size={16}/></button>
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
