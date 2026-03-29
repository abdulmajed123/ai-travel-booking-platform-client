//

"use client";

import React, { useState, useEffect } from "react";
import {
  Camera,
  User,
  Mail,
  Lock,
  Save,
  X,
  Edit2,
  ShieldCheck,
  Loader2,
} from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    avatar: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // token -> accessToken সামঞ্জস্য করা হলো
        if (!token) return;

        const response = await fetch(
          "https://ai-travel-booking-platform-server.onrender.com/api/v1/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          setFormData({
            name: data.user.name || "",
            avatar: data.user.avatar || "",
            password: "",
          });
        }
      } catch (error) {
        console.error("Profile load error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const token = localStorage.getItem("accessToken");
      const bodyData: any = {
        name: formData.name,
        avatar: formData.avatar,
      };

      if (formData.password.trim() !== "") {
        bodyData.password = formData.password;
      }

      const response = await fetch(
        "https://ai-travel-booking-platform-server.onrender.com/api/v1/users/me",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        },
      );

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setIsEditing(false);
        setFormData((prev) => ({ ...prev, password: "" }));
        // আপনি চাইলে এখানে toast ও ব্যবহার করতে পারেন
        alert("Success! Profile updated.");
      } else {
        throw new Error(data.message || "Update failed");
      }
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
          Authenticating...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">
            Account <span className="text-blue-600">Settings</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
            Manage your digital identity and account security preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar / Preview Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 text-center transition-all">
              <div className="relative inline-block group">
                <div className="absolute inset-0 bg-blue-600 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img
                  src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff`
                  }
                  alt="Profile"
                  className="relative w-40 h-40 rounded-[2rem] object-cover ring-4 ring-white dark:ring-slate-800 shadow-2xl"
                />
                <div className="absolute -bottom-3 -right-3 bg-blue-600 p-3 rounded-2xl text-white shadow-lg border-4 border-white dark:border-slate-900">
                  <Camera size={20} />
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                {user?.name}
              </h2>
              <div className="inline-flex items-center gap-1.5 mt-2 bg-blue-50 dark:bg-blue-500/10 px-4 py-1.5 rounded-full">
                <ShieldCheck
                  size={14}
                  className="text-blue-600 dark:text-blue-400"
                />
                <span className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                  {user?.role || "Member"}
                </span>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800 flex flex-col gap-4 text-left">
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <div className="bg-white dark:bg-slate-700 p-2 rounded-xl shadow-sm">
                    <Mail size={18} className="text-blue-500" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Email Address
                    </span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transition-all">
              <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
                <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-wider text-sm">
                  Personal Details
                </h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none"
                  >
                    <Edit2 size={14} /> Edit Profile
                  </button>
                )}
              </div>

              <div className="p-8">
                <form onSubmit={handleUpdate} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name Input */}
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                        Full Name
                      </label>
                      <div className="relative group">
                        <User
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                          size={20}
                        />
                        <input
                          disabled={!isEditing}
                          type="text"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none disabled:opacity-50 text-slate-700 dark:text-slate-200 font-bold"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    {/* Avatar URL Input */}
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                        Avatar Image URL
                      </label>
                      <div className="relative group">
                        <Camera
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                          size={20}
                        />
                        <input
                          disabled={!isEditing}
                          type="text"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none disabled:opacity-50 text-slate-700 dark:text-slate-200 font-bold"
                          value={formData.avatar}
                          onChange={(e) =>
                            setFormData({ ...formData, avatar: e.target.value })
                          }
                          placeholder="https://image-link.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                      Security (New Password)
                    </label>
                    <div className="relative group">
                      <Lock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                        size={20}
                      />
                      <input
                        disabled={!isEditing}
                        type="password"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none disabled:opacity-50 text-slate-700 dark:text-slate-200 font-bold"
                        placeholder="Leave blank to keep current"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Button Group */}
                  {isEditing && (
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                      <button
                        disabled={updating}
                        type="submit"
                        className="flex items-center justify-center gap-2 w-full sm:flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98] disabled:bg-blue-400"
                      >
                        {updating ? (
                          <Loader2 className="animate-spin" size={20} />
                        ) : (
                          <>
                            <Save size={20} /> Save Profile
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        disabled={updating}
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            name: user.name,
                            avatar: user.avatar || "",
                            password: "",
                          });
                        }}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                      >
                        <X size={20} /> Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
