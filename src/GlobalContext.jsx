import React, { createContext, useState, useContext } from 'react';
import defaultIcons from './icons-toolbar/k8sDefaultIcons';

const GlobalContext = createContext();

// Custom hook to use the IconContext
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [searchResults, setSearchResults]
  = useState(defaultIcons);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  return (
    <GlobalContext.Provider value={{
      searchResults, setSearchResults,
      selectedNodeId, setSelectedNodeId
     }}>
      {children}
    </GlobalContext.Provider>
  );
};
