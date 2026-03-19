"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

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

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="py-24 bg-gray-50 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* --- FAQ সেকশন (বাম পাশে) --- */}
        <div>
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm">
            Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-8">
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-800 text-lg">
                    {faq.question}
                  </span>
                  {openId === faq.id ? (
                    <AiOutlineMinus className="text-indigo-600" />
                  ) : (
                    <AiOutlinePlus className="text-gray-400" />
                  )}
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-600 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* --- Blog সেকশন (ডান পাশে) --- */}
        <div>
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm">
            Our Blog
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-8">
            Latest Travel <span className="text-indigo-600">Stories</span>
          </h2>

          <div className="space-y-6">
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                whileHover={{ x: 10 }}
                className="flex gap-5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm cursor-pointer group"
              >
                <img
                  src={blog.image}
                  className="w-24 h-24 rounded-xl object-cover"
                  alt="blog"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-xs font-semibold text-indigo-500 mb-1">
                    {blog.date}
                  </p>
                  <h4 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">
                    {blog.title}
                  </h4>
                  <p className="text-sm text-gray-400 mt-1 italic">
                    Read Article →
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
