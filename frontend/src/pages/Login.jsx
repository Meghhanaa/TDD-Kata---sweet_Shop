// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wantedRole, setWantedRole] = useState("user"); 

  const { login } = useAuth();
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await login(email, password);
      const loggedRole = res?.user?.role || null;

      if (wantedRole && loggedRole && wantedRole !== loggedRole) {
        alert(`Logged in as "${loggedRole}". You selected "${wantedRole}".`);
      }
      nav("/");
    } catch (err) {
      alert(err?.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff7ea] via-[#fdebd3] to-[#fff4e5] px-4 py-10">

      {/* CARD */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_25px_rgba(0,0,0,0.12)] border border-orange-100 p-10 animate-fadeIn">

        {/* LOGO / HEADING */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent drop-shadow-sm">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600 mt-1 tracking-wide">
            Login to continue your sweet journey 🍬
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5">

          {/* EMAIL */}
          <div>
            <input
              required
              type="email"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-amber-200 bg-white shadow-sm focus:ring-2 focus:ring-rose-300 outline-none transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <input
              required
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-amber-200 bg-white shadow-sm focus:ring-2 focus:ring-rose-300 outline-none transition"
            />
          </div>

          {/* ROLE TOGGLE */}
          <div className="bg-white/70 border border-amber-200 p-3 rounded-xl flex items-center justify-between shadow-sm">
            <span className="text-sm text-gray-600">Login as:</span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setWantedRole("user")}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  wantedRole === "user"
                    ? "bg-gradient-to-r from-rose-200 to-orange-200 text-gray-900 shadow"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                Customer
              </button>

              <button
                type="button"
                onClick={() => setWantedRole("admin")}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  wantedRole === "admin"
                    ? "bg-gradient-to-r from-yellow-200 to-amber-200 text-gray-900 shadow"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition font-semibold text-lg tracking-wide"
          >
            Login
          </button>

          {/* LINK */}
          <p className="text-center text-sm text-gray-600 mt-3">
            Don’t have an account?{" "}
            <Link className="text-rose-600 font-semibold hover:underline" to="/register">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}


// // src/pages/Login.jsx
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../auth";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [wantedRole, setWantedRole] = useState("user"); // UX toggle
//   const { login } = useAuth();
//   const nav = useNavigate();

//   async function submit(e) {
//     e.preventDefault();
//     try {
//       const res = await login(email, password); // res contains { token, user }
//       const loggedRole = res?.user?.role || (res?.user && res.user.role) || null;
//       // backend returns user in response (your backend does), but payload is also in token
//       if (wantedRole && loggedRole && wantedRole !== loggedRole) {
//         // warn user: role mismatch
//         alert(`Logged in as "${loggedRole}". You selected "${wantedRole}".`);
//       }
//       nav("/");
//     } catch (err) {
//       alert(err?.response?.data?.error || "Login failed");
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white py-10 px-4">
//       <div className="w-full max-w-md bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-8">
//         <h1 className="text-3xl font-extrabold mb-1 text-gray-800">Welcome back</h1>
//         <p className="text-sm text-gray-500 mb-6">Login to your account</p>

//         <form onSubmit={submit} className="space-y-4">
//           <label className="block">
//             <input
//               required
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-300 outline-none"
//             />
//           </label>

//           <label className="block">
//             <input
//               required
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-300 outline-none"
//             />
//           </label>

//           {/* Role toggle: purely UX — backend determines actual role */}
//           <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-gray-200">
//             <div className="text-sm text-gray-600">Login as</div>
//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 onClick={() => setWantedRole("user")}
//                 className={`px-3 py-1 rounded-lg ${wantedRole === "user" ? "bg-indigo-50 text-indigo-700 border border-indigo-200" : "text-gray-600"}`}
//               >
//                 Customer
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setWantedRole("admin")}
//                 className={`px-3 py-1 rounded-lg ${wantedRole === "admin" ? "bg-yellow-50 text-yellow-700 border border-yellow-200" : "text-gray-600"}`}
//               >
//                 Admin
//               </button>
//             </div>
//           </div>

//           <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-slate-700 text-white rounded-xl shadow font-semibold">
//             Login
//           </button>

//           <div className="text-center text-sm text-gray-600">
//             <Link to="/register" className="text-indigo-600 hover:underline">Create an account</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../auth";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const nav = useNavigate();

//   async function submit(e) {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       nav("/");
//     } catch (err) {
//       alert(err?.response?.data?.error || "Login failed");
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4 animate-fadeIn">

//       {/* CARD */}
//       <div className="w-full max-w-md bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl rounded-3xl p-8 transition-all">

//         {/* HEADER */}
//         <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
//           Welcome Back
//         </h1>
//         <p className="text-center text-gray-600 mb-8">Login to continue</p>

//         {/* FORM */}
//         <form onSubmit={submit} className="space-y-6">

//           {/* EMAIL */}
//           <div className="relative group">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full p-3 bg-white/70 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
//             />
//             <label className="absolute -top-2 left-3 bg-white/70 text-sm px-1 text-gray-600">
//               Email
//             </label>
//           </div>

//           {/* PASSWORD */}
//           <div className="relative group">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full p-3 bg-white/70 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
//             />
//             <label className="absolute -top-2 left-3 bg-white/70 text-sm px-1 text-gray-600">
//               Password
//             </label>
//           </div>

//           {/* SUBMIT BUTTON */}
//           <button
//             className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all font-semibold"
//           >
//             Login
//           </button>
//         </form>

//         {/* FOOTER LINKS */}
//         <p className="mt-6 text-center text-gray-600">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
//             Register
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }
