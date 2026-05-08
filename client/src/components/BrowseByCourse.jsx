import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, GraduationCap, Gavel, Microscope, HeartPulse, TrendingUp, ArrowRight } from 'lucide-react';

const BrowseByCourse = () => {
  const navigate = useNavigate();

  const courses = [
    { name: 'Engineering', icon: <TrendingUp size={40} />, color: '#3b82f6', path: '/browse?course=Engineering' },
    { name: 'Management', icon: <Briefcase size={40} />, color: '#6366f1', path: '/browse?course=Management' },
    { name: 'Medicine', icon: <HeartPulse size={40} />, color: '#ef4444', path: '/browse?course=Medicine' },
    { name: 'Law', icon: <Gavel size={40} />, color: '#334155', path: '/browse?course=Law' },
    { name: 'Science', icon: <Microscope size={40} />, color: '#10b981', path: '/browse?course=Science' },
    { name: 'Commerce', icon: <GraduationCap size={40} />, color: '#f59e0b', path: '/browse?course=Commerce' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold text-gray-900 text-center">Browse By Course</h2>
        <p className="text-gray-600 text-lg text-center mt-3 mb-10">Explore top institutions categorized by specialized fields of study.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {courses.map(course => (
            <div 
              key={course.name}
              onClick={() => navigate(course.path)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col items-center justify-center cursor-pointer group"
            >
              <div className="text-4xl mb-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" style={{ color: course.color }}>
                {course.icon}
              </div>
              <span className="text-xl font-semibold text-gray-800 text-center">{course.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button onClick={() => navigate('/browse')} className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition inline-flex items-center gap-2">
             View All Courses <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCourse;
