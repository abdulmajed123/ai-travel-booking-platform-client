"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import {
  AiOutlineCalendar,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineInfoCircle,
  AiOutlineShopping,
} from "react-icons/ai";
import { motion } from "framer-motion";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          console.error("No token found in localStorage");
          setLoading(false);
          return;
        }

        // ব্যাকএন্ড কল - আপনার নতুন রাউট অনুযায়ী
        const response = await fetch("http://localhost:5000/api/v1/bookings", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        // যদি রেসপন্স JSON না হয়ে HTML আসে (সেই এরর ফিক্স)
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.error(
            "Server sent non-JSON response. Check your backend routes.",
            text,
          );
          setLoading(false);
          return;
        }

        const result = await response.json();
        console.log("Data", result);

        if (result.success) {
          setBookings(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading)
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-2">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            My Bookings
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Review and manage your travel history.
          </p>
        </div>
        <div className="bg-blue-600 px-4 py-2 rounded-2xl shadow-sm shadow-blue-200">
          <p className="text-xs font-bold text-white uppercase tracking-wider">
            Total Items: {bookings.length}
          </p>
        </div>
      </div>

      {/* Main Content */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-dashed border-gray-200 p-24 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <AiOutlineShopping size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-700">
            No active bookings
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            Time to plan your next adventure!
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {bookings.map((booking: any, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={booking._id}
              className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between group"
            >
              <div className="flex items-center gap-5">
                {/* Icon Box */}
                <div className="w-16 h-16 bg-blue-50 rounded-[1.2rem] flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <AiOutlineCalendar size={30} />
                </div>

                <div>
                  {/* itemId.name অথবা itemId.title (আপনার মডল অনুযায়ী) */}
                  <h3 className="text-lg font-extrabold text-gray-800">
                    {booking.itemId?.name ||
                      booking.itemId?.title ||
                      "Exclusive Trip Package"}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                      <AiOutlineClockCircle />
                      {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="h-1 w-1 bg-gray-200 rounded-full"></span>
                    <span className="text-[11px] font-bold text-blue-600/70">
                      REF: #{booking._id.slice(-6).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-8 mt-6 md:mt-0 pt-5 md:pt-0 border-t md:border-none border-gray-50">
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Price Paid
                  </p>
                  <p className="text-2xl font-black text-gray-900 leading-none mt-1">
                    ${booking.price}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      booking.status === "approved"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}
                  >
                    {booking.status === "approved" ? (
                      <AiOutlineCheckCircle size={14} />
                    ) : (
                      <AiOutlineClockCircle size={14} />
                    )}
                    {booking.status}
                  </span>
                  <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors px-1">
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
