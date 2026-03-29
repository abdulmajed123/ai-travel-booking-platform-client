"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Loader2,
  CheckCircle,
  User,
  Mail,
  Trash2,
  ShoppingBag,
} from "lucide-react";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://ai-travel-booking-platform-server.onrender.com/api/v1/bookings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await response.json();
      if (result.success) {
        setBookings(result.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDeleteBooking = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This booking will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.classList.contains("dark")
        ? "#0f172a"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#1f2937",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await fetch(
            `https://ai-travel-booking-platform-server.onrender.com/api/v1/bookings/${id}`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          const data = await response.json();
          if (data.success) {
            setBookings((prev) => prev.filter((b: any) => b._id !== id));
            Swal.fire({
              title: "Deleted!",
              icon: "success",
              background: document.documentElement.classList.contains("dark")
                ? "#0f172a"
                : "#fff",
              color: document.documentElement.classList.contains("dark")
                ? "#fff"
                : "#1f2937",
            });
          }
        } catch (error) {
          Swal.fire("Error", "Network error occurred", "error");
        }
      }
    });
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    Swal.fire({
      title: "Confirm Booking?",
      text: "Move this booking to confirmed status?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      confirmButtonText: "Yes, Confirm!",
      background: document.documentElement.classList.contains("dark")
        ? "#0f172a"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#1f2937",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await fetch(
            `https://ai-travel-booking-platform-server.onrender.com/api/v1/bookings/${id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ status: newStatus }),
            },
          );

          const data = await response.json();
          if (data.success) {
            setBookings((prev: any) =>
              prev.map((b: any) =>
                b._id === id ? { ...b, status: newStatus } : b,
              ),
            );
            Swal.fire({
              title: "Confirmed!",
              icon: "success",
              background: document.documentElement.classList.contains("dark")
                ? "#0f172a"
                : "#fff",
              color: document.documentElement.classList.contains("dark")
                ? "#fff"
                : "#1f2937",
            });
          }
        } catch (error) {
          Swal.fire("Error", "Network error occurred", "error");
        }
      }
    });
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <p className="mt-4 text-slate-400 font-black uppercase tracking-widest text-xs">
          Loading Bookings...
        </p>
      </div>
    );

  return (
    <div className="p-4 md:p-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
              Manage <span className="text-blue-600">Bookings</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
              Total {bookings.length} reservations found in database
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-500/10 px-6 py-3 rounded-2xl border border-blue-100 dark:border-blue-500/20">
            <span className="text-blue-600 dark:text-blue-400 font-black flex items-center gap-2">
              <ShoppingBag size={20} /> Active Orders
            </span>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2 px-6 pb-6">
            <thead>
              <tr className="text-slate-400 dark:text-slate-500 text-[11px] font-black uppercase tracking-widest border-none">
                <th className="p-4 pl-6">Customer Details</th>
                <th className="p-4">Reserved Item</th>
                <th className="p-4 text-center">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-0">
              {bookings.length > 0 ? (
                bookings.map((booking: any) => (
                  <tr
                    key={booking._id}
                    className="group bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 transition-all rounded-2xl shadow-sm"
                  >
                    <td className="p-4 pl-6 rounded-l-2xl border-none">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                          <User size={14} className="text-blue-500" />
                          {booking.userId?.name || "Guest User"}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1 font-medium">
                          <Mail size={12} /> {booking.userId?.email || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 border-none">
                      <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {booking.itemId?.title || (
                          <span className="text-rose-400 italic">
                            Deleted Product
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center border-none">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg">
                        {new Date(booking.createdAt).toLocaleDateString(
                          "en-GB",
                        )}
                      </span>
                    </td>
                    <td className="p-4 border-none">
                      <span className="font-black text-blue-600 dark:text-blue-400">
                        ${booking.price}
                      </span>
                    </td>
                    <td className="p-4 text-center border-none">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                          booking.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${booking.status === "confirmed" ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`}
                        ></span>
                        {booking.status}
                      </div>
                    </td>
                    <td className="p-4 rounded-r-2xl border-none">
                      <div className="flex justify-center gap-2">
                        {booking.status === "pending" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(booking._id, "confirmed")
                            }
                            className="p-2.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/20 rounded-xl transition-all border border-emerald-100 dark:border-emerald-500/20 shadow-sm"
                            title="Confirm Order"
                          >
                            <CheckCircle size={20} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteBooking(booking._id)}
                          className="p-2.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20 rounded-xl transition-all border border-rose-100 dark:border-rose-500/20 shadow-sm"
                          title="Cancel & Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-32">
                    <div className="flex flex-col items-center opacity-20">
                      <ShoppingBag size={64} className="text-slate-400 mb-4" />
                      <p className="font-black text-slate-500 uppercase tracking-widest">
                        No Reservations Yet
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
