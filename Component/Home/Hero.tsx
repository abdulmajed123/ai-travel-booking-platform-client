"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";

const slides = [
  {
    id: 1,
    title: "Explore the Hidden Gems of Sajek Valley",
    description:
      "Experience the clouds and mountains like never before with our premium tour packages.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2070",
    link: "/explore/sajek",
  },
  {
    id: 2,
    title: "Crystal Clear Waters of Saint Martin",
    description:
      "Relax on the only coral island of Bangladesh. Book your seaside escape today.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2073",
    link: "/explore/saint-martin",
  },
  {
    id: 3,
    title: "Adventure Awaits in the Sundarbans",
    description:
      "Deep dive into the world's largest mangrove forest and discover the Royal Bengal Tiger.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2071",
    link: "/explore/sundarbans",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // অটো স্লাইড ৫ সেকেন্ড পর পর
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-gray-900 pt-16">
      {/* স্লাইডার ইমেজ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" /> {/* ওভারলে */}
        </motion.div>
      </AnimatePresence>

      {/* কন্টেন্ট সেকশন */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
                {slides[current].title}
              </h1>
              <p className="mb-8 text-lg text-gray-200 md:text-xl">
                {slides[current].description}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button className="rounded-full bg-indigo-600 px-8 py-3 text-lg font-bold text-white transition-all hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/30">
                  Book Your Trip
                </button>
                <button className="rounded-full bg-white/20 px-8 py-3 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/30 border border-white/40">
                  Explore Destinations
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* স্লাইড কন্ট্রোল বাটন (বাম ও ডান) */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-4">
        <button
          onClick={prevSlide}
          className="rounded-full bg-white/10 p-3 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-indigo-600"
        >
          <AiOutlineLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="rounded-full bg-white/10 p-3 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-indigo-600"
        >
          <AiOutlineRight size={24} />
        </button>
      </div>

      {/* ডট ইন্ডিকেটর */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 transition-all rounded-full ${
              current === index ? "w-8 bg-indigo-500" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
