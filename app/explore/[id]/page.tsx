"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ItemDetailsCard from "@/Component/Cards/ItemDetailsCard";
import DetailsSkeletonCard from "@/Component/Skeleton/DetailsSkeletonCard";

type Location = {
  country: string;
  city: string;
  area: string;
};

type Itinerary = {
  _id: string;
  day: number;
  title: string;
  description: string;
};

type Item = {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  price: number;
  discountPrice: number;
  rating: number;
  category: string;
  duration: string;
  location: Location;
  availableDates: string[];
  facilities: string[];
  highlights: string[];
  itinerary: Itinerary[];
};

export default function ItemDetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/items/${id}`);
        const data = await res.json();
        if (data.success) setItem(data.data);
      } catch (err) {
        console.error("Failed to fetch item:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <DetailsSkeletonCard />;
  if (!item) return <p className="p-4">Item not found.</p>;

  return <ItemDetailsCard item={item} />;
}
