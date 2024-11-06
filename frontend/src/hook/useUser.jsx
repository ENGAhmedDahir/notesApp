import { createContext, useContext, useEffect, useState } from 'react';  

const UserContext = createContext(null);  

export const UserProvider = ({ children }) => {   
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationTime');
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const expirationTime = localStorage.getItem('expirationTime');

    if (storedUser && expirationTime) {
      const currentTime = new Date().getTime(); // Current time in milliseconds
      if (currentTime < parseInt(expirationTime)) {  // Compare with stored expiration time
        setUser(JSON.parse(storedUser)); // Set the user if not expired
      } else {
        logout(); // Otherwise, logout and clear session
      }
    }
  }, []);

  const login = (userData, expiresIn) => {
    const expirationTime = new Date().getTime() + expiresIn * 1000; // Expiration in milliseconds
    localStorage.setItem('expirationTime', expirationTime.toString());
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserContext;
