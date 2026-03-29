// "use client";

// import ItemCard from "@/Component/Cards/ItemCard";
// import ItemSkeletonCard from "@/Component/Skeleton/ItemSkeletonCard";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";

// type Tour = {
//   _id: string;
//   title: string;
//   image: string;
//   price: number;
// };

// export default function TravelService() {
//   const [data, setData] = useState<Tour[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const res = await fetch("https://ai-travel-booking-platform-server.onrender.com/api/v1/items");
//         const result = await res.json();

//         // এখানে ডাটা স্লাইস করে মাত্র ৮টি নেওয়া হয়েছে
//         setData(result.data.slice(0, 8));
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTours();
//   }, []);

//   return (
//     <section className="py-16 px-4 bg-white dark:bg-black">
//       <div className="max-w-7xl mx-auto">
//         {/* --- হেডিং সেকশন --- */}
//         <div className="text-center mb-12 space-y-4">
//           <motion.span
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             className="text-indigo-600 font-bold tracking-widest uppercase text-sm"
//           >
//             Exclusive Offers
//           </motion.span>

//           <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
//             Our Most Popular <span className="text-indigo-600">Packages</span>
//           </h2>

//           <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed">
//             From serene beaches to majestic mountains, discover our handpicked
//             destinations designed for your dream vacation.
//           </p>
//         </div>

//         {/* --- গ্রিড লেআউট --- */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {loading
//             ? Array.from({ length: 8 }).map((_, i) => (
//                 <ItemSkeletonCard key={i} />
//               ))
//             : data.map((item) => (
//                 <motion.div
//                   key={item._id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.4 }}
//                   viewport={{ once: true }}
//                 >
//                   <ItemCard item={item} />
//                 </motion.div>
//               ))}
//         </div>

//         {/* --- View All Button (অপশনাল কিন্তু ভালো দেখায়) --- */}
//         {!loading && (
//           <div className="mt-16 text-center">
//             <Link
//               href={"/explore"}
//               className="px-10 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors shadow-lg hover:shadow-indigo-200"
//             >
//               View All Destinations
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

"use client";

import ItemCard from "@/Component/Cards/ItemCard";
import ItemSkeletonCard from "@/Component/Skeleton/ItemSkeletonCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Tour = {
  _id: string;
  title: string;
  image: string;
  price: number;
};

export default function TravelService() {
  const [data, setData] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch(
          "https://ai-travel-booking-platform-server.onrender.com/api/v1/items",
        );
        const result = await res.json();
        // ডাটা স্লাইস করে ৮টি নেওয়া
        setData(result.data.slice(0, 8));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    /* bg-white এবং dark:bg-slate-950 যোগ করা হয়েছে যাতে টগল কাজ করে */
    <section className="py-16 px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* --- হেডিং সেকশন --- */}
        <div className="text-center mb-12 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase text-sm"
          >
            Exclusive Offers
          </motion.span>

          {/* টেক্সট কালার ডার্ক মোডে সাদা করার জন্য text-gray-900 dark:text-white */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Our Most Popular{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Packages
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            From serene beaches to majestic mountains, discover our handpicked
            destinations designed for your dream vacation.
          </p>
        </div>

        {/* --- গ্রিড লেআউট --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ItemSkeletonCard key={i} />
              ))
            : data.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <ItemCard item={item} />
                </motion.div>
              ))}
        </div>

        {/* --- View All Button --- */}
        {!loading && (
          <div className="mt-16 text-center">
            <Link
              href={"/explore"}
              className="px-10 py-4 bg-gray-900 dark:bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 dark:hover:shadow-none"
            >
              View All Destinations
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
