// "use client";

// import ItemCard from "@/Component/Cards/ItemCard";
// import ItemSkeletonCard from "@/Component/Skeleton/ItemSkeletonCard";
// import { useEffect, useState } from "react";

// type Tour = {
//   _id: string;
//   title: string;
//   image: string;
//   price: number;
//   rating?: number;
// };

// export default function ExplorePage() {
//   const [data, setData] = useState<Tour[]>([]);
//   const [loading, setLoading] = useState(true);

//   // 🔍 States
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [priceMin, setPriceMin] = useState("");
//   const [priceMax, setPriceMax] = useState("");
//   const [rating, setRating] = useState("");
//   const [sort, setSort] = useState("");
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);

//   const limit = 8;

//   // 📡 Fetch Data
//   const fetchTours = async () => {
//     setLoading(true);

//     const query = new URLSearchParams({
//       ...(search && { search }),
//       ...(category && { category }),
//       ...(priceMin && { priceMin }),
//       ...(priceMax && { priceMax }),
//       ...(rating && { rating }),
//       ...(sort && { sort }),
//       page: page.toString(),
//       limit: limit.toString(),
//     });

//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/v1/items?${query.toString()}`,
//       );

//       const result = await res.json();

//       setData(result.data);
//       setTotal(result.meta?.total || 0);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔄 Refetch when filters change
//   useEffect(() => {
//     fetchTours();
//   }, [search, category, priceMin, priceMax, rating, sort, page]);

//   const totalPages = Math.ceil(total / limit);

//   return (
//     <div className="p-6">
//       {/* Heading */}
//       <h1 className="text-3xl font-bold mb-6 text-center">Explore Our Tours</h1>

//       {/* 🔍 Search + Filters */}
//       <div className="flex flex-col md:flex-row gap-3 mb-6">
//         {/* Search */}
//         <input
//           type="text"
//           placeholder="🔍 Search..."
//           className="border p-2 rounded w-full md:w-1/5"
//           value={search}
//           onChange={(e) => {
//             setPage(1);
//             setSearch(e.target.value);
//           }}
//         />

//         {/* Category */}
//         <select
//           className="border p-2 rounded w-full md:w-1/5"
//           value={category}
//           onChange={(e) => {
//             setPage(1);
//             setCategory(e.target.value);
//           }}
//         >
//           <option value="">📂 Category</option>
//           <option value="travel">Travel</option>
//           <option value="adventure">Adventure</option>
//           <option value="food">Food</option>
//           <option value="hotel">Hotel</option>
//         </select>

//         {/* Min Price */}
//         <select
//           className="border p-2 rounded w-full md:w-1/5"
//           value={priceMin}
//           onChange={(e) => {
//             setPage(1);
//             setPriceMin(e.target.value);
//           }}
//         >
//           <option value="">💰 Min Price</option>
//           <option value="10">10</option>
//           <option value="50">50</option>
//           <option value="100">100</option>
//           <option value="500">500</option>
//         </select>

//         {/* Max Price */}
//         <select
//           className="border p-2 rounded w-full md:w-1/5"
//           value={priceMax}
//           onChange={(e) => {
//             setPage(1);
//             setPriceMax(e.target.value);
//           }}
//         >
//           <option value="">💰 Max Price</option>
//           <option value="100">100</option>
//           <option value="500">500</option>
//           <option value="1000">1000</option>
//           <option value="5000">5000</option>
//         </select>

//         {/* Rating */}
//         <select
//           className="border p-2 rounded w-full md:w-1/5"
//           value={rating}
//           onChange={(e) => {
//             setPage(1);
//             setRating(e.target.value);
//           }}
//         >
//           <option value="">⭐ Rating</option>
//           <option value="1">1★</option>
//           <option value="2">2★</option>
//           <option value="3">3★</option>
//           <option value="4">4★</option>
//           <option value="5">5★</option>
//         </select>
//       </div>

//       {/* 🔃 Sort */}
//       <select
//         className="border p-2 rounded mb-6 w-full md:w-60"
//         value={sort}
//         onChange={(e) => {
//           setPage(1);
//           setSort(e.target.value);
//         }}
//       >
//         <option value="">🔃 Sort By</option>
//         <option value="price">💲 Price: Low → High</option>
//         <option value="-price">💲 Price: High → Low</option>
//         <option value="-rating">⭐ Rating</option>
//         <option value="-createdAt">🆕 Newest</option>
//       </select>

//       {/* 📦 Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {loading
//           ? Array.from({ length: 8 }).map((_, i) => (
//               <ItemSkeletonCard key={i} />
//             ))
//           : data.map((item) => <ItemCard key={item._id} item={item} />)}
//       </div>

//       {/* 📄 Pagination */}
//       <div className="flex justify-center mt-6 gap-4 items-center">
//         <button
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//         >
//           Prev
//         </button>

//         <span>
//           Page {page} of {totalPages || 1}
//         </span>

//         <button
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           disabled={page === totalPages || totalPages === 0}
//           onClick={() => setPage((p) => p + 1)}
//         >
//           Next
//         </button>
//       </div>
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
  rating?: number;
};

export default function ExplorePage() {
  const [data, setData] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔍 States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 8;

  // 📡 Fetch Data
  const fetchTours = async () => {
    setLoading(true);

    const query = new URLSearchParams({
      ...(search && { search }),
      ...(category && { category }),
      ...(priceMin && { priceMin }),
      ...(priceMax && { priceMax }),
      ...(sort && { sort }),
      page: page.toString(),
      limit: limit.toString(),
    });

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/items?${query.toString()}`,
      );

      const result = await res.json();

      setData(result.data);
      setTotal(result.meta?.total || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Refetch
  useEffect(() => {
    fetchTours();
  }, [search, category, priceMin, priceMax, sort, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Our Tours</h1>

      {/* 🔥 ALL INPUTS IN ONE LINE */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search..."
          className="border p-2 rounded w-full md:w-1/4"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        {/* Category */}
        <select
          className="border p-2 rounded w-full md:w-1/4"
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
        >
          <option value="">📂 Category</option>
          <option value="travel">Travel</option>
          <option value="adventure">Adventure</option>
          <option value="food">Food</option>
          <option value="hotel">Hotel</option>
        </select>

        {/* Price Range */}
        <select
          className="border p-2 rounded w-full md:w-1/4"
          onChange={(e) => {
            setPage(1);
            const value = e.target.value;

            if (value === "low") {
              setPriceMin("0");
              setPriceMax("100");
            } else if (value === "medium") {
              setPriceMin("100");
              setPriceMax("500");
            } else if (value === "high") {
              setPriceMin("500");
              setPriceMax("5000");
            } else {
              setPriceMin("");
              setPriceMax("");
            }
          }}
        >
          <option value="">💰 Price Range</option>
          <option value="low">0 - 100</option>
          <option value="medium">100 - 500</option>
          <option value="high">500+</option>
        </select>

        {/* Sort */}
        <select
          className="border p-2 rounded w-full md:w-1/4"
          value={sort}
          onChange={(e) => {
            setPage(1);
            setSort(e.target.value);
          }}
        >
          <option value="">🔃 Sort</option>
          <option value="price">Price Low → High</option>
          <option value="-price">Price High → Low</option>
          <option value="-rating">Rating</option>
          <option value="-createdAt">Newest</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ItemSkeletonCard key={i} />
            ))
          : data.map((item) => <ItemCard key={item._id} item={item} />)}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4 items-center">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
