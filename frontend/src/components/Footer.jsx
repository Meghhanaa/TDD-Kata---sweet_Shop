// src/components/Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  function subscribe(e) {
    e.preventDefault();
    setMsg("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg("Please enter a valid email address.");
      return;
    }
    // client-side only: show success message (you can POST to backend if implemented)
    setMsg("Thanks — you'll get occasional updates from SweetShop.");
    setEmail("");
  }

  return (
    <footer className="mt-16 bg-white/80 backdrop-blur-xl border-t border-slate-200 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-8">

          {/* BRAND + DESC */}
          <div>
            <h2 className="font-extrabold text-2xl bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent tracking-wide">
              SweetShop
            </h2>
            <p className="text-slate-600 mt-3 leading-relaxed">
              Delicious sweets, effortless shopping. Experience premium taste
              with a modern, delightful interface.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="mailto:support@sweetshop.com"
                className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-indigo-600 transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13a2.5 2.5 0 0 0 2.5-2.5v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M21 7l-9 6-9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                support@sweetshop.com
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-indigo-600 transition">Cart</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-600 transition">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-indigo-600 transition">Register</Link>
              </li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Categories</h3>
            <ul className="space-y-2 text-slate-600">
              <li>Dry Sweets</li>
              <li>Milk Sweets</li>
              <li>Bengali Sweets</li>
              <li>Premium Specials</li>
            </ul>
          </div>

          {/* CONNECT + NEWSLETTER */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Connect & Subscribe</h3>

            <form onSubmit={subscribe} className="flex flex-col gap-3">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full p-3 border rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                aria-label="Subscribe email"
              />

              <button
                type="submit"
                className="inline-block px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
              >
                Subscribe
              </button>

              {msg && (
                <div className={`text-sm ${msg.startsWith("Thanks") ? "text-green-600" : "text-red-600"}`}>
                  {msg}
                </div>
              )}
            </form>

            <div className="mt-6 flex items-center gap-3">
              {/* Social icons (inline SVGs) */}
              <a href="#" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center rounded-full shadow bg-slate-100 hover:bg-indigo-600 hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>

              <a href="#" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center rounded-full shadow bg-slate-100 hover:bg-indigo-600 hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm5.5-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z" />
                </svg>
              </a>

              <a href="#" aria-label="Twitter" className="w-10 h-10 flex items-center justify-center rounded-full shadow bg-slate-100 hover:bg-indigo-600 hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22 5.9c-.6.3-1.3.6-2 .7a3.4 3.4 0 0 0-5.8 3v.7A9.6 9.6 0 0 1 3 6.9a3.4 3.4 0 0 0 1.1 4.6c-.5 0-1-.1-1.4-.4v.1c0 1.6 1.1 3 2.6 3.3-.5.1-1 .1-1.5.1-.4 0-.9 0-1.3-.1.9 2.7 3.6 4.6 6.7 4.7A9.8 9.8 0 0 1 2 19.6 13.8 13.8 0 0 0 8.3 21c8 0 12.3-6.6 12.3-12.3v-.6c.8-.6 1.4-1.3 1.9-2.1-.7.3-1.6.5-2.4.6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* bottom legal */}
        <div className="border-t border-slate-200 pt-6 text-center text-slate-600 text-sm">
          <div className="mb-2">© {new Date().getFullYear()} SweetShop — Crafted with ❤️ by MEGHANA TAMRAKAR</div>
          <div className="flex items-center justify-center gap-4">
            <Link to="/terms" className="hover:text-indigo-600 transition">Terms</Link>
            <span className="text-slate-300">•</span>
            <Link to="/privacy" className="hover:text-indigo-600 transition">Privacy</Link>
            <span className="text-slate-300">•</span>
            <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
