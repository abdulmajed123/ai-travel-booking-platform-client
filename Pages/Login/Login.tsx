// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   AiOutlineMail,
//   AiOutlineLock,
//   AiOutlineGoogle,
//   AiFillFacebook,
// } from "react-icons/ai";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Demo Login Functionality
//   const handleDemoLogin = (role: "user" | "admin") => {
//     if (role === "user") {
//       setEmail("user@example.com");
//       setPassword("user1234");
//     } else {
//       setEmail("admin@travelai.com");
//       setPassword("admin1234");
//     }
//     setSuccess(`Auto-filled ${role} credentials! Click Login.`);
//     setError("");
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }
//     setError("");
//     setSuccess("Logging in successfully...");
//     // Perform actual API call here
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-md w-full bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl p-8 md:p-10 border border-gray-100 dark:border-gray-800"
//       >
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-black text-gray-900 dark:text-white">
//             Welcome Back
//           </h2>
//           <p className="text-gray-500 text-sm mt-2">
//             Log in to continue your adventure
//           </p>
//         </div>

//         {/* Error & Success Messages */}
//         {error && (
//           <div className="mb-4 p-3 text-sm bg-red-50 text-red-500 rounded-xl border border-red-100 text-center">
//             {error}
//           </div>
//         )}
//         {success && (
//           <div className="mb-4 p-3 text-sm bg-green-50 text-green-600 rounded-xl border border-green-100 text-center">
//             {success}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="relative">
//             <AiOutlineMail
//               className="absolute left-4 top-4 text-gray-400"
//               size={20}
//             />
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email Address"
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
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95"
//           >
//             Login
//           </button>
//         </form>

//         {/* Demo Login Buttons */}
//         <div className="mt-6 flex gap-3">
//           <button
//             onClick={() => handleDemoLogin("user")}
//             className="flex-1 text-[10px] uppercase tracking-wider font-bold p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-blue-50 text-gray-600 transition-all"
//           >
//             User Demo
//           </button>
//           <button
//             onClick={() => handleDemoLogin("admin")}
//             className="flex-1 text-[10px] uppercase tracking-wider font-bold p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-blue-50 text-gray-600 transition-all"
//           >
//             Admin Demo
//           </button>
//         </div>

//         <div className="relative my-8 text-center">
//           <span className="bg-white dark:bg-gray-900 px-4 text-gray-400 text-sm relative z-10">
//             Or continue with
//           </span>
//           <div className="absolute top-3 left-0 w-full border-t border-gray-100 dark:border-gray-800"></div>
//         </div>

//         {/* Social Login */}
//         <div className="grid grid-cols-2 gap-4">
//           <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium text-sm">
//             <AiOutlineGoogle size={20} className="text-red-500" /> Google
//           </button>
//           <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium text-sm">
//             <AiFillFacebook size={20} className="text-blue-600" /> Facebook
//           </button>
//         </div>

//         <p className="text-center mt-8 text-sm text-gray-500">
//           Don't have an account?{" "}
//           <Link
//             href="/register"
//             className="text-blue-600 font-bold hover:underline"
//           >
//             Register Now
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   AiOutlineMail,
//   AiOutlineLock,
//   AiOutlineGoogle,
//   AiOutlineArrowLeft,
// } from "react-icons/ai";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Demo Login Functionality
//   const handleDemoLogin = (role: "user" | "admin") => {
//     if (role === "user") {
//       setEmail("user@example.com");
//       setPassword("user1234");
//     } else {
//       setEmail("admin@travelai.com");
//       setPassword("admin1234");
//     }
//     setSuccess(`Auto-filled ${role} credentials! Click Login.`);
//     setError("");
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }
//     setError("");
//     setSuccess("Logging in successfully...");
//     // Perform actual API call here
//   };

//   return (
//     // মেইন কন্টেইনারকে ফ্লেক্স করা হয়েছে বড় স্ক্রিনের জন্য
//     <div className="min-h-screen w-full flex flex-col md:flex-row bg-white dark:bg-gray-950 overflow-hidden">
//       {/* --- ১. বাম পাশ: ইমেজ এবং টেক্সট সেকশন (Hidden on Mobile) --- */}
//       <motion.div
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="hidden md:flex md:w-1/2 relative bg-blue-600 items-center justify-center p-12 overflow-hidden"
//       >
//         {/* ফ্লোটিং অ্যানিমেটেড বিমান ইমোজি */}
//         <motion.div
//           animate={{ y: [0, -20, 0] }}
//           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute top-20 right-20 text-white/20 text-9xl font-black"
//         >
//           ✈️
//         </motion.div>

//         <div className="relative z-10 max-w-lg space-y-6">
//           <Link
//             href="/"
//             className="inline-flex items-center text-blue-100 hover:text-white transition-colors gap-2 text-sm font-bold mb-8"
//           >
//             <AiOutlineArrowLeft /> Back to Website
//           </Link>
//           <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
//             Your Next <br /> <span className="text-blue-200">Adventure</span>{" "}
//             <br /> Starts Here.
//           </h1>
//           <p className="text-blue-100 text-lg leading-relaxed">
//             Join thousands of travelers exploring the world with TravelAI. One
//             click is all it takes to unlock exclusive deals.
//           </p>

//           {/* ট্রাভেল ইমেজ */}
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.5 }}
//             className="pt-10"
//           >
//             <img
//               src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800"
//               alt="Travel Illustration"
//               className="rounded-3xl shadow-2xl border-4 border-white/10 w-full object-cover h-64"
//             />
//           </motion.div>
//         </div>

//         {/* ব্যাকগ্রাউন্ড ডেকোরেশন সার্কেল */}
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl" />
//       </motion.div>

//       {/* --- ২. ডান পাশ: লগইন সিস্টেম (আগের কোড) --- */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
//         <motion.div
//           initial={{ x: 100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-md w-full space-y-8"
//         >
//           <div className="text-center md:text-left mb-8 space-y-3">
//             <h2 className="text-4xl font-black text-gray-900 dark:text-white">
//               Welcome Back
//             </h2>
//             <p className="text-gray-500 dark:text-gray-400">
//               Log in to continue your adventure
//             </p>
//           </div>

//           {/* Error & Success Messages */}
//           {error && (
//             <div className="mb-4 p-3 text-sm bg-red-50 text-red-500 rounded-xl border border-red-100 text-center">
//               {error}
//             </div>
//           )}
//           {success && (
//             <div className="mb-4 p-3 text-sm bg-green-50 text-green-600 rounded-xl border border-green-100 text-center">
//               {success}
//             </div>
//           )}

//           {/* গুগল লগইন (এখন গ্রিডের বদলে সিঙ্গেল বাটন) */}
//           <button className="w-full flex items-center justify-center gap-4 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-500 transition-all shadow-sm active:scale-95 group">
//             <div className="bg-white p-2 rounded-lg shadow-sm">
//               <AiOutlineGoogle size={24} className="text-red-500" />
//             </div>
//             <span className="text-gray-700 dark:text-gray-200 font-bold text-lg">
//               Continue with Google
//             </span>
//           </button>

//           <div className="relative my-8 text-center">
//             <span className="bg-white dark:bg-gray-950 px-4 text-gray-400 text-xs uppercase tracking-widest relative z-10 font-bold">
//               Or login manually
//             </span>
//             <div className="absolute top-3 left-0 w-full border-t border-gray-100 dark:border-gray-800"></div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="relative">
//               <AiOutlineMail
//                 className="absolute left-4 top-4 text-gray-400"
//                 size={20}
//               />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email Address"
//                 className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
//               />
//             </div>
//             <div className="relative">
//               <AiOutlineLock
//                 className="absolute left-4 top-4 text-gray-400"
//                 size={20}
//               />
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95"
//             >
//               Login
//             </button>
//           </form>

//           {/* Demo Login Buttons */}
//           <div className="mt-6 space-y-3">
//             <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter text-center">
//               Quick Test Access
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => handleDemoLogin("user")}
//                 className="flex-1 text-[10px] uppercase tracking-wider font-bold p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-blue-50 text-gray-600 transition-all"
//               >
//                 User Demo
//               </button>
//               <button
//                 onClick={() => handleDemoLogin("admin")}
//                 className="flex-1 text-[10px] uppercase tracking-wider font-bold p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-blue-50 text-gray-600 transition-all"
//               >
//                 Admin Demo
//               </button>
//             </div>
//           </div>

//           <p className="text-center mt-8 text-sm text-gray-500">
//             Don't have an account?{" "}
//             <Link
//               href="/register"
//               className="text-blue-600 font-bold hover:underline"
//             >
//               Register Now
//             </Link>
//           </p>
//         </motion.div>
//       </div>
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
  AiOutlineGoogle,
  AiOutlineArrowLeft,
  AiFillStar,
} from "react-icons/ai";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDemoLogin = (role: "user" | "admin") => {
    if (role === "user") {
      setEmail("user@example.com");
      setPassword("user1234");
    } else {
      setEmail("admin@travelai.com");
      setPassword("admin1234");
    }
    setSuccess(`Auto-filled ${role} credentials!`);
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-gray-950">
      {/* --- ১. বাম পাশ: Visual Branding Section (১/২ অংশ) --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900"
      >
        {/* Background Image with Overlay */}
        <img
          src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=1200"
          alt="Travel Background"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 hover:scale-100 transition-transform duration-10000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-black/40" />

        {/* Content Over Image */}
        <div className="relative z-10 w-full p-16 flex flex-col justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase"
          >
            <AiOutlineArrowLeft className="group-hover:-translate-x-2 transition-transform" />
            Back to Home
          </Link>

          <div className="space-y-6">
            <div className="flex gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <AiFillStar key={i} />
              ))}
            </div>
            <h1 className="text-6xl font-black text-white leading-[1.1]">
              Explore the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Unseen World
              </span>
            </h1>
            <p className="text-gray-200 text-xl max-w-md font-light leading-relaxed">
              "Travel is the only thing you buy that makes you richer." Join our
              community of 50k+ travelers.
            </p>
          </div>

          <div className="flex items-center gap-4 text-white/70 text-sm">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-blue-600"
                  src={`https://i.pravatar.cc/150?u=${i}`}
                  alt="user"
                />
              ))}
            </div>
            <p>Joined by 1,200+ new travelers this week</p>
          </div>
        </div>
      </motion.div>

      {/* --- ২. ডান পাশ: Clean Login Form (১/২ অংশ) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-gray-50 dark:bg-gray-950">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-md w-full"
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
              Sign In
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Start your journey with{" "}
              <span className="text-blue-600 font-bold">TravelAI</span>
            </p>
          </div>

          {/* Google Login - Extra Premium Look */}
          <button className="w-full flex items-center justify-center gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl hover:shadow-xl hover:border-blue-500 transition-all duration-300 group active:scale-[0.98]">
            <AiOutlineGoogle
              size={24}
              className="text-red-500 group-hover:rotate-12 transition-transform"
            />
            <span className="text-gray-700 dark:text-gray-200 font-bold text-lg">
              Continue with Google
            </span>
          </button>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200 dark:border-gray-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 dark:bg-gray-950 px-4 text-gray-400 font-bold tracking-[0.2em]">
                OR LOGIN WITH EMAIL
              </span>
            </div>
          </div>

          {/* Form Messages */}
          {success && (
            <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 text-sm font-bold animate-pulse">
              {success}
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div className="group space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                Email Address
              </label>
              <div className="relative">
                <AiOutlineMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full p-4 pl-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all dark:text-white"
                />
              </div>
            </div>

            <div className="group space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <AiOutlineLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-4 pl-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all dark:text-white"
                />
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-2xl shadow-blue-200 dark:shadow-none transition-all active:scale-[0.97] mt-2">
              Login Account
            </button>
          </form>

          {/* Demo Login Badges */}
          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-900">
            <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
              Quick Test Access
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDemoLogin("user")}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all"
              >
                User Demo
              </button>
              <button
                onClick={() => handleDemoLogin("admin")}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 transition-all"
              >
                Admin Demo
              </button>
            </div>
          </div>

          <p className="text-center mt-10 text-sm font-medium text-gray-500">
            New here?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-black hover:underline"
            >
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
