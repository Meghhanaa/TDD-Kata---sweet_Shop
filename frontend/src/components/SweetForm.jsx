// src/components/SweetForm.jsx
import React, { useEffect, useId, useState } from "react";

/**
 * Premium SweetForm
 * Props:
 *  - initial: object | null -> { name, category, price, quantity, image }
 *  - onSubmit: (payload) => void | Promise
 *  - onCancel: () => void
 *
 * Keeps API shape identical: sends image as a string (URL or data URL)
 */

const CATEGORIES = [
  "Dry Sweet",
  "Milk Sweet",
  "Bengali Sweet",
  "Traditional Sweet",
  "Festival Special",
  "Premium Sweet",
];

function InputLabel({ htmlFor, children, optional }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700">
      {children} {optional && <span className="text-xs text-slate-400">(optional)</span>}
    </label>
  );
}

function IconSpinner({ className = "w-4 h-4" }) {
  return (
    <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-30" />
      <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export default function SweetForm({ initial = null, onSubmit, onCancel }) {
  const id = useId();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: "",
  });
  const [touched, setTouched] = useState({});
  const [localPreview, setLocalPreview] = useState(""); // data URL from local file
  const [busy, setBusy] = useState(false); // UI indicator for parent async
  const [categoryQuery, setCategoryQuery] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name ?? "",
        category: initial.category ?? "",
        price: initial.price ?? "",
        quantity: initial.quantity ?? "",
        image: initial.image ?? "",
      });
      setLocalPreview(initial.image ?? "");
    } else {
      setForm({
        name: "",
        category: "",
        price: "",
        quantity: "",
        image: "",
      });
      setLocalPreview("");
    }
  }, [initial]);

  // Validation
  useEffect(() => {
    const e = {};
    if (!String(form.name).trim()) e.name = "Name is required";
    if (!String(form.category).trim()) e.category = "Category is required";
    if (form.price === "" || Number.isNaN(Number(form.price)) || Number(form.price) < 0)
      e.price = "Enter a valid price";
    if (form.quantity === "" || !Number.isInteger(Number(form.quantity)) || Number(form.quantity) < 0)
      e.quantity = "Enter a valid quantity (0+)";
    setErrors(e);
  }, [form.name, form.category, form.price, form.quantity]);

  function updateField(key, value) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function markTouched(field) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  async function submit(e) {
    e && e.preventDefault && e.preventDefault();
    markTouched("name");
    markTouched("category");
    markTouched("price");
    markTouched("quantity");

    // final validation check
    if (Object.keys(errors).length > 0) return;

    const payload = {
      name: String(form.name).trim(),
      category: String(form.category).trim(),
      price: Number(form.price),
      quantity: Number(form.quantity),
      image: form.image || localPreview || "",
    };

    try {
      const maybePromise = onSubmit(payload);
      if (maybePromise && typeof maybePromise.then === "function") {
        setBusy(true);
        await maybePromise;
        setBusy(false);
      }
    } catch (err) {
      setBusy(false);
      // bubble up or show a toast here; parent often handles errors
      console.error("Submit error:", err);
      alert(err?.message || "Save failed");
    }
  }

  // Local file upload -> data URL preview
  function handleFile(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setLocalPreview(reader.result);
      updateField("image", reader.result); // store data URL
    };
    reader.readAsDataURL(f);
  }

  // small helper for numeric steppers
  function stepNumber(key, delta, min = 0, step = 1) {
    const val = Number(form[key] || 0) + delta * step;
    const final = Math.max(min, Math.round(val * (1 / step)) / (1 / step));
    updateField(key, final);
  }

  const filteredCategories = CATEGORIES.filter((c) =>
    c.toLowerCase().includes(categoryQuery.trim().toLowerCase())
  );

  const isValid = Object.keys(errors).length === 0;

  return (
    <form
      onSubmit={submit}
      className="space-y-6 p-6 bg-white border border-slate-100 rounded-2xl shadow-lg max-w-xl mx-auto"
      aria-labelledby={`${id}-heading`}
    >
      <div className="flex items-center justify-between">
        <h2 id={`${id}-heading`} className="text-lg font-semibold text-slate-800">
          {initial ? "Edit Sweet" : "Add New Sweet"}
        </h2>

        <div className="text-sm text-slate-500">{initial ? "Edit existing sweet" : "Create a new sweet"}</div>
      </div>

      {/* Name */}
      <div>
        <InputLabel htmlFor={`${id}-name`}>Sweet name</InputLabel>
        <input
          id={`${id}-name`}
          name="name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          onBlur={() => markTouched("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${id}-name-err` : undefined}
          className={`mt-2 block w-full px-3 py-2 rounded-lg border ${
            errors.name && touched.name ? "border-rose-400" : "border-slate-200"
          } bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition`}
          placeholder="Eg. Kaju Katli"
        />
        {errors.name && touched.name && (
          <p id={`${id}-name-err`} className="mt-1 text-xs text-rose-600">
            {errors.name}
          </p>
        )}
      </div>

      {/* Category (search + dropdown + chips) */}
      <div>
        <InputLabel htmlFor={`${id}-category`}>Category</InputLabel>

        <div className="mt-2">
          <input
            id={`${id}-category`}
            name="categoryQuery"
            value={categoryQuery}
            onChange={(e) => setCategoryQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {filteredCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  updateField("category", c);
                  setCategoryQuery("");
                  markTouched("category");
                }}
                className={`px-3 py-1 rounded-full text-sm border ${
                  form.category === c ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700 border-slate-200"
                } hover:shadow-sm transition`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-3">
            <label className="text-xs text-slate-500">Selected</label>
            <div className="mt-1">
              <input
                name="category"
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                onBlur={() => markTouched("category")}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.category && touched.category ? "border-rose-400" : "border-slate-200"
                } focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                placeholder="Or type custom category"
              />
            </div>
            {errors.category && touched.category && (
              <p className="mt-1 text-xs text-rose-600">{errors.category}</p>
            )}
          </div>
        </div>
      </div>

      {/* Price & Quantity in a row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <InputLabel htmlFor={`${id}-price`}>Price (₹)</InputLabel>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-slate-200 overflow-hidden">
              <button
                type="button"
                onClick={() => stepNumber("price", -1, 0, 1)}
                className="px-3 py-2 text-slate-600 hover:bg-slate-50"
                aria-label="Decrease price"
              >
                −
              </button>
              <input
                id={`${id}-price`}
                name="price"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                onBlur={() => markTouched("price")}
                className={`w-28 text-right px-2 py-2 outline-none ${
                  errors.price && touched.price ? "border-rose-400" : ""
                }`}
                aria-invalid={!!errors.price}
                aria-describedby={errors.price ? `${id}-price-err` : undefined}
                inputMode="decimal"
              />
              <button
                type="button"
                onClick={() => stepNumber("price", +1, 0, 1)}
                className="px-3 py-2 text-slate-600 hover:bg-slate-50"
                aria-label="Increase price"
              >
                +
              </button>
            </div>
          </div>
          {errors.price && touched.price && (
            <p id={`${id}-price-err`} className="mt-1 text-xs text-rose-600">
              {errors.price}
            </p>
          )}
        </div>

        <div>
          <InputLabel htmlFor={`${id}-quantity`}>Quantity</InputLabel>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-slate-200 overflow-hidden">
              <button
                type="button"
                onClick={() => stepNumber("quantity", -1, 0, 1)}
                className="px-3 py-2 text-slate-600 hover:bg-slate-50"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                id={`${id}-quantity`}
                name="quantity"
                value={form.quantity}
                onChange={(e) => updateField("quantity", e.target.value)}
                onBlur={() => markTouched("quantity")}
                className="w-20 text-right px-2 py-2 outline-none"
                aria-invalid={!!errors.quantity}
                aria-describedby={errors.quantity ? `${id}-quantity-err` : undefined}
                inputMode="numeric"
              />
              <button
                type="button"
                onClick={() => stepNumber("quantity", +1, 0, 1)}
                className="px-3 py-2 text-slate-600 hover:bg-slate-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          {errors.quantity && touched.quantity && (
            <p id={`${id}-quantity-err`} className="mt-1 text-xs text-rose-600">
              {errors.quantity}
            </p>
          )}
        </div>
      </div>

      {/* Image input / preview */}
      <div>
        <InputLabel htmlFor={`${id}-image`}>Image (URL or upload)</InputLabel>

        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            id={`${id}-image`}
            name="image"
            value={form.image}
            onChange={(e) => {
              updateField("image", e.target.value);
              setLocalPreview(e.target.value);
            }}
            placeholder="https://example.com/image.jpg"
            className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            aria-label="Image URL"
          />

          <label className="flex items-center gap-3 px-3 py-2 rounded-lg border border-slate-200 bg-white cursor-pointer">
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
            <svg className="w-5 h-5 text-slate-600" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm text-slate-600">Upload</span>
          </label>
        </div>

        {localPreview && (
          <div className="mt-3">
            <div className="w-36 h-36 rounded-lg overflow-hidden border">
              <img src={localPreview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-50 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!isValid || busy}
          className={`px-5 py-2 rounded-lg font-semibold text-white shadow-md transition ${
            !isValid || busy
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-600 to-slate-700 hover:opacity-95"
          } flex items-center gap-2`}
          aria-disabled={!isValid || busy}
        >
          {busy ? <IconSpinner className="w-4 h-4 text-white" /> : null}
          {initial ? "Save Changes" : "Create Sweet"}
        </button>
      </div>
    </form>
  );
}


// import React, { useState, useEffect } from "react";

// const CATEGORIES = [
//   "Dry Sweet",
//   "Milk Sweet",
//   "Bengali Sweet",
//   "Traditional Sweet",
//   "Festival Special",
//   "Premium Sweet",
// ];

// export default function SweetForm({ initial = null, onSubmit, onCancel }) {
//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     price: "",
//     quantity: "",
//     image: "",
//   });

//   // Fill form when editing
//   useEffect(() => {
//     if (initial) {
//       setForm({
//         name: initial.name || "",
//         category: initial.category || "",
//         price: initial.price || "",
//         quantity: initial.quantity || "",
//         image: initial.image || "",
//       });
//     } else {
//       setForm({
//         name: "",
//         category: "",
//         price: "",
//         quantity: "",
//         image: "",
//       });
//     }
//   }, [initial]);

//   function change(e) {
//     setForm((f) => ({
//       ...f,
//       [e.target.name]: e.target.value,
//     }));
//   }

//   function submit(e) {
//     e.preventDefault();
//     onSubmit({
//       ...form,
//       price: Number(form.price),
//       quantity: Number(form.quantity),
//     });
//   }

//   return (
//     <form
//       onSubmit={submit}
//       className="space-y-6 p-8 bg-white/60 backdrop-blur-xl border border-white/70 shadow-xl rounded-3xl animate-fadeIn transition"
//     >
//       {/* Heading */}
//       <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text mb-4 text-center">
//         {initial ? "Edit Sweet" : "Add New Sweet"}
//       </h2>

//       {/* Sweet Name */}
//       <div className="relative">
//         <input
//           name="name"
//           value={form.name}
//           onChange={change}
//           required
//           className="w-full p-3 bg-white/70 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
//         />
//         <label className="absolute -top-2 left-3 bg-white/70 px-2 text-sm text-gray-600">
//           Sweet Name
//         </label>
//       </div>

//       {/* Category */}
//       <div className="relative">
//         <select
//           name="category"
//           value={form.category}
//           onChange={change}
//           required
//           className="w-full p-3 bg-white/70 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
//         >
//           <option value="">Select Category</option>
//           {CATEGORIES.map((c) => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>

//         <label className="absolute -top-2 left-3 bg-white/70 px-2 text-sm text-gray-600">
//           Category
//         </label>
//       </div>

//       {/* Price */}
//       <div className="relative">
//         <input
//           type="number"
//           name="price"
//           required
//           value={form.price}
//           onChange={change}
//           placeholder="0"
//           className="w-full p-3 bg-white/70 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
//         />
//         <label className="absolute -top-2 left-3 bg-white/70 px-2 text-sm text-gray-600">
//           Price (₹)
//         </label>
//       </div>

//       {/* Quantity */}
//       <div className="relative">
//         <input
//           type="number"
//           name="quantity"
//           required
//           value={form.quantity}
//           onChange={change}
//           placeholder="0"
//           className="w-full p-3 bg-white/70 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
//         />
//         <label className="absolute -top-2 left-3 bg-white/70 px-2 text-sm text-gray-600">
//           Quantity
//         </label>
//       </div>

//       {/* Image URL */}
//       <div className="relative">
//         <input
//           name="image"
//           value={form.image}
//           onChange={change}
//           placeholder="https://example.com/sweet.jpg"
//           className="w-full p-3 bg-white/70 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
//         />
//         <label className="absolute -top-2 left-3 bg-white/70 px-2 text-sm text-gray-600">
//           Image URL
//         </label>
//       </div>

//       {/* Preview Image */}
//       {form.image && (
//         <div className="flex justify-center">
//           <img
//             src={form.image}
//             alt="Preview"
//             className="w-36 h-36 object-cover rounded-xl shadow border hover:scale-105 transition"
//           />
//         </div>
//       )}

//       {/* Buttons */}
//       <div className="flex justify-end gap-4 mt-4">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-5 py-2 border rounded-xl shadow hover:bg-gray-100 transition"
//         >
//           Cancel
//         </button>

//         <button
//           className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition"
//         >
//           Save Sweet
//         </button>
//       </div>
//     </form>
//   );
// }

// import React, { useState, useEffect } from "react";

// const CATEGORIES = [
//   "Dry Sweet",
//   "Milk Sweet",
//   "Bengali Sweet",
//   "Traditional Sweet",
//   "Festival Special",
//   "Premium Sweet",
// ];

// export default function SweetForm({ initial = null, onSubmit, onCancel }) {
//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     price: "",
//     quantity: "",
//     image: "",
//   });

//   // Load edit data
//   useEffect(() => {
//     if (initial) {
//       setForm({
//         name: initial.name || "",
//         category: initial.category || "",
//         price: initial.price || "",
//         quantity: initial.quantity || "",
//         image: initial.image || "",
//       });
//     } else {
//       setForm({
//         name: "",
//         category: "",
//         price: "",
//         quantity: "",
//         image: "",
//       });
//     }
//   }, [initial]);

//   function change(e) {
//     setForm((f) => ({
//       ...f,
//       [e.target.name]: e.target.value,
//     }));
//   }

//   function submit(e) {
//     e.preventDefault();
//     onSubmit({
//       ...form,
//       price: Number(form.price),
//       quantity: Number(form.quantity),
//     });
//   }

//   return (
//     <form
//       onSubmit={submit}
//       className="space-y-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
//     >
//       <h2 className="text-xl font-semibold text-gray-800 mb-2">
//         {initial ? "Edit Sweet" : "Add New Sweet"}
//       </h2>

//       <input
//         name="name"
//         value={form.name}
//         onChange={change}
//         placeholder="Sweet Name"
//         className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
//       />

//       {/* Category Dropdown */}
//       <select
//         name="category"
//         value={form.category}
//         onChange={change}
//         className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
//       >
//         <option value="">Select Category</option>
//         {CATEGORIES.map((c) => (
//           <option key={c} value={c}>
//             {c}
//           </option>
//         ))}
//       </select>

//       <input
//         type="number"
//         name="price"
//         value={form.price}
//         onChange={change}
//         placeholder="Price (₹)"
//         className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
//       />

//       <input
//         type="number"
//         name="quantity"
//         value={form.quantity}
//         onChange={change}
//         placeholder="Quantity"
//         className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
//       />

//       {/* Image URL */}
//       <input
//         name="image"
//         value={form.image}
//         onChange={change}
//         placeholder="Image URL (e.g., https://…)"
//         className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
//       />

//       {/* Preview */}
//       {form.image && (
//         <img
//           src={form.image}
//           alt="Preview"
//           className="w-32 h-32 object-cover rounded-lg border mx-auto"
//         />
//       )}

//       {/* Buttons */}
//       <div className="flex justify-end gap-3 pt-2">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 border rounded-lg"
//         >
//           Cancel
//         </button>
//         <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow">
//           Save
//         </button>
//       </div>
//     </form>
//   );
// }




// import React, { useState, useEffect } from 'react';

// export default function SweetForm({ initial = {}, onSubmit, onCancel }) {
//   const [name, setName] = useState(initial.name || '');
//   const [category, setCategory] = useState(initial.category || '');
//   const [price, setPrice] = useState(initial.price ?? '');
//   const [quantity, setQuantity] = useState(initial.quantity ?? 0);

//   useEffect(() => {
//     setName(initial.name || '');
//     setCategory(initial.category || '');
//     setPrice(initial.price ?? '');
//     setQuantity(initial.quantity ?? 0);
//   }, [initial]);

//   function submit(e) {
//     e.preventDefault();
//     onSubmit({ name, category, price: parseFloat(price), quantity: parseInt(quantity) });
//   }

//   return (
//     <form onSubmit={submit} className="space-y-3 bg-white p-4 rounded shadow">
//       <div>
//         <label className="block text-sm">Name</label>
//         <input className="w-full border p-2" value={name} onChange={e=>setName(e.target.value)} required/>
//       </div>
//       <div>
//         <label className="block text-sm">Category</label>
//         <input className="w-full border p-2" value={category} onChange={e=>setCategory(e.target.value)} required/>
//       </div>
//       <div className="grid grid-cols-2 gap-3">
//         <div>
//           <label className="block text-sm">Price</label>
//           <input type="number" step="0.01" className="w-full border p-2" value={price} onChange={e=>setPrice(e.target.value)} required/>
//         </div>
//         <div>
//           <label className="block text-sm">Quantity</label>
//           <input type="number" className="w-full border p-2" value={quantity} onChange={e=>setQuantity(e.target.value)} required/>
//         </div>
//       </div>
//       <div className="flex gap-2">
//         <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
//         <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
//       </div>
//     </form>
//   )
// }
