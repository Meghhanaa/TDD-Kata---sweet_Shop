// src/pages/Cart.jsx
import React, { useState } from "react";
import { useCart } from "../cart";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { items, setQty, removeItem, clear, subtotal } = useCart();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function confirmPurchase() {
    if (!items.length) return alert("Cart is empty");
    if (!address.trim()) return alert("Please enter address");

    if (!confirm(`Proceed to purchase ${items.length} items for ₹${subtotal.toFixed(2)}?`)) return;

    setLoading(true);
    try {
      // Build items payload
      const payload = {
        items: items.map(it => ({ id: it.id, qty: it.qty })),
        address
      };
      const r = await api.post('/orders', payload);
      clear();
      alert('Purchase successful! Order ID: ' + r.data.order.id);
      nav('/');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Purchase failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          Your cart is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map(it => (
              <div key={it.id} className="bg-white p-4 rounded shadow flex gap-4 items-center">
                {it.image ? <img src={it.image} alt={it.name} className="w-24 h-24 object-cover rounded" /> : <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">No image</div>}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{it.name}</h3>
                      <p className="text-sm text-gray-500">₹{it.price} each</p>
                    </div>
                    <div>
                      <button className="text-sm text-red-500" onClick={() => removeItem(it.id)}>Remove</button>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <label className="text-sm">Qty</label>
                    <input type="number" min="1" value={it.qty} onChange={(e) => setQty(it.id, Number(e.target.value) || 1)} className="w-20 p-1 border rounded" />
                    <div className="ml-auto font-semibold">₹{(it.price * it.qty).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">Checkout</h2>
            <div className="mt-3">
              <label className="block text-sm mb-1">Delivery address</label>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={4} className="w-full p-2 border rounded" placeholder="Enter your delivery address"></textarea>
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <div>Subtotal</div>
                <div>₹{subtotal.toFixed(2)}</div>
              </div>
              <button disabled={loading} onClick={confirmPurchase} className="mt-4 w-full bg-indigo-600 text-white py-2 rounded">
                {loading ? "Processing..." : `Confirm & Pay ₹${subtotal.toFixed(2)}`}
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

// import React, { useState } from "react";
// import { useCart } from "../cart";
// import api from "../api";
// import { useNavigate } from "react-router-dom";

// export default function CartPage() {
//   const { items, setQty, removeItem, clear, subtotal } = useCart();
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);
//   const nav = useNavigate();

//   async function confirmPurchase() {
//     if (!items.length) return alert("Cart is empty");
//     if (!address.trim()) return alert("Please enter address");

//     if (!confirm(`Proceed to purchase ${items.length} items for ₹${subtotal}?`)) return;

//     setLoading(true);

//     const results = [];
//     for (const it of items) {
//       try {
//         await api.post(`/sweets/${it.id}/purchase`, { qty: it.qty });
//         results.push({ id: it.id, ok: true });
//       } catch (err) {
//         results.push({
//           id: it.id,
//           ok: false,
//           error: err?.response?.data?.error || err.message,
//         });
//       }
//     }

//     setLoading(false);

//     const failed = results.filter((r) => !r.ok);
//     if (failed.length) {
//       alert(`Some items failed: ${failed.map((f) => f.id).join(", ")}`);
//       return;
//     }

//     clear();
//     alert("Purchase successful! Order will be delivered to: " + address);
//     nav("/");
//   }

//   return (
//     <div className="max-w-6xl mx-auto py-8 animate-fadeIn">
//       <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center md:text-left">
//         🛒 Your Cart
//       </h1>

//       {items.length === 0 ? (
//         <div className="bg-white/80 backdrop-blur-xl p-10 rounded-2xl shadow-xl text-center text-gray-600 border">
//           <p className="text-xl">Your cart is empty.</p>
//           <p className="mt-2">Add sweets from the home page!</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           {/* CART ITEMS */}
//           <div className="md:col-span-2 space-y-6">
//             {items.map((it) => (
//               <div
//                 key={it.id}
//                 className="bg-white/70 backdrop-blur-xl border rounded-2xl shadow-lg p-5 flex gap-5 hover:shadow-2xl transition-all hover:-translate-y-1"
//               >
//                 {/* IMAGE */}
//                 {it.image ? (
//                   <img
//                     src={it.image}
//                     alt={it.name}
//                     className="w-28 h-28 object-cover rounded-xl shadow"
//                   />
//                 ) : (
//                   <div className="w-28 h-28 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
//                     No Image
//                   </div>
//                 )}

//                 {/* DETAILS */}
//                 <div className="flex-1">
//                   <div className="flex justify-between">
//                     <div>
//                       <h3 className="font-bold text-xl text-gray-800">{it.name}</h3>
//                       <p className="text-sm text-gray-500">₹{it.price} each</p>
//                     </div>

//                     <button
//                       className="text-sm text-red-500 hover:text-red-700 transition"
//                       onClick={() => removeItem(it.id)}
//                     >
//                       Remove ✖
//                     </button>
//                   </div>

//                   {/* QUANTITY */}
//                   <div className="mt-4 flex items-center gap-3">
//                     <label className="text-sm font-medium">Qty</label>
//                     <input
//                       type="number"
//                       min="1"
//                       value={it.qty}
//                       onChange={(e) => setQty(it.id, Number(e.target.value) || 1)}
//                       className="w-20 p-2 bg-gray-50 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
//                     />

//                     <div className="ml-auto font-bold text-lg text-gray-700">
//                       ₹{(it.price * it.qty).toFixed(2)}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* CHECKOUT SIDEBAR */}
//           <aside className="bg-white/80 rounded-2xl p-6 shadow-xl border backdrop-blur-xl">
//             <h2 className="text-2xl font-bold text-gray-700">Checkout</h2>

//             {/* ADDRESS */}
//             <div className="mt-5">
//               <label className="block text-sm mb-1 font-medium text-gray-600">
//                 Delivery Address
//               </label>
//               <textarea
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 rows={5}
//                 className="w-full p-3 border rounded-xl shadow-sm bg-gray-50 focus:ring-2 focus:ring-indigo-400 transition"
//                 placeholder="Enter your delivery address"
//               ></textarea>
//             </div>

//             {/* TOTAL */}
//             <div className="mt-6 border-t pt-4 text-lg font-semibold flex justify-between">
//               <span>Subtotal</span>
//               <span className="text-indigo-700">₹{subtotal.toFixed(2)}</span>
//             </div>

//             {/* BUTTON */}
//             <button
//               disabled={loading}
//               onClick={confirmPurchase}
//               className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-lg shadow-md hover:shadow-xl transition hover:-translate-y-1 disabled:opacity-60"
//             >
//               {loading ? "Processing..." : `Confirm & Pay ₹${subtotal.toFixed(2)}`}
//             </button>
//           </aside>
//         </div>
//       )}
//     </div>
//   );
// }
