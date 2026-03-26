// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import AuthButton from "@/Component/Button/AuthButton";

// const DashboardNavbar = () => {
//   const [profileOpen, setProfileOpen] = useState(false);
//   const { isLoggedIn, loading } = useAuth();

//   return (
//     <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         {/* ✈️ Logo */}
//         <Link href="/" className="flex items-center gap-2 group">
//           <span className="text-2xl transition-transform group-hover:rotate-12">
//             ✈️
//           </span>
//           <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//             TravelAI
//           </span>
//         </Link>

//         {/* Right Side */}
//         <div className="flex items-center gap-4">
//           {!loading && (
//             <>
//               {isLoggedIn ? (
//                 /* 👤 Profile Dropdown */
//                 <div className="relative">
//                   <button
//                     onClick={() => setProfileOpen(!profileOpen)}
//                     className="w-10 h-10 rounded-full border-2 border-blue-100 dark:border-gray-700 bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md hover:scale-105 transition-all"
//                   >
//                     U
//                   </button>

//                   {/* Dropdown */}
//                   {profileOpen && (
//                     <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
//                       {/* Info */}
//                       <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
//                         <p className="text-[10px] uppercase text-gray-400 font-bold">
//                           Account
//                         </p>
//                         <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
//                           Traveler User
//                         </p>
//                       </div>

//                       {/* Menu */}
//                       <div className="py-1">
//                         <Link
//                           href="/dashboard"
//                           onClick={() => setProfileOpen(false)}
//                           className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//                         >
//                           Dashboard
//                         </Link>

//                         <Link
//                           href="/profile"
//                           onClick={() => setProfileOpen(false)}
//                           className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//                         >
//                           My Profile
//                         </Link>
//                       </div>

//                       {/* Auth Action */}
//                       <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50/30">
//                         <AuthButton />
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 /* Login */
//                 <Link
//                   href="/login"
//                   className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
//                 >
//                   Login
//                 </Link>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default DashboardNavbar;

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import AuthButton from "@/Component/Button/AuthButton";

const DashboardNavbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useUserStore(); // সরাসরি স্টোর থেকে ইউজার ডাটা
  const [mounted, setMounted] = useState(false);

  // Hydration error handle করার জন্য
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* ✈️ Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl transition-transform group-hover:rotate-12">
            ✈️
          </span>
          <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TravelAI
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            /* 👤 Profile Dropdown */
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full border-2 border-blue-100 dark:border-gray-700 bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md hover:scale-105 transition-all uppercase"
              >
                {user.name ? user.name.charAt(0) : "U"}
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in duration-150">
                  {/* User Info Section */}
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-[10px] uppercase text-gray-400 font-black tracking-widest">
                      {user.role} Account
                    </p>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      My Profile
                    </Link>
                  </div>

                  {/* Auth Action */}
                  <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50/30">
                    <AuthButton />
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Login Button */
            <Link
              href="/login"
              className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-md shadow-blue-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
