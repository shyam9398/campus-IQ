import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const EXAMS = [
  { name: 'JEE Main', type: 'Engineering', colleges: '1500+ Colleges', color: '#3b82f6' },
  { name: 'NEET', type: 'Medical', colleges: '500+ Colleges', color: '#10b981' },
  { name: 'CAT', type: 'Management', colleges: '800+ Colleges', color: '#f59e0b' },
  { name: 'CLAT', type: 'Law', colleges: '120+ Colleges', color: '#8b5cf6' },
  { name: 'GATE', type: 'Engineering', colleges: '900+ Colleges', color: '#ec4899' },
  { name: 'CUET', type: 'Undergrad', colleges: '250+ Univs', color: '#06b6d4' }
];

const BrowseByExam = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold text-gray-900 text-center">Browse by Top Exams</h2>
        <p className="text-gray-600 text-lg text-center mt-3 mb-10">Find colleges accepting scores from major entrance tests</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {EXAMS.map(exam => (
            <div key={exam.name} className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col cursor-pointer group border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{exam.name}</h3>
              </div>
              <div className="mb-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${exam.color}15`, color: exam.color }}>
                  {exam.type}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm font-medium mb-5 mt-auto">
                <CheckCircle size={16} style={{ color: exam.color }} />
                <span>Accepted in {exam.colleges}</span>
              </div>
              <button className="mt-5 inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                View Details <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByExam;
