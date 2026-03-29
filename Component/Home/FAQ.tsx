"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { RiArticleLine, RiQuestionLine } from "react-icons/ri";

const faqs = [
  {
    id: 1,
    question: "How do I book a tour package?",
    answer:
      "Simply browse our packages, select your preferred date, and click the 'Book Now' button. You can pay securely via SSLCommerz or Mobile Banking.",
  },
  {
    id: 2,
    question: "What is your refund policy?",
    answer:
      "We offer a full refund if you cancel at least 48 hours before the trip starts. For group tours, the policy may vary slightly.",
  },
  {
    id: 3,
    question: "Are the tour guides certified?",
    answer:
      "Yes, all our guides are professionally trained and have extensive knowledge about local history and safety protocols.",
  },
];

const blogs = [
  {
    id: 1,
    title: "10 Things to Carry for Sajek Trip",
    date: "March 15, 2026",
    image:
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    title: "Best Time to Visit Sundarbans",
    date: "Feb 28, 2026",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    title: "Budget Travel Tips for Students",
    date: "Jan 10, 2026",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600",
  },
];

export default function FAQAndBlog() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-950 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* --- ১. সেন্ট্রাল হেডলাইন (আপনার সব সেকশনের সাথে মিল রেখে) --- */}
        <div className="text-center mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-[0.3em] text-xs"
          >
            Resources & Help
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight"
          >
            Find The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              Right Answers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg"
          >
            Explore our frequently asked questions and latest travel stories to
            make your next journey smooth and unforgettable.
          </motion.p>
        </div>

        {/* --- ২. মেইন কন্টেন্ট গ্রিড --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* --- FAQ সেকশন (বাম পাশে) --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <RiQuestionLine size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wider">
                FAQ Center
              </h3>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="font-bold text-gray-800 dark:text-gray-100 text-lg pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={`p-2 rounded-full transition-transform duration-300 ${openId === faq.id ? "bg-indigo-600 text-white rotate-180" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}
                    >
                      {openId === faq.id ? (
                        <AiOutlineMinus />
                      ) : (
                        <AiOutlinePlus />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed text-base"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* --- Blog সেকশন (ডান পাশে) --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                <RiArticleLine size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wider">
                Latest Articles
              </h3>
            </div>

            <div className="space-y-6">
              {blogs.map((blog, idx) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex flex-col sm:flex-row gap-5 bg-white dark:bg-gray-900 p-5 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm cursor-pointer group transition-all hover:shadow-xl hover:shadow-indigo-500/5"
                >
                  <div className="relative overflow-hidden rounded-2xl w-full sm:w-32 h-32">
                    <img
                      src={blog.image}
                      className="w-full h-full object-cover dark:brightness-90 transition-transform duration-500 group-hover:scale-110"
                      alt="blog"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <p className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 mb-2 uppercase tracking-[0.2em]">
                      {blog.date}
                    </p>
                    <h4 className="font-black text-gray-900 dark:text-white text-xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                      {blog.title}
                    </h4>
                    <p className="text-sm font-bold text-gray-400 mt-3 group-hover:text-gray-900 dark:group-hover:text-gray-200 flex items-center gap-2">
                      Read Article <span className="text-xl">→</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
