// "use client";

// import { useParams, useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   AiOutlineCalendar,
//   AiOutlineCheckCircle,
//   AiOutlineInfoCircle,
// } from "react-icons/ai";

// export default function BookingPage() {
//   const { id } = useParams();
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const selectedDate = searchParams.get("date");
//   const [item, setItem] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const res = await fetch(`https://ai-travel-booking-platform-server.onrender.com/api/v1/items/${id}`);
//         const data = await res.json();
//         if (data.success) {
//           setItem(data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching item:", error);
//       } finally {
//         setFetching(false);
//       }
//     };
//     fetchItem();
//   }, [id]);

//   const handleConfirmBooking = async () => {
//     const token = localStorage.getItem("accessToken");

//     if (!token) {
//       alert("বুকিং করার জন্য আগে লগইন করুন!");
//       router.push("/login");
//       return;
//     }

//     setLoading(true);

//     try {
//       const bookingData = {
//         itemId: id,
//         price: item.discountPrice,
//         quantity: 1,
//       };

//       const response = await fetch("https://ai-travel-booking-platform-server.onrender.com/api/v1/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(bookingData),
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         alert("আপনার বুকিং সফল হয়েছে!");
//         router.push("/");
//       } else {
//         alert(result.message || "বুকিং ব্যর্থ হয়েছে!");
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//       alert(
//         "সার্ভারের সাথে কানেক্ট করা যাচ্ছে না। আপনার ইন্টারনেট বা সার্ভার পোর্ট চেক করুন।",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetching)
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-slate-950">
//         <span className="loading loading-spinner loading-lg text-indigo-600"></span>
//       </div>
//     );
//   if (!item)
//     return (
//       <div className="text-center py-20 text-red-500 font-bold bg-gray-50 dark:bg-slate-950 min-h-screen">
//         আইটেমটি খুঁজে পাওয়া যায়নি!
//       </div>
//     );

//   return (
//     <div className="bg-gray-50 dark:bg-slate-950 min-h-screen py-12 px-4 transition-colors duration-300">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
//           বুকিং কনফার্ম করুন
//         </h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* বাম দিকের সেকশন */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* আইটেম কার্ড */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-5"
//             >
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-full sm:w-32 h-24 object-cover rounded-lg dark:brightness-90"
//               />
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//                   {item.title}
//                 </h2>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   {item.location.city}, {item.location.country}
//                 </p>
//                 <div className="flex items-center gap-2 mt-2 text-indigo-600 dark:text-indigo-400 font-medium">
//                   <AiOutlineCalendar className="text-lg" />
//                   <span>
//                     {selectedDate
//                       ? new Date(selectedDate).toLocaleDateString()
//                       : "তারিখ নেই"}
//                   </span>
//                 </div>
//               </div>
//             </motion.div>

//             {/* তথ্য কার্ড */}
//             <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
//               <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
//                 <AiOutlineInfoCircle className="text-indigo-500" /> গুরুত্বপূর্ণ
//                 তথ্য
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
//                 যাত্রা শুরুর ৪৮ ঘণ্টা আগে পর্যন্ত ফ্রি ক্যান্সেলেশন সুবিধা
//                 পাবেন। কোনো সমস্যার জন্য আমাদের সাপোর্ট সেন্টারে যোগাযোগ করুন।
//               </p>
//             </div>
//           </div>

//           {/* ডান দিকের প্রাইস সামারি (বুকিং কার্ড) */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-indigo-50 dark:border-gray-800 h-fit sticky top-10"
//           >
//             <h3 className="text-lg font-bold mb-4 border-b dark:border-gray-800 pb-2 text-gray-800 dark:text-gray-100">
//               প্রাইস সামারি
//             </h3>
//             <div className="space-y-3 border-b dark:border-gray-800 pb-4 text-sm">
//               <div className="flex justify-between text-gray-600 dark:text-gray-400">
//                 <span>মূল মূল্য</span>
//                 <span>৳{item.price.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
//                 <span>ডিসকাউন্ট</span>
//                 <span>
//                   -৳{(item.price - item.discountPrice).toLocaleString()}
//                 </span>
//               </div>
//             </div>
//             <div className="flex justify-between items-center py-4">
//               <span className="text-xl font-bold text-gray-800 dark:text-white">
//                 মোট দেয়
//               </span>
//               <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
//                 ৳{item.discountPrice.toLocaleString()}
//               </span>
//             </div>

//             <button
//               onClick={handleConfirmBooking}
//               disabled={loading}
//               className={`w-full py-4 rounded-xl text-white font-bold transition-all ${
//                 loading
//                   ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed"
//                   : "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-lg shadow-indigo-100 dark:shadow-none"
//               }`}
//             >
//               {loading ? "প্রসেসিং হচ্ছে..." : "বুকিং কনফার্ম করুন"}
//             </button>

//             <p className="text-[10px] text-center text-gray-500 dark:text-gray-500 mt-4 uppercase tracking-tighter">
//               Secure SSL Encrypted Payment
//             </p>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2"; // SweetAlert ইম্পোর্ট
import { AiOutlineCalendar, AiOutlineInfoCircle } from "react-icons/ai";

export default function BookingPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedDate = searchParams.get("date");
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(
          `https://ai-travel-booking-platform-server.onrender.com/api/v1/items/${id}`,
        );
        const data = await res.json();
        if (data.success) {
          setItem(data.data);
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleConfirmBooking = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      Swal.fire({
        title: "লগইন প্রয়োজন!",
        text: "বুকিং করার জন্য আগে লগইন করুন।",
        icon: "warning",
        confirmButtonColor: "#4f46e5",
      }).then(() => {
        router.push("/login");
      });
      return;
    }

    // কনফার্মেশন জিজ্ঞাসা করা (অপশনাল কিন্তু ভালো প্র্যাকটিস)
    const confirmResult = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "আপনি এই প্যাকেজটি বুক করতে চাচ্ছেন।",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "হ্যাঁ, বুক করুন",
      cancelButtonText: "বাতিল",
    });

    if (!confirmResult.isConfirmed) return;

    setLoading(true);

    try {
      const bookingData = {
        itemId: id,
        price: item.discountPrice,
        quantity: 1,
      };

      const response = await fetch(
        "https://ai-travel-booking-platform-server.onrender.com/api/v1/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        Swal.fire({
          title: "সফল হয়েছে!",
          text: "আপনার বুকিং সফলভাবে সম্পন্ন হয়েছে।",
          icon: "success",
          confirmButtonColor: "#4f46e5",
        }).then(() => {
          router.push("/");
        });
      } else {
        Swal.fire({
          title: "ব্যর্থ হয়েছে!",
          text: result.message || "বুকিং করা সম্ভব হয়নি।",
          icon: "error",
          confirmButtonColor: "#4f46e5",
        });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      Swal.fire({
        title: "সার্ভার এরর!",
        text: "সার্ভারের সাথে কানেক্ট করা যাচ্ছে না। দয়া করে কিছুক্ষণ পর চেষ্টা করুন।",
        icon: "error",
        confirmButtonColor: "#4f46e5",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-slate-950">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );

  if (!item)
    return (
      <div className="text-center py-20 text-red-500 font-bold bg-gray-50 dark:bg-slate-950 min-h-screen">
        আইটেমটি খুঁজে পাওয়া যায়নি!
      </div>
    );

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen py-12 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
          বুকিং কনফার্ম করুন
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* বাম দিকের সেকশন */}
          <div className="lg:col-span-2 space-y-6">
            {/* আইটেম কার্ড */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full sm:w-32 h-24 object-cover rounded-lg dark:brightness-90"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.location.city}, {item.location.country}
                </p>
                <div className="flex items-center gap-2 mt-2 text-indigo-600 dark:text-indigo-400 font-medium">
                  <AiOutlineCalendar className="text-lg" />
                  <span>
                    {selectedDate
                      ? new Date(selectedDate).toLocaleDateString()
                      : "তারিখ নেই"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* তথ্য কার্ড */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                <AiOutlineInfoCircle className="text-indigo-500" /> গুরুত্বপূর্ণ
                তথ্য
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                যাত্রা শুরুর ৪৮ ঘণ্টা আগে পর্যন্ত ফ্রি ক্যান্সেলেশন সুবিধা
                পাবেন। কোনো সমস্যার জন্য আমাদের সাপোর্ট সেন্টারে যোগাযোগ করুন।
              </p>
            </div>
          </div>

          {/* ডান দিকের প্রাইস সামারি */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-indigo-50 dark:border-gray-800 h-fit sticky top-10"
          >
            <h3 className="text-lg font-bold mb-4 border-b dark:border-gray-800 pb-2 text-gray-800 dark:text-gray-100">
              প্রাইস সামারি
            </h3>
            <div className="space-y-3 border-b dark:border-gray-800 pb-4 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>মূল মূল্য</span>
                <span>৳{item.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                <span>ডিসকাউন্ট</span>
                <span>
                  -৳{(item.price - item.discountPrice).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                মোট দেয়
              </span>
              <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                ৳{item.discountPrice.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleConfirmBooking}
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-bold transition-all ${
                loading
                  ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-lg shadow-indigo-100 dark:shadow-none"
              }`}
            >
              {loading ? "প্রসেসিং হচ্ছে..." : "বুকিং কনফার্ম করুন"}
            </button>

            <p className="text-[10px] text-center text-gray-500 dark:text-gray-500 mt-4 uppercase tracking-tighter">
              Secure SSL Encrypted Payment
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
