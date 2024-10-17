import React, { createContext, useState, useContext } from 'react';
import defaultIcons from './icons-toolbar/k8sDefaultIcons';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState(defaultIcons);
  const [selectedNodeTooltipId, setSelectedNodeTooltipId] = useState(null);

  return (
    <GlobalContext.Provider value={{
      searchResults, setSearchResults,
      selectedNodeTooltipId, setSelectedNodeTooltipId
     }}>
      {children}
    </GlobalContext.Provider>
  );
};
