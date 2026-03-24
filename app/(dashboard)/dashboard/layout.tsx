import Sidebar from "@/Component/Dashboard/Sidebar/Sidebar";
import Navbar from "@/Component/Navbar/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Navbar />
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
