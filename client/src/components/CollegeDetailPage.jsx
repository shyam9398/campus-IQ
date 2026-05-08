import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Star, Heart, GitCompare, Share2, CheckCircle, AlertTriangle, Building, BookOpen, TrendingUp, Award, ExternalLink, Users, Map, Globe, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { colleges } from '../data/colleges';

const CollegeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API_URL } = useAuth();
  const { savedColleges, toggleSaveCollege, addToCompare, compareTray } = useAppContext();
  
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const fetchCollege = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/colleges/${id}`);
        if (res.data) {
          setCollege(res.data);
        } else {
          fallbackToLocal();
        }
      } catch (err) {
        fallbackToLocal();
      } finally {
        setLoading(false);
      }
    };
    
    const fallbackToLocal = () => {
      // id from params is a string, college.id might be a number
      const found = colleges.find(c => c.id.toString() === id.toString());
      setCollege(found || null);
    };

    fetchCollege();
  }, [id, API_URL]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (!college) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">College Not Found</h2>
      <button onClick={() => navigate('/browse')} className="bg-blue-600 text-white px-6 py-2 rounded-xl">Go Back</button>
    </div>
  );

  const isSaved = savedColleges.some(c => c.id === college.id);
  const isComparing = compareTray.some(c => c.id === college.id);
  const tabs = ['Overview', 'Courses', 'Placements', 'Facilities', 'Gallery'];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Top Banner Section */}
      <div className="relative h-[250px] md:h-[320px] bg-gray-900 w-full">
        <img 
          src={college.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80"} 
          alt="Campus Banner" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      </div>

      {/* Main Content Container with Overlapping Header Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative -mt-24 md:-mt-32">
        
        {/* College Header Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                NIRF #{college.nirfRank || college.nirf_rank || "NA"}
              </span>
              <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-yellow-100">
                <Star size={14} fill="currentColor" /> {college.rating} Rating
              </span>
              <span className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200">
                {college.collegeType || college.college_type}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
              {college.name}
            </h1>
            
            <p className="text-gray-500 flex items-center gap-2 font-medium">
              <MapPin size={18} className="text-gray-400" /> {college.location}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0 mt-4 md:mt-0 w-full md:w-auto">
            <button 
              onClick={() => toggleSaveCollege(college)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${isSaved ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-red-500'}`}
            >
              <Heart size={20} fill={isSaved ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={() => addToCompare(college)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${isComparing ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-blue-600'}`}
            >
              <GitCompare size={20} />
            </button>
            <button className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg transition-colors">
              Apply Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Middle: Tabbed Details Section */}
          <div className="lg:col-span-2">
            
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm p-2 mb-6 flex overflow-x-auto no-scrollbar">
              {tabs.map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${activeTab === tab ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content Areas */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              
              {/* OVERVIEW TAB */}
              {activeTab === 'Overview' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Institution</h2>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    {college.description || `${college.name} is one of India's premier educational institutions located in ${college.location}. Established with a vision to provide quality education and foster innovation.`}
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><BookOpen size={20} /></div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Exams Accepted</p>
                        <p className="font-bold text-gray-900">{college.examsAccepted || college.exams}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Award size={20} /></div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Domain</p>
                        <p className="font-bold text-gray-900">{college.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="bg-green-100 p-2 rounded-lg text-green-600"><Users size={20} /></div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Total Students</p>
                        <p className="font-bold text-gray-900">{college.totalStudents || "5,000+"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><Map size={20} /></div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Campus Size</p>
                        <p className="font-bold text-gray-900">{college.campusSize || "200 Acres"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PLACEMENTS TAB */}
              {activeTab === 'Placements' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Placement Statistics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                      <p className="text-blue-600 font-semibold mb-2">Highest Package</p>
                      <p className="text-3xl font-extrabold text-gray-900">{college.highestPackage || college.highest_package || "N/A"}</p>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
                      <p className="text-green-600 font-semibold mb-2">Average Package</p>
                      <p className="text-3xl font-extrabold text-gray-900">{college.avgPackage || college.avg_package || "N/A"}</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 text-center">
                      <p className="text-purple-600 font-semibold mb-2">Placement Rate</p>
                      <p className="text-3xl font-extrabold text-gray-900">{college.placementPercentage || college.placement_rate || "N/A"}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">Top Recruiters</h3>
                  <div className="flex flex-wrap gap-3">
                    {college.topRecruiters ? (
                      college.topRecruiters.map(r => (
                        <span key={r} className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium shadow-sm flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500" /> {r}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">Recruiter data not available.</p>
                    )}
                  </div>
                </div>
              )}

              {/* COURSES TAB */}
              {activeTab === 'Courses' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses Offered</h2>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-6">
                    <p className="text-gray-500 font-medium mb-1 uppercase tracking-wider text-sm">Estimated Fees (1st Year)</p>
                    <p className="text-3xl font-extrabold text-blue-600">{college.fees}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {college.coursesOffered ? (
                      college.coursesOffered.map(course => (
                        <div key={course} className="flex items-center gap-3 bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                          <div className="bg-blue-100 p-2 rounded-full text-blue-600"><GraduationCap size={18} /></div>
                          <span className="font-semibold text-gray-800">{course}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">Course list not available.</p>
                    )}
                  </div>
                </div>
              )}

              {/* FACILITIES TAB */}
              {activeTab === 'Facilities' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Campus Facilities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {college.facilities ? (
                      college.facilities.map(fac => (
                        <div key={fac} className="flex flex-col items-center justify-center bg-gray-50 border border-gray-100 p-6 rounded-2xl text-center shadow-sm">
                          <ShieldCheck size={32} className="text-blue-500 mb-3" />
                          <span className="font-semibold text-gray-800">{fac}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">Facilities data not available.</p>
                    )}
                  </div>
                </div>
              )}

              {/* GALLERY TAB */}
              {activeTab === 'Gallery' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Campus Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <img src={college.image} alt="Campus 1" className="w-full h-48 object-cover rounded-xl shadow-sm hover:opacity-90 transition cursor-pointer" />
                    <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80" alt="Campus 2" className="w-full h-48 object-cover rounded-xl shadow-sm hover:opacity-90 transition cursor-pointer" />
                    <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80" alt="Campus 3" className="w-full h-48 object-cover rounded-xl shadow-sm hover:opacity-90 transition cursor-pointer" />
                    <img src="https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=800&q=80" alt="Campus 4" className="w-full h-48 object-cover rounded-xl shadow-sm hover:opacity-90 transition cursor-pointer" />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Side: Quick Info Sidebar */}
          <div className="lg:col-span-1">
            
            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 sticky top-6">
              <div className="bg-blue-600 p-6 text-center text-white">
                <h3 className="text-xl font-bold mb-2">Interested in Admission?</h3>
                <p className="text-blue-100 text-sm">Get personalized expert guidance</p>
              </div>
              <div className="p-6">
                <form className="flex flex-col gap-4">
                  <input type="text" placeholder="Full Name" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                  <input type="email" placeholder="Email Address" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                  <input type="tel" placeholder="Phone Number" className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                  <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-md shadow-blue-600/20 mt-2">
                    Request Callback
                  </button>
                </form>
              </div>
            </div>

            {/* Official Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Official Details</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Globe className="text-gray-400 shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Website</p>
                    <a href={college.website || "#"} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                      {college.website || `www.${college.name.toLowerCase().replace(/\s/g, '')}.edu.in`}
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Building className="text-gray-400 shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Established</p>
                    <p className="text-gray-900 font-medium">{college.establishedYear || "1960"}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

// Needed for the missing icon in the code
const GraduationCap = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

export default CollegeDetailPage;
