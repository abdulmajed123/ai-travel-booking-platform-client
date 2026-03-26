// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   AiOutlineMail,
//   AiOutlineLock,
//   AiOutlineArrowLeft,
//   AiFillStar,
//   AiOutlineUser,
//   AiOutlineSetting,
// } from "react-icons/ai";
// import { setAuth } from "@/utils/auth";
// import SocialLogin from "@/Component/Button/SocialLogin";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const response = await fetch("http://localhost:5000/api/v1/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const resData = await response.json();
//       if (!response.ok) throw new Error(resData.message || "Login failed!");

//       const tokenSource = resData.data ? resData.data : resData;
//       setAuth(tokenSource?.accessToken, tokenSource?.refreshToken || "");

//       setSuccess("Login Successful! Redirecting...");
//       setTimeout(() => {
//         window.location.href = "/";
//       }, 1500);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ অটো-ফিল লজিক
//   const handleDemoLogin = (role: "user" | "admin") => {
//     if (role === "user") {
//       setEmail("user@example.com");
//       setPassword("123456");
//     } else {
//       setEmail("admin@example.com");
//       setPassword("123456");
//     }
//     setSuccess(`${role.toUpperCase()} credentials filled! Click Login.`);
//     setTimeout(() => setSuccess(""), 3000);
//   };

//   return (
//     <div className="min-h-screen w-full flex bg-white dark:bg-gray-950 font-sans">
//       {/* --- বাম পাশ: Visual Branding --- */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="hidden lg:flex lg:w-1/2 relative bg-gray-900"
//       >
//         <img
//           src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=1200"
//           alt="Travel"
//           className="absolute inset-0 w-full h-full object-cover opacity-50"
//         />
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-black/80" />

//         <div className="relative z-10 p-16 flex flex-col justify-between w-full">
//           <Link
//             href="/"
//             className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
//           >
//             <AiOutlineArrowLeft /> Back to Home
//           </Link>
//           <div>
//             <div className="flex gap-1 text-yellow-400 mb-6">
//               {[...Array(5)].map((_, i) => (
//                 <AiFillStar key={i} />
//               ))}
//             </div>
//             <h1 className="text-6xl font-black text-white leading-tight mb-4">
//               Explore the <br />{" "}
//               <span className="text-blue-400">Unseen World</span>
//             </h1>
//             <p className="text-gray-300 text-lg max-w-sm">
//               Join 50k+ travelers today.
//             </p>
//           </div>
//           <p className="text-white/40 text-xs tracking-widest uppercase">
//             © 2026 TravelAI
//           </p>
//         </div>
//       </motion.div>

//       {/* --- ডান পাশ: Form --- */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="w-full max-w-md bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 border border-gray-100 dark:border-gray-800"
//         >
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
//               Sign In
//             </h2>
//             <p className="text-gray-500 text-sm font-medium">
//               Start your journey with{" "}
//               <span className="text-blue-600">TravelAI</span>
//             </p>
//           </div>

//           {error && (
//             <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
//               {error}
//             </div>
//           )}
//           {success && (
//             <div className="mb-4 p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-bold border border-emerald-100 animate-pulse">
//               {success}
//             </div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-4">
//             <div className="space-y-1">
//               <label className="text-xs font-bold text-gray-400 uppercase ml-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <AiOutlineMail
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   size={18}
//                 />
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
//                   placeholder="name@company.com"
//                 />
//               </div>
//             </div>

//             <div className="space-y-1">
//               <label className="text-xs font-bold text-gray-400 uppercase ml-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <AiOutlineLock
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   size={18}
//                 />
//                 <input
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>

//             <button
//               disabled={loading}
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98] disabled:opacity-50"
//             >
//               {loading ? "Authenticating..." : "Login Account"}
//             </button>
//           </form>

//           {/* Social Login Section */}
//           <SocialLogin />

//           {/* ✅ উন্নত ডেমো লগইন সেকশন */}
//           <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
//             <p className="text-[10px] text-center font-bold text-gray-400 uppercase tracking-widest mb-4">
//               Quick Demo Access
//             </p>
//             <div className="flex gap-3">
//               <button
//                 type="button"
//                 onClick={() => handleDemoLogin("user")}
//                 className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all"
//               >
//                 <AiOutlineUser size={16} /> User Demo
//               </button>
//               <button
//                 type="button"
//                 onClick={() => handleDemoLogin("admin")}
//                 className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 transition-all"
//               >
//                 <AiOutlineSetting size={16} /> Admin Demo
//               </button>
//             </div>
//           </div>

//           <p className="text-center mt-8 text-sm text-gray-500 font-medium">
//             New here?{" "}
//             <Link
//               href="/register"
//               className="text-blue-600 font-black hover:underline ml-1"
//             >
//               Create an account
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
  AiOutlineArrowLeft,
  AiFillStar,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { setAuth } from "@/utils/auth";
import { useUserStore } from "@/store/userStore";
import SocialLogin from "@/Component/Button/SocialLogin";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ১. লগইন করার আগেই সব পরিষ্কার করা
      localStorage.clear();
      useUserStore.getState().logout();

      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const resData = await response.json();

      if (!response.ok) throw new Error(resData.message || "Login failed!");

      // ২. কনসোলে চেক করুন API কী পাঠাচ্ছে (খুবই জরুরি)
      console.log("🔥 API response for this login:", resData);

      const userData = resData.data?.user || resData.user;
      const tokenData = resData.data || resData;

      // ৩. স্টোর আপডেট
      if (userData) {
        console.log("✅ Setting store with:", userData.email);
        setUser({
          name: userData.name,
          email: userData.email,
          role: userData.role.toUpperCase(),
        });
      }

      setAuth(tokenData.accessToken, tokenData.refreshToken || "");
      setSuccess("Login Success!");

      // ৪. হার্ড রিফ্রেশ
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDemoLogin = (role: "user" | "admin") => {
    if (role === "user") {
      setEmail("user@example.com");
      setPassword("123456");
    } else {
      setEmail("admin@example.com");
      setPassword("123456");
    }
    setSuccess(`${role.toUpperCase()} credentials filled! Click Login.`);
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-gray-950 font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden lg:flex lg:w-1/2 relative bg-gray-900"
      >
        <img
          src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=1200"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-black/80" />
        <div className="relative z-10 p-16 flex flex-col justify-between w-full text-white">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <AiOutlineArrowLeft /> Back to Home
          </Link>
          <div>
            <div className="flex gap-1 text-yellow-400 mb-6">
              {[...Array(5)].map((_, i) => (
                <AiFillStar key={i} />
              ))}
            </div>
            <h1 className="text-6xl font-black leading-tight mb-4 text-white">
              Explore the <br />
              <span className="text-blue-400">Unseen World</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-sm">
              Join 50k+ travelers today.
            </p>
          </div>
          <p className="text-white/40 text-xs tracking-widest uppercase">
            © 2026 TravelAI
          </p>
        </div>
      </motion.div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
              Sign In
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              Start your journey with{" "}
              <span className="text-blue-600">TravelAI</span>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-bold border border-emerald-100">
              {success}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 pl-12 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 pl-12 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Password"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-bold transition-all disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Login Account"}
            </button>
          </form>
          <SocialLogin />
          <div className="mt-8 pt-6 border-t dark:border-gray-800">
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleDemoLogin("user")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all"
              >
                <AiOutlineUser /> User Demo
              </button>
              <button
                onClick={() => handleDemoLogin("admin")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all"
              >
                <AiOutlineSetting /> Admin Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
