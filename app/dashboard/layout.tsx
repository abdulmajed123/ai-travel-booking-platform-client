"use client";
import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`bg-white dark:bg-gray-800 p-4 transition-all ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Sidebar toggle */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>

        {/* Navigation Links */}
        <nav className="mt-6 space-y-2">
          <Link href="/dashboard" className="block hover:text-blue-500">
            Dashboard
          </Link>
          <Link href="/dashboard/profile" className="block hover:text-blue-500">
            Profile
          </Link>
          <Link
            href="/dashboard/bookings"
            className="block hover:text-blue-500"
          >
            My Bookings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Topbar */}
        <div className="bg-white dark:bg-gray-800 p-4 shadow flex justify-between">
          <h1 className="font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>User</span>
            <button className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></button>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
