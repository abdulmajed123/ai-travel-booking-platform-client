"use client";

import { motion } from "framer-motion";
import { RiMailSendLine, RiSendPlaneFill } from "react-icons/ri";

const Newsletter = () => {
  return (
    /* ব্যাকগ্রাউন্ড কালার এবং ট্রানজিশন আগের সেকশনগুলোর মতো করা হয়েছে */
    <section className="py-24 bg-gray-50 dark:bg-slate-950 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* --- হেডলাইন সেকশন (আপনার স্ক্রিনশট স্টাইল অনুযায়ী অ্যালাইন করা) --- */}
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-[0.3em] text-xs"
          >
            Newsletter
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight"
          >
            Get Exclusive{" "}
            <span className="text-indigo-600 dark:text-indigo-500 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              Travel Deals
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg"
          >
            আমাদের নিউজলেটারে সাবস্ক্রাইব করুন এবং পরবর্তী ট্রিপে সেরা ডিসকাউন্ট
            এবং আপডেটগুলো সবার আগে ইমেইলে বুঝে নিন।
          </motion.p>
        </div>

        {/* --- নিউজলেটার বক্স --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] bg-indigo-600 dark:bg-indigo-900/20 p-8 md:p-16 shadow-2xl shadow-indigo-500/10"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col items-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full max-w-2xl flex flex-col sm:flex-row gap-4 p-3 bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl"
            >
              <div className="flex-1 flex items-center px-6 gap-3">
                <RiMailSendLine className="text-2xl text-indigo-600" />
                <input
                  type="email"
                  placeholder="Enter your professional email"
                  className="w-full bg-transparent py-4 text-gray-800 dark:text-white outline-none border-none text-base"
                  required
                />
              </div>
              <button className="bg-indigo-600 text-white px-10 py-4 rounded-[2rem] font-black flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-500/20">
                Subscribe <RiSendPlaneFill />
              </button>
            </form>

            <div className="mt-8 flex items-center gap-6 opacity-60">
              {["Weekly Updates", "No Spam", "Exclusive Coupons"].map(
                (text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white uppercase tracking-widest"
                  >
                    <div className="w-1 h-1 bg-white rounded-full" /> {text}
                  </div>
                ),
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
