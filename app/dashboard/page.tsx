export default function DashboardHome() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold">1200</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Total Bookings</h3>
          <p className="text-2xl font-bold">350</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Revenue</h3>
          <p className="text-2xl font-bold">$25,000</p>
        </div>
      </div>
    </div>
  );
}
