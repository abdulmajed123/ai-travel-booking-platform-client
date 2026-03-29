"use client";

import { motion } from "framer-motion";
import {
  AiOutlineSafetyCertificate,
  AiOutlineDollarCircle,
  AiOutlineCustomerService,
  AiOutlineGlobal,
} from "react-icons/ai";

const features = [
  {
    id: 1,
    icon: <AiOutlineDollarCircle />,
    title: "Best Price Guarantee",
    desc: "We offer the most competitive rates in the market without compromising quality.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    id: 2,
    icon: <AiOutlineSafetyCertificate />,
    title: "Safe & Secure Travel",
    desc: "Your safety is our priority. We provide verified guides and premium transport.",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
  {
    id: 3,
    icon: <AiOutlineCustomerService />,
    title: "24/7 Support",
    desc: "Our dedicated support team is always available to help you during your journey.",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    id: 4,
    icon: <AiOutlineGlobal />,
    title: "Wide Destinations",
    desc: "Explore over 500+ destinations across the country with specialized itineraries.",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-950 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* --- ১. নতুন হেডলাইন সেকশন (আপনার স্ক্রিনশট স্টাইল অনুযায়ী) --- */}
        <div className="text-center mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-[0.3em] text-xs"
          >
            Exclusive Benefits
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight"
          >
            Why You Should{" "}
            <span className="text-indigo-600 dark:text-indigo-500 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              Travel With Us
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg"
          >
            We don't just sell tours; we create unforgettable memories. Discover
            the reasons why thousands of explorers choose us for their dream
            vacations.
          </motion.p>
        </div>

        {/* --- ২. কন্টেন্ট গ্রিড (আপনার আগের ডিজাইন অনুযায়ী) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* বাম পাশে টেক্সট কন্টেন্ট */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Experience the best <br />
              <span className="text-indigo-600">Travel Solutions</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Our commitment to excellence makes us the leading travel partner.
              We provide personalized services that ensure your journey is
              smooth, safe, and exciting.
            </p>
            <ul className="space-y-3">
              {[
                "Verified Local Guides",
                "Premium Transport Service",
                "No Hidden Charges",
              ].map((list, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium italic"
                >
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />{" "}
                  {list}
                </li>
              ))}
            </ul>
            <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all active:scale-95">
              Learn More About Us
            </button>
          </motion.div>

          {/* ডান পাশে ফিচার গ্রিড */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group"
              >
                <div
                  className={`text-4xl mb-4 p-3 rounded-2xl inline-block ${feature.bg} ${feature.color} group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.id === 4 ? "500+ Destinations" : feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
