// src/cart.js
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const STORAGE_KEY = "sweetshop_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {}
  }, []);

  // persist on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function findIndex(id) {
    return items.findIndex((it) => it.id === id);
  }

  function addItem(sweet, qty = 1) {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === sweet.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i].qty = Math.min(copy[i].qty + qty, sweet.quantity || Infinity);
        return copy;
      }
      return [...prev, { id: sweet.id, name: sweet.name, price: sweet.price, qty: Math.min(qty, sweet.quantity || Infinity), image: sweet.image || "", maxQuantity: sweet.quantity || Infinity }];
    });
  }

  function setQty(id, qty) {
    setItems((prev) => prev.map(it => it.id === id ? { ...it, qty: Math.max(1, qty) } : it));
  }

  function removeItem(id) {
    setItems((prev) => prev.filter(it => it.id !== id));
  }

  function clear() {
    setItems([]);
  }

  const subtotal = items.reduce((s, it) => s + (Number(it.price) || 0) * (it.qty || 0), 0);

  return (
    <CartContext.Provider value={{ items, addItem, setQty, removeItem, clear, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
