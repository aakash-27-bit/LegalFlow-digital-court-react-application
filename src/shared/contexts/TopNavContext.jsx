import React, { createContext, useContext, useState } from 'react';

const TopNavContext = createContext();

export const TopNavProvider = ({ children }) => {
  const [topNavConfig, setTopNavConfig] = useState({
    title: '',
    description: '',
    buttons: []
  });

  const updateTopNav = (config) => {
    setTopNavConfig(config);
  };

  return (
    <TopNavContext.Provider value={{ topNavConfig, updateTopNav }}>
      {children}
    </TopNavContext.Provider>
  );
};

export const useTopNav = () => {
  const context = useContext(TopNavContext);
  if (!context) {
    throw new Error('useTopNav must be used within a TopNavProvider');
  }
  return context;
};
