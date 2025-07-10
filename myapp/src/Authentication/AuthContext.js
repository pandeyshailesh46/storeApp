import React, { createContext, useContext, useEffect, useState } from "react";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.access_token && data.refresh_token) {
        localStorage.setItem("token", data.access_token);
        setUser({ token: data.access_token });
      } else {
        alert("Invalid login");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Authcontext.Provider value={{ login, logOut, user }}>
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => useContext(Authcontext);
