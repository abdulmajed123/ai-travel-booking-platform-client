// import DashboardNavbar from "@/Component/Dashboard/DashboardNavbar/DashboardNavbar";
// import Sidebar from "@/Component/Dashboard/Sidebar/Sidebar";

import DashboardNavbar from "@/Component/Dashboard/DashboardNavbar/DashboardNavbar";
import Sidebar from "@/Component/Dashboard/Sidebar/Sidebar";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-900 text-white p-5">
//         <Sidebar></Sidebar>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1">
//         <DashboardNavbar></DashboardNavbar>
//         <div className="p-5">{children}</div>
//       </div>
//     </div>
//   );
// }

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* বাম পাশে সাইডবার */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r">
        <Sidebar />
      </aside>

      {/* ডান পাশে মেইন কন্টেন্ট */}
      <div className="flex-1 pl-64 flex flex-col">
        {/* নাভবার */}
        <header className="sticky top-0 z-40 w-full bg-white">
          <DashboardNavbar />
        </header>

        {/* মেইন ড্যাশবোর্ড কন্টেন্ট */}
        <main className="flex-1 p-6 bg-gray-50/50 min-h-[calc(100-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
