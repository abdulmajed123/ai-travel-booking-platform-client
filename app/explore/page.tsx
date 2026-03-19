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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/items");
        const result = await res.json();

        setData(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="p-6">
      {/* Heading / Text Above Grid */}
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Our Tours</h1>
      <p className="text-center text-gray-600 mb-6">
        Discover amazing places and experiences for your next adventure.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ItemSkeletonCard key={i} />
            ))
          : data.map((item) => <ItemCard key={item._id} item={item} />)}
      </div>
    </div>
  );
}
