import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMaster, setIsMaster] = useState(false);
  const [loading, setLoading] = useState(true);

  const validateToken = async () => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/validaToken`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });

        if(response.data){
          setIsAuthenticated(true); 

          if(response.data.empresa_id === 1){
            setIsMaster(true);
          } else {
            setIsMaster(false)
          }

        } else {
          setIsAuthenticated(false); 
        }

        setLoading(false); 

      } catch (error) {
        console.error("Erro ao acessar a rota protegida:", error);
        setIsAuthenticated(false); 
        setLoading(false); 
      }
    } else {
      console.log("Token não encontrado. Redirecionando para login.");
      setIsAuthenticated(false); 
      setLoading(false); 
    }

  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setIsMaster(false);
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isMaster, loading, validateToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
