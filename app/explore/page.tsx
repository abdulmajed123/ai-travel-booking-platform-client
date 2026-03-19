// "use client";

// import ItemCard from "@/Component/Cards/ItemCard";
// import { useEffect, useState } from "react";

// export default function ExplorePage() {
//   const [data, setData] = useState<Tour[]>([]);

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/v1/items");
//         const result = await res.json();

//         setData(result.data); // assuming { data: [...] }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchTours();
//   }, []);

//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {data.map((item) => (
//         <ItemCard key={item._id} item={item}></ItemCard>
//       ))}
//     </div>
//   );
// }

"use client";

import ItemCard from "@/Component/Cards/ItemCard";
import ItemSkeletonCard from "@/Component/Skeleton/ItemSkeletonCard";
import { useEffect, useState } from "react";

type Tour = {
  _id: string;
  title: string;
  image: string;
  price: number;
};

export default function ExplorePage() {
  const [data, setData] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true); // ✅ loading state add

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/items");
        const result = await res.json();

        setData(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // ✅ loading off
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* ✅ Skeleton Loading */}
      {loading
        ? Array.from({ length: 8 }).map((_, i) => <ItemSkeletonCard key={i} />)
        : data.map((item) => <ItemCard key={item._id} item={item} />)}
    </div>
  );
}
