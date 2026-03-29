"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import AuthButton from "@/Component/Button/AuthButton";
import {
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { ThemeToggle } from "@/Component/Shared/ThemeToggle";
import NavbarLogo from "@/app/(main)/NavbarLogo/NavbarLogo";

const DashboardNavbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hydration Fix: লোডিং অবস্থায় একটি কঙ্কাল নেভবার দেখাবে
  if (!mounted)
    return (
      <nav className="h-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors"></nav>
    );

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/*  Logo - Left Side */}

        <NavbarLogo></NavbarLogo>

        {/* Right Side: Theme Toggle + Profile Section */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* --- Theme Toggle Button --- */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Trigger */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 pr-3 rounded-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:bg-gray-800 transition-all active:scale-95"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm border-2 border-white dark:border-gray-800 shadow-sm">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-200 hidden sm:block">
                  {user.name?.split(" ")[0]}
                </span>
              </button>

              {/* Modern Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 shadow-2xl rounded-[1.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in duration-200 origin-top-right">
                  {/* User Info Header */}
                  <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                    <p className="text-sm font-bold text-gray-800 dark:text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                      {user.role || "User"}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2 space-y-1">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all"
                    >
                      <AiOutlineUser size={18} className="opacity-70" />
                      Profile
                    </Link>

                    <Link
                      href="/dashboard/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all"
                    >
                      <AiOutlineSetting size={18} className="opacity-70" />
                      Settings
                    </Link>

                    {/* Logout Button */}
                    <div className="pt-1 border-t border-gray-100 dark:border-gray-800 mt-1">
                      <div className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all cursor-pointer group">
                        <AiOutlineLogout
                          size={18}
                          className="group-hover:-translate-x-1 transition-transform"
                        />
                        <AuthButton />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-100 dark:shadow-none transition-all active:scale-95"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
