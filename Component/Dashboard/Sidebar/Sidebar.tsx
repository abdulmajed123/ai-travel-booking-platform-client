// "use client";

// import { useUserStore } from "@/store/userStore";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//   AiOutlineUser,
//   AiOutlineShopping,
//   AiOutlineOrderedList,
//   AiOutlineBook,
//   AiOutlineSetting,
//   AiOutlineAppstore,
//   AiOutlineStar,
// } from "react-icons/ai";

// export default function Sidebar() {
//   const user = useUserStore((state) => state.user);
//   const [mounted, setMounted] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Hydration fix: সার্ভার এবং ক্লায়েন্ট ডাটা সিঙ্ক না হওয়া পর্যন্ত কিছু দেখাবে না
//   if (!mounted) return <div className="w-64 bg-white min-h-screen"></div>;

//   const linkStyle = (href: string) => `
//     flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 mb-1
//     ${
//       pathname === href
//         ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
//         : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
//     }
//   `;

//   // আপনার ডাটাবেস থেকে আসা Role-কে ছোট হাতের অক্ষরে রূপান্তর
//   const userRole = user?.role?.toLowerCase();

//   return (
//     <div className="w-64 bg-white border-r border-gray-100 h-screen p-6 flex flex-col shadow-sm overflow-hidden">
//       {/* Logo Section */}
//       <div className="mb-10 px-2">
//         <h2 className="text-3xl font-black text-blue-600 tracking-tighter">
//           TravelAI
//         </h2>
//         <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1 leading-none">
//           Dashboard Control
//         </p>
//       </div>

//       <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
//         {!user ? (
//           <div className="p-5 bg-red-50 rounded-2xl text-center border border-red-100">
//             <p className="text-[10px] text-red-500 font-bold mb-3 uppercase tracking-wider">
//               No Active Session
//             </p>
//             <Link
//               href="/login"
//               className="text-[10px] font-black text-white bg-red-500 px-6 py-2 rounded-lg inline-block shadow-md hover:bg-red-600 transition-colors"
//             >
//               LOGIN AGAIN
//             </Link>
//           </div>
//         ) : (
//           <nav className="flex flex-col">
//             {/* Active Role Indicator */}
//             <div className="mb-6 px-5 py-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
//               <p className="text-[9px] text-blue-400 font-black uppercase tracking-widest">
//                 Active Role
//               </p>
//               <p className="text-xs text-blue-700 font-extrabold uppercase mt-0.5">
//                 {user.role}
//               </p>
//             </div>

//             {/* --- ADMIN LINKS --- */}
//             {userRole === "admin" && (
//               <div className="mb-8">
//                 <p className="px-5 text-[10px] text-gray-400 font-black uppercase tracking-widest mb-3">
//                   Admin Control
//                 </p>
//                 <Link href="/dashboard" className={linkStyle("/dashboard")}>
//                   <AiOutlineAppstore size={18} /> Overview
//                 </Link>
//                 <Link
//                   href="/dashboard/users"
//                   className={linkStyle("/dashboard/users")}
//                 >
//                   <AiOutlineUser size={18} /> Manage Users
//                 </Link>
//                 <Link
//                   href="/dashboard/manage-items"
//                   className={linkStyle("/dashboard/manage-items")}
//                 >
//                   <AiOutlineShopping size={18} /> Manage Items
//                 </Link>
//                 <Link
//                   href="/dashboard/manage-orders"
//                   className={linkStyle("/dashboard/manage-orders")}
//                 >
//                   <AiOutlineOrderedList size={18} /> Manage Orders
//                 </Link>
//               </div>
//             )}

//             {/* --- USER LINKS --- */}
//             {userRole === "user" && (
//               <div className="mb-8">
//                 <p className="px-5 text-[10px] text-gray-400 font-black uppercase tracking-widest mb-3">
//                   User Menu
//                 </p>
//                 <Link href="/dashboard" className={linkStyle("/dashboard")}>
//                   <AiOutlineAppstore size={18} /> Overview
//                 </Link>
//                 <Link
//                   href="/dashboard/mybookings"
//                   className={linkStyle("/dashboard/mybookings")}
//                 >
//                   <AiOutlineBook size={18} /> My Bookings
//                 </Link>
//                 <Link
//                   href="/dashboard/myreview"
//                   className={linkStyle("/dashboard/myreview")}
//                 >
//                   <AiOutlineStar size={18} /> My Review
//                 </Link>
//               </div>
//             )}

//             {/* --- ACCOUNT SETTINGS (Common for all) --- */}
//             <div className="mt-auto pt-6 border-t border-gray-100">
//               <p className="px-5 text-[10px] text-gray-400 font-black uppercase tracking-widest mb-3">
//                 Account Settings
//               </p>
//               <Link
//                 href="/dashboard/profile"
//                 className={linkStyle("/dashboard/profile")}
//               >
//                 <AiOutlineUser size={18} /> Profile
//               </Link>
//               <Link
//                 href="/dashboard/settings"
//                 className={linkStyle("/dashboard/settings")}
//               >
//                 <AiOutlineSetting size={18} /> Settings
//               </Link>
//             </div>
//           </nav>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineOrderedList,
  AiOutlineBook,
  AiOutlineSetting,
  AiOutlineAppstore,
  AiOutlineStar,
} from "react-icons/ai";

export default function Sidebar() {
  const user = useUserStore((state) => state.user);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration fix
  if (!mounted)
    return (
      <div className="w-64 bg-white dark:bg-slate-950 min-h-screen border-r border-gray-100 dark:border-gray-800"></div>
    );

  const linkStyle = (href: string) => `
    flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 mb-1
    ${
      pathname === href
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
        : "text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
    }
  `;

  const userRole = user?.role?.toLowerCase();

  return (
    <div className="w-64 bg-white dark:bg-slate-950 border-r border-gray-100 dark:border-gray-800 h-screen p-6 flex flex-col shadow-sm transition-colors duration-300 overflow-hidden">
      {/* Logo Section */}
      <div className="mb-10 px-2">
        <h2 className="text-3xl font-black text-blue-600 dark:text-blue-500 tracking-tighter">
          TravelAI
        </h2>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-[0.2em] mt-1 leading-none">
          Dashboard Control
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {!user ? (
          <div className="p-5 bg-red-50 dark:bg-red-950/20 rounded-2xl text-center border border-red-100 dark:border-red-900/30">
            <p className="text-[10px] text-red-500 dark:text-red-400 font-bold mb-3 uppercase tracking-wider">
              No Active Session
            </p>
            <Link
              href="/login"
              className="text-[10px] font-black text-white bg-red-500 px-6 py-2 rounded-lg inline-block shadow-md hover:bg-red-600 transition-colors"
            >
              LOGIN AGAIN
            </Link>
          </div>
        ) : (
          <nav className="flex flex-col">
            {/* Active Role Indicator */}
            <div className="mb-6 px-5 py-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100/50 dark:border-blue-800/30">
              <p className="text-[9px] text-blue-400 dark:text-blue-500 font-black uppercase tracking-widest">
                Active Role
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 font-extrabold uppercase mt-0.5">
                {user.role}
              </p>
            </div>

            {/* --- ADMIN LINKS --- */}
            {userRole === "admin" && (
              <div className="mb-8">
                <p className="px-5 text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mb-3">
                  Admin Control
                </p>
                <Link href="/dashboard" className={linkStyle("/dashboard")}>
                  <AiOutlineAppstore size={18} /> Overview
                </Link>
                <Link
                  href="/dashboard/users"
                  className={linkStyle("/dashboard/users")}
                >
                  <AiOutlineUser size={18} /> Manage Users
                </Link>
                <Link
                  href="/dashboard/manage-items"
                  className={linkStyle("/dashboard/manage-items")}
                >
                  <AiOutlineShopping size={18} /> Manage Items
                </Link>
                <Link
                  href="/dashboard/manage-orders"
                  className={linkStyle("/dashboard/manage-orders")}
                >
                  <AiOutlineOrderedList size={18} /> Manage Orders
                </Link>
              </div>
            )}

            {/* --- USER LINKS --- */}
            {userRole === "user" && (
              <div className="mb-8">
                <p className="px-5 text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mb-3">
                  User Menu
                </p>
                <Link href="/dashboard" className={linkStyle("/dashboard")}>
                  <AiOutlineAppstore size={18} /> Overview
                </Link>
                <Link
                  href="/dashboard/mybookings"
                  className={linkStyle("/dashboard/mybookings")}
                >
                  <AiOutlineBook size={18} /> My Bookings
                </Link>
                <Link
                  href="/dashboard/myreview"
                  className={linkStyle("/dashboard/myreview")}
                >
                  <AiOutlineStar size={18} /> My Review
                </Link>
              </div>
            )}

            {/* --- ACCOUNT SETTINGS --- */}
            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
              <p className="px-5 text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mb-3">
                Account Settings
              </p>
              <Link
                href="/dashboard/profile"
                className={linkStyle("/dashboard/profile")}
              >
                <AiOutlineUser size={18} /> Profile
              </Link>
              <Link
                href="/dashboard/settings"
                className={linkStyle("/dashboard/settings")}
              >
                <AiOutlineSetting size={18} /> Settings
              </Link>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
