// "use client";

// import React, { useState } from "react";
// import {
//   User,
//   Lock,
//   Bell,
//   Shield,
//   Globe,
//   Camera,
//   Save,
//   LogOut,
// } from "lucide-react";
// import Swal from "sweetalert2";

// const SettingsPage = () => {
//   const [activeTab, setActiveTab] = useState("profile");

//   const handleSave = () => {
//     Swal.fire({
//       icon: "success",
//       title: "Settings Saved",
//       text: "Your changes have been updated successfully!",
//       timer: 2000,
//       showConfirmButton: false,
//     });
//   };

//   return (
//     <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl font-black text-gray-800 mb-8">
//           Account Settings
//         </h1>

//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Sidebar Tabs */}
//           <div className="w-full md:w-64 space-y-2">
//             {[
//               { id: "profile", label: "Profile", icon: User },
//               { id: "security", label: "Security", icon: Lock },
//               { id: "notifications", label: "Notifications", icon: Bell },
//               { id: "privacy", label: "Privacy", icon: Shield },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
//                   activeTab === tab.id
//                     ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
//                     : "text-gray-500 hover:bg-white hover:text-blue-600"
//                 }`}
//               >
//                 <tab.icon size={18} />
//                 {tab.label}
//               </button>
//             ))}

//             <hr className="my-4 border-gray-200" />

//             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all">
//               <LogOut size={18} />
//               Logout
//             </button>
//           </div>

//           {/* Main Content Area */}
//           <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
//             {activeTab === "profile" && (
//               <div className="p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
//                 <div className="flex flex-col items-center md:items-start gap-6 mb-8">
//                   <div className="relative group">
//                     <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-md overflow-hidden">
//                       <img
//                         src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
//                         alt="Profile"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform">
//                       <Camera size={14} />
//                     </button>
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-bold text-gray-800 text-center md:text-left">
//                       Personal Information
//                     </h2>
//                     <p className="text-sm text-gray-500">
//                       Update your photo and personal details.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-1">
//                     <label className="text-xs font-black uppercase text-gray-400">
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       defaultValue="Ariful Islam"
//                       className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                     />
//                   </div>
//                   <div className="space-y-1">
//                     <label className="text-xs font-black uppercase text-gray-400">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       defaultValue="arif@example.com"
//                       className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                     />
//                   </div>
//                   <div className="space-y-1 md:col-span-2">
//                     <label className="text-xs font-black uppercase text-gray-400">
//                       Bio
//                     </label>
//                     <textarea
//                       rows={3}
//                       placeholder="Tell us about yourself..."
//                       className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-10 flex justify-end">
//                   <button
//                     onClick={handleSave}
//                     className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95"
//                   >
//                     <Save size={18} />
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             )}

//             {activeTab === "security" && (
//               <div className="p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
//                 <h2 className="text-xl font-bold text-gray-800 mb-6">
//                   Security Settings
//                 </h2>
//                 <div className="space-y-6">
//                   <div className="space-y-4">
//                     <div className="space-y-1">
//                       <label className="text-xs font-black uppercase text-gray-400">
//                         Current Password
//                       </label>
//                       <input
//                         type="password"
//                         placeholder="••••••••"
//                         className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                       />
//                     </div>
//                     <div className="space-y-1">
//                       <label className="text-xs font-black uppercase text-gray-400">
//                         New Password
//                       </label>
//                       <input
//                         type="password"
//                         placeholder="••••••••"
//                         className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                       />
//                     </div>
//                   </div>

//                   <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
//                     <Shield className="text-amber-500 shrink-0" />
//                     <div>
//                       <h4 className="text-sm font-bold text-amber-800">
//                         Two-factor authentication
//                       </h4>
//                       <p className="text-xs text-amber-700">
//                         Add an extra layer of security to your account.
//                       </p>
//                       <button className="mt-2 text-xs font-black text-amber-800 underline">
//                         Enable now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-10 flex justify-end">
//                   <button
//                     onClick={handleSave}
//                     className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold transition-all hover:bg-blue-700 shadow-xl shadow-blue-100"
//                   >
//                     Update Password
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Notifications and others placeholders */}
//             {activeTab === "notifications" && (
//               <div className="p-10 text-center text-gray-400">
//                 <Bell size={48} className="mx-auto mb-4 opacity-20" />
//                 <p className="font-bold">Notification settings coming soon!</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;

"use client";

import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Shield,
  Camera,
  Save,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Zap,
  Loader2,
} from "lucide-react";
import Swal from "sweetalert2";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      Swal.fire({
        icon: "success",
        title: "Settings Updated",
        text: "Your configuration has been saved successfully!",
        background: document.documentElement.classList.contains("dark")
          ? "#0F172A"
          : "#FFFFFF",
        color: document.documentElement.classList.contains("dark")
          ? "#FFFFFF"
          : "#000000",
        timer: 2000,
        showConfirmButton: false,
      });
    }, 1000);
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      desc: "Personal information",
    },
    {
      id: "security",
      label: "Security",
      icon: Lock,
      desc: "Password & Protection",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      desc: "Manage alerts",
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: Shield,
      desc: "Data & Permissions",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">
            Account <span className="text-blue-600">Settings</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2 italic">
            Configure your account preferences and security levels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-3 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full group flex items-center justify-between p-4 rounded-[1.5rem] transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-300 dark:shadow-none translate-x-2"
                      : "text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-500/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-xl ${activeTab === tab.id ? "bg-white/20" : "bg-slate-100 dark:bg-slate-800"}`}
                    >
                      <tab.icon size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-black text-sm uppercase tracking-wider">
                        {tab.label}
                      </p>
                      <p
                        className={`text-[10px] ${activeTab === tab.id ? "text-blue-100" : "text-slate-400"}`}
                      >
                        {tab.desc}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`${activeTab === tab.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-all`}
                  />
                </button>
              ))}

              <div className="my-4 mx-4 border-t border-slate-100 dark:border-slate-800" />

              <button className="w-full flex items-center gap-4 p-4 rounded-[1.5rem] font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all uppercase tracking-widest text-xs">
                <div className="bg-red-100 dark:bg-red-500/10 p-2 rounded-xl">
                  <LogOut size={20} />
                </div>
                Logout Account
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transition-all">
              {activeTab === "profile" && (
                <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-6 duration-500">
                  <div className="flex flex-col sm:flex-row items-center gap-8 mb-12 border-b border-slate-50 dark:border-slate-800 pb-10">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      <div className="relative w-32 h-32 rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-2xl overflow-hidden group-hover:rotate-3 transition-transform">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button className="absolute -bottom-2 -right-2 p-3 bg-blue-600 text-white rounded-2xl shadow-xl hover:scale-110 active:scale-90 transition-all border-4 border-white dark:border-slate-900">
                        <Camera size={18} />
                      </button>
                    </div>
                    <div className="text-center sm:text-left">
                      <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
                        Profile Details
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Enter your identity details as you want them to appear.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Ariful Islam"
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-700 dark:text-slate-200 font-bold"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="arif@example.com"
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-700 dark:text-slate-200 font-bold"
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1">
                        Professional Bio
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Write something about your role..."
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-700 dark:text-slate-200 font-bold"
                      />
                    </div>
                  </div>

                  <div className="mt-12 flex justify-end">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="group bg-blue-600 text-white px-10 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-blue-700 shadow-2xl shadow-blue-300 dark:shadow-none transition-all active:scale-95 disabled:opacity-70"
                    >
                      {isSaving ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <>
                          <Save
                            size={18}
                            className="group-hover:rotate-12 transition-transform"
                          />{" "}
                          Save Profile
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-6 duration-500">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="bg-blue-100 dark:bg-blue-500/10 p-4 rounded-3xl text-blue-600">
                      <ShieldCheck size={32} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
                        Security
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 font-medium italic">
                        Keep your credentials safe.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="p-6 bg-blue-50 dark:bg-blue-500/5 rounded-3xl border border-blue-100 dark:border-blue-900/30 flex gap-5 items-start">
                      <Zap className="text-blue-500 shrink-0 mt-1" size={24} />
                      <div>
                        <h4 className="text-sm font-black text-blue-900 dark:text-blue-400 uppercase tracking-wider">
                          Enable 2FA
                        </h4>
                        <p className="text-xs text-blue-700 dark:text-blue-500/80 mt-1 font-medium">
                          Boost your account security by enabling two-factor
                          authentication.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                          Enable Security Pack
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex justify-end">
                    <button
                      onClick={handleSave}
                      className="bg-slate-800 dark:bg-blue-600 text-white px-10 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all hover:bg-slate-900 dark:hover:bg-blue-700"
                    >
                      Update Security
                    </button>
                  </div>
                </div>
              )}

              {/* Notification Placeholder */}
              {activeTab === "notifications" && (
                <div className="p-20 text-center animate-pulse">
                  <Bell
                    size={64}
                    className="mx-auto mb-6 text-slate-200 dark:text-slate-800"
                  />
                  <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">
                    Coming Soon
                  </h3>
                  <p className="text-slate-500 text-sm mt-2 italic">
                    We are working on your notification dashboard.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
