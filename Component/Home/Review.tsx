"use client";

import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";

const stats = [
  { id: 1, label: "Happy Travelers", value: "12,000+" },
  { id: 2, label: "Tours Completed", value: "1,500+" },
  { id: 3, label: "Destinations", value: "50+" },
  { id: 4, label: "Positive Reviews", value: "99%" },
];

const reviews = [
  {
    id: 1,
    name: "Anika Rahman",
    location: "Dhaka, Bangladesh",
    image: "https://i.pravatar.cc/150?u=anika",
    comment:
      "My trip to Sajek with TravelGo was amazing! The guide was professional and the view was breathtaking. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahat Karim",
    location: "Chittagong, Bangladesh",
    image: "https://i.pravatar.cc/150?u=rahat",
    comment:
      "The booking process was so smooth. I got the best price for my family's Cox's Bazar tour. Five stars!",
    rating: 5,
  },
  {
    id: 3,
    name: "Sumi Akter",
    location: "Sylhet, Bangladesh",
    image: "https://i.pravatar.cc/150?u=sumi",
    comment:
      "Unexpectedly great support! They helped us even at midnight when we needed a vehicle change. Truly reliable.",
    rating: 4,
  },
];

export default function Review() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* --- ১. স্ট্যাটিস্টিকস বার (Statistics) --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24 bg-indigo-600 p-10 rounded-[3rem] shadow-2xl shadow-indigo-200">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="text-center text-white border-r last:border-none border-indigo-400/50"
            >
              <h3 className="text-3xl md:text-4xl font-black mb-1">
                {stat.value}
              </h3>
              <p className="text-indigo-100 text-sm font-medium uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* --- ২. টেস্টিনোমিয়াল সেকশন (Testimonials) --- */}
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3">
            What Our <span className="text-indigo-600">Travelers</span> Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all relative"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <AiFillStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                "{review.comment}"
              </p>
              <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full border-2 border-indigo-500 p-0.5"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {review.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
