import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { colleges } from '../data/colleges';
import { Search } from 'lucide-react';

const BrowsePage = () => {
  const navigate = useNavigate();
  const { API_URL } = useAuth();
  const { savedColleges, toggleSaveCollege, compareTray, addToCompare } = useAppContext();
  
  const [collegesList, setCollegesList] = useState(colleges);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    fetchColleges();
  }, [searchQuery, activeFilters]);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      if (API_URL) {
        let url = `${API_URL}/colleges?search=${searchQuery}`;
        await axios.get(url);
      }
      applyLocalFiltering();
    } catch (err) {
      applyLocalFiltering();
    } finally {
      setLoading(false);
    }
  };

  const applyLocalFiltering = () => {
    let filtered = [...colleges];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        (c.name && c.name.toLowerCase().includes(q)) || 
        (c.location && c.location.toLowerCase().includes(q)) ||
        (c.course && c.course.toLowerCase().includes(q))
      );
    }

    const courses = ['Engineering', 'Management', 'Medicine', 'Law', 'Science'].filter(c => activeFilters.includes(c));
    const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune', 'Hyderabad', 'Kolkata'].filter(l => activeFilters.includes(l));
    const types = ['Public', 'Private'].filter(t => activeFilters.includes(t));
    const exams = ['JEE Main', 'JEE Advanced', 'NEET', 'CAT', 'CLAT', 'CUET', 'Merit', 'BITSAT', 'VITEEE', 'SRMJEEE', 'MET', 'KVPY'].filter(e => activeFilters.includes(e));

    if (courses.length > 0) filtered = filtered.filter(c => courses.includes(c.course));
    if (locations.length > 0) filtered = filtered.filter(c => locations.includes(c.location));
    if (types.length > 0) filtered = filtered.filter(c => types.includes(c.collegeType));
    if (exams.length > 0) filtered = filtered.filter(c => exams.some(exam => (c.exams || c.examsAccepted) && (c.exams || c.examsAccepted).includes(exam)));

    setCollegesList(filtered);
  };

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          
          {/* LEFT FILTER SIDEBAR */}
          <div className="w-[300px] shrink-0">
            <div className="sticky top-6 bg-white rounded-2xl shadow-lg p-6 h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Filters</h2>

              {/* Location Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">Location</h3>
                {['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune', 'Hyderabad', 'Kolkata'].map(loc => (
                  <div key={loc} className="flex items-center gap-3 mb-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-blue-600"
                      checked={activeFilters.includes(loc)}
                      onChange={() => toggleFilter(loc)}
                      id={`loc-${loc}`}
                    />
                    <label htmlFor={`loc-${loc}`} className="text-gray-700 font-medium cursor-pointer">
                      {loc}
                    </label>
                  </div>
                ))}
              </div>

              {/* Course Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">Course</h3>
                {['Engineering', 'Management', 'Medicine', 'Law', 'Science'].map(course => (
                  <div key={course} className="flex items-center gap-3 mb-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-blue-600"
                      checked={activeFilters.includes(course)}
                      onChange={() => toggleFilter(course)}
                      id={`course-${course}`}
                    />
                    <label htmlFor={`course-${course}`} className="text-gray-700 font-medium cursor-pointer">
                      {course}
                    </label>
                  </div>
                ))}
              </div>

              {/* College Type Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">College Type</h3>
                {['Public', 'Private'].map(type => (
                  <div key={type} className="flex items-center gap-3 mb-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-blue-600"
                      checked={activeFilters.includes(type)}
                      onChange={() => toggleFilter(type)}
                      id={`type-${type}`}
                    />
                    <label htmlFor={`type-${type}`} className="text-gray-700 font-medium cursor-pointer">
                      {type}
                    </label>
                  </div>
                ))}
              </div>

              {/* Exams Accepted Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">Exams Accepted</h3>
                {['JEE Main', 'JEE Advanced', 'NEET', 'CAT', 'CLAT', 'CUET', 'Merit', 'BITSAT', 'VITEEE', 'SRMJEEE', 'MET', 'KVPY'].map(exam => (
                  <div key={exam} className="flex items-center gap-3 mb-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-blue-600"
                      checked={activeFilters.includes(exam)}
                      onChange={() => toggleFilter(exam)}
                      id={`exam-${exam}`}
                    />
                    <label htmlFor={`exam-${exam}`} className="text-gray-700 font-medium cursor-pointer">
                      {exam}
                    </label>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1">

            {/* TOP BAR */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="relative w-full max-w-xl group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search size={22} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search colleges, cities, exams..."
                  className="w-full bg-gradient-to-r from-gray-50 to-white border border-gray-200 text-gray-900 text-lg rounded-full focus:ring-4 focus:ring-blue-100 focus:border-blue-500 block pl-14 pr-6 py-3.5 shadow-sm hover:shadow-md transition-all duration-300 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                <p className="font-bold text-gray-700 whitespace-nowrap bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                  <span className="text-blue-700">{collegesList.length}</span> Results
                </p>

                <select className="border border-gray-200 rounded-xl px-5 py-3 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-gray-700 transition-all shadow-sm cursor-pointer">
                  <option>Relevance</option>
                  <option>Highest Rating</option>
                  <option>Lowest Fees</option>
                </select>
              </div>
            </div>

            {/* COLLEGE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                <div className="col-span-2 flex justify-center py-20">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
              ) : collegesList.length === 0 ? (
                <div className="col-span-2 bg-white rounded-2xl shadow-lg p-10 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">0 Results Found</h3>
                  <p className="text-gray-500 mb-4">We couldn't find any colleges matching your criteria.</p>
                  <button 
                    onClick={() => { setActiveFilters([]); setSearchQuery(''); }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                collegesList.map((college) => (
                  <div
                    key={college.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                  >
                    {/* IMAGE */}
                    <img
                      src={college.image || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000"}
                      alt={college.name}
                      className="w-full h-52 object-cover"
                    />

                    {/* CONTENT */}
                    <div className="p-5">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {college.name}
                      </h2>
                      <p className="text-gray-500 mt-1">
                        {college.location}
                      </p>

                      {/* BADGES */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {college.nirfRank && (
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                            NIRF #{college.nirfRank}
                          </span>
                        )}
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          {college.exams || college.examsAccepted}
                        </span>
                      </div>

                      {/* DETAILS */}
                      <div className="mt-4 space-y-2">
                        <p>
                          <strong>Fees:</strong> {college.fees}
                        </p>
                        <p>
                          <strong>Avg Package:</strong> {college.avgPackage}
                        </p>
                      </div>

                      {/* DESCRIPTION */}
                      <p className="text-gray-600 mt-4 line-clamp-2">
                        {college.description}
                      </p>

                      {/* BUTTONS */}
                      <div className="flex gap-3 mt-6">
                        <button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition"
                          onClick={() => navigate(`/college/${college.id}`)}
                        >
                          View Details
                        </button>
                        <button 
                          className={`px-4 py-2 border rounded-xl font-semibold transition ${
                            savedColleges.some(c => c.id === college.id) 
                              ? 'bg-blue-50 border-blue-200 text-blue-600' 
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                          onClick={() => toggleSaveCollege(college)}
                        >
                          {savedColleges.some(c => c.id === college.id) ? 'Saved' : 'Save'}
                        </button>
                        <button 
                          className={`px-4 py-2 border rounded-xl font-semibold transition ${
                            compareTray.some(c => c.id === college.id) 
                              ? 'bg-blue-50 border-blue-200 text-blue-600' 
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                          onClick={() => addToCompare(college)}
                        >
                          {compareTray.some(c => c.id === college.id) ? 'Comparing' : 'Compare'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
