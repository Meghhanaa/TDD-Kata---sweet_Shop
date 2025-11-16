import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./auth.jsx";
import { CartProvider } from './cart.jsx';
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// import React from 'react';
// import { Routes, Route, Link, useNavigate } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Admin from './pages/Admin';
// import { useAuth } from './auth';

// export default function App(){
//   const { user, logout } = useAuth();
//   const nav = useNavigate();
//   return (
//     <div>
//       <nav className="bg-gray-800 text-white">
//         <div className="container flex items-center justify-between h-16">
//           <div className="flex items-center space-x-6">
//             <Link to="/" className="text-lg font-bold">Sweet Shop</Link>
//             <Link to="/" className="hover:underline">Home</Link>
//             <Link to="/" className="hover:underline">Available Sweets</Link>
//             {user?.role === 'admin' && <Link to="/admin" className="hover:underline">Admin</Link>}
//           </div>
//           <div className="flex items-center space-x-4">
//             {!user ? (
//               <>
//                 <Link to="/login" className="px-3 py-1 bg-indigo-600 rounded">Login</Link>
//                 <Link to="/register" className="px-3 py-1 border rounded">Register</Link>
//               </>
//             ) : (
//               <>
//                 <span className="mr-2">Hi, {user.name}</span>
//                 <button className="px-3 py-1 bg-red-500 rounded" onClick={() => { logout(); nav('/'); }}>Logout</button>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>

//       <main className="container py-8">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/admin" element={<Admin />} />
//         </Routes>
//       </main>
//     </div>
//   )
// }


// import React from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import './styles.css'

// function App(){
//   return (
//     <BrowserRouter>
//       <nav className="p-4 bg-gray-800 text-white flex space-x-4">
//         <Link to="/">Home</Link>
//         <Link to="/login">Login</Link>
//         <Link to="/register">Register</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/login" element={<Login/>}/>
//         <Route path="/register" element={<Register/>}/>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// createRoot(document.getElementById('root')).render(<App />)
