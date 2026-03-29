"use client";

import { useEffect, useState } from "react";
import {
  AiOutlineShopping,
  AiOutlineDollar,
  AiOutlineStar,
  AiOutlineCalendar,
} from "react-icons/ai";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";
import { toast } from "react-hot-toast";

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#f43f5e"];

export default function UserOverview() {
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const baseURL =
    "https://ai-travel-booking-platform-server.onrender.com/api/v1";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };

        const [statsRes, chartRes, pieRes] = await Promise.all([
          fetch(`${baseURL}/dashboard/user-stats`, { headers }),
          fetch(`${baseURL}/dashboard/chart-data`, { headers }),
          fetch(`${baseURL}/dashboard/user-pie-data`, { headers }),
        ]);

        const statsResult = await statsRes.json();
        const chartResult = await chartRes.json();
        const pieResult = await pieRes.json();

        if (statsResult.success) setStats(statsResult.data);
        if (chartResult.success) setChartData(chartResult.data);
        if (pieResult.success) setPieData(pieResult.data);
      } catch (error) {
        toast.error("Failed to sync dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-4 md:p-8 space-y-8 bg-slate-50 dark:bg-slate-950 min-h-screen font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Welcome back! 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 flex items-center gap-2">
            <AiOutlineCalendar className="text-blue-500" />
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-xl font-bold text-sm border border-blue-100 dark:border-blue-900/30">
          Standard Member
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<AiOutlineShopping />}
          label="My Bookings"
          value={stats?.totalBookings}
          subText="Successful orders"
          color="blue"
        />
        <StatCard
          icon={<AiOutlineDollar />}
          label="Total Spent"
          value={`$${(stats?.totalSpent || 0).toLocaleString()}`}
          subText="Wallet investment"
          color="emerald"
        />
        <StatCard
          icon={<AiOutlineStar />}
          label="My Reviews"
          value={stats?.totalReviews}
          subText="Community voice"
          color="rose"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all">
          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-6">
            Booking Activity
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                  className="dark:stroke-slate-800"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  itemStyle={{ color: "#1e293b" }}
                />
                <Bar
                  dataKey="orders"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                  barSize={35}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all">
          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-6">
            Booking Status
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, subText, color }: any) {
  const colorVariants: any = {
    blue: "bg-blue-600/10 text-blue-600 ring-blue-100 dark:ring-blue-900/30",
    emerald:
      "bg-emerald-600/10 text-emerald-600 ring-emerald-100 dark:ring-emerald-900/30",
    rose: "bg-rose-600/10 text-rose-600 ring-rose-100 dark:ring-rose-900/30",
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5 transition-all duration-300">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${colorVariants[color]} ring-4 transition-all`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          {label}
        </p>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {value ?? 0}
        </h3>
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 italic mt-0.5">
          {subText}
        </p>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-8 space-y-8 animate-pulse bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="h-24 bg-white dark:bg-slate-900 rounded-[2rem]"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 bg-white dark:bg-slate-900 rounded-[2rem]"
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-80 bg-white dark:bg-slate-900 rounded-[2.5rem]"></div>
        <div className="h-80 bg-white dark:bg-slate-900 rounded-[2.5rem]"></div>
      </div>
    </div>
  );
}
