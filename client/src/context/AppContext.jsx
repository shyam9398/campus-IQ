import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user, API_URL } = useAuth();
  const [savedColleges, setSavedColleges] = useState([]);
  const [compareTray, setCompareTray] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      fetchSavedColleges();
    } else {
      setSavedColleges([]);
    }
  }, [user]);

  const fetchSavedColleges = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/saved`);
      setSavedColleges(res.data);
    } catch (err) {
      console.error("Failed to fetch saved colleges");
    }
  };

  const toggleSaveCollege = async (college) => {
    if (!user) return alert("Please login to save colleges");
    
    const isSaved = savedColleges.some(c => c.id === college.id);
    try {
      if (isSaved) {
        await axios.delete(`${API_URL}/user/save/${college.id}`);
        setSavedColleges(prev => prev.filter(c => c.id !== college.id));
      } else {
        await axios.post(`${API_URL}/user/save`, { collegeId: college.id });
        setSavedColleges(prev => [...prev, college]);
      }
    } catch (err) {
      console.error("Save toggle failed");
    }
  };

  const addToCompare = (college) => {
    if (compareTray.some(c => c.id === college.id)) {
      setCompareTray(prev => prev.filter(c => c.id !== college.id));
      return;
    }
    if (compareTray.length >= 3) {
      return alert("You can compare maximum 3 colleges");
    }
    setCompareTray(prev => [...prev, college]);
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
