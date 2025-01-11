import React, { createContext, useState } from 'react';

export const GlobalContext = createContext(null);

// Create Context Provider Component
export const GlobalContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <GlobalContext.Provider value={{ userData, setUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};
