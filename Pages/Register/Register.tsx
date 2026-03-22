// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

// export default function RegisterPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSuccess(true);
//     // Success flow logic
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="max-w-md w-full bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl p-8 md:p-10 border border-gray-100 dark:border-gray-800"
//       >
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-black text-gray-900 dark:text-white">
//             Join TravelAI
//           </h2>
//           <p className="text-gray-500 text-sm mt-2">
//             Start your journey with us today
//           </p>
//         </div>

//         {success && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mb-6 p-4 bg-green-50 text-green-600 rounded-2xl border border-green-100 text-center font-medium"
//           >
//             Account created! Please login to continue.
//           </motion.div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="relative">
//             <AiOutlineUser
//               className="absolute left-4 top-4 text-gray-400"
//               size={20}
//             />
//             <input
//               type="text"
//               placeholder="Full Name"
//               required
//               className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
//             />
//           </div>
//           <div className="relative">
//             <AiOutlineMail
//               className="absolute left-4 top-4 text-gray-400"
//               size={20}
//             />
//             <input
//               type="email"
//               placeholder="Email Address"
//               required
//               className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
//             />
//           </div>
//           <div className="relative">
//             <AiOutlineLock
//               className="absolute left-4 top-4 text-gray-400"
//               size={20}
//             />
//             <input
//               type="password"
//               placeholder="Create Password"
//               required
//               className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
//             />
//           </div>

//           <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95">
//             Create Account
//           </button>
//         </form>

//         <p className="text-center mt-8 text-sm text-gray-500">
//           Already a member?{" "}
//           <Link
//             href="/login"
//             className="text-blue-600 font-bold hover:underline"
//           >
//             Login Here
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineCamera,
  AiOutlineArrowLeft,
  AiOutlineGoogle,
} from "react-icons/ai";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // ইমেজ হ্যান্ডলার (প্রিভিউ দেখানোর জন্য)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-gray-950">
      {/* --- ১. বাম পাশ: Visual Branding (১/২ অংশ) --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-blue-900"
      >
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200"
          alt="Adventure"
          className="absolute inset-0 w-full h-full object-cover opacity-50 hover:scale-110 transition-transform duration-[10s]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-black/60" />

        <div className="relative z-10 w-full p-16 flex flex-col justify-between text-white">
          <Link
            href="/"
            className="group flex items-center gap-2 font-bold text-sm tracking-widest uppercase"
          >
            <AiOutlineArrowLeft className="group-hover:-translate-x-2 transition-transform" />
            Back to Home
          </Link>

          <div className="space-y-6">
            <h1 className="text-6xl font-black leading-tight">
              Create Your <br />
              <span className="text-blue-400">Travel Profile</span>
            </h1>
            <p className="text-gray-200 text-xl max-w-md font-light">
              Join millions of explorers. Track your trips, get personalized
              recommendations, and save your favorites.
            </p>
          </div>

          <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 inline-block max-w-sm">
            <p className="text-sm italic">
              "The world is a book and those who do not travel read only one
              page."
            </p>
            <p className="mt-4 font-bold text-blue-300">— Saint Augustine</p>
          </div>
        </div>
      </motion.div>

      {/* --- ২. ডান পাশ: Register Form (১/২ অংশ) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 bg-gray-50 dark:bg-gray-950">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Start your journey with TravelAI today.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {/* --- Profile Image Upload --- */}
            <div className="flex flex-col items-center lg:items-start space-y-3">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <AiOutlineUser size={40} className="text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none">
                  <AiOutlineCamera size={18} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Upload Photo
              </p>
            </div>

            {/* Name Field */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <AiOutlineUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-4 pl-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all dark:text-white"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <AiOutlineMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full p-4 pl-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all dark:text-white"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                Password
              </label>
              <div className="relative group">
                <AiOutlineLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-4 pl-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all dark:text-white"
                />
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-2xl shadow-blue-200 dark:shadow-none transition-all active:scale-[0.97]">
              Create Account
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200 dark:border-gray-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 dark:bg-gray-950 px-4 text-gray-400 font-bold tracking-widest">
                Or sign up with
              </span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl hover:border-blue-500 transition-all group active:scale-[0.98]">
            <AiOutlineGoogle size={24} className="text-red-500" />
            <span className="text-gray-700 dark:text-gray-200 font-bold">
              Register with Google
            </span>
          </button>

          <p className="text-center mt-10 text-sm font-medium text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-black hover:underline"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
