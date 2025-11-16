import React from "react";

export default function SweetCard({ sweet, onPurchase }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 p-5">
      
      {/* IMAGE */}
      <div className="relative">
        {sweet.image ? (
          <img
            src={sweet.image}
            alt={sweet.name}
            className="w-full h-44 object-cover rounded-xl shadow-md transition-all hover:scale-105"
          />
        ) : (
          <div className="w-full h-44 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        {/* OUT OF STOCK LABEL */}
        {sweet.quantity <= 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
            Out of Stock
          </span>
        )}
      </div>

      {/* NAME */}
      <h2 className="font-extrabold text-xl mt-4 text-gray-800">
        {sweet.name}
      </h2>

      {/* CATEGORY */}
      <p className="text-gray-500 text-sm">{sweet.category}</p>

      {/* PRICE */}
      <p className="mt-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
        ₹{sweet.price}
      </p>

      {/* STOCK */}
      <p
        className={`text-sm mt-1 ${
          sweet.quantity > 0 ? "text-green-600" : "text-red-500"
        }`}
      >
        {sweet.quantity > 0
          ? `In Stock: ${sweet.quantity}`
          : "Currently unavailable"}
      </p>

      {/* PURCHASE BUTTON */}
      <button
        disabled={sweet.quantity <= 0}
        onClick={() => onPurchase(sweet.id)}
        className={`mt-5 w-full py-2 rounded-xl text-white font-semibold shadow-md transition-all ${
          sweet.quantity > 0
            ? "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {sweet.quantity > 0 ? "Purchase" : "Out of Stock"}
      </button>
    </div>
  );
}
