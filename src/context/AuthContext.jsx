import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import axiosInstance from "../services/axiosConfig";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.roles);
      setUserName(decoded.fullName ? decoded.fullName.substring(0, decoded.fullName.indexOf(' ')) : null);
      
    }
  }, [token]);

  const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  };

  return (
    <AuthContext.Provider value={{ token, userRole, userName, isTokenExpired }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
