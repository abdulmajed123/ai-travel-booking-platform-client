"use client";

export default function DetailsSkeletonCard() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-6 lg:px-8 animate-pulse">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* বাম দিকের মেইন কন্টেন্ট স্কেলিটন */}
        <div className="lg:col-span-2 space-y-8">
          {/* ইমেজ গ্যালারি স্কেলিটন */}
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-full h-72 md:h-96 bg-gray-200 rounded-xl" />
            <div className="flex gap-3 mt-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-16 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>

          {/* ওভারভিউ এবং ডিটেইলস স্কেলিটন */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-6 w-20 bg-gray-200 rounded-full" />
                <div className="h-6 w-32 bg-gray-200 rounded-md" />
              </div>
              <div className="h-10 w-3/4 bg-gray-200 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-50 rounded-lg border border-gray-100"
                />
              ))}
            </div>
          </div>

          {/* হাইলাইটস স্কেলিটন */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mb-5" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 w-full bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        </div>

        {/* ডান দিকের বুকিং কার্ড স্কেলিটন */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-10 space-y-6">
            <div className="bg-white p-7 rounded-2xl shadow-lg border border-gray-100 space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="h-10 w-32 bg-gray-200 rounded-lg" />
                </div>
                <div className="h-8 w-24 bg-gray-200 rounded" />
              </div>

              <div className="border-t border-gray-100" />

              <div className="space-y-4">
                <div className="h-6 w-40 bg-gray-200 rounded" />
                <div className="space-y-2">
                  <div className="h-14 w-full bg-gray-100 rounded-xl" />
                  <div className="h-14 w-full bg-gray-100 rounded-xl" />
                </div>
              </div>

              <div className="h-16 w-full bg-gray-200 rounded-xl mt-6" />
            </div>

            <div className="h-20 w-full bg-white rounded-2xl border border-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
