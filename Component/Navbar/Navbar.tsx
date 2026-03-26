"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AuthButton from "../Button/AuthButton";
import { useAuth } from "@/hooks/useAuth"; // Hook ta eikhane import korlam

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn, loading } = useAuth(); // Auth status check korar jonno
  console.log(isLoggedIn);
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* ✈️ Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl transition-transform group-hover:rotate-12">
            ✈️
          </span>
          <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TravelAI
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { path: "/", name: "Home" },
            { path: "/explore", name: "Explore" },
            { path: "/about", name: "About" },
            { path: "/contact", name: "Contact" },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.path}
              className={`relative text-sm font-medium transition-colors duration-200 ${
                isActive(item.path)
                  ? "text-blue-600"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
              }`}
            >
              {item.name}
              {isActive(item.path) && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-600 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Right Side - Auth Section */}
        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {isLoggedIn ? (
                /* 👤 User Profile Dropdown (Only if Logged In) */
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="w-10 h-10 rounded-full border-2 border-blue-100 dark:border-gray-700 bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md hover:scale-105 transition-all"
                  >
                    U
                  </button>

                  {/* Dropdown Menu */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in duration-200">
                      {/* User Info Section */}
                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                          Account
                        </p>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                          Traveler User
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className={`flex items-center px-4 py-2.5 text-sm transition-colors ${
                            isActive("/dashboard")
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          Dashboard
                        </Link>

                        <Link
                          href="/profile"
                          onClick={() => setProfileOpen(false)}
                          className={`flex items-center px-4 py-2.5 text-sm transition-colors ${
                            isActive("/profile")
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          My Profile
                        </Link>
                      </div>

                      {/* Action Section */}
                      <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50/30">
                        <AuthButton />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* 🔵 Login Button (Only if Not Logged In) */
                <Link
                  href="/login"
                  className="hidden md:inline-block px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
                >
                  Login
                </Link>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Drawer style) */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-6 pt-2 space-y-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-inner">
          {[
            { path: "/", name: "Home" },
            { path: "/explore", name: "Explore" },
            { path: "/about", name: "About" },
            { path: "/contact", name: "Contact" },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              className={`block text-lg font-medium ${
                isActive(item.path)
                  ? "text-blue-600"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {item.name}
            </Link>
          ))}
          {!isLoggedIn && (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-bold"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
