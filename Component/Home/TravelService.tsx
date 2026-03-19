// "use client";

// import ItemCard from "@/Component/Cards/ItemCard";
// import ItemSkeletonCard from "@/Component/Skeleton/ItemSkeletonCard";
// import { useEffect, useState } from "react";

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
//         const res = await fetch("http://localhost:5000/api/v1/items");
//         const result = await res.json();

//         setData(result.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTours();
//   }, []);

//   return (
//     <div className="p-6">
//       {/* Heading / Text Above Grid */}
//       <h1 className="text-3xl font-bold mb-6 text-center">Explore Our Tours</h1>
//       <p className="text-center text-gray-600 mb-6">
//         Discover amazing places and experiences for your next adventure.
//       </p>

//       {/* Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {loading
//           ? Array.from({ length: 8 }).map((_, i) => (
//               <ItemSkeletonCard key={i} />
//             ))
//           : data.map((item) => <ItemCard key={item._id} item={item} />)}
//       </div>
//     </div>
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
        const res = await fetch("http://localhost:5000/api/v1/items");
        const result = await res.json();

        // এখানে ডাটা স্লাইস করে মাত্র ৮টি নেওয়া হয়েছে
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
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* --- হেডিং সেকশন --- */}
        <div className="text-center mb-12 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-indigo-600 font-bold tracking-widest uppercase text-sm"
          >
            Exclusive Offers
          </motion.span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            Our Most Popular <span className="text-indigo-600">Packages</span>
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed">
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

        {/* --- View All Button (অপশনাল কিন্তু ভালো দেখায়) --- */}
        {!loading && (
          <div className="mt-16 text-center">
            <Link
              href={"/explore"}
              className="px-10 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors shadow-lg hover:shadow-indigo-200"
            >
              View All Destinations
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
