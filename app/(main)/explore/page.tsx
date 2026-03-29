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
        `https://ai-travel-booking-platform-server.onrender.com/api/v1/items?${query.toString()}`,
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
    /* কন্টেইনারে dark:text-white এবং ট্রানজিশন যোগ করা হয়েছে */
    <div className="p-6 transition-colors duration-300">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Explore Our Tours
      </h1>

      {/* 🔥 ALL INPUTS IN ONE LINE */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        {/* Search Input - dark:bg-gray-800 এবং dark:border-gray-700 যোগ করা হয়েছে */}
        <input
          type="text"
          placeholder="🔍 Search..."
          className="border border-gray-200 dark:border-gray-700 p-2 rounded w-full md:w-1/4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        {/* Category Select */}
        <select
          className="border border-gray-200 dark:border-gray-700 p-2 rounded w-full md:w-1/4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
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

        {/* Price Range Select */}
        <select
          className="border border-gray-200 dark:border-gray-700 p-2 rounded w-full md:w-1/4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
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

        {/* Sort Select */}
        <select
          className="border border-gray-200 dark:border-gray-700 p-2 rounded w-full md:w-1/4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
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
      <div className="flex justify-center mt-10 gap-4 items-center">
        <button
          className="px-6 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:hover:bg-gray-200 dark:disabled:hover:bg-gray-800 disabled:hover:text-current"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span className="text-gray-700 dark:text-gray-300 font-medium">
          Page {page} of {totalPages || 1}
        </span>

        <button
          className="px-6 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:hover:bg-gray-200 dark:disabled:hover:bg-gray-800 disabled:hover:text-current"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
