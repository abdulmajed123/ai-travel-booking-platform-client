// "use client";

// import { motion } from "framer-motion";
// import { AiFillStar } from "react-icons/ai";

// const stats = [
//   { id: 1, label: "Happy Travelers", value: "12,000+" },
//   { id: 2, label: "Tours Completed", value: "1,500+" },
//   { id: 3, label: "Destinations", value: "50+" },
//   { id: 4, label: "Positive Reviews", value: "99%" },
// ];

// const reviews = [
//   {
//     id: 1,
//     name: "Anika Rahman",
//     location: "Dhaka, Bangladesh",
//     image: "https://i.pravatar.cc/150?u=anika",
//     comment:
//       "My trip to Sajek with TravelGo was amazing! The guide was professional and the view was breathtaking. Highly recommended!",
//     rating: 5,
//   },
//   {
//     id: 2,
//     name: "Rahat Karim",
//     location: "Chittagong, Bangladesh",
//     image: "https://i.pravatar.cc/150?u=rahat",
//     comment:
//       "The booking process was so smooth. I got the best price for my family's Cox's Bazar tour. Five stars!",
//     rating: 5,
//   },
//   {
//     id: 3,
//     name: "Sumi Akter",
//     location: "Sylhet, Bangladesh",
//     image: "https://i.pravatar.cc/150?u=sumi",
//     comment:
//       "Unexpectedly great support! They helped us even at midnight when we needed a vehicle change. Truly reliable.",
//     rating: 4,
//   },
// ];

// export default function Review() {
//   return (
//     /* bg-white এর বদলে dark:bg-slate-950 এবং ট্রানজিশন যোগ করা হয়েছে */
//     <section className="py-20 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* --- ১. স্ট্যাটিস্টিকস বার (Statistics) --- */}
//         {/* ডার্ক মোডে শ্যাডো কমানো হয়েছে যাতে দেখতে ক্লিন লাগে */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24 bg-indigo-600 p-10 rounded-[3rem] shadow-2xl shadow-indigo-200 dark:shadow-indigo-900/20">
//           {stats.map((stat) => (
//             <div
//               key={stat.id}
//               className="text-center text-white border-r last:border-none border-indigo-400/50"
//             >
//               <h3 className="text-3xl md:text-4xl font-black mb-1">
//                 {stat.value}
//               </h3>
//               <p className="text-indigo-100 text-sm font-medium uppercase tracking-widest">
//                 {stat.label}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* --- ২. টেস্টিনোমিয়াল সেকশন (Testimonials) --- */}
//         <div className="text-center mb-16">
//           <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-sm">
//             Testimonials
//           </span>
//           <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-3">
//             What Our{" "}
//             <span className="text-indigo-600 dark:text-indigo-400">
//               Travelers
//             </span>{" "}
//             Say
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {reviews.map((review, index) => (
//             <motion.div
//               key={review.id}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.2 }}
//               viewport={{ once: true }}
//               /* কার্ডের জন্য dark:bg-gray-900 এবং বর্ডার অ্যাডজাস্ট করা হয়েছে */
//               className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all relative"
//             >
//               <div className="flex gap-1 mb-4">
//                 {[...Array(review.rating)].map((_, i) => (
//                   <AiFillStar key={i} className="text-yellow-400 text-xl" />
//                 ))}
//               </div>
//               <p className="text-gray-600 dark:text-gray-400 italic mb-6 leading-relaxed">
//                 "{review.comment}"
//               </p>
//               <div className="flex items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
//                 <img
//                   src={review.image}
//                   alt={review.name}
//                   className="w-14 h-14 rounded-full border-2 border-indigo-500 p-0.5"
//                 />
//                 <div>
//                   <h4 className="font-bold text-gray-900 dark:text-white">
//                     {review.name}
//                   </h4>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
//                     {review.location}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { useEffect, useRef } from "react";

// ১. অ্যানিমেটেড কাউন্টার কম্পোনেন্ট
const Counter = ({ value }: { value: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // সংখ্যাটি আলাদা করা (যেমন: "12,000+" থেকে 12000)
  const numericValue = parseInt(value.replace(/[,+ %]/g, ""));
  const suffix = value.replace(/[0-9,]/g, ""); // +, % ইত্যাদি আলাদা করা

  const count = useMotionValue(0);
  const rounded = useTransform(
    count,
    (latest) => Math.round(latest).toLocaleString() + suffix,
  );

  useEffect(() => {
    if (isInView) {
      animate(count, numericValue, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, count, numericValue]);

  return (
    <motion.h3 ref={ref} className="text-3xl md:text-5xl font-black mb-1">
      {rounded}
    </motion.h3>
  );
};

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
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* --- ১. অ্যানিমেটেড স্ট্যাটিস্টিকস বার --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24 bg-gradient-to-r from-indigo-600 to-blue-600 p-12 rounded-[3.5rem] shadow-2xl shadow-indigo-500/20">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="text-center text-white border-r last:border-none border-white/20 px-4"
            >
              <Counter value={stat.value} />
              <p className="text-indigo-100 text-xs md:text-sm font-bold uppercase tracking-widest opacity-80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* --- ২. টেস্টিনোমিয়াল সেকশন --- */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-sm bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-full"
          >
            Testimonials
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-6 leading-tight">
            Loved by <span className="text-indigo-600">Travelers</span> <br />{" "}
            Around the Country
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 30 }}
              whileHover={{ y: 0 }} // হোভার করলে উপরে উঠবে
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all relative group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <AiFillStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic mb-8 leading-relaxed text-lg">
                "{review.comment}"
              </p>
              <div className="flex items-center gap-4 border-t border-gray-200/50 dark:border-gray-700/50 pt-6">
                <div className="relative">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-14 h-14 rounded-full border-2 border-indigo-500 object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                    {review.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
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
