"use client";

import Link from "next/link";

type Item = {
  _id: string;
  title: string;
  image: string;
  price: number;
  discountPrice?: number;
  rating?: number;
  location?: {
    city?: string;
  };
  duration?: string;
};

const ItemCard = ({ item }: { item: Item }) => {
  return (
    <div className="border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white dark:bg-gray-900 flex flex-col">
      {/* Image */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="h-48 w-full object-cover"
        />

        {/* Discount Badge */}
        {item.discountPrice && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Sale
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="font-semibold text-lg line-clamp-1">{item.title}</h2>

        {/* Location */}
        <p className="text-sm text-gray-500">📍 {item.location?.city}</p>

        {/* Duration */}
        {item.duration && (
          <p className="text-sm text-gray-500">⏱ {item.duration}</p>
        )}

        {/* Rating */}
        {item.rating && (
          <p className="text-yellow-500 text-sm">⭐ {item.rating}</p>
        )}

        {/* Price */}
        <div className="mt-2">
          {item.discountPrice ? (
            <>
              <span className="text-gray-400 line-through mr-2">
                ৳ {item.price}
              </span>
              <span className="text-blue-600 font-bold">
                ৳ {item.discountPrice}
              </span>
            </>
          ) : (
            <span className="text-blue-600 font-bold">৳ {item.price}</span>
          )}
        </div>

        {/* Button */}
        <Link href={`/tours/${item._id}`} className="mt-auto">
          <button className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
