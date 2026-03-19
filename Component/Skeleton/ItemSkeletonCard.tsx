"use client";

const ItemSkeletonCard = () => {
  return (
    <div className="border rounded-2xl overflow-hidden shadow-md animate-pulse bg-white dark:bg-gray-900 flex flex-col">
      {/* Image */}
      <div className="h-48 w-full bg-gray-300 dark:bg-gray-700"></div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow space-y-3">
        {/* Title */}
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

        {/* Location */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>

        {/* Duration */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>

        {/* Rating */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>

        {/* Price */}
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>

        {/* Button */}
        <div className="mt-auto h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-full"></div>
      </div>
    </div>
  );
};

export default ItemSkeletonCard;
