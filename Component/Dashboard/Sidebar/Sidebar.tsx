// "use client";

// import { useUserStore } from "@/store/userStore";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//   AiOutlineUser,
//   AiOutlineShopping,
//   AiOutlineOrderedList,
//   AiOutlineDashboard,
//   AiOutlineBook,
// } from "react-icons/ai";

// export default function Sidebar() {
//   const user = useUserStore((state) => state.user);
//   const [mounted, setMounted] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const linkStyle = (href: string) => `
//     flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
//     ${
//       pathname === href
//         ? "bg-blue-50 text-blue-600 shadow-sm"
//         : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
//     }
//   `;

//   return (
//     <div className="w-64 bg-white border-r border-gray-100 min-h-screen p-4 flex flex-col">
//       <div className="px-4 py-6">
//         <h2 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//           TravelAI
//         </h2>
//         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
//           Dashboard Control
//         </p>
//       </div>

//       <div className="flex-1">
//         {!user ? (
//           <div className="p-4 bg-red-50 rounded-2xl text-center">
//             <p className="text-xs text-red-500 font-medium mb-2">
//               Session Expired
//             </p>
//             <Link
//               href="/login"
//               className="text-xs font-bold text-white bg-red-500 px-4 py-2 rounded-lg inline-block"
//             >
//               Login Again
//             </Link>
//           </div>
//         ) : (
//           <nav className="flex flex-col gap-2">
//             <p className="px-4 text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">
//               Role: {user.role}
//             </p>

//             {user.role === "ADMIN" && (
//               <>
//                 <Link
//                   href="/dashboard/users"
//                   className={linkStyle("/dashboard/users")}
//                 >
//                   <AiOutlineUser className="text-lg" /> Manage Users
//                 </Link>
//                 <Link
//                   href="/dashboard/products"
//                   className={linkStyle("/dashboard/products")}
//                 >
//                   <AiOutlineShopping className="text-lg" /> Manage Products
//                 </Link>
//                 <Link
//                   href="/dashboard/orders"
//                   className={linkStyle("/dashboard/orders")}
//                 >
//                   <AiOutlineOrderedList className="text-lg" /> Manage Orders
//                 </Link>
//               </>
//             )}

//             {user.role === "USER" && (
//               <>
//                 <Link
//                   href="/dashboard/mybookings"
//                   className={linkStyle("/dashboard/mybookings")}
//                 >
//                   <AiOutlineBook className="text-lg" /> My Bookings
//                 </Link>
//                 <Link
//                   href="/dashboard/review"
//                   className={linkStyle("/dashboard/review")}
//                 >
//                   <AiOutlineBook className="text-lg" /> My Review
//                 </Link>
//                 <Link
//                   href="/dashboard/profile"
//                   className={linkStyle("/dashboard/profile")}
//                 >
//                   <AiOutlineDashboard className="text-lg" /> My Profile
//                 </Link>
//               </>
//             )}
//           </nav>
//         )}
//       </div>

//       {user && (
//         <div className="mt-auto p-4 bg-gray-50 rounded-2xl border border-gray-100">
//           <p className="text-xs font-bold text-gray-800 truncate">
//             {user.name}
//           </p>
//           <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
//         </div>
//       )}
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
  AiOutlineDashboard,
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

  if (!mounted) return null;

  const linkStyle = (href: string) => `
    flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 mb-1
    ${
      pathname === href
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
        : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
    }
  `;

  const userRole = user?.role?.toLowerCase();

  return (
    <div className="w-66 bg-white border-r border-gray-100 min-h-screen p-6 flex flex-col shadow-sm">
      {/* Logo Section */}
      <div className="mb-10 px-2">
        <h2 className="text-3xl font-black text-blue-600 tracking-tighter">
          TravelAI
        </h2>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1 leading-none">
          Dashboard Control
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {!user ? (
          <div className="p-5 bg-red-50 rounded-2xl text-center border border-red-100">
            <p className="text-xs text-red-500 font-bold mb-3 text-[10px] uppercase">
              Session Expired
            </p>
            <Link
              href="/login"
              className="text-[10px] font-black text-white bg-red-500 px-6 py-2 rounded-lg inline-block shadow-md"
            >
              LOGIN AGAIN
            </Link>
          </div>
        ) : (
          <nav className="flex flex-col">
            <div className="mb-6 px-5 py-2 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">
                Active Role
              </p>
              <p className="text-xs text-blue-600 font-bold uppercase">
                {user.role}
              </p>
            </div>

            {/* --- ADMIN LINKS --- */}
            {userRole === "admin" && (
              <div className="mb-8">
                <p className="px-5 text-[10px] text-blue-600 font-black uppercase tracking-widest mb-3">
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
                  href="/dashboard/products"
                  className={linkStyle("/dashboard/products")}
                >
                  <AiOutlineShopping size={18} /> Manage Products
                </Link>
                <Link
                  href="/dashboard/orders"
                  className={linkStyle("/dashboard/orders")}
                >
                  <AiOutlineOrderedList size={18} /> Manage Orders
                </Link>
              </div>
            )}

            {/* --- USER LINKS --- */}
            {userRole === "user" && (
              <div className="mb-8">
                <p className="px-5 text-[10px] text-blue-600 font-black uppercase tracking-widest mb-3">
                  User Menu
                </p>
                {/* User Overview Link Added Here */}
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
                  href="/dashboard/review"
                  className={linkStyle("/dashboard/review")}
                >
                  <AiOutlineStar size={18} /> My Review
                </Link>
              </div>
            )}

            {/* --- ACCOUNT SETTINGS --- */}
            <div className="mt-2 pt-6 border-t border-gray-100">
              <p className="px-5 text-[10px] text-gray-400 font-black uppercase tracking-widest mb-3">
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
