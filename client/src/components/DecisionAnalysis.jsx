import React, { useState } from 'react';
import { Target, CheckCircle, AlertTriangle, XCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DecisionAnalysis = () => {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    setAnalyzing(true);
    
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        score: 82,
        status: 'Moderate Match',
        statusColor: 'orange',
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Target size={32} />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">AI Decision Analysis</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Check whether your college choice matches your rank, course, and career goals using our predictive models.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <form onSubmit={handleAnalyze} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Your Rank</label>
                  <input type="number" placeholder="e.g. 15000" required className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Course</label>
                  <select required className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-700">
                    <option value="">Select Course</option>
                    <option>B.Tech</option>
                    <option>MBA</option>
                    <option>MBBS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Specialization</label>
                  <input type="text" placeholder="e.g. Computer Science" required className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Preferred College</label>
                  <input type="text" placeholder="e.g. NIT Trichy" required className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Budget Range</label>
                  <select required className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-gray-700">
                    <option value="">Select Budget</option>
                    <option>Under 5 Lakhs</option>
                    <option>5 - 10 Lakhs</option>
                    <option>10 - 20 Lakhs</option>
                    <option>Above 20 Lakhs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Location</label>
                  <input type="text" placeholder="e.g. Bangalore" required className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 mt-4" 
                disabled={analyzing}
              >
                {analyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  <>Analyze My Decision <ArrowRight size={20} /></>
                )}
              </button>
            </form>
          </div>

          {/* Result Card */}
          <div className="h-full">
            {!result && !analyzing && (
              <div className="h-full bg-white rounded-3xl border border-gray-100 border-dashed flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-6">
                  <Sparkles size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Analyze</h3>
                <p className="text-gray-500">Fill out the form on the left to get AI-powered insights about your college decision.</p>
              </div>
            )}

            {analyzing && (
              <div className="h-full bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Running Prediction Models</h3>
                <p className="text-gray-500">Comparing your profile against thousands of historical admissions...</p>
              </div>
            )}

            {result && !analyzing && (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-6 mb-8 border-b border-gray-100 pb-8">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className={`${result.statusColor === 'orange' ? 'text-yellow-500' : result.statusColor === 'green' ? 'text-green-500' : 'text-red-500'}`} strokeDasharray={`${result.score}, 100`} strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-black text-gray-900">{result.score}%</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-500 uppercase tracking-wider mb-2">Decision Score</h3>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${
                      result.statusColor === 'orange' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : 
                      result.statusColor === 'green' ? 'bg-green-50 text-green-700 border border-green-200' : 
                      'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {result.statusColor === 'green' && <CheckCircle size={18} />}
                      {result.statusColor === 'orange' && <AlertTriangle size={18} />}
                      {result.statusColor === 'red' && <XCircle size={18} />}
                      {result.status}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={20} className="text-blue-600" />
                    <h4 className="text-lg font-bold text-gray-900">AI Insights</h4>
                  </div>
                  <ul className="space-y-3">
                    {result.insights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                        <ArrowRight size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-medium leading-snug">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Suggested Alternatives</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 border border-gray-200 rounded-xl bg-white">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-1 rounded-md mb-2 inline-block">Dream</span>
                        <p className="font-semibold text-gray-900">{result.alternatives.dream}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 border border-gray-200 rounded-xl bg-white">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block">Better</span>
                        <p className="font-semibold text-gray-900">{result.alternatives.better}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 border border-gray-200 rounded-xl bg-white">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-md mb-2 inline-block">Safer</span>
                        <p className="font-semibold text-gray-900">{result.alternatives.safer}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecisionAnalysis;
