import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Browse', path: '/browse' },
    { name: 'Saved', path: '/saved' },
    { name: 'Compare', path: '/compare' },
    { name: 'Rank Predictor', path: '/rank-predictor' },
    { name: 'Decision Analysis', path: '/decision-analysis' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <GraduationCap size={32} className="logo-icon" />
          <span>CampusIQ</span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links hidden-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="navbar-actions hidden-mobile">
          {user ? (
            <div className="user-profile">
              <span className="user-name">{user.name}</span>
              <button onClick={logout} className="logout-btn" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="btn-primary"
            >
              Login / Sign Up
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
