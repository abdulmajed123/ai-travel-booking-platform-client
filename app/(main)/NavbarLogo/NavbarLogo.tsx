"use client";

import Link from "next/link";
import { GiPin } from "react-icons/gi";
import { TbRobot } from "react-icons/tb";

const NavbarLogo = () => {
  return (
    <Link
      href="/"
      aria-label="Home"
      className="flex items-center gap-2 group cursor-pointer select-none"
    >
      {/* লোগো আইকন */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-all duration-300">
        {/* ম্যাপ পিন - ব্যাকগ্রাউন্ড হিসেবে */}
        <GiPin className="text-4xl text-blue-200 dark:text-blue-800 transition-opacity group-hover:opacity-70" />
        {/* রোবট আইকন - মেইন ফোকাস */}
        <TbRobot className="absolute text-2xl text-blue-600 transition-transform group-hover:-translate-y-1" />
      </div>

      {/* ব্র্যান্ডের নাম */}
      <div className="flex flex-col -space-y-1">
        <span className="text-2xl font-black text-gray-950 dark:text-white tracking-tighter">
          Travel
        </span>
        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] leading-tight">
          AI Platform
        </span>
      </div>
    </Link>
  );
};

export default NavbarLogo;
