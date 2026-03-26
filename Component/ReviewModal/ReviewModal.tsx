"use client";

import { useState } from "react";
import { AiOutlineStar, AiFillStar, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-hot-toast";

interface ReviewModalProps {
  itemId: string;
  onSuccess: () => void;
}

export default function ReviewModal({ itemId, onSuccess }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit button clicked! Item ID:", itemId);

    // ভ্যালিডেশন
    if (rating === 0) {
      toast.error("Please select a rating!");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login to post a review");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/v1/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: Number(rating),
          comment,
          itemId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Review posted successfully!");
        setComment("");
        setRating(0);
        onSuccess(); // ডাটা রিফ্রেশ করবে

        // মোডাল ক্লোজ করার সঠিক উপায়
        const modalElement = document.getElementById(
          "review_modal",
        ) as HTMLDialogElement;
        if (modalElement) modalElement.close();
      } else {
        toast.error(result.message || "Failed to post review");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Network error! Check your server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* রিভিউ ওপেন বাটন */}
      <button
        className="btn btn-primary btn-md rounded-2xl px-8 font-black shadow-lg shadow-blue-100 border-none bg-blue-600 hover:bg-blue-700 text-white"
        onClick={() => {
          const modal = document.getElementById(
            "review_modal",
          ) as HTMLDialogElement;
          if (modal) modal.showModal();
        }}
      >
        Write a Review
      </button>

      <dialog id="review_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-[2.5rem] p-8 shadow-2xl border border-gray-50 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">
              Post Your Experience
            </h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost text-gray-400">
                <AiOutlineClose size={20} />
              </button>
            </form>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* স্টার সিলেকশন */}
            <div className="flex flex-col items-center gap-3 p-6 bg-blue-50/50 rounded-[2rem] border border-blue-50">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                Your Rating
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-all hover:scale-110 active:scale-95"
                  >
                    {star <= rating ? (
                      <AiFillStar
                        size={45}
                        className="text-orange-400 drop-shadow-sm"
                      />
                    ) : (
                      <AiOutlineStar size={45} className="text-gray-300" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* কমেন্ট বক্স */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-4 tracking-widest">
                Feedback Description
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-32 rounded-3xl bg-gray-50 border-gray-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all text-gray-700 font-medium p-5"
                placeholder="How was the travel experience? Mention highlights..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>

            {/* সাবমিট বাটন */}
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full h-14 rounded-2xl font-black text-lg border-none shadow-xl shadow-blue-100 transition-all active:scale-95 ${
                loading
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "POST REVIEW"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
