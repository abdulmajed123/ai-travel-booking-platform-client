"use client";

import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineDelete, AiOutlineCalendar } from "react-icons/ai";
import { toast } from "react-hot-toast";

export default function MyReviewPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ১. রিভিউ ডাটা ফেচ করা
  const fetchMyReviews = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        "https://ai-travel-booking-platform-server.onrender.com/api/v1/reviews/my-reviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await res.json();
      if (result.success) {
        setReviews(result.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReviews();
  }, []);

  // ২. রিভিউ ডিলিট করা
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://ai-travel-booking-platform-server.onrender.com/api/v1/reviews/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await res.json();

      if (result.success) {
        toast.success("Review deleted successfully");
        setReviews(reviews.filter((r) => r._id !== id));
      }
    } catch (error) {
      toast.error("Delete failed!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
            My Reviews
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Manage your shared experiences and feedback
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 text-center border-2 border-dashed border-slate-100 dark:border-slate-800">
            <p className="text-slate-400 dark:text-slate-500 font-bold">
              You haven't posted any reviews yet!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="group bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-blue-100/50 dark:hover:shadow-none transition-all border border-slate-50 dark:border-slate-800 flex flex-col md:flex-row items-center gap-6"
              >
                {/* আইটেম ইমেজ */}
                <div className="w-full md:w-32 h-32 rounded-[1.5rem] overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-slate-700">
                  <img
                    src={
                      review.itemId?.image || "https://via.placeholder.com/150"
                    }
                    alt={review.itemId?.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* রিভিউ কন্টেন্ট */}
                <div className="flex-grow space-y-2 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 truncate max-w-md">
                      {review.itemId?.title || "Unknown Destination"}
                    </h3>
                    <div className="flex items-center justify-center gap-1 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full border border-orange-100 dark:border-orange-900/30">
                      <AiFillStar className="text-orange-400" size={18} />
                      <span className="font-black text-orange-600 dark:text-orange-400 text-sm">
                        {review.rating}.0
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic">
                    "{review.comment}"
                  </p>

                  <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">
                    <AiOutlineCalendar size={14} />
                    <span>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* অ্যাকশন বাটন */}
                <div className="shrink-0">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-circle btn-ghost text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-600 transition-colors"
                    title="Delete Review"
                  >
                    <AiOutlineDelete size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
