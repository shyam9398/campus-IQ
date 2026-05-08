import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import TopColleges from './components/TopColleges';
import DecisionAnalysis from './components/DecisionAnalysis';
import BrowseByCourse from './components/BrowseByCourse';
import BrowseByExam from './components/BrowseByExam';
import TopCities from './components/TopCities';
import FeaturedColleges from './components/FeaturedColleges';
import WhyCampusIQ from './components/WhyCampusIQ';
import Testimonials from './components/Testimonials';
import BrowsePage from './components/BrowsePage';
import CollegeDetailPage from './components/CollegeDetailPage';
import SavedPage from './components/SavedPage';
import ComparePage from './components/ComparePage';
import RankPredictorPage from './components/RankPredictorPage';
import DecisionAnalysisPage from './components/DecisionAnalysisPage';
import Chatbot from './components/Chatbot';
import './App.css';

const HomePage = () => (
  <div className="home-page">
    <Hero />
    <Stats />
    <TopColleges />
    <DecisionAnalysis />
    <BrowseByCourse />
    <BrowseByExam />
    <TopCities />
    <FeaturedColleges />
    <WhyCampusIQ />
    <Testimonials />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/browse" element={<BrowsePage />} />
                <Route path="/college/:id" element={<CollegeDetailPage />} />
                <Route path="/saved" element={<SavedPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/rank-predictor" element={<RankPredictorPage />} />
                <Route path="/decision-analysis" element={<DecisionAnalysisPage />} />
              </Routes>
            </main>
            <Chatbot />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
