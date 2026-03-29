"use client";

import { useEffect, useState } from "react";
import {
  AiOutlineUser,
  AiOutlineDollar,
  AiOutlineDatabase,
  AiOutlineLineChart,
  AiOutlineCalendar,
  AiOutlineArrowUp,
  AiOutlineDownload,
} from "react-icons/ai";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";
import { toast } from "react-hot-toast";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AdminOverview() {
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const baseURL =
          "https://ai-travel-booking-platform-server.onrender.com/api/v1/dashboard";

        const [sRes, cRes, pRes] = await Promise.all([
          fetch(`${baseURL}/admin-stats`, { headers }),
          fetch(`${baseURL}/chart-data`, { headers }),
          fetch(`${baseURL}/admin-pie-data`, { headers }),
        ]);

        const s = await sRes.json();
        const c = await cRes.json();
        const p = await pRes.json();

        if (s.success) setStats(s.data);
        // চার্টে ডাটা না থাকলে এম্পটি অ্যারে হ্যান্ডলিং
        if (c.success) setChartData(c.data || []);
        if (p.success) setPieData(p.data || []);
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Failed to load admin analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <AdminSkeleton />;

  return (
    <div className="p-4 md:p-10 space-y-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-500">
      {/* --- Modern Header --- */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-all">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200 dark:shadow-none">
              <AiOutlineLineChart size={24} />
            </div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
              Admin <span className="text-blue-600">Insights</span>
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 ml-1">
            <AiOutlineCalendar className="text-blue-500" />
            Real-time system performance & revenue tracking
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-4 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
            <AiOutlineDownload size={18} />
            Reports
          </button>
          <button className="flex-1 lg:flex-none bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none active:scale-95">
            Export CSV
          </button>
        </div>
      </header>

      {/* --- Quick Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers ?? 0}
          icon={<AiOutlineUser />}
          color="blue"
          subText="+12% from last month"
          trend="up"
        />
        <StatCard
          title="Total Item"
          value={stats?.totalItems ?? 0}
          icon={<AiOutlineDatabase />}
          color="purple"
          subText="Current travel packages"
        />
        <StatCard
          title="Total Revenue"
          value={`$${(stats?.totalRevenue ?? 0).toLocaleString()}`}
          icon={<AiOutlineDollar />}
          color="green"
          subText="Net earnings (Gross)"
          trend="up"
        />
        <StatCard
          title="Total Bookings"
          value={stats?.totalOrders ?? 0}
          icon={<AiOutlineLineChart />}
          color="orange"
          subText="Total successful orders"
        />
      </div>

      {/* --- Visual Analytics Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Revenue Bar Chart */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-black text-xl text-slate-800 dark:text-white uppercase tracking-wider">
              Monthly <span className="text-blue-600">Revenue</span>
            </h3>
            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-xs font-bold p-2 outline-none text-slate-500">
              <option>Year 2026</option>
              <option>Year 2025</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                  className="dark:stroke-slate-800/50"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
                  contentStyle={{
                    borderRadius: "20px",
                    border: "none",
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                    backgroundColor: "#0f172a",
                    color: "#fff",
                    padding: "15px",
                  }}
                  itemStyle={{ color: "#3b82f6", fontWeight: "bold" }}
                />
                <Bar
                  dataKey="revenue"
                  fill="#3b82f6"
                  radius={[12, 12, 12, 12]}
                  barSize={35}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Pie Chart */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <h3 className="font-black text-xl text-slate-800 dark:text-white mb-10 uppercase tracking-wider">
            Order <span className="text-blue-600">Status</span>
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="hover:opacity-80 transition-opacity outline-none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: "#0f172a",
                    color: "#fff",
                  }}
                />
                <Legend
                  iconType="circle"
                  verticalAlign="bottom"
                  layout="horizontal"
                  formatter={(value) => (
                    <span className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase ml-2 tracking-tighter">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, subText, trend }: any) {
  const colors: any = {
    blue: "bg-blue-600 text-white shadow-blue-200 dark:shadow-none",
    green: "bg-emerald-500 text-white shadow-emerald-200 dark:shadow-none",
    purple: "bg-purple-600 text-white shadow-purple-200 dark:shadow-none",
    orange: "bg-orange-500 text-white shadow-orange-200 dark:shadow-none",
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-7 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col gap-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
      {/* Background Decor */}
      <div
        className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700 ${colors[color].split(" ")[0]}`}
      ></div>

      <div className="flex justify-between items-start">
        <div
          className={`p-4 rounded-2xl ${colors[color]} text-2xl shadow-2xl group-hover:rotate-6 transition-transform`}
        >
          {icon}
        </div>
        {trend === "up" && (
          <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full text-[10px] font-black uppercase">
            <AiOutlineArrowUp /> 15%
          </div>
        )}
      </div>

      <div>
        <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          {title}
        </p>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mt-1">
          {value}
        </h3>
        <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-2 italic">
          {subText}
        </p>
      </div>
    </div>
  );
}

function AdminSkeleton() {
  return (
    <div className="p-10 space-y-10 bg-slate-50 dark:bg-slate-950 min-h-screen animate-pulse">
      <div className="h-40 bg-white dark:bg-slate-900 rounded-[3rem]"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-44 bg-white dark:bg-slate-900 rounded-[2.5rem]"
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="h-[450px] bg-white dark:bg-slate-900 rounded-[3rem]"></div>
        <div className="h-[450px] bg-white dark:bg-slate-900 rounded-[3rem]"></div>
      </div>
    </div>
  );
}
