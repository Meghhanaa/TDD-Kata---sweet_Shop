import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");

  const [wantsAdmin, setWantsAdmin] = useState(false);

  const { register } = useAuth();
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const role = wantsAdmin ? "admin" : "user";
      await register(name, email, password, role, adminSecret);
      alert("Registered successfully! Please login.");
      nav("/login");
    } catch (err) {
      alert(err?.response?.data?.error || "Register failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 px-4 py-10 relative">

      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-br from-yellow-300/40 to-rose-300/40 rounded-full blur-3xl opacity-60"></div>

      {/* Card */}
      <div className="relative w-full max-w-lg bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-yellow-200/40 p-10">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-amber-700 drop-shadow">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Join our sweet family. Admin access requires a secret code.
          </p>

          {/* Decorative Divider */}
          <div className="mt-4 flex items-center gap-3 justify-center">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></span>
            <span className="text-amber-600 text-xl">🍥</span>
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></span>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={submit} className="space-y-4">

          {/* NAME */}
          <input
            required
            className="w-full p-3 rounded-xl bg-white/80 border border-amber-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-300 outline-none transition"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* EMAIL */}
          <input
            required
            type="email"
            className="w-full p-3 rounded-xl bg-white/80 border border-amber-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-300 outline-none transition"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            required
            type="password"
            className="w-full p-3 rounded-xl bg-white/80 border border-amber-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-300 outline-none transition"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ADMIN OPTION */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setWantsAdmin((v) => !v)}
              className="text-sm text-amber-700 font-semibold underline hover:text-amber-800"
            >
              {wantsAdmin ? "Cancel Admin Registration" : "Register as Admin?"}
            </button>
          </div>

          {wantsAdmin && (
            <input
              className="w-full p-3 rounded-xl bg-white/80 border border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-300 outline-none transition"
              placeholder="Enter Admin Secret Key"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
            />
          )}

          {/* SUBMIT BUTTON */}
          <button
            className="w-full py-3 bg-gradient-to-r from-amber-600 to-rose-600 text-white text-lg font-semibold rounded-xl shadow-md hover:shadow-xl hover:-translate-y-[2px] transition-all"
          >
            Register
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link className="text-rose-600 font-semibold hover:underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}



// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../auth";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [adminSecret, setAdminSecret] = useState("");

//   const [wantsAdmin, setWantsAdmin] = useState(false);

//   const { register } = useAuth();
//   const nav = useNavigate();

//   async function submit(e) {
//     e.preventDefault();
//     try {
//       const role = wantsAdmin ? "admin" : "user";

//       await register(name, email, password, role, adminSecret);
//       alert("Registered successfully! Please login.");
//       nav("/login");

//     } catch (err) {
//       alert(err?.response?.data?.error || "Register failed");
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white py-10 px-4">
//       <div className="w-full max-w-lg bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border p-8">

//         <h1 className="text-3xl font-extrabold text-gray-800">
//           Create your account
//         </h1>
//         <p className="text-sm text-gray-500 mb-6">
//           Register as a customer. Admin registration requires secret code.
//         </p>

//         <form onSubmit={submit} className="space-y-4">

//           <input
//             required
//             className="w-full p-3 rounded-xl bg-white border border-gray-200"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <input
//             required
//             type="email"
//             className="w-full p-3 rounded-xl bg-white border border-gray-200"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             required
//             type="password"
//             className="w-full p-3 rounded-xl bg-white border border-gray-200"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {/* ADMIN SECRET TOGGLE */}
//           <div className="pt-2">
//             <button
//               type="button"
//               onClick={() => setWantsAdmin((v) => !v)}
//               className="text-sm text-indigo-600 underline"
//             >
//               {wantsAdmin ? "Cancel Admin Registration" : "Register as Admin?"}
//             </button>
//           </div>

//           {wantsAdmin && (
//             <input
//               className="w-full p-3 rounded-xl bg-white border border-indigo-300"
//               placeholder="Enter Admin Secret Key"
//               value={adminSecret}
//               onChange={(e) => setAdminSecret(e.target.value)}
//             />
//           )}

//           <button
//             className="w-full py-3 bg-gradient-to-r from-indigo-600 to-slate-700 text-white rounded-xl shadow"
//           >
//             Register
//           </button>

//           <p className="text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link className="text-indigo-600 hover:underline" to="/login">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../auth";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { register } = useAuth();
//   const nav = useNavigate();

//   async function submit(e) {
//     e.preventDefault();
//     try {
//       await register(name, email, password);
//       alert("Registered successfully! Please login.");
//       nav("/login");
//     } catch (err) {
//       alert(err?.response?.data?.error || "Register failed");
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-10 px-4 animate-fadeIn">

//       {/* CARD */}
//       <div className="w-full max-w-md bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl rounded-3xl p-8 transition-all">

//         {/* HEADER */}
//         <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text">
//           Create Account
//         </h1>
//         <p className="text-center text-gray-600 mb-8">Join our sweet community! 🍬</p>

//         {/* FORM */}
//         <form onSubmit={submit} className="space-y-6">

//           {/* NAME */}
//           <div className="relative">
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-full p-3 bg-white/70 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
//             />
//             <label className="absolute -top-2 left-3 bg-white/70 text-sm px-1 text-gray-600">
//               Name
//             </label>
//           </div>

//           {/* EMAIL */}
//           <div className="relative">
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
//           <div className="relative">
//             <input
//               type="password"
//               value={password}
//               required
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 bg-white/70 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
//             />
//             <label className="absolute -top-2 left-3 bg-white/70 text-sm px-1 text-gray-600">
//               Password
//             </label>
//           </div>

//           {/* BUTTON */}
//           <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all font-semibold">
//             Register
//           </button>
//         </form>

//         {/* FOOTER */}
//         <p className="mt-6 text-center text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
//             Login
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }
