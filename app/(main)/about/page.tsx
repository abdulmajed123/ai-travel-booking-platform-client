"use client";

import { motion } from "framer-motion";
import {
  AiOutlineRocket,
  AiOutlineHeart,
  AiOutlineThunderbolt,
  AiOutlineTeam,
} from "react-icons/ai";

const stats = [
  { label: "Founded", value: "2024" },
  { label: "Trips Planned", value: "15,000+" },
  { label: "Happy Travelers", value: "10,000+" },
  { label: "Local Partners", value: "200+" },
];

const values = [
  {
    icon: <AiOutlineHeart className="text-pink-500" />,
    title: "Passion for Travel",
    desc: "We don't just book trips; we live for the thrill of discovery and the joy of a perfect itinerary.",
  },
  {
    icon: <AiOutlineThunderbolt className="text-yellow-500" />,
    title: "Swift Booking",
    desc: "Our AI-powered platform ensures you get your tickets and hotel vouchers in seconds, not hours.",
  },
  {
    icon: <AiOutlineRocket className="text-blue-500" />,
    title: "Modern Tech",
    desc: "Using the latest technology to personalize your travel experience based on your unique preferences.",
  },
  {
    icon: <AiOutlineTeam className="text-green-500" />,
    title: "Dedicated Support",
    desc: "Our human-led support team is available 24/7 to help you navigate any unexpected travel hurdles.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-900 overflow-hidden">
      {/* --- ১. Hero Section --- */}
      <section className="relative py-24 bg-blue-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold tracking-widest uppercase text-sm"
          >
            Our Story
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl md:text-6xl font-black text-gray-900 dark:text-white"
          >
            Redefining How You <br />
            <span className="text-blue-600">Explore The World</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            TravelAI was born from a simple dream: to make world-class travel
            accessible, smart, and stress-free for everyone.
          </motion.p>
        </div>
      </section>

      {/* --- ২. Image & Vision Section --- */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
              alt="Our Team"
              className="rounded-[2rem] shadow-2xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 md:p-8 rounded-2xl hidden md:block max-w-xs shadow-xl">
              <p className="text-lg font-semibold italic">
                "Travel is the only thing you buy that makes you richer."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Vision
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              We believe travel is more than just a ticket to a destination.
              It's an opportunity to grow, connect with new cultures, and create
              memories that last a lifetime.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              By combining AI-driven insights with human empathy, we are
              building a platform that understands your travel style before you
              even pack your bags.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              {stats.map((stat, i) => (
                <div key={i} className="border-l-4 border-blue-600 pl-4">
                  <h4 className="text-2xl font-black text-gray-900 dark:text-white">
                    {stat.value}
                  </h4>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ৩. Core Values Section --- */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
            The Values That Guide Us
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4">
            Integrity, Innovation, and Inspiration in every trip.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-center hover:shadow-xl transition-all"
            >
              <div className="text-4xl flex justify-center mb-6">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {val.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- ৪. Call to Action --- */}
      <section className="py-24 text-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-blue-600 p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-blue-200 dark:shadow-none relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />

          <h2 className="relative z-10 text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            Ready to Start Your Story?
          </h2>
          <p className="relative z-10 text-blue-100 mb-10 text-lg max-w-xl mx-auto">
            Join 10,000+ travelers exploring the world with smarter booking and
            personalized itineraries.
          </p>
          <button className="relative z-10 bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all active:scale-95 shadow-lg">
            Book Your First Trip
          </button>
        </motion.div>
      </section>
    </div>
  );
}
