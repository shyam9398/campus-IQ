import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user } = useAuth();
  
  // Initialize from local storage
  const [savedColleges, setSavedColleges] = useState(() => {
    try {
      const item = window.localStorage.getItem('savedColleges');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      return [];
    }
  });

  const [compareTray, setCompareTray] = useState(() => {
    try {
      const item = window.localStorage.getItem('compareTray');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Sync with local storage
  useEffect(() => {
    window.localStorage.setItem('savedColleges', JSON.stringify(savedColleges));
  }, [savedColleges]);

  useEffect(() => {
    window.localStorage.setItem('compareTray', JSON.stringify(compareTray));
  }, [compareTray]);

  const toggleSaveCollege = (college) => {
    const isSaved = savedColleges.some(c => c.id === college.id);
    if (isSaved) {
      setSavedColleges(prev => prev.filter(c => c.id !== college.id));
    } else {
      setSavedColleges(prev => [...prev, college]);
    }
  };

  const addToCompare = (college) => {
    const isComparing = compareTray.some(c => c.id === college.id);
    if (isComparing) {
      setCompareTray(prev => prev.filter(c => c.id !== college.id));
    } else {
      if (compareTray.length >= 3) {
        alert("You can compare a maximum of 3 colleges side-by-side.");
        return;
      }
      setCompareTray(prev => [...prev, college]);
    }
  };

  return (
    <AppContext.Provider value={{ 
      savedColleges, 
      toggleSaveCollege, 
      compareTray, 
      addToCompare,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
