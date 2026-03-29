"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiRobot2Line,
  RiMagicLine,
  RiMapPin2Line,
  RiMoneyDollarCircleLine,
  RiCalendarLine,
  RiSparklingFill,
} from "react-icons/ri";

const AIPlannerPreview = () => {
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // ইনপুট স্টেট
  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    days: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    if (!formData.destination || !formData.days) {
      alert("Please fill in destination and days!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 px-4 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* --- ১. হেডলাইন সেকশন (আপনার স্ক্রিনশট স্টাইল অনুযায়ী) --- */}
        <div className="text-center mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-[0.3em] text-xs"
          >
            AI Smart Feature
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight"
          >
            Our Most Intelligent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              Trip Planner
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg"
          >
            From serene beaches to majestic mountains, discover our handpicked
            destinations designed for your dream vacation with the help of AI.
          </motion.p>
        </div>

        {/* --- ২. মেইন কন্টেন্ট গ্রিড --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* বাম পাশে টেক্সট কন্টেন্ট */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                <RiSparklingFill className="text-yellow-500" />
                Why use our AI?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                আমাদের অ্যাডভান্সড অ্যালগরিদম আপনার দেওয়া তথ্যের ওপর ভিত্তি করে
                সেরা সব লোকেশন এবং বাজেট অপ্টিমাইজড প্ল্যান তৈরি করে। এটি আপনার
                সময় বাঁচায় এবং ট্রাভেল অভিজ্ঞতাকে করে আরও সহজ।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Fast Planning", icon: "⚡" },
                { title: "Budget Friendly", icon: "💰" },
                { title: "24/7 Access", icon: "🌐" },
                { title: "Custom Logic", icon: "🧠" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ডান পাশে ইন্টারেক্টিভ কার্ড (আপনার স্ক্রিনশট অনুযায়ী) */}
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute -inset-10 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" />

            <div className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 sm:p-10 rounded-[3rem] shadow-2xl">
              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/30">
                        <RiRobot2Line />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          AI Trip Assistant
                        </h4>
                        <p className="text-sm text-green-500 font-medium flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />{" "}
                          Online & Ready to help
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="relative group">
                        <RiMapPin2Line className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 group-focus-within:scale-110 transition-transform" />
                        <input
                          type="text"
                          name="destination"
                          value={formData.destination}
                          onChange={handleInputChange}
                          placeholder="Where to go? (e.g. Sajek Valley)"
                          className="w-full pl-12 pr-4 py-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none text-base outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800 dark:text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative group">
                          <RiMoneyDollarCircleLine className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                          <input
                            type="text"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            placeholder="Budget (৳)"
                            className="w-full pl-12 pr-4 py-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none text-base outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800 dark:text-white"
                          />
                        </div>
                        <div className="relative group">
                          <RiCalendarLine className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                          <input
                            type="number"
                            name="days"
                            value={formData.days}
                            onChange={handleInputChange}
                            placeholder="Days"
                            className="w-full pl-12 pr-4 py-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none text-base outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleGenerate}
                      disabled={loading}
                      className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-70 shadow-xl shadow-indigo-500/20"
                    >
                      {loading ? (
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Generate AI Plan <RiMagicLine className="text-xl" />
                        </>
                      )}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4">
                      <h4 className="font-black text-indigo-600 text-xl tracking-tight">
                        Itinerary for {formData.destination}
                      </h4>
                      <button
                        onClick={() => setShowResult(false)}
                        className="text-xs font-bold text-gray-400 hover:text-indigo-600 uppercase tracking-widest"
                      >
                        [ Edit Info ]
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="p-5 rounded-3xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50">
                        <p className="text-gray-800 dark:text-gray-200 font-semibold italic">
                          "Excellent choice! A {formData.days} day trip to{" "}
                          {formData.destination} is perfect for your budget of ৳
                          {formData.budget || "flexible"}."
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                          <div className="bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-md font-bold">
                            DAY 01
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            Arrival, Check-in and explore the local market at
                            evening.
                          </p>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                          <div className="bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-md font-bold">
                            DAY 02
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            Main sightseeing and group adventure activities.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-base shadow-2xl hover:scale-[1.02] transition-transform">
                      View Full Details in Dashboard
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPlannerPreview;
