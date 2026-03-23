// const features = [
//   {
//     title: "AI Travel Suggestions",
//     desc: "Get smart destination recommendations based on your interests.",
//   },
//   {
//     title: "Easy Booking",
//     desc: "Book flights, hotels, and tours in just a few clicks.",
//   },
//   {
//     title: "Secure Payment",
//     desc: "Your transactions are fully safe and encrypted.",
//   },
//   {
//     title: "24/7 Support",
//     desc: "We are always here to help you anytime.",
//   },
// ];

// const Feature = () => {
//   return (
//     <section className="py-12 bg-gray-100 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
//           Why Choose Us
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {features.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center"
//             >
//               <h3 className="font-semibold text-lg">{item.title}</h3>
//               <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Feature;

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
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: 2,
    icon: <AiOutlineSafetyCertificate />,
    title: "Safe & Secure Travel",
    desc: "Your safety is our priority. We provide verified guides and premium transport.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    id: 3,
    icon: <AiOutlineCustomerService />,
    title: "24/7 Support",
    desc: "Our dedicated support team is always available to help you during your journey.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    id: 4,
    icon: <AiOutlineGlobal />,
    title: "Wide Destinations",
    desc: "Explore over 500+ destinations across the country with specialized itineraries.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* বাম পাশে টেক্সট কন্টেন্ট */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm">
              Our Core Values
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Why You Should <span className="text-indigo-600">Travel</span>{" "}
              With Us?
            </h2>
            <p className="text-gray-600 text-lg">
              We don't just sell tours; we create unforgettable memories. Our
              commitment to excellence makes us the leading travel partner for
              thousands of explorers.
            </p>
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all">
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
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div
                  className={`text-4xl mb-4 p-3 rounded-2xl inline-block ${feature.bg} ${feature.color} group-hover:bg-indigo-600 group-hover:text-white transition-colors`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
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
