// "use client";

// import { useAuth } from "@/hooks/useAuth";
// import { logout } from "@/utils/auth";
// import Link from "next/link";

// const AuthButton = () => {
//   const { isLoggedIn, loading } = useAuth();

//   if (loading) return null;

//   const handleLogout = () => {
//     logout();
//     window.location.href = "/login";
//   };

//   return (
//     <>
//       {isLoggedIn ? (
//         <button
//           onClick={handleLogout}
//           className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
//         >
//           <span>Logout</span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-4 h-4"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
//             />
//           </svg>
//         </button>
//       ) : (
//         <Link
//           href="/login"
//           className="block px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
//         >
//           Login
//         </Link>
//       )}
//     </>
//   );
// };

// export default AuthButton;

// "use client";

// import { useAuth } from "@/hooks/useAuth";
// import { removeAuth } from "@/utils/auth"; // অথবা logout
// import Link from "next/link";
// import { toast } from "react-hot-toast";

// const AuthButton = () => {
//   const { isLoggedIn } = useAuth();

//   const handleLogout = () => {
//     removeAuth(); // টোকেন ডিলিট করবে
//     toast.success("Logged out successfully");
//     window.location.href = "/login"; // পেজ রিফ্রেশসহ রিডাইরেক্ট
//   };

//   if (isLoggedIn) {
//     return (
//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full font-bold transition-all"
//       >
//         Logout
//       </button>
//     );
//   }

//   return (
//     <Link
//       href="/login"
//       className="block text-center bg-blue-600 text-white py-2 px-6 rounded-lg font-bold"
//     >
//       Login
//     </Link>
//   );
// };

// export default AuthButton;

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/store/userStore"; // আপনার স্টোর ইমপোর্ট করুন
import { removeAuth } from "@/utils/auth";

const AuthButton = () => {
  const { user, setUser } = useUserStore(); // সরাসরি স্টোর থেকে ইউজার নিন
  const [mounted, setMounted] = useState(false);

  // Hydration Error এড়াতে এবং মাউন্ট চেক করতে
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    removeAuth(); // টোকেন রিমুভ
    setUser(null); // স্টোর থেকে ইউজার ডাটা ক্লিয়ার করুন
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  // মাউন্ট হওয়ার আগে কিছু রেন্ডার করবেন না (Hydration Fix)
  if (!mounted) return null;

  // ইউজার অবজেক্ট থাকলে লগআউট বাটন দেখাবে
  if (user) {
    return (
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full font-bold transition-all"
      >
        Logout
      </button>
    );
  }

  // ইউজার না থাকলে লগইন বাটন
  return (
    <Link
      href="/login"
      className="block text-center bg-blue-600 text-white py-2 px-6 rounded-lg font-bold"
    >
      Login
    </Link>
  );
};

export default AuthButton;
