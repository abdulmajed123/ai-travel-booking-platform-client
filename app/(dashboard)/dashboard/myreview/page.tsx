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
        "http://localhost:5000/api/v1/reviews/my-reviews",
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
      const res = await fetch(`http://localhost:5000/api/v1/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();

      if (result.success) {
        toast.success("Review deleted successfully");
        // স্টেট থেকে রিমুভ করা যাতে পেজ রিফ্রেশ না লাগে
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
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">
            My Reviews
          </h1>
          <p className="text-gray-500 font-medium">
            Manage your shared experiences and feedback
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-12 text-center border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-bold">
              You haven't posted any reviews yet!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="group bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all border border-gray-50 flex flex-col md:flex-row items-center gap-6"
              >
                {/* আইটেম ইমেজ (Populated from Backend) */}
                <div className="w-full md:w-32 h-32 rounded-[1.5rem] overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
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
                    <h3 className="text-xl font-black text-gray-800 truncate max-w-md">
                      {review.itemId?.title || "Unknown Destination"}
                    </h3>
                    <div className="flex items-center justify-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
                      <AiFillStar className="text-orange-400" size={18} />
                      <span className="font-black text-orange-600 text-sm">
                        {review.rating}.0
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 font-medium leading-relaxed italic">
                    "{review.comment}"
                  </p>

                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
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
                    className="btn btn-circle btn-ghost text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
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
