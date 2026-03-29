"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ItemDetailsCard from "@/Component/Cards/ItemDetailsCard";
import DetailsSkeletonCard from "@/Component/Skeleton/DetailsSkeletonCard";
import { AiFillStar, AiOutlineMessage } from "react-icons/ai";
import { BiTrip } from "react-icons/bi";
import ReviewModal from "@/Component/ReviewModal/ReviewModal";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const itemRes = await fetch(
        `https://ai-travel-booking-platform-server.onrender.com/api/v1/items/${id}`,
      );
      const itemData = await itemRes.json();
      if (itemData.success) setItem(itemData.data);

      const reviewRes = await fetch(
        `https://ai-travel-booking-platform-server.onrender.com/api/v1/reviews/item/${id}`,
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
    return (
      <p className="p-4 text-center font-bold dark:text-white">
        Item not found.
      </p>
    );

  // গড় রেটিং ক্যালকুলেট করা
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 space-y-16 mb-20">
        <ItemDetailsCard item={item} />

        {/* --- রিভিউ সেকশন শুরু --- */}
        <section className="relative">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                <AiOutlineMessage size={16} />
                Community Feedback
              </div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                Traveler Stories
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium max-w-md">
                Real experiences shared by our global community of adventurers.
              </p>
            </div>

            {/* রিভিউ সামারি ও বাটন */}
            <div className="flex items-center gap-6 bg-white dark:bg-gray-900 p-4 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="text-center px-4 border-r border-gray-100 dark:border-gray-800">
                <div className="text-3xl font-black text-gray-900 dark:text-white">
                  {avgRating}
                </div>
                <div className="flex text-orange-400 justify-center">
                  <AiFillStar />
                </div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase mt-1">
                  {reviews.length} Reviews
                </div>
              </div>
              <ReviewModal itemId={item._id} onSuccess={fetchData} />
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
              <div className="bg-white dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <BiTrip
                  size={30}
                  className="text-gray-300 dark:text-gray-600"
                />
              </div>
              <p className="text-gray-400 dark:text-gray-500 font-bold text-lg">
                No stories shared yet.
              </p>
              <p className="text-gray-400 dark:text-gray-600 text-sm">
                Be the first to tell us about your journey!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="group relative bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20 transition-all duration-500 hover:-translate-y-2"
                >
                  {/* রেটিং ব্যাজ */}
                  <div className="absolute -top-4 right-8 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-black shadow-lg shadow-blue-200 dark:shadow-none">
                    {review.rating}.0
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-inner">
                        {review.userId?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white dark:border-gray-900 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="text-base font-black text-gray-800 dark:text-gray-100 leading-tight">
                        {review.userId?.name}
                      </h4>
                      <p className="text-[11px] text-blue-500 dark:text-blue-400 font-black uppercase tracking-tighter">
                        Verified Explorer
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-blue-50 dark:text-blue-900/20 font-serif opacity-50">
                      “
                    </span>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium text-sm relative z-10 italic">
                      {review.comment}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
                    <div className="flex text-orange-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <AiFillStar
                          key={i}
                          className={
                            i < review.rating
                              ? "text-orange-400"
                              : "text-gray-100 dark:text-gray-800"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-300 dark:text-gray-600 font-black uppercase tracking-widest">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
