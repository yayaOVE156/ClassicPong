import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for easy access
export function AccessUser() {
  return useContext(UserContext);
}