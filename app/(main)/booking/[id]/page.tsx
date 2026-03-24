"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineCalendar,
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";

export default function BookingPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedDate = searchParams.get("date");
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/items/${id}`);
        const data = await res.json();
        if (data.success) {
          setItem(data.data);
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleConfirmBooking = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("বুকিং করার জন্য আগে লগইন করুন!");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        itemId: id,
        price: item.discountPrice,
        quantity: 1,
      };

      const response = await fetch("http://localhost:5000/api/v1/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("আপনার বুকিং সফল হয়েছে!");
        router.push("/dashboard/user/my-bookings");
      } else {
        alert(result.message || "বুকিং ব্যর্থ হয়েছে!");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert(
        "সার্ভারের সাথে কানেক্ট করা যাচ্ছে না। আপনার ইন্টারনেট বা সার্ভার পোর্ট চেক করুন।",
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  if (!item)
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        আইটেমটি খুঁজে পাওয়া যায়নি!
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          বুকিং কনফার্ম করুন
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-24 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {item.location.city}, {item.location.country}
                </p>
                <div className="flex items-center gap-2 mt-2 text-indigo-600 font-medium">
                  <AiOutlineCalendar className="text-lg" />
                  <span>
                    {selectedDate
                      ? new Date(selectedDate).toLocaleDateString()
                      : "তারিখ নেই"}
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <AiOutlineInfoCircle className="text-indigo-500" /> গুরুত্বপূর্ণ
                তথ্য
              </h3>
              <p className="text-sm text-gray-600">
                যাত্রা শুরুর ৪৮ ঘণ্টা আগে পর্যন্ত ফ্রি ক্যান্সেলেশন সুবিধা
                পাবেন।
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-50 h-fit sticky top-10"
          >
            <h3 className="text-lg font-bold mb-4 border-b pb-2">
              প্রাইস সামারি
            </h3>
            <div className="space-y-3 border-b pb-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>মূল মূল্য</span>
                <span>৳{item.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>ডিসকাউন্ট</span>
                <span>
                  -৳{(item.price - item.discountPrice).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-xl font-bold">মোট দেয়</span>
              <span className="text-2xl font-extrabold text-indigo-600">
                ৳{item.discountPrice.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleConfirmBooking}
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-bold transition-all ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
            >
              {loading ? "প্রসেসিং হচ্ছে..." : "বুকিং কনফার্ম করুন"}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
