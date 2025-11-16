// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../auth";
import SweetForm from "../components/SweetForm";
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

export default function Admin() {
  const { user } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalItems: 0,
    top: [],
    daily: []
  });

  useEffect(() => {
    if (user?.role === "admin") {
      load();
      loadStats();
    }
  }, [user]);

  async function load() {
    try {
      const r = await api.get("/sweets");
      setSweets(r.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadStats() {
    try {
      const r = await api.get('/orders/stats/all');
      // daily might be sparse - ensure days are sorted
      const daily = r.data.daily.map(d=>({ day: d.day, revenue: Number(d.revenue) }));
      setStats({
        totalRevenue: Number(r.data.totalRevenue || 0),
        totalOrders: Number(r.data.totalOrders || 0),
        totalItems: Number(r.data.totalItems || 0),
        top: r.data.top || [],
        daily
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function create(data) {
    try {
      await api.post("/sweets", data);
      setShowCreate(false);
      load();
      loadStats();
    } catch (err) {
      alert(err?.response?.data?.error || "Create failed");
    }
  }

  async function update(id, data) {
    try {
      await api.put(`/sweets/${id}`, data);
      setEditing(null);
      load();
      loadStats();
    } catch (err) {
      alert(err?.response?.data?.error || "Update failed");
    }
  }

  async function remove(id) {
    if (!confirm("Delete this sweet?")) return;
    try {
      await api.delete(`/sweets/${id}`);
      load();
      loadStats();
    } catch (err) {
      alert(err?.response?.data?.error || "Delete failed");
    }
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white/70 backdrop-blur-lg border p-10 rounded-3xl shadow-2xl text-center">
        <h2 className="text-3xl font-black text-red-600 tracking-tight">Access Denied</h2>
        <p className="text-gray-500 mt-3 text-sm">
          You do not have permissions to access this dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-16 animate-fadeIn">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Manage sweets, inventory & pricing</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
            onClick={() => { setShowCreate(v=>!v); setEditing(null); }}
          >
            {showCreate ? 'Close' : 'Add Sweet'}
          </button>
        </div>
      </div>

      {/* TOP METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-white shadow">
          <div className="text-sm text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold text-indigo-600 mt-2">₹{stats.totalRevenue.toFixed(2)}</div>
        </div>

        <div className="p-6 rounded-2xl bg-white shadow">
          <div className="text-sm text-gray-500">Total Orders</div>
          <div className="text-2xl font-bold mt-2">{stats.totalOrders}</div>
        </div>

        <div className="p-6 rounded-2xl bg-white shadow">
          <div className="text-sm text-gray-500">Items Sold</div>
          <div className="text-2xl font-bold mt-2">{stats.totalItems}</div>
        </div>
      </div>

      {/* CHART + TOP SELLERS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 p-6 bg-white rounded-2xl shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Revenue (last 14 days)</h3>
            <div className="text-sm text-gray-500">Amount (₹)</div>
          </div>

          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <LineChart data={stats.daily}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={3} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="font-semibold mb-4">Top Selling</h3>
          <ul className="space-y-3">
            {stats.top.map(t => (
              <li key={t.id} className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-gray-500">Sold: {t.sold_qty}</div>
                </div>
                <div className="text-sm font-semibold text-indigo-600">₹{Number(t.revenue).toFixed(2)}</div>
              </li>
            ))}
            {stats.top.length === 0 && <div className="text-sm text-gray-500">No sales yet</div>}
          </ul>
        </div>
      </div>

      {/* CREATE FORM */}
      {showCreate && (
        <div className="mb-12 bg-white/80 rounded-3xl shadow p-6 border">
          <SweetForm initial={null} onSubmit={create} onCancel={() => setShowCreate(false)} />
        </div>
      )}

      {/* SWEETS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sweets.map(s => (
          <div key={s.id} className="bg-white rounded-2xl shadow p-5">
            {s.image ? <img src={s.image} alt={s.name} className="w-full h-44 object-cover rounded-lg mb-4" /> :
              <div className="w-full h-44 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">No Image</div>}
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-lg">{s.name}</div>
                <div className="text-sm text-gray-500">{s.category}</div>
              </div>
              <div className="text-indigo-600 font-bold text-lg">₹{s.price}</div>
            </div>
            <div className="mt-3 text-sm text-gray-600">Stock: {s.quantity}</div>

            <div className="flex gap-2 mt-4">
              <button onClick={() => { setEditing(s); setShowCreate(false); }} className="flex-1 py-2 rounded-lg bg-yellow-400">Edit</button>
              <button onClick={() => remove(s.id)} className="flex-1 py-2 rounded-lg bg-red-500 text-white">Delete</button>
            </div>

            {editing && editing.id === s.id && (
              <div className="mt-4">
                <SweetForm initial={editing} onSubmit={(data) => update(editing.id, data)} onCancel={() => setEditing(null)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import api from "../api";
// import { useAuth } from "../auth";
// import SweetForm from "../components/SweetForm";

// export default function Admin() {
//   const { user } = useAuth();
//   const [sweets, setSweets] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [showCreate, setShowCreate] = useState(false);

//   useEffect(() => {
//     if (user?.role === "admin") load();
//   }, [user]);

//   async function load() {
//     try {
//       const r = await api.get("/sweets");
//       setSweets(r.data);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async function create(data) {
//     try {
//       await api.post("/sweets", data);
//       setShowCreate(false);
//       load();
//     } catch (err) {
//       alert(err?.response?.data?.error || "Create failed");
//     }
//   }

//   async function update(id, data) {
//     try {
//       await api.put(`/sweets/${id}`, data);
//       setEditing(null);
//       load();
//     } catch (err) {
//       alert(err?.response?.data?.error || "Update failed");
//     }
//   }

//   async function remove(id) {
//     if (!confirm("Delete this sweet?")) return;
//     try {
//       await api.delete(`/sweets/${id}`);
//       load();
//     } catch (err) {
//       alert(err?.response?.data?.error || "Delete failed");
//     }
//   }

//   if (!user || user.role !== "admin") {
//     return (
//       <div className="max-w-md mx-auto mt-20 bg-white/80 backdrop-blur-xl border p-10 rounded-3xl shadow-2xl text-center">
//         <h2 className="text-3xl font-extrabold text-red-600">Access Denied</h2>
//         <p className="text-gray-500 mt-3">
//           Only Admins are allowed to access this dashboard.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="pb-16 animate-fadeIn">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-10">
//         <div>
//           <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
//             Admin Inventory Dashboard
//           </h1>
//           <p className="text-gray-600 mt-1 text-sm">
//             Manage sweets, categories, pricing & stock levels
//           </p>
//         </div>

//         <button
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
//           onClick={() => {
//             setShowCreate((v) => !v);
//             setEditing(null);
//           }}
//         >
//           {showCreate ? "Close" : "➕ Add Sweet"}
//         </button>
//       </div>

//       {/* DASHBOARD STATS */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
//         <div className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border hover:shadow-xl transition">
//           <p className="text-sm text-gray-600">Total Sweets</p>
//           <h2 className="text-3xl mt-1 font-bold text-gray-800">{sweets.length}</h2>
//         </div>

//         <div className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border hover:shadow-xl transition">
//           <p className="text-sm text-gray-600">Low Stock (&lt;5 items)</p>
//           <h2 className="text-3xl mt-1 font-bold text-orange-500">
//             {sweets.filter((s) => s.quantity < 5).length}
//           </h2>
//         </div>

//         <div className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border hover:shadow-xl transition">
//           <p className="text-sm text-gray-600">Total Categories</p>
//           <h2 className="text-3xl mt-1 font-bold text-indigo-600">
//             {new Set(sweets.map((s) => s.category)).size}
//           </h2>
//         </div>
//       </div>

//       {/* CREATE FORM */}
//       {showCreate && (
//         <div className="mb-12 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border animate-slideDown">
//           <SweetForm
//             initial={null}
//             onSubmit={create}
//             onCancel={() => setShowCreate(false)}
//           />
//         </div>
//       )}

//       {/* SWEETS GRID (FIXED LAYOUT) */}
//       <div className="
//         grid 
//         grid-cols-1 
//         sm:grid-cols-2 
//         lg:grid-cols-3 
//         xl:grid-cols-4 
//         gap-8
//       ">
//         {sweets.map((s) => (
//           <div
//             key={s.id}
//             className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border p-6"
//           >
//             {/* IMAGE */}
//             {s.image ? (
//               <img
//                 src={s.image}
//                 className="w-full h-44 object-cover rounded-2xl shadow mb-5 hover:scale-[1.03] transition-transform"
//                 alt={s.name}
//               />
//             ) : (
//               <div className="w-full h-44 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
//                 No Image
//               </div>
//             )}

//             {/* SWEET INFO */}
//             <h2 className="font-bold text-xl text-gray-800">{s.name}</h2>
//             <p className="text-gray-500 text-sm">{s.category}</p>

//             <p className="mt-3 text-2xl font-extrabold text-indigo-600">₹{s.price}</p>
//             <p className="text-sm text-gray-600 mt-1">Stock: {s.quantity}</p>

//             {/* BUTTONS */}
//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={() => {
//                   setEditing(s);
//                   setShowCreate(false);
//                 }}
//                 className="flex-1 py-2.5 bg-yellow-400 rounded-xl shadow hover:bg-yellow-500 hover:shadow-md transition"
//               >
//                 ✏️ Edit
//               </button>

//               <button
//                 onClick={() => remove(s.id)}
//                 className="flex-1 py-2.5 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 hover:shadow-md transition"
//               >
//                 🗑 Delete
//               </button>
//             </div>

//             {/* EDIT FORM */}
//             {editing && editing.id === s.id && (
//               <div className="mt-6 bg-white/95 backdrop-blur-xl p-5 rounded-2xl border shadow-md animate-slideDown">
//                 <SweetForm
//                   initial={editing}
//                   onSubmit={(data) => update(editing.id, data)}
//                   onCancel={() => setEditing(null)}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import api from "../api";
// import { useAuth } from "../auth";
// import SweetForm from "../components/SweetForm";

// export default function Admin() {
//   const { user } = useAuth();
//   const [sweets, setSweets] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [showCreate, setShowCreate] = useState(false);

//   useEffect(() => {
//     if (user?.role === "admin") load();
//   }, [user]);

//   async function load() {
//     try {
//       const r = await api.get("/sweets");
//       setSweets(r.data);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async function create(data) {
//     try {
//       await api.post("/sweets", data);
//       setShowCreate(false);
//       load();
//     } catch (err) {
//       alert(err?.response?.data?.error || "Create failed");
//     }
//   }

//   async function update(id, data) {
//     try {
//       await api.put(`/sweets/${id}`, data);
//       setEditing(null);
//       load();
//     } catch (err) {
//       alert(err?.response?.data?.error || "Update failed");
//     }
//   }

//   async function remove(id) {
//     if (!confirm("Delete this sweet?")) return;
//     try {
//       await api.delete(`/sweets/${id}`);
//       load();
//     } catch (err) {
//       alert(err?.response?.data?.error || "Delete failed");
//     }
//   }

//   if (!user || user.role !== "admin") {
//     return (
//       <div className="max-w-md mx-auto mt-20 bg-white/70 backdrop-blur-lg border p-10 rounded-3xl shadow-2xl text-center">
//         <h2 className="text-3xl font-black text-red-600 tracking-tight">Access Denied</h2>
//         <p className="text-gray-500 mt-3 text-sm">
//           You do not have permissions to access this dashboard.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="pb-16 animate-fadeIn">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-10">
//         <div>
//           <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
//             Admin Dashboard
//           </h1>
//           <p className="text-gray-600 mt-1">Manage sweets, inventory & pricing</p>
//         </div>

//         <button
//           className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
//           onClick={() => {
//             setShowCreate((v) => !v);
//             setEditing(null);
//           }}
//         >
//           {showCreate ? "Close" : "➕ Add Sweet"}
//         </button>
//       </div>

//       {/* STATS PANEL */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-md border hover:shadow-xl transition">
//           <p className="text-sm text-gray-500">Total Sweets</p>
//           <h2 className="text-3xl font-bold text-gray-800">{sweets.length}</h2>
//         </div>

//         <div className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-md border hover:shadow-xl transition">
//           <p className="text-sm text-gray-500">Low Stock Items</p>
//           <h2 className="text-3xl font-bold text-orange-500">
//             {sweets.filter((s) => s.quantity < 5).length}
//           </h2>
//         </div>

//         <div className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-md border hover:shadow-xl transition">
//           <p className="text-sm text-gray-500">Total Categories</p>
//           <h2 className="text-3xl font-bold text-indigo-600">
//             {new Set(sweets.map((s) => s.category)).size}
//           </h2>
//         </div>
//       </div>

//       {/* CREATE FORM */}
//       {showCreate && (
//         <div className="mb-12 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border animate-slideDown">
//           <SweetForm
//             initial={null}
//             onSubmit={create}
//             onCancel={() => setShowCreate(false)}
//           />
//         </div>
//       )}

//       {/* SWEETS GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 gap-10">
//         {sweets.map((s) => (
//           <div
//             key={s.id}
//             className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border p-6 animate-fadeInSlow"
//           >
//             {s.image ? (
//               <img
//                 src={s.image}
//                 className="w-full h-52 object-cover rounded-2xl shadow-md mb-5 hover:scale-105 transition-transform"
//                 alt={s.name}
//               />
//             ) : (
//               <div className="w-full h-52 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
//                 No Image
//               </div>
//             )}

//             <h2 className="font-bold text-2xl text-gray-800">{s.name}</h2>
//             <p className="text-gray-500 text-sm">{s.category}</p>

//             <p className="mt-3 text-2xl font-extrabold text-indigo-600">₹{s.price}</p>

//             <p className="text-sm text-gray-600 mt-1">Stock: {s.quantity}</p>

//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={() => {
//                   setEditing(s);
//                   setShowCreate(false);
//                 }}
//                 className="flex-1 py-2.5 bg-yellow-400 rounded-xl shadow hover:shadow-md hover:bg-yellow-500 transition"
//               >
//                 ✏️ Edit
//               </button>

//               <button
//                 onClick={() => remove(s.id)}
//                 className="flex-1 py-2.5 bg-red-500 text-white rounded-xl shadow hover:shadow-md hover:bg-red-600 transition"
//               >
//                 🗑 Delete
//               </button>
//             </div>

//             {editing && editing.id === s.id && (
//               <div className="mt-6 bg-white/90 backdrop-blur-xl p-5 rounded-2xl border shadow-md animate-slideDown">
//                 <SweetForm
//                   initial={editing}
//                   onSubmit={(data) => update(editing.id, data)}
//                   onCancel={() => setEditing(null)}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import api from "../api";
// import { useAuth } from "../auth";
// import SweetForm from "../components/SweetForm";

// export default function Admin() {
//   const { user } = useAuth();
//   const [sweets, setSweets] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [showCreate, setShowCreate] = useState(false);

//   useEffect(() => {
//     if (user?.role === "admin") load();
//   }, [user]);

//   async function load() {
//     try {
//       const r = await api.get("/sweets");
//       setSweets(r.data);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async function create(data) {
//     try {
//       await api.post("/sweets", data);
//       setShowCreate(false);
//       load();
//     } catch (err) {
//       alert(err?.response?.data?.error || "Create failed");
//     }
//   }

//   async function update(id, data) {
//     try {
//       await api.put(`/sweets/${id}`, data);
//       setEditing(null);
//       load();
//     } catch (err) {
//       alert(err?.response?.data?.error || "Update failed");
//     }
//   }

//   async function remove(id) {
//     if (!confirm("Delete this sweet?")) return;
//     try {
//       await api.delete(`/sweets/${id}`);
//       load();
//     } catch (err) {
//       alert(err?.response?.data?.error || "Delete failed");
//     }
//   }

//   if (!user || user.role !== "admin") {
//     return (
//       <div className="bg-white p-8 rounded-2xl shadow-xl border max-w-md mx-auto mt-10 text-center">
//         <h2 className="text-2xl font-bold text-gray-800">Access Denied</h2>
//         <p className="text-gray-500 mt-2">Only admin users can access this panel.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="pb-10 animate-fadeIn">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
//           Admin Dashboard
//         </h1>

//         <button
//           className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5"
//           onClick={() => {
//             setShowCreate((v) => !v);
//             setEditing(null);
//           }}
//         >
//           {showCreate ? "Close" : "➕ Add Sweet"}
//         </button>
//       </div>

//       {/* CREATE FORM */}
//       {showCreate && (
//         <div className="mb-8 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg p-6 border">
//           <SweetForm
//             initial={null}
//             onSubmit={create}
//             onCancel={() => setShowCreate(false)}
//           />
//         </div>
//       )}

//       {/* SWEETS GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//         {sweets.map((s) => (
//           <div
//             key={s.id}
//             className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border p-5 overflow-hidden"
//           >
//             {/* IMAGE */}
//             {s.image ? (
//               <img
//                 src={s.image}
//                 className="w-full h-48 object-cover rounded-xl shadow mb-4"
//                 alt={s.name}
//               />
//             ) : (
//               <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-500">
//                 No Image
//               </div>
//             )}

//             {/* INFO */}
//             <h2 className="font-bold text-2xl text-gray-800">{s.name}</h2>
//             <p className="text-gray-500 mt-1">{s.category}</p>

//             <p className="mt-2 text-xl font-semibold text-indigo-700">
//               ₹{s.price}
//             </p>

//             <p className="text-sm text-gray-600 mt-1">Stock: {s.quantity}</p>

//             {/* ACTION BUTTONS */}
//             <div className="flex gap-3 mt-5">
//               <button
//                 onClick={() => {
//                   setEditing(s);
//                   setShowCreate(false);
//                 }}
//                 className="flex-1 py-2 bg-yellow-400 rounded-lg shadow hover:shadow-md hover:bg-yellow-500 transition"
//               >
//                 ✏️ Edit
//               </button>

//               <button
//                 onClick={() => remove(s.id)}
//                 className="flex-1 py-2 bg-red-500 text-white rounded-lg shadow hover:shadow-md hover:bg-red-600 transition"
//               >
//                 🗑 Delete
//               </button>
//             </div>

//             {/* EDIT FORM */}
//             {editing && editing.id === s.id && (
//               <div className="mt-5 bg-white/80 backdrop-blur-xl p-4 rounded-xl border shadow-md">
//                 <SweetForm
//                   initial={editing}
//                   onSubmit={(data) => update(editing.id, data)}
//                   onCancel={() => setEditing(null)}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
