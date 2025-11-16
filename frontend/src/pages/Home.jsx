// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import { useCart } from "../cart";

export default function Home() {
  const { addItem } = useCart();
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const r = await api.get("/sweets");
      setSweets(r.data);
    } catch (err) {
      console.error(err);
    }
  }

  function addToCart(sweet) {
    addItem(sweet, 1);
    alert(`${sweet.name} added to cart`);
  }

  return (
    <div className="animate-fadeIn">

      {/* ================= HERO BANNER ================= */}
<div className="relative w-full h-[380px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl group animate-fadeIn">

  {/* Background Image */}
  <img
    src="https://dadus.co.in/cdn/shop/files/website_banner.png?v=1760260531&width=1920"
    alt="Sweet Shop Banner"
    className="w-full h-full object-cover transform group-hover:scale-[1.04] transition-all duration-1000 ease-out"
  />

  {/* Elegant Overlay Gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

  {/* Festive Glow Effect */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 mix-blend-overlay"></div>

  {/* Text Content */}
  <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 text-white">
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-2xl leading-tight mb-4 tracking-wide">
      Taste the Essence of <span className="text-yellow-300">Happiness</span>
    </h1>

    <p className="text-lg md:text-2xl max-w-xl font-light text-gray-200 drop-shadow-md">
      Crafted with tradition, purity and love — discover sweets that turn every
      celebration into a cherished memory.
    </p>

    {/* CTA Buttons */}
    <div className="mt-8 flex space-x-4">
      <a
        href="#menu"
        className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg rounded-xl shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1"
      >
        Explore Sweets
      </a>

      <a
        href="#collections"
        className="px-6 py-3 bg-white/20 backdrop-blur-xl border border-white/40 text-white font-semibold text-lg rounded-xl shadow-lg transition-all hover:bg-white/30 hover:shadow-2xl hover:-translate-y-1"
      >
        View Collections
      </a>
    </div>
  </div>

  {/* Bottom Decorative Glow */}
  <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black/70 to-transparent"></div>
</div>


      {/* ================= CURATED CATEGORIES ================= */}
      <section className="mb-16">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">
          Curated by Popular Demand
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">

          {/* Signature Mithai */}
          <a
            href="https://th.bing.com/th/id/OIP.Iawu2kjeIUvLpJQBCKEZqAHaJ4?w=148&h=198&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"
            target="_blank"
            rel="noreferrer"
            className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
          >
            <img
              src="https://th.bing.com/th/id/OIP.Iawu2kjeIUvLpJQBCKEZqAHaJ4?w=148&h=198&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"
              alt="Signature Mithai"
              className="h-44 w-full object-cover group-hover:scale-105 transition-all"
            />
            <p className="p-3 font-semibold text-center">Signature Mithai</p>
          </a>

          {/* Indian Mithai */}
          <a
            href="https://th.bing.com/th/id/OIP.JkIZ7vBvv58iJmzUTHdcvwHaFV?w=263&h=188&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"
            target="_blank"
            rel="noreferrer"
            className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
          >
            <img
              src="https://th.bing.com/th/id/OIP.JkIZ7vBvv58iJmzUTHdcvwHaFV?w=263&h=188&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"
              alt="Indian Mithai"
              className="h-44 w-full object-cover group-hover:scale-105 transition-all"
            />
            <p className="p-3 font-semibold text-center">Indian Mithai</p>
          </a>

          {/* Sugar Free */}
          <div className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
            <img
              src="https://dadus.co.in/cdn/shop/files/Sugar-free_750x.webp?v=1755590274"
              alt="Sugar Free"
              className="h-44 w-full object-cover group-hover:scale-105 transition-all"
            />
            <p className="p-3 font-semibold text-center">Sugar Free</p>
          </div>

          {/* Namkeen */}
          <div className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
            <img
              src="https://dadus.co.in/cdn/shop/files/Namkeen_750x.webp?v=1755590275"
              alt="Namkeen"
              className="h-44 w-full object-cover group-hover:scale-105 transition-all"
            />
            <p className="p-3 font-semibold text-center">Namkeen</p>
          </div>

          {/* Turkish Treats */}
          <div className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
            <img
              src="https://dadus.co.in/cdn/shop/files/Turkish_treats_750x.webp?v=1755590275"
              alt="Turkish Treats"
              className="h-44 w-full object-cover group-hover:scale-105 transition-all"
            />
            <p className="p-3 font-semibold text-center">Turkish Treats</p>
          </div>

          {/* Snacks */}
          <div className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
            <img
              src="https://dadus.co.in/cdn/shop/files/Snacks_750x.webp?v=1755590275"
              alt="Snacks"
              className="h-44 w-full object-cover group-hover:scale-105 transition-all"
            />
            <p className="p-3 font-semibold text-center">Snacks</p>
          </div>

          {/* Dry Fruits */}
          <div className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
            <img
              src="https://dadus.co.in/cdn/shop/files/Dryfruits_750x.webp?v=1755590275"
              alt="Dry Fruits"
              className="h-44 w-full object-cover group-hover:scale-105 transition-all"
            />
            <p className="p-3 font-semibold text-center">Dry Fruits</p>
          </div>

          {/* Bakery */}
          <div className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
            <img
              src="https://dadus.co.in/cdn/shop/files/Bakery_750x.webp?v=1755590275"
              alt="Bakery"
              className="h-44 w-full object-cover group-hover:scale-105 transition-all"
            />
            <p className="p-3 font-semibold text-center">Bakery</p>
          </div>

          

        </div>
      </section>

      {/* ================= COLLECTIONS (Festival, Wedding, Gift) ================= */}
      <section className="my-16 px-4">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">
          Festive & Wedding Collections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* FESTIVE */}
          <div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition">
            <img
              src="https://dadus.co.in/cdn/shop/files/IG1.jpg?v=1755949044"
              alt="Festival Collection"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 text-center font-semibold text-gray-700">
              Festive Collection 🎉
            </div>
          </div>

          {/* WEDDING */}
          <div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition">
            <img
              src="https://th.bing.com/th/id/OIP.bS8p5cZFKmeuFMAID31X5gHaFX?w=276&h=200&c=7&r=0&o=7"
              alt="Wedding Collection"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 text-center font-semibold text-gray-700">
              Wedding Collection 💍
            </div>
          </div>

          {/* GIFT HAMPERS */}
          <div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition">
            <img
              src="https://th.bing.com/th/id/OIP.ER87Iw2lWk9rge8jn_5YwAHaHa?w=201&h=201"
              alt="Gift Hampers"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 text-center font-semibold text-gray-700">
              Premium Gift Hampers 🎁
            </div>
          </div>

        </div>
      </section>

      {/* ================= EXISTING AVAILABLE SWEETS SECTION ================= */}
      {/* <div className="text-center my-14">
        <h1 className="text-4xl font-extrabold text-gray-800 bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 text-transparent drop-shadow-sm">
          Available Sweets
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Choose from our freshly prepared sweets 🍬
        </p>
      </div>

      {sweets.length === 0 ? (
        <div className="text-gray-500 text-center pt-20 text-lg">
          No sweets available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
          {sweets.map((sweet) => (
            <div
              key={sweet.id}
              className="bg-white/70 backdrop-blur-xl border rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 p-5 cursor-pointer"
            >
              {sweet.image ? (
                <img
                  src={sweet.image}
                  alt={sweet.name}
                  className="w-full h-44 object-cover rounded-xl shadow mb-4"
                />
              ) : (
                <div className="w-full h-44 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <h2 className="font-extrabold text-xl text-gray-800">
                {sweet.name}
              </h2>
              <p className="text-gray-500 text-sm">{sweet.category}</p>

              <p className="mt-2 text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                ₹{sweet.price}
              </p>

              <p
                className={`text-sm mt-1 ${
                  sweet.quantity > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {sweet.quantity > 0
                  ? `In Stock: ${sweet.quantity}`
                  : "Out of Stock"}
              </p>

              <button
                disabled={sweet.quantity <= 0}
                onClick={() => addToCart(sweet)}
                className={`mt-5 w-full py-2 rounded-xl text-white font-semibold shadow-md transition-all ${
                  sweet.quantity > 0
                    ? "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {sweet.quantity > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          ))}
        </div>
      )} */}

      {/* ================= AVAILABLE SWEETS (PREMIUM UI) ================= */}
<div className="my-20">
  <div className="text-center mb-12">
    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-amber-500 to-pink-600 drop-shadow-xl">
      Available Sweets
    </h1>
    <p className="mt-3 text-lg text-slate-600 tracking-wide">
      Freshly crafted delights to melt your heart 🍬✨
    </p>
  </div>

  {/* If No Sweets */}
  {sweets.length === 0 ? (
    <div className="text-gray-500 text-center pt-20 text-lg">
      No sweets available.
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 px-4">

      {sweets.map((sweet) => (
        <div
          key={sweet.id}
          className="
            group bg-white/80 backdrop-blur-xl border border-amber-100 
            rounded-3xl shadow-[0_8px_25px_rgba(0,0,0,0.06)]
            hover:shadow-[0_12px_35px_rgba(255,170,0,0.25)]
            transition-all duration-300 hover:-translate-y-2 p-5
          "
        >
          
          {/* IMAGE */}
          <div className="relative mb-4">
            {sweet.image ? (
              <img
                src={sweet.image}
                alt={sweet.name}
                className="
                  w-full h-48 object-cover rounded-2xl shadow-md 
                  group-hover:scale-[1.03] transition-all duration-300
                "
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            {/* Floating badge */}
            <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs shadow-md">
              Best Seller
            </div>
          </div>

          {/* DETAILS */}
          <h2 className="font-extrabold text-2xl text-slate-800 tracking-tight">
            {sweet.name}
          </h2>

          <p className="text-sm text-slate-500 mt-1">{sweet.category}</p>

          <p className="mt-3 text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent drop-shadow">
            ₹{sweet.price}
          </p>

          {/* STOCK */}
          <p
            className={`mt-1 text-sm font-semibold 
              ${sweet.quantity > 0 ? "text-green-700" : "text-red-500"}
            `}
          >
            {sweet.quantity > 0
              ? `In Stock: ${sweet.quantity}`
              : "Out of Stock"}
          </p>

          {/* ADD TO CART BUTTON */}
          <button
            disabled={sweet.quantity <= 0}
            onClick={() => addToCart(sweet)}
            className={`
              mt-6 w-full py-3 rounded-xl font-semibold shadow-md
              transition-all duration-300 text-white
              ${
                sweet.quantity > 0
                  ? "bg-gradient-to-r from-rose-600 to-pink-600 hover:shadow-xl hover:brightness-110"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
          >
            {sweet.quantity > 0 ? "Add to Cart 🍬" : "Out of Stock"}
          </button>
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
}



// // src/pages/Home.jsx
// import React, { useEffect, useState } from "react";
// import api from "../api";
// import { useCart } from "../cart";

// export default function Home() {
//   const { addItem } = useCart();
//   const [sweets, setSweets] = useState([]);

//   useEffect(() => {
//     load();
//   }, []);

//   async function load() {
//     try {
//       const r = await api.get("/sweets");
//       setSweets(r.data);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   function addToCart(sweet) {
//     addItem(sweet, 1);
//     alert(`${sweet.name} added to cart`);
//   }

//   return (
//     <div className="animate-fadeIn">
//       {/* HEADER */}
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-extrabold text-gray-800 bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 text-transparent drop-shadow-sm">
//           Available Sweets
//         </h1>
//         <p className="text-gray-500 mt-2 text-lg">
//           Choose from our freshly prepared sweets 🍬
//         </p>
//       </div>

//       {/* SWEETS GRID */}
//       {sweets.length === 0 ? (
//         <div className="text-gray-500 text-center pt-20 text-lg">
//           No sweets available.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
//           {sweets.map((sweet) => (
//             <div
//               key={sweet.id}
//               className="bg-white/70 backdrop-blur-xl border rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 p-5 cursor-pointer"
//             >
//               {/* IMAGE */}
//               {sweet.image ? (
//                 <img
//                   src={sweet.image}
//                   alt={sweet.name}
//                   className="w-full h-44 object-cover rounded-xl shadow mb-4"
//                 />
//               ) : (
//                 <div className="w-full h-44 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-500">
//                   No Image
//                 </div>
//               )}

//               {/* NAME */}
//               <h2 className="font-extrabold text-xl text-gray-800">
//                 {sweet.name}
//               </h2>
//               <p className="text-gray-500 text-sm">{sweet.category}</p>

//               {/* PRICE */}
//               <p className="mt-2 text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
//                 ₹{sweet.price}
//               </p>

//               {/* STOCK */}
//               <p
//                 className={`text-sm mt-1 ${
//                   sweet.quantity > 0 ? "text-green-600" : "text-red-500"
//                 }`}
//               >
//                 {sweet.quantity > 0
//                   ? `In Stock: ${sweet.quantity}`
//                   : "Out of Stock"}
//               </p>

//               {/* ADD BUTTON */}
//               <button
//                 disabled={sweet.quantity <= 0}
//                 onClick={() => addToCart(sweet)}
//                 className={`mt-5 w-full py-2 rounded-xl text-white font-semibold shadow-md transition-all ${
//                   sweet.quantity > 0
//                     ? "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl"
//                     : "bg-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 {sweet.quantity > 0 ? "Add to Cart" : "Out of Stock"}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
