"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div>
      <h2 className="text-xl mb-5">Dashboard</h2>

      <ul className="space-y-2">
        <li>
          <Link href="/dashboard">Home</Link>
        </li>
        <li>
          <Link href="/dashboard/profile">Profile</Link>
        </li>
        <li>
          <Link href="/dashboard/bookings">Bookings</Link>
        </li>
        <li>
          <Link href="/dashboard/reviews">Reviews</Link>
        </li>
      </ul>
    </div>
  );
}
