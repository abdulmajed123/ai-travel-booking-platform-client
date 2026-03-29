"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import AuthButton from "../Button/AuthButton";
import { useUserStore } from "@/store/userStore";
import { ThemeToggle } from "@/Component/Shared/ThemeToggle";
import NavbarLogo from "@/app/(main)/NavbarLogo/NavbarLogo";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const { user } = useUserStore();

  // ইউজার লগইন আছে কি না তা চেক করা
  const isLoggedIn = !!user;

  // Hydration Error হ্যান্ডেল করার জন্য
  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => pathname === href;

  // সার্ভার সাইড রেন্ডারিং এর সময় একটি কঙ্কাল (Skeleton) বা খালি নেভবার দেখানো
  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 h-[64px] bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"></nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* ✈️ Logo Section */}

        <NavbarLogo></NavbarLogo>

        {/* 💻 Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { path: "/", name: "Home" },
            { path: "/explore", name: "Explore" },
            { path: "/aiplanner", name: "AI Planner" },
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

        {/* 🔐 Auth Section & Theme Toggle */}
        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle />

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full border-2 border-blue-100 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:scale-105 transition-all shadow-md"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-blue-600 dark:text-blue-400 font-bold uppercase">
                    {user?.name?.[0] || user?.email?.[0] || "U"}
                  </span>
                )}
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <>
                  {/* আউসাইড ক্লিকে ড্রপডাউন বন্ধ করার জন্য ব্যাকড্রপ */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileOpen(false)}
                  ></div>

                  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in duration-200 z-50">
                    <div className="px-4 py-4 bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Signed in as
                      </p>
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                        {user?.name}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        My Profile
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-700">
                      <AuthButton />
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-md transition-all active:scale-95"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 dark:text-gray-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu Content */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-4 px-4 space-y-3">
          {[
            { path: "/", name: "Home" },
            { path: "/explore", name: "Explore" },
            { path: "/aiplanner", name: "AI Planner" },
            { path: "/about", name: "About" },
            { path: "/contact", name: "Contact" },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              className="block text-base font-medium text-gray-600 dark:text-gray-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
