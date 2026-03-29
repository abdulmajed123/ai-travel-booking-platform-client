"use client";

import { motion } from "framer-motion";
import {
  AiOutlineArrowRight,
  AiOutlineClockCircle,
  AiOutlineEnvironment,
  AiOutlineTag,
  AiFillStar,
  AiOutlineCalendar,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Location = {
  country: string;
  city: string;
  area: string;
};

type Itinerary = {
  _id: string;
  day: number;
  title: string;
  description: string;
};

type Item = {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  price: number;
  discountPrice: number;
  rating: number;
  category: string;
  duration: string;
  location: Location;
  availableDates: string[];
  facilities: string[];
  highlights: string[];
  itinerary: Itinerary[];
};

interface Props {
  item: Item;
}

export default function ItemDetailsCard({ item }: Props) {
  const router = useRouter();
  const [activeDate, setActiveDate] = useState(item.availableDates[0]);

  const handleBookingRedirect = () => {
    router.push(`/booking/${item._id}?date=${activeDate}`);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen py-10 px-4 md:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* বাম দিকের কন্টেন্ট */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-72 md:h-96 object-cover rounded-xl dark:brightness-90"
            />
            {item.images && item.images.length > 0 && (
              <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
                {[item.image, ...item.images.slice(0, 3)].map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="thumbnail"
                    className="w-20 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-500"
                  />
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.category}
                </span>
                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 text-sm">
                  <AiOutlineEnvironment className="w-4 h-4 text-indigo-500" />
                  <span>
                    {item.location.city}, {item.location.country}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950 dark:text-white">
                {item.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                {item.description}
              </p>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <QuickInfo
                icon={<AiOutlineClockCircle />}
                label="Duration"
                value={item.duration}
              />
              <QuickInfo
                icon={<AiFillStar className="text-yellow-400" />}
                label="Rating"
                value={`${item.rating} / 5`}
              />
              <QuickInfo
                icon={<AiOutlineTag />}
                label="Area"
                value={item.location.area}
              />
              <QuickInfo
                icon={<AiOutlineCheckCircle />}
                label="Status"
                value="Available"
                color="text-green-600 dark:text-green-400"
              />
            </div>
          </motion.div>

          {/* highlights */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-5">
              Tour Highlights
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {item.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300"
                >
                  <AiOutlineCheckCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Itinerary */}
          {item.itinerary.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-6">
                Day to Day Itinerary
              </h2>
              <div className="space-y-0 relative before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-indigo-100 dark:before:bg-gray-800">
                {item.itinerary.map((day) => (
                  <div key={day._id} className="relative pl-12 pb-8 last:pb-0">
                    <div className="absolute left-0 top-1 bg-indigo-600 text-white rounded-full font-bold w-8 h-8 flex items-center justify-center text-xs z-10 shadow-md">
                      {day.day}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                      {day.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {day.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* facilities */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-5">
              What's Included
            </h2>
            <div className="flex flex-wrap gap-3">
              {item.facilities.map((facility) => (
                <span
                  key={facility}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  {facility}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ডান দিকের বুকিং কার্ড */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-10 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-900 p-7 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 space-y-6"
            >
              <div className="flex items-end gap-3 justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Per Person
                  </p>
                  <span className="text-4xl font-extrabold text-gray-950 dark:text-white">
                    ৳{item.discountPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                {item.discountPrice < item.price && (
                  <div className="text-right">
                    <span className="text-lg font-medium text-gray-400 dark:text-gray-500 line-through block">
                      ৳{item.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/30 px-2 py-0.5 rounded">
                      Save ৳
                      {(item.price - item.discountPrice).toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800" />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-semibold">
                  <AiOutlineCalendar className="w-5 h-5 text-indigo-500" />
                  <h3>Select Departure Date</h3>
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {item.availableDates.map((date) => {
                    const d = new Date(date);
                    const isSelected = activeDate === date;
                    return (
                      <button
                        key={date}
                        onClick={() => setActiveDate(date)}
                        className={`flex items-center justify-between p-4 border rounded-xl text-left transition-all ${isSelected ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 shadow-inner" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"}`}
                      >
                        <div>
                          <span
                            className={`block font-semibold ${isSelected ? "text-indigo-900 dark:text-indigo-300" : "text-gray-900 dark:text-gray-100"}`}
                          >
                            {d.toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span
                            className={`text-xs ${isSelected ? "text-indigo-700 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"}`}
                          >
                            Seats available
                          </span>
                        </div>
                        {isSelected && (
                          <AiOutlineCheckCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <motion.button
                onClick={handleBookingRedirect}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-xl text-lg font-bold shadow-indigo-200 dark:shadow-none shadow-lg hover:bg-indigo-700 transition-all group"
              >
                <span>Book This Tour</span>
                <AiOutlineArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                Free cancellation up to 48 hours before departure.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickInfo({
  icon,
  label,
  value,
  color = "text-gray-900",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
      <div className="text-indigo-500 w-5 h-5 shrink-0">{icon}</div>
      <div>
        <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">
          {label}
        </dt>
        <dd
          className={`text-sm font-semibold ${color.includes("gray-900") ? "dark:text-white" : color}`}
        >
          {value}
        </dd>
      </div>
    </div>
  );
}
