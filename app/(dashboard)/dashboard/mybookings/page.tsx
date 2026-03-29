"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiOutlineDelete,
  AiOutlineShopping,
  AiOutlineInfoCircle,
} from "react-icons/ai";

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        "https://ai-travel-booking-platform-server.onrender.com/api/v1/bookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) setBookings(data.data);
    } catch (err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to remove this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Cancel It!",
      background: document.documentElement.classList.contains("dark")
        ? "#0f172a"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#000",
      customClass: {
        popup: "rounded-[2rem] border border-gray-100 dark:border-gray-800",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(
          `https://ai-travel-booking-platform-server.onrender.com/api/v1/bookings/${id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.ok) {
          Swal.fire({
            title: "Canceled!",
            text: "Your booking has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            background: document.documentElement.classList.contains("dark")
              ? "#0f172a"
              : "#fff",
            color: document.documentElement.classList.contains("dark")
              ? "#fff"
              : "#000",
            customClass: { popup: "rounded-[2rem]" },
          });
          setBookings(bookings.filter((b) => b._id !== id));
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <span className="loading loading-infinity loading-lg text-blue-600"></span>
        <p className="text-gray-400 font-bold animate-pulse text-xs uppercase tracking-widest">
          Fetching your plans...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
            My <span className="text-blue-600">Bookings</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
            Manage your active reservations.
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 rounded-3xl border border-blue-100 dark:border-blue-800/50 flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200 dark:shadow-none">
            <AiOutlineShopping size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
              Total
            </p>
            <p className="text-2xl font-black text-blue-700 dark:text-blue-400 leading-none">
              {bookings.length}
            </p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-3 px-6 pb-6">
            <thead>
              <tr className="text-gray-400 dark:text-gray-500 text-[11px] font-black uppercase tracking-widest border-none">
                <th className="bg-transparent pl-4 py-6">Item Details</th>
                <th className="bg-transparent text-center">Quantity</th>
                <th className="bg-transparent text-center">Pricing</th>
                <th className="bg-transparent text-center">Status</th>
                <th className="bg-transparent text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={booking._id}
                      className="group bg-gray-50/50 dark:bg-gray-800/30 hover:bg-white dark:hover:bg-gray-800 transition-all shadow-sm rounded-2xl"
                    >
                      {/* Item Info with IMAGE */}
                      <td className="rounded-l-[1.5rem] py-4 pl-4 border-none">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md border border-white dark:border-gray-700 bg-gray-200 dark:bg-gray-700">
                            {booking.itemId?.image ? (
                              <img
                                src={booking.itemId.image}
                                alt={booking.itemId?.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-500 font-bold text-xs uppercase text-center p-1">
                                No Img
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="font-black text-gray-800 dark:text-gray-100 text-base">
                              {booking.itemId?.title || "Product Name"}
                            </div>
                            <div className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1 mt-1 font-bold italic uppercase tracking-wider">
                              <AiOutlineInfoCircle /> ID:{" "}
                              {booking._id.slice(-8)}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Quantity */}
                      <td className="text-center font-bold text-gray-600 dark:text-gray-300 border-none">
                        {booking.quantity}
                      </td>

                      {/* Price */}
                      <td className="text-center border-none">
                        <div className="text-lg font-black text-blue-600 dark:text-blue-400">
                          ${booking.price}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="text-center border-none">
                        <div
                          className={`badge py-4 px-5 font-black text-[10px] tracking-widest border-none gap-2 ${
                            booking.status === "pending"
                              ? "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500"
                              : "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              booking.status === "pending"
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            } animate-pulse`}
                          ></span>
                          {booking.status.toUpperCase()}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="rounded-r-[1.5rem] text-right pr-4 border-none">
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="btn btn-ghost btn-circle text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
                        >
                          <AiOutlineDelete size={22} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-24 text-center border-none">
                      <div className="flex flex-col items-center opacity-20 dark:opacity-10">
                        <AiOutlineShopping
                          size={80}
                          className="dark:text-white"
                        />
                        <p className="mt-4 font-black text-2xl uppercase dark:text-white">
                          No Bookings Found
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
