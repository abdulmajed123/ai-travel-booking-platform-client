"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          TravelAI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link href="/explore" className="hover:text-blue-500">
            Explore
          </Link>

          {/* Dropdown */}
          <div className="relative group">
            <button className="hover:text-blue-500">Services ▾</button>
            <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-md mt-2 rounded-md w-40">
              <Link
                href="/flights"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Flights
              </Link>
              <Link
                href="/hotels"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Hotels
              </Link>
              <Link
                href="/tours"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Tours
              </Link>
            </div>
          </div>

          <Link href="/about" className="hover:text-blue-500">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-500">
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Login
          </Link>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-8 h-8 rounded-full bg-gray-300"
            ></button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-md rounded-md">
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </Link>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/explore" className="block">
            Explore
          </Link>
          <Link href="/about" className="block">
            About
          </Link>
          <Link href="/contact" className="block">
            Contact
          </Link>
          <Link href="/login" className="block">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
