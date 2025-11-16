// src/auth.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./api";

const AuthContext = createContext();

function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      const payload = decodeToken(t);
      if (payload) setUser(payload);
    }
  }, []);

  async function login(email, password) {
    const r = await api.post("/auth/login", { email, password });
    if (r?.data?.token) {
      localStorage.setItem("token", r.data.token);
      const payload = decodeToken(r.data.token);
      setUser(payload);
    }
    return r.data; // contains { token, user }
  }

  // register accepts optional role ('admin' | 'user')
  async function register(name, email, password, role = "user", adminSecret = "") {
  return api.post("/auth/register", {
    name,
    email,
    password,
    role,
    adminSecret
  });
}

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// import React, { createContext, useContext, useEffect, useState } from "react";
// import api from "./api";

// const AuthContext = createContext();

// function decodeToken(token) {
//   try {
//     const payload = token.split(".")[1];
//     return JSON.parse(atob(payload));
//   } catch {
//     return null;
//   }
// }

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const t = localStorage.getItem("token");
//     if (t) {
//       const payload = decodeToken(t);
//       if (payload) setUser(payload);
//     }
//   }, []);

//   async function login(email, password) {
//     const r = await api.post("/auth/login", { email, password });
//     localStorage.setItem("token", r.data.token);

//     const payload = decodeToken(r.data.token);
//     setUser(payload);

//     return r.data;
//   }

//   async function register(name, email, password) {
//     return api.post("/auth/register", { name, email, password });
//   }

//   function logout() {
//     localStorage.removeItem("token");
//     setUser(null);
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
