"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiRobot2Line,
  RiMapPin2Line,
  RiMoneyDollarCircleLine,
  RiCalendarLine,
  RiSparklingFill,
  RiMagicLine,
  RiArrowRightLine,
} from "react-icons/ri";

const AIPlannerHomeSection = () => {
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<null | any>(null);
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budget: "",
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ডাইনামিক প্ল্যান সিমুলেশন
    setTimeout(() => {
      setItinerary({
        destination: formData.destination || "Your Destination",
        days: formData.days || "3",
        budget: formData.budget || "10,000",
        summary: `A perfect ${formData.days}-day getaway to ${formData.destination} curated by our AI.`,
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* গ্রিড লেআউট */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* বাম পাশ: কন্টেন্ট এবং ফর্ম */}
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest"
              >
                <RiSparklingFill /> AI Innovation
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-[1.1]">
                Not sure where to go? <br />
                <span className="text-blue-600">Let AI decide for you.</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md">
                আপনার বাজেট এবং সময় অনুযায়ী আমাদের AI তৈরি করে দিবে একটি ইউনিক
                ট্রাভেল প্ল্যান।
              </p>
            </div>

            <form
              onSubmit={handleGenerate}
              className="bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-4"
            >
              <div className="relative">
                <RiMapPin2Line className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                <input
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  type="text"
                  placeholder="Destination (e.g. Sylhet)"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border-none outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <RiCalendarLine className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                  <input
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, days: e.target.value })
                    }
                    type="number"
                    placeholder="Days"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border-none outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all shadow-sm"
                  />
                </div>
                <div className="relative">
                  <RiMoneyDollarCircleLine className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    type="text"
                    placeholder="Budget"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border-none outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all shadow-sm"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Generate Plan{" "}
                    <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ডান পাশ: ভিজ্যুয়াল কার্ড */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {!itinerary ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="aspect-square md:aspect-video lg:aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-[3rem] border-2 border-dashed border-blue-200 dark:border-blue-900/50 flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-3xl shadow-xl flex items-center justify-center text-4xl text-blue-500 mb-6 animate-pulse">
                    <RiMagicLine />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    Ready to explore?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    ফর্মটি পূরণ করুন এবং আপনার পারসোনালাইজড ট্রিপ গাইডটি এখানে
                    দেখুন।
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl border border-blue-100 dark:border-blue-900/30 overflow-hidden"
                >
                  <div className="p-8 bg-blue-600 text-white flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
                        AI Generated Itinerary
                      </p>
                      <h3 className="text-2xl font-black italic">
                        Destination: {itinerary.destination}
                      </h3>
                    </div>
                    <RiRobot2Line className="text-4xl opacity-50" />
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <p className="text-[10px] uppercase font-bold text-gray-400">
                          Duration
                        </p>
                        <p className="font-bold text-gray-800 dark:text-white">
                          {itinerary.days} Days
                        </p>
                      </div>
                      <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <p className="text-[10px] uppercase font-bold text-gray-400">
                          Estimated Cost
                        </p>
                        <p className="font-bold text-gray-800 dark:text-white">
                          ৳{itinerary.budget}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <RiSparklingFill className="text-yellow-500" /> Why this
                        trip?
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed italic text-sm">
                        "{itinerary.summary}"
                      </p>
                    </div>
                    <button className="w-full py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all">
                      View Full Details
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ডেকোরেশন এলিমেন্টস */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPlannerHomeSection;
