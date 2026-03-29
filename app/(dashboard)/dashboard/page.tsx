// "use client";

// import { useUserStore } from "@/store/userStore";
// import { useEffect, useState } from "react";
// import AdminOverview from "./adminoverview/page";
// import UserOverview from "./useroverview/page";

// export default function DashboardPage() {
//   const user = useUserStore((state) => state.user);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted || !user) return null;

//   return (
//     <div>
//       {/* রোলের নাম চেক করুন আপনার স্টোরে 'ADMIN' নাকি 'admin' আছে */}
//       {user.role === "ADMIN" ? <AdminOverview /> : <UserOverview />}
//     </div>
//   );
// }

"use client";

import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import AdminOverview from "./adminoverview/page";
import UserOverview from "./useroverview/page";

export default function DashboardPage() {
  const user = useUserStore((state) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) return null;

  return (
    // এখানে min-h-screen এবং ডার্ক মোড ব্যাকগ্রাউন্ড অ্যাড করা হয়েছে
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* রোলের নাম চেক করুন আপনার স্টোরে 'ADMIN' নাকি 'admin' আছে */}
      {user.role === "ADMIN" ? <AdminOverview /> : <UserOverview />}
    </div>
  );
}
