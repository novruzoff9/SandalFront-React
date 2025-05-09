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
    }
  }, [token]);

  const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  };

  useEffect(() => {
    if(localStorage.getItem("token") === null){
      return;
    }
    const fetchUserName = async () => {
      const response = await axiosInstance.get("/employee/current");
      setUserName(response.data.data.name);
    };
    fetchUserName();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, userRole, userName, isTokenExpired }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
