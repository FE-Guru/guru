import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const islogin = () => setIsAuthenticated(true);
  const isLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return <AuthContext.Provider value={{ isAuthenticated, islogin, isLogout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
