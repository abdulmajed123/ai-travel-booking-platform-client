"use client";

import { motion } from "framer-motion";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineClockCircle,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
} from "react-icons/ai";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* --- ১. হেডার সেকশন --- */}
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-blue-600 font-bold tracking-widest uppercase text-sm"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white"
          >
            How Can We <span className="text-blue-600">Help You?</span>
          </motion.h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg">
            Have a question about a destination or need help with a booking? Our
            team is here for you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* --- ২. কন্টাক্ট ইনফো (বাম পাশে - ৪ কলাম) --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-8 bg-blue-600 p-10 md:p-12 rounded-[2.5rem] text-white shadow-2xl shadow-blue-200 dark:shadow-none"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Contact Information</h3>
              <p className="text-blue-100 italic">
                "Your journey matters to us. Let's make it extraordinary
                together."
              </p>
            </div>

            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <AiOutlinePhone size={24} />
                </div>
                <div>
                  <p className="text-xs text-blue-200 uppercase font-bold">
                    Call Us
                  </p>
                  <p className="text-lg font-medium">+880 1234 567 890</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <AiOutlineMail size={24} />
                </div>
                <div>
                  <p className="text-xs text-blue-200 uppercase font-bold">
                    Email Us
                  </p>
                  <p className="text-lg font-medium">support@travelai.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <AiOutlineEnvironment size={24} />
                </div>
                <div>
                  <p className="text-xs text-blue-200 uppercase font-bold">
                    Our Office
                  </p>
                  <p className="text-lg font-medium">
                    Gulshan-1, Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <AiOutlineClockCircle size={24} />
                </div>
                <div>
                  <p className="text-xs text-blue-200 uppercase font-bold">
                    Working Hours
                  </p>
                  <p className="text-lg font-medium">Sat - Thu: 9AM - 8PM</p>
                </div>
              </div>
            </div>

            <div className="pt-10 flex gap-6">
              <a href="#" className="hover:scale-110 transition-transform">
                <AiFillFacebook size={30} />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <AiFillTwitterCircle size={30} />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <AiFillInstagram size={30} />
              </a>
            </div>
          </motion.div>

          {/* --- ৩. কন্টাক্ট ফর্ম (ডান পাশে - ৭ কলাম) --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-gray-50 dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm"
          >
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <select className="w-full p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white">
                  <option>Booking Inquiry</option>
                  <option>Payment Issue</option>
                  <option>Refund Request</option>
                  <option>Feedback</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us more about your requirements..."
                  className="w-full p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                  required
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-200 dark:shadow-none transition-all"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* --- ৪. গুগল ম্যাপ সেকশন (নিচে) --- */}
        <div className="mt-20 h-96 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14606.31557022033!2d90.41011685!3d23.7629007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70deb73%3A0x30c3339c33959608!2sGulshan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
