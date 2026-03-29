// app/(dashboard)/layout.tsx
"use client";

import DashboardNavbar from "@/Component/Dashboard/DashboardNavbar/DashboardNavbar";
import Sidebar from "@/Component/Dashboard/Sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
      {/* Sidebar - ডার্ক মোডে বর্ডার কালার আপডেট করা হয়েছে */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F1A] z-50">
        <Sidebar />
      </aside>

      <div className="flex-1 pl-64 flex flex-col">
        {/* Navbar */}
        <DashboardNavbar />

        {/* ৩. Main Content - এখানে ব্যাকগ্রাউন্ড ট্রান্সপারেন্ট রাখা ভালো */}
        <main className="p-4 md:p-10 flex-1">{children}</main>
      </div>
    </div>
  );
}
