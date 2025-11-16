// src/App.jsx
import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import CartPage from "./pages/Cart";

import Footer from "./components/Footer";

import { useAuth } from "./auth";
import { useCart } from "./cart.jsx";

export default function App() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const nav = useNavigate();

  function doLogout() {
    logout();
    nav("/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 text-slate-800">

      {/* ========================== NAVBAR ========================== */}
      <nav className="
        sticky top-0 z-50 
        bg-white/70 backdrop-blur-xl 
        border-b border-amber-200/60 
        shadow-[0_4px_30px_rgba(255,165,0,0.15)]
      ">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">

          {/* LOGO */}
          <Link
            to="/"
            className="
              font-extrabold text-3xl tracking-wide 
              bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 
              bg-clip-text text-transparent 
              hover:opacity-90 transition
              drop-shadow-sm
            "
          >
            SweetShop
          </Link>

          {/* NAV LINKS — DESKTOP */}
          <div className="hidden md:flex items-center space-x-10 font-medium text-slate-700">
            <Link to="/" className="hover:text-rose-600 transition">Home</Link>

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="hover:text-yellow-700 font-semibold transition"
              >
                Admin
              </Link>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-6">

            {/* CART BUTTON */}
            <Link to="/cart" className="relative group">
              <div className="
                p-2 rounded-full bg-amber-100 
                hover:bg-amber-200 transition shadow-md
              ">
                <svg
                  className="w-7 h-7 text-amber-800 group-hover:text-rose-600 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h12l-2-7M10 21a1 1 0 11-2 0a1 1 0 012 0M18 21a1 1 0 11-2 0 1 1 0 012 0"
                  />
                </svg>
              </div>

              {/* CART BADGE */}
              {items.length > 0 && (
                <span className="
                  absolute -top-1 -right-1 
                  bg-red-600 text-white 
                  rounded-full text-xs w-5 h-5 
                  flex items-center justify-center 
                  shadow-lg
                ">
                  {items.length}
                </span>
              )}
            </Link>

            {/* LOGIN / REGISTER / LOGOUT */}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="
                    px-5 py-2 rounded-lg 
                    bg-gradient-to-r from-rose-600 to-orange-600 
                    text-white shadow-md 
                    hover:shadow-lg hover:scale-[1.03] 
                    transition font-semibold
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
                    px-5 py-2 rounded-lg 
                    border border-rose-300 text-rose-700 
                    bg-white/80 backdrop-blur-xl 
                    shadow-sm hover:bg-rose-50 
                    transition font-semibold
                  "
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="hidden md:block font-semibold text-slate-700">
                  Hi, {user.name}
                </span>

                <button
                  onClick={doLogout}
                  className="
                    px-5 py-2 rounded-lg 
                    bg-red-500 text-white shadow-md 
                    hover:bg-red-600 hover:shadow-lg 
                    transition font-semibold
                  "
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ========================== MAIN CONTENT ========================== */}
      <main className="flex-grow px-4 md:px-8 max-w-7xl mx-auto w-full animate-fadeIn pt-10 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>

      {/* ========================== FOOTER ========================== */}
      <Footer />
    </div>
  );
}


// // src/App.jsx
// import React from "react";
// import { Routes, Route, Link, useNavigate } from "react-router-dom";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Admin from "./pages/Admin";
// import CartPage from "./pages/Cart";

// import Footer from "./components/Footer";

// import { useAuth } from "./auth";
// import { useCart } from "./cart.jsx";

// export default function App() {
//   const { user, logout } = useAuth();
//   const { items } = useCart();
//   const nav = useNavigate();

//   function doLogout() {
//     logout();
//     nav("/");
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-white to-indigo-50 text-slate-800">

//       {/* ------------------------ NAVBAR ------------------------ */}
//       <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
//         <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">

//           {/* LOGO */}
//           <Link
//             to="/"
//             className="font-extrabold text-3xl bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent tracking-wide hover:opacity-80 transition"
//           >
//             SweetShop
//           </Link>

//           {/* CENTER NAV (Desktop Only) */}
//           <div className="hidden md:flex items-center space-x-8 font-medium text-slate-700">
//             <Link to="/" className="hover:text-indigo-600 transition">
//               Home
//             </Link>

//             {user?.role === "admin" && (
//               <Link
//                 to="/admin"
//                 className="hover:text-yellow-600 font-semibold transition"
//               >
//                 Admin
//               </Link>
//             )}
//           </div>

//           {/* RIGHT SECTION */}
//           <div className="flex items-center space-x-5">

//             {/* CART ICON */}
//             <Link to="/cart" className="relative group">
//               <div className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition shadow-sm">
//                 <svg
//                   className="w-7 h-7 text-slate-700 group-hover:text-indigo-600 transition"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h12l-2-7M10 21a1 1 0 11-2 0a1 1 0 012 0M18 21a1 1 0 11-2 0 1 1 0 012 0"
//                   />
//                 </svg>
//               </div>

//               {/* CART BADGE */}
//               {items.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow-md">
//                   {items.length}
//                 </span>
//               )}
//             </Link>

//             {/* AUTH BUTTONS */}
//             {!user ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-5 py-1.5 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-5 py-1.5 border border-slate-300 rounded-lg shadow hover:bg-slate-100 transition"
//                 >
//                   Register
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <span className="hidden md:block font-semibold text-slate-700">
//                   Hi, {user.name}
//                 </span>
//                 <button
//                   onClick={doLogout}
//                   className="px-5 py-1.5 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* ---------------------- MAIN PAGE CONTENT ---------------------- */}
//       <main className="flex-grow px-4 md:px-6 max-w-7xl mx-auto w-full animate-fadeIn pt-8 pb-16">
//         <Routes>
//           <Route path="/" element={<Home />} />

//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           <Route path="/admin" element={<Admin />} />

//           <Route path="/cart" element={<CartPage />} />
//         </Routes>
//       </main>

//       {/* ------------------------ FOOTER ------------------------ */}
//       <Footer />
//     </div>
//   );
// }


// // src/App.jsx
// import React from "react";
// import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Admin from "./pages/Admin";
// import CartPage from "./pages/Cart";
// import { useAuth } from "./auth";
// import { useCart } from "./cart.jsx";

// export default function App() {
//   const { user, logout } = useAuth();
//   const { items } = useCart();
//   const nav = useNavigate();

//   function doLogout() {
//     logout();
//     nav("/");
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
//       {/* NAVBAR */}
//       <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

//           {/* Logo */}
//           <Link
//             to="/"
//             className="font-extrabold text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent tracking-wide hover:opacity-80 transition"
//           >
//             SweetShop
//           </Link>

//           {/* NAV LINKS */}
//           <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">

//             <Link
//               to="/"
//               className="hover:text-indigo-600 transition"
//             >
//               Home
//             </Link>

//             {/* Admin */}
//             {user?.role === "admin" && (
//               <Link
//                 to="/admin"
//                 className="hover:text-yellow-600 font-semibold transition"
//               >
//                 Admin
//               </Link>
//             )}
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="flex items-center space-x-6">

//             {/* CART ICON */}
//             <Link to="/cart" className="relative group">
//               <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
//                 <svg
//                   className="w-7 h-7 text-gray-700 group-hover:text-indigo-600 transition"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h12l-2-7M10 21a1 1 0 11-2 0 1 1 0 
//                     012 0M18 21a1 1 0 11-2 0 1 1 0 012 0"
//                   />
//                 </svg>
//               </div>

//               {items.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow-md font-semibold">
//                   {items.length}
//                 </span>
//               )}
//             </Link>

//             {/* AUTH SECTION */}
//             {!user ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-4 py-1.5 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition"
//                 >
//                   Register
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <span className="hidden md:inline text-gray-700 font-medium">
//                   Hi, <span className="font-semibold">{user.name}</span>
//                 </span>

//                 <button
//                   onClick={doLogout}
//                   className="px-4 py-1.5 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* PAGE CONTENT */}
//       <div className="p-4 max-w-7xl mx-auto animate-fadeIn">
//         <Routes>
//           <Route path="/" element={<Home />} />

//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           <Route path="/admin" element={<Admin />} />
//           <Route path="/cart" element={<CartPage />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }
