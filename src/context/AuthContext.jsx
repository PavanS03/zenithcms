import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser && parsedUser.email) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("user");
        }
      }
    } catch (error) {
      localStorage.removeItem("user");
    }

    setLoading(false);
  }, []);


  const login = (userData) => {
    if (!userData || !userData.email) return;


    let role = "user";
    if (userData.email === "admin@gmail.com") {
      role = "admin";
    }

    const formattedUser = {
      username: userData.username || userData.email.split("@")[0],
      email: userData.email,
      role
    };

    localStorage.setItem("user", JSON.stringify(formattedUser));
    setUser(formattedUser);
  };


  const register = (userData) => {
    if (!userData || !userData.email) return;

    let role = "user";
    if (userData.email === "admin@gmail.com") {
      role = "admin";
    }

    const formattedUser = {
      username: userData.username || userData.email.split("@")[0],
      email: userData.email,
      role
    };

    localStorage.setItem("user", JSON.stringify(formattedUser));
    setUser(formattedUser);
  };

  
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}