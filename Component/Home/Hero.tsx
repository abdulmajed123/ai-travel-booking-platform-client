"use client";

import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-[70vh] w-full flex items-center justify-center text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Travel"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Explore the World with <span className="text-blue-400">AI</span>
        </h1>

        <p className="mt-4 text-sm md:text-lg text-gray-200">
          Discover amazing destinations, book your dream trips, and get smart
          AI-powered travel recommendations tailored just for you.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/explore"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-semibold transition"
          >
            Explore Destinations
          </Link>

          <Link
            href="/ai-assistant"
            className="border border-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition"
          >
            Ask AI Assistant
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
