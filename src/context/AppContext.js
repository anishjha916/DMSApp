import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);

  return (
    <AppContext.Provider value={{ user, setUser, files, setFiles }}>
      {children}
    </AppContext.Provider>
  );
};
