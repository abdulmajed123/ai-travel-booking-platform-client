"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineArrowLeft,
  AiOutlineCamera,
  AiFillStar,
} from "react-icons/ai";
import SocialLogin from "@/Component/Button/SocialLogin";
import { useUserStore } from "@/store/userStore";
import { setAuth } from "@/utils/auth";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "", // ব্যাকএন্ডের সাথে মিল রেখে 'avatar'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://ai-travel-booking-platform-server.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Registration failed");

      const tokenData = result.data || result;
      const userData = result.data?.user || result.user;

      setAuth(tokenData.accessToken, tokenData.refreshToken);
      setUser(userData);

      toast.success("Account created successfully!");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error: any) {
      setError(error.message || "❌ Server Error");
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-gray-950 font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden lg:flex lg:w-1/2 relative bg-gray-900"
      >
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200"
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
              Start Your <br />{" "}
              <span className="text-blue-400">Journey Today</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-sm font-light">
              Create an account and unlock exclusive travel deals.
            </p>
          </div>
          <p className="text-white/40 text-xs tracking-widest uppercase">
            © 2026 TravelAI Global
          </p>
        </div>
      </motion.div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 border border-gray-100 dark:border-gray-800"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              Join our community of world travelers.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-2">
                Profile Image URL
              </label>
              <div className="relative">
                <AiOutlineCamera
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm dark:text-white"
                  placeholder="https://image-link.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-2">
                Full Name
              </label>
              <div className="relative">
                <AiOutlineUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm dark:text-white"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm dark:text-white"
                  placeholder="john@example.com"
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
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 mt-2"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <SocialLogin />
          <p className="text-center mt-8 text-sm text-gray-500 font-medium">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-black hover:underline ml-1"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
