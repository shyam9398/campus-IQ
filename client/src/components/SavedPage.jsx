import React from 'react';
import { Heart, GitCompare, ArrowRight, Trash2, MapPin, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const SavedPage = () => {
  const navigate = useNavigate();
  const { savedColleges, toggleSaveCollege, addToCompare, compareTray } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Saved Colleges</h1>
          <p className="text-gray-600 text-lg">You have {savedColleges.length} institutions in your shortlist.</p>
        </header>

        {savedColleges.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No saved colleges yet</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Start exploring and save colleges to build your perfect shortlist and compare them later.</p>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md inline-flex items-center gap-2"
              onClick={() => navigate('/browse')}
            >
              Start Browsing <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedColleges.map(college => {
              const isComparing = compareTray.some(c => c.id === college.id);
              return (
                <div key={college.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 flex flex-col h-full border border-gray-100 overflow-hidden group">
                  {/* IMAGE */}
                  <div className="relative">
                    <img
                      src={college.image || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000"}
                      alt={college.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button 
                      onClick={() => toggleSaveCollege(college)}
                      className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 shadow-sm transition"
                      title="Remove from saved"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{college.name}</h2>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                      <MapPin size={16} /> {college.location}
                    </p>

                    {/* DETAILS */}
                    <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-50 p-4 rounded-xl">
                      <div>
                        <span className="text-xs text-gray-500 font-semibold uppercase block mb-1">Fees</span>
                        <span className="font-bold text-gray-900">{college.fees}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-semibold uppercase block mb-1">Avg Package</span>
                        <span className="font-bold text-green-600">{college.avgPackage || college.avg_package || 'N/A'}</span>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-auto flex gap-3 pt-2">
                      <button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition text-sm"
                        onClick={() => navigate(`/college/${college.id}`)}
                      >
                        View Details
                      </button>
                      <button 
                        className={`flex-1 px-4 py-2 border rounded-xl font-semibold transition text-sm flex items-center justify-center gap-2 ${
                          isComparing 
                            ? 'bg-blue-50 border-blue-200 text-blue-600' 
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                        onClick={() => addToCompare(college)}
                      >
                        <GitCompare size={16} />
                        {isComparing ? 'Comparing' : 'Compare'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPage;
