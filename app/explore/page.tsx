"use client";

import ItemCard from "@/Component/Cards/ItemCard";
import { useEffect, useState } from "react";

export default function ExplorePage() {
  const [data, setData] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/items");
        const result = await res.json();

        setData(result.data); // assuming { data: [...] }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((item) => (
        <ItemCard key={item._id} item={item}></ItemCard>
      ))}
    </div>
  );
}
