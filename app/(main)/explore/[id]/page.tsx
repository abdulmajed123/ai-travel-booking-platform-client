// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import ItemDetailsCard from "@/Component/Cards/ItemDetailsCard";
// import DetailsSkeletonCard from "@/Component/Skeleton/DetailsSkeletonCard";

// type Location = {
//   country: string;
//   city: string;
//   area: string;
// };

// type Itinerary = {
//   _id: string;
//   day: number;
//   title: string;
//   description: string;
// };

// type Item = {
//   _id: string;
//   title: string;
//   description: string;
//   shortDescription: string;
//   image: string;
//   images: string[];
//   price: number;
//   discountPrice: number;
//   rating: number;
//   category: string;
//   duration: string;
//   location: Location;
//   availableDates: string[];
//   facilities: string[];
//   highlights: string[];
//   itinerary: Itinerary[];
// };

// export default function ItemDetailsPage() {
//   const { id } = useParams();
//   const [item, setItem] = useState<Item | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/v1/items/${id}`);
//         const data = await res.json();
//         if (data.success) setItem(data.data);
//       } catch (err) {
//         console.error("Failed to fetch item:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItem();
//   }, [id]);

//   if (loading) return <DetailsSkeletonCard />;
//   if (!item) return <p className="p-4">Item not found.</p>;

//   return <ItemDetailsCard item={item} />;
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ItemDetailsCard from "@/Component/Cards/ItemDetailsCard";
import DetailsSkeletonCard from "@/Component/Skeleton/DetailsSkeletonCard";
// পাথটি আপনার ফোল্ডার অনুযায়ী চেক করুন
import { AiFillStar } from "react-icons/ai";
import ReviewModal from "@/Component/ReviewModal/ReviewModal";

// ... (আপনার আগের টাইপগুলো একই থাকবে)

export default function ItemDetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [reviews, setReviews] = useState<any[]>([]); // রিভিউ রাখার জন্য
  const [loading, setLoading] = useState(true);

  // আইটেম এবং রিভিউ দুটিই ফেচ করার ফাংশন
  const fetchData = async () => {
    try {
      // ১. আইটেম ফেচ
      const itemRes = await fetch(`http://localhost:5000/api/v1/items/${id}`);
      const itemData = await itemRes.json();
      if (itemData.success) setItem(itemData.data);

      // ২. ওই আইটেমের সব রিভিউ ফেচ
      const reviewRes = await fetch(
        `http://localhost:5000/api/v1/reviews/item/${id}`,
      );
      const reviewData = await reviewRes.json();
      if (reviewData.success) setReviews(reviewData.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <DetailsSkeletonCard />;
  if (!item)
    return <p className="p-4 text-center font-bold">Item not found.</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-10">
      {/* মেইন ডিটেইলস কার্ড */}
      <ItemDetailsCard item={item} />

      {/* --- রিভিউ সেকশন --- */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">
              Customer Experiences
            </h2>
            <p className="text-sm text-gray-400 font-medium">
              Read what other travelers are saying about this package.
            </p>
          </div>

          {/* রিভিউ মোডাল বাটন */}
          <ReviewModal itemId={item._id} onSuccess={fetchData} />
        </div>

        {/* রিভিউ লিস্ট */}
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold">
              No reviews yet. Be the first to share your experience!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-6 bg-gray-50/50 rounded-3xl border border-gray-50 hover:border-blue-100 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xs">
                      {review.userId?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-gray-800">
                        {review.userId?.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Verified Traveler
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                    <AiFillStar className="text-orange-400" />
                    <span className="text-xs font-black text-gray-700">
                      {review.rating}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  "{review.comment}"
                </p>
                <p className="text-[10px] text-gray-300 mt-4 font-bold">
                  Posted on: {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
