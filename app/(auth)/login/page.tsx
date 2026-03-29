"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineArrowLeft,
  AiFillStar,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { setAuth } from "@/utils/auth";
import SocialLogin from "@/Component/Button/SocialLogin";
import { useUserStore } from "@/store/userStore";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://ai-travel-booking-platform-server.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.message || "Login failed!");

      // ডাটা এক্সট্রাক্ট করা (আপনার ব্যাকএন্ড রেসপন্স অনুযায়ী)
      const tokenData = resData.data || resData;
      const userData = resData.data?.user || resData.user;

      // ১. টোকেন সেভ করা
      setAuth(tokenData.accessToken, tokenData.refreshToken || "");

      // ২. স্টোর আপডেট করা (যাতে নেভবারে নাম/ছবি দেখায়)
      setUser(userData);

      toast.success("Welcome back!");

      // ৩. রিডাইরেক্ট (reload দিলে স্টোর এবং লোকালস্টোরেজ সিঙ্ক হয় ভালো)
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role: "user" | "admin") => {
    setEmail(role === "user" ? "user@example.com" : "admin@example.com");
    setPassword("123456");
    toast.success(`${role.toUpperCase()} credentials filled!`);
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-gray-950 font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden lg:flex lg:w-1/2 relative bg-gray-900"
      >
        <img
          src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=1200"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-black/80" />
        <div className="relative z-10 p-16 flex flex-col justify-between w-full">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <AiOutlineArrowLeft /> Back to Home
          </Link>
          <div>
            <div className="flex gap-1 text-yellow-400 mb-6">
              {[...Array(5)].map((_, i) => (
                <AiFillStar key={i} />
              ))}
            </div>
            <h1 className="text-6xl font-black text-white leading-tight mb-4">
              Explore the <br />{" "}
              <span className="text-blue-400">Unseen World</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-sm">
              Join 50k+ travelers today.
            </p>
          </div>
          <p className="text-white/40 text-xs tracking-widest uppercase">
            © 2026 TravelAI
          </p>
        </div>
      </motion.div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 border border-gray-100 dark:border-gray-800"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
              Sign In
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              Start your journey with{" "}
              <span className="text-blue-600">TravelAI</span>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-2">
                Email Address
              </label>
              <div className="relative">
                <AiOutlineMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm dark:text-white"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-2">
                Password
              </label>
              <div className="relative">
                <AiOutlineLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Login Account"}
            </button>
          </form>

          <SocialLogin />

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <p className="text-[10px] text-center font-bold text-gray-400 uppercase tracking-widest mb-4">
              Quick Demo Access
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin("user")}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all"
              >
                <AiOutlineUser size={16} /> User Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("admin")}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 transition-all"
              >
                <AiOutlineSetting size={16} /> Admin Demo
              </button>
            </div>
          </div>

          <p className="text-center mt-8 text-sm text-gray-500 font-medium">
            New here?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-black hover:underline ml-1"
            >
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
