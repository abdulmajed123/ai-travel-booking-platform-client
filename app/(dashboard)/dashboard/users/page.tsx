"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  AiOutlineDelete,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineSwap,
} from "react-icons/ai";

export default function ManageUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please login first!");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://ai-travel-booking-platform-server.onrender.com/api/v1/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const resData = await response.json();
      if (response.ok && resData.success) {
        setUsers(resData.data || resData.users || []);
      } else {
        toast.error(resData.message || "Failed to load users");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Server connection failed!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        "https://ai-travel-booking-platform-server.onrender.com/api/v1/users/role",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, role: newRole }),
        },
      );

      if (response.ok) {
        toast.success(`Role updated to ${newRole}`);
        fetchUsers();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Error updating role");
    }
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.classList.contains("dark")
        ? "#111827"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#1f2937",
      customClass: {
        popup: "rounded-[2rem] border border-gray-100 dark:border-gray-800",
        title: "font-black",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("accessToken");
        try {
          const response = await fetch(
            `https://ai-travel-booking-platform-server.onrender.com/api/v1/users/${id}`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          if (response.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been removed.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
              background: document.documentElement.classList.contains("dark")
                ? "#111827"
                : "#fff",
              color: document.documentElement.classList.contains("dark")
                ? "#fff"
                : "#1f2937",
              customClass: { popup: "rounded-[2rem]" },
            });
            setUsers(users.filter((u) => u._id !== id));
          }
        } catch (error) {
          Swal.fire("Error", "Could not delete user", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
        <p className="mt-4 text-gray-400 font-bold text-xs uppercase tracking-widest">
          Syncing Users...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            User <span className="text-blue-600">Database</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">
            Manage all platform members and access levels.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 px-6 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-lg font-black text-gray-800 dark:text-white">
            {users.length} Users
          </span>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-2 px-6 pb-6">
            <thead>
              <tr className="text-gray-400 dark:text-gray-500 text-[11px] font-black uppercase tracking-widest border-none">
                <th className="bg-transparent py-6 pl-4">Member Info</th>
                <th className="bg-transparent text-center">Contact</th>
                <th className="bg-transparent text-center">Role Status</th>
                <th className="bg-transparent text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {users.map((user) => (
                  <motion.tr
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={user._id}
                    className="group bg-gray-50/50 dark:bg-gray-800/30 hover:bg-white dark:hover:bg-gray-800 transition-all border-none shadow-sm rounded-2xl"
                  >
                    {/* Member Info */}
                    <td className="rounded-l-[1.5rem] py-4 pl-4 border-none">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg ${
                            user.role === "ADMIN"
                              ? "bg-gradient-to-tr from-rose-500 to-red-600"
                              : "bg-gradient-to-tr from-blue-600 to-indigo-600"
                          }`}
                        >
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              className="w-full h-full object-cover rounded-2xl"
                              alt=""
                            />
                          ) : (
                            user.name?.[0].toUpperCase()
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-gray-100">
                            {user.name}
                          </div>
                          <div className="text-[10px] text-gray-400 dark:text-gray-500 font-mono tracking-tighter uppercase opacity-60">
                            ID: {user._id.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="text-center border-none">
                      <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        <AiOutlineMail className="text-blue-500" /> {user.email}
                      </div>
                    </td>

                    {/* Role Status */}
                    <td className="text-center border-none">
                      <div
                        className={`badge py-4 px-5 font-black text-[10px] tracking-widest border-none gap-2 shadow-sm ${
                          user.role === "ADMIN"
                            ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            user.role === "ADMIN"
                              ? "bg-rose-500"
                              : "bg-blue-500"
                          } animate-pulse`}
                        ></span>
                        {user.role}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="rounded-r-[1.5rem] text-right pr-4 border-none">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleRoleChange(user._id, user.role)}
                          className="btn btn-sm btn-circle btn-ghost text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          title="Switch Role"
                        >
                          <AiOutlineSwap size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="btn btn-sm btn-circle btn-ghost text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                          title="Delete User"
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* No Users State */}
      {users.length === 0 && !loading && (
        <div className="text-center py-32 bg-white dark:bg-gray-900 rounded-[2.5rem] mt-6 border border-dashed border-gray-200 dark:border-gray-800">
          <AiOutlineUser
            size={60}
            className="mx-auto text-gray-200 dark:text-gray-700 mb-4"
          />
          <p className="font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest">
            No Members Found
          </p>
        </div>
      )}
    </div>
  );
}
