"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-6 relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন (Floating Clouds/Elements) */}
      <motion.div
        animate={{ x: [0, 50, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-20 left-10 text-9xl text-blue-100 dark:text-gray-800 pointer-events-none"
      >
        ☁️
      </motion.div>
      <motion.div
        animate={{ x: [0, -70, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-40 right-10 text-9xl text-blue-100 dark:text-gray-800 pointer-events-none"
      >
        ☁️
      </motion.div>

      <div className="max-w-2xl text-center z-10">
        {/* ৪-০-৪ ইলাস্ট্রেশন/অ্যানিমেশন */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block"
        >
          <h1 className="text-[150px] md:text-[200px] font-black text-blue-600/10 leading-none">
            404
          </h1>
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center text-6xl md:text-8xl"
          >
            ✈️
          </motion.div>
        </motion.div>

        {/* টেক্সট কন্টেন্ট */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Oops! You're Off the Map
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-lg mx-auto">
            The destination you are looking for doesn't exist or has been moved
            to a new secret location.
          </p>
        </motion.div>

        {/* অ্যাকশন বাটনসমূহ */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-200 dark:shadow-none hover:scale-105 active:scale-95"
          >
            <AiOutlineHome size={22} />
            Back to Home
          </Link>

          <Link
            href="/explore"
            className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-2xl font-bold transition-all hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 active:scale-95"
          >
            <AiOutlineSearch size={22} />
            Search Tours
          </Link>
        </motion.div>

        {/* নিচের টেক্সট */}
        <p className="mt-12 text-sm text-gray-400">
          Lost? Call our support at{" "}
          <span className="font-bold text-blue-500">+880 1234-567890</span>
        </p>
      </div>
    </div>
  );
}
