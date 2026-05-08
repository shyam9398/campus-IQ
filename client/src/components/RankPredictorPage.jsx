import React, { useState } from 'react';
import axios from 'axios';
import { Target, Activity, ShieldCheck, ArrowRight, Sparkles, Crosshair, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RankPredictorPage = () => {
  const { API_URL } = useAuth();
  const navigate = useNavigate();
  const [predicting, setPredicting] = useState(false);
  const [results, setResults] = useState(null);

  const handlePredict = async (e) => {
    e.preventDefault();
    setPredicting(true);
    
    // Simulating API call for predictive results
    setTimeout(() => {
      setPredicting(false);
      setResults({
        dream: [{ id: 1, name: "IIT Bombay", exams: "JEE Advanced", fees: "₹10L", avg_package: "25 LPA", nirf_rank: "1" }],
        target: [{ id: 4, name: "VIT Vellore", exams: "VITEEE", fees: "₹19.8L", avg_package: "8.1 LPA", nirf_rank: "11" }],
        safe: [{ id: 5, name: "SRM Chennai", exams: "SRMJEEE", fees: "₹16L", avg_package: "6.5 LPA", nirf_rank: "18" }]
      });
    }, 1500);
  };

  const ResultCard = ({ college, type }) => {
    const config = {
      dream: { label: 'Dream', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
      target: { label: 'Target', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
      safe: { label: 'Safe', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }
    }[type];

    return (
      <div 
        className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 cursor-pointer group flex flex-col h-full"
        onClick={() => navigate(`/college/${college.id}`)}
      >
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${config.bg} ${config.text} ${config.border} border`}>
            {config.label}
          </span>
          <div className="flex items-center gap-1 text-sm font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
            <Activity size={14} className="text-blue-500" /> 92% Match
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">{college.name}</h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg font-medium self-start mb-6">{college.exams}</span>

        <div className="grid grid-cols-3 gap-2 mt-auto bg-gray-50 p-4 rounded-xl">
          <div className="text-center">
            <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Fees</span>
            <span className="block text-sm font-bold text-gray-900">{college.fees}</span>
          </div>
          <div className="text-center border-x border-gray-200">
            <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Avg Pkg</span>
            <span className="block text-sm font-bold text-green-600">{college.avg_package}</span>
          </div>
          <div className="text-center">
            <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Rank</span>
            <span className="block text-sm font-bold text-blue-600">#{college.nirf_rank}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <header className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Target size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Predict Your Colleges</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Discover the best institutions categorized into Dream, Target, and Safe based on your entrance rank.</p>
        </header>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-md border border-gray-100 p-8 mb-12">
          <form onSubmit={handlePredict}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Entrance Rank</label>
                <input name="rank" type="number" placeholder="e.g. 5000" required className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select name="category" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-700">
                  <option>General</option>
                  <option>OBC</option>
                  <option>SC/ST</option>
                  <option>EWS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Course</label>
                <select name="course" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-700">
                  <option value="Engineering">B.Tech (Engineering)</option>
                  <option value="Management">MBA (Management)</option>
                  <option value="Medicine">MBBS (Medicine)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Location</label>
                <input name="location" type="text" placeholder="e.g. Mumbai" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                type="submit" 
                disabled={predicting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2 w-full md:w-auto min-w-[250px]"
              >
                {predicting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>Predict My Colleges <ArrowRight size={20} /></>
                )}
              </button>
            </div>
          </form>
        </div>

        {results && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {[
              { title: 'Dream Colleges', data: results.dream, icon: <Crosshair size={28} className="text-red-500" />, countClass: 'text-red-600 bg-red-50' },
              { title: 'Target Colleges', data: results.target, icon: <Award size={28} className="text-orange-500" />, countClass: 'text-orange-600 bg-orange-50' },
              { title: 'Safe Colleges', data: results.safe, icon: <ShieldCheck size={28} className="text-green-500" />, countClass: 'text-green-600 bg-green-50' }
            ].map((section) => (
              <div key={section.title}>
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                  {section.icon}
                  <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${section.countClass}`}>
                    {section.data.length} found
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.data.length > 0 ? (
                    section.data.map(c => <ResultCard key={c.id} college={c} type={section.title.split(' ')[0].toLowerCase()} />)
                  ) : (
                    <div className="col-span-full bg-white rounded-2xl border border-gray-100 border-dashed p-12 text-center text-gray-500">
                      No results matched in this category. Try adjusting your parameters.
                    </div>
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
