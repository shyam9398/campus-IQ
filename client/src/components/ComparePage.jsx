import React from 'react';
import { GitCompare, Plus, TrendingUp, Award, X, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ComparePage = () => {
  const navigate = useNavigate();
  const { compareTray, addToCompare } = useAppContext();

  if (compareTray.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <GitCompare size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">No colleges selected</h2>
          <p className="text-gray-500 mb-8">Select up to 3 colleges from the Browse page to see a detailed side-by-side comparison.</p>
          <button 
            onClick={() => navigate('/browse')} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md inline-flex items-center gap-2"
          >
            Browse Colleges <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    { label: "Overview", keys: [
      { name: "Location", key: "location" },
      { name: "Type", key: "collegeType" },
      { name: "NIRF Rank", key: "nirfRank" },
      { name: "Rating", key: "rating" },
    ]},
    { label: "Academics & Admissions", keys: [
      { name: "Course", key: "course" },
      { name: "Exams Accepted", key: "exams" },
      { name: "Fees", key: "fees" },
    ]},
    { label: "Placements", keys: [
      { name: "Avg Package", key: "avgPackage" },
      { name: "Highest Package", key: "highestPackage" },
      { name: "Placement Rate", key: "placementPercentage" },
    ]}
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <header className="mb-10 text-center md:text-left">
           <h1 className="text-4xl font-bold text-gray-900 mb-3">Comparison Analysis</h1>
           <p className="text-gray-600 text-lg">Detailed side-by-side evaluation of your top {compareTray.length} choices.</p>
        </header>

        {/* AI Recommendations */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
           <div className="flex items-center gap-2 mb-6 text-blue-600">
              <Sparkles size={24} />
              <h2 className="text-2xl font-bold text-gray-900">AI Verdict</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 bg-blue-50 border border-blue-100 p-5 rounded-xl">
                 <div className="bg-blue-600 text-white p-3 rounded-lg"><Award size={24} /></div>
                 <div>
                    <span className="text-sm font-semibold text-blue-800 uppercase tracking-wider block mb-1">Best Overall</span>
                    <strong className="text-xl text-gray-900">{compareTray[0]?.name}</strong>
                 </div>
              </div>
              <div className="flex items-center gap-4 bg-green-50 border border-green-100 p-5 rounded-xl">
                 <div className="bg-green-600 text-white p-3 rounded-lg"><TrendingUp size={24} /></div>
                 <div>
                    <span className="text-sm font-semibold text-green-800 uppercase tracking-wider block mb-1">Best ROI</span>
                    <strong className="text-xl text-gray-900">{compareTray[1]?.name || compareTray[0]?.name}</strong>
                 </div>
              </div>
           </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
             <thead>
                <tr>
                   <th className="w-1/4 p-6 bg-gray-50 border-b border-gray-200 font-bold text-gray-700 text-lg">
                     Parameters
                   </th>
                   {compareTray.map(college => (
                      <th key={college.id} className="w-1/4 p-6 border-b border-l border-gray-200 relative align-top bg-white">
                         <button 
                           className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition"
                           onClick={() => addToCompare(college)}
                           title="Remove from comparison"
                         >
                            <X size={18} />
                         </button>
                         <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-4">
                           {college.name.charAt(0)}
                         </div>
                         <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight pr-8">{college.name}</h3>
                         <p className="text-gray-500 font-medium text-sm">{college.location}</p>
                      </th>
                   ))}
                   {Array(3 - compareTray.length).fill(0).map((_, i) => (
                      <th key={i} className="w-1/4 p-6 border-b border-l border-gray-200 align-top bg-gray-50/50">
                         <div className="w-16 h-16 border-2 border-dashed border-gray-300 text-gray-400 rounded-xl flex items-center justify-center mb-4">
                            <Plus size={24} />
                         </div>
                         <h3 className="text-gray-400 font-bold mb-3">Empty Slot</h3>
                         <button 
                           className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-semibold transition text-sm w-full" 
                           onClick={() => navigate('/browse')}
                         >
                           Add College
                         </button>
                      </th>
                   ))}
                </tr>
             </thead>
             <tbody>
                {sections.map(section => (
                   <React.Fragment key={section.label}>
                      <tr>
                         <td colSpan="4" className="bg-gray-100 px-6 py-3 font-bold text-gray-800 text-sm uppercase tracking-wider border-y border-gray-200">
                           {section.label}
                         </td>
                      </tr>
                      {section.keys.map((item, idx) => (
                         <tr key={item.name} className="hover:bg-gray-50 transition-colors">
                            <td className="p-6 border-b border-gray-100 font-semibold text-gray-700">
                              {item.name}
                            </td>
                            {compareTray.map(college => (
                               <td key={college.id} className="p-6 border-b border-l border-gray-100 text-gray-900">
                                 {college[item.key] || college.examsAccepted || 'N/A'}
                               </td>
                            ))}
                            {Array(3 - compareTray.length).fill(0).map((_, i) => (
                               <td key={i} className="p-6 border-b border-l border-gray-100 text-gray-400 text-center">
                                 —
                               </td>
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
