// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import {
//   AiOutlineMail,
//   AiOutlineLock,
//   AiOutlineGoogle,
//   AiOutlineArrowLeft,
//   AiFillStar,
// } from "react-icons/ai";
// import { setAuth } from "@/utils/auth";
// import SocialLogin from "@/Component/Button/SocialLogin";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const response = await fetch("http://localhost:5000/api/v1/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const resData = await response.json();
//       console.log("Backend Response:", resData); // Debugging er jonno console check korun

//       if (!response.ok) {
//         throw new Error(
//           resData.message || "Login failed! Email or Password wrong.",
//         );
//       }

//       // ✅ Destructuring fix: Backend response structure check kore token nawa
//       // Jodi backend response { data: { accessToken, ... } } hoy tobe resData.data hobe
//       // Jodi backend response { accessToken, ... } hoy tobe resData hobe
//       const tokenSource = resData.data ? resData.data : resData;

//       const accessToken = tokenSource?.accessToken;
//       const refreshToken = tokenSource?.refreshToken;

//       if (!accessToken) {
//         throw new Error("AccessToken not found in server response!");
//       }

//       // Token save kora
//       setAuth(accessToken, refreshToken || "");

//       setSuccess("Login Successful! Redirecting to Home...");

//       setTimeout(() => {
//         // window.location.href use kora bhalo jate Navbar-er useAuth refresh hoy
//         window.location.href = "/";
//       }, 1500);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDemoLogin = (role: "user" | "admin") => {
//     if (role === "user") {
//       setEmail("user@example.com");
//       setPassword("123456");
//     } else {
//       setEmail("admin@example.com");
//       setPassword("123456");
//     }
//     setSuccess(`Auto-filled ${role} credentials! Click Login.`);
//     setTimeout(() => setSuccess(""), 3000);
//   };

//   return (
//     <div className="min-h-screen w-full flex bg-white dark:bg-gray-950">
//       {/* --- ১. বাম পাশ: Visual Branding Section --- */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900"
//       >
//         <img
//           src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=1200"
//           alt="Travel Background"
//           className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-black/40" />

//         <div className="relative z-10 w-full p-16 flex flex-col justify-between">
//           <Link
//             href="/"
//             className="group flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase"
//           >
//             <AiOutlineArrowLeft className="group-hover:-translate-x-2 transition-transform" />
//             Back to Home
//           </Link>

//           <div className="space-y-6">
//             <div className="flex gap-1 text-yellow-400">
//               {[...Array(5)].map((_, i) => (
//                 <AiFillStar key={i} />
//               ))}
//             </div>
//             <h1 className="text-6xl font-black text-white leading-[1.1]">
//               Explore the <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
//                 Unseen World
//               </span>
//             </h1>
//             <p className="text-gray-200 text-xl max-w-md font-light">
//               Join our community of 50k+ travelers worldwide.
//             </p>
//           </div>
//           <div className="text-white/70 text-sm">
//             Joined by 1,200+ new travelers this week
//           </div>
//         </div>
//       </motion.div>

//       {/* --- ২. ডান পাশ: Login Form --- */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-gray-50 dark:bg-gray-950">
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="max-w-md w-full"
//         >
//           <div className="mb-10 text-center lg:text-left">
//             <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3">
//               Sign In
//             </h2>
//             <p className="text-gray-500 font-medium">
//               Start your journey with{" "}
//               <span className="text-blue-600 font-bold">TravelAI</span>
//             </p>
//           </div>

//           {/* Form Messages */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-sm font-bold">
//               {error}
//             </div>
//           )}
//           {success && (
//             <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 text-sm font-bold animate-pulse">
//               {success}
//             </div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-5">
//             <div className="group space-y-2">
//               <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <AiOutlineMail
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600"
//                   size={20}
//                 />
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="name@company.com"
//                   className="w-full p-4 pl-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:border-blue-500 transition-all"
//                 />
//               </div>
//             </div>

//             <div className="group space-y-2">
//               <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <AiOutlineLock
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600"
//                   size={20}
//                 />
//                 <input
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="w-full p-4 pl-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:border-blue-500 transition-all"
//                 />
//               </div>
//             </div>

//             <button
//               disabled={loading}
//               type="submit"
//               className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-lg transition-all active:scale-[0.97] mt-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//             >
//               {loading ? "Authenticating..." : "Login Account"}
//             </button>
//             <SocialLogin></SocialLogin>
//           </form>

//           {/* Quick Access */}
//           <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-900 flex gap-3">
//             <button
//               onClick={() => handleDemoLogin("user")}
//               className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-blue-50"
//             >
//               User Demo
//             </button>
//             <button
//               onClick={() => handleDemoLogin("admin")}
//               className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-emerald-50"
//             >
//               Admin Demo
//             </button>
//           </div>

//           <p className="text-center mt-10 text-sm font-medium text-gray-500">
//             New here?{" "}
//             <Link
//               href="/register"
//               className="text-blue-600 font-black hover:underline"
//             >
//               Create an account
//             </Link>
//           </p>
//         </motion.div>
//       </div>
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
//   AiOutlineArrowLeft,
//   AiFillStar,
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
//               Your gateway to premium travel experiences starts here.
//             </p>
//           </div>
//           <p className="text-white/40 text-xs tracking-widest uppercase">
//             © 2026 TravelAI Global
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
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
//               Sign In
//             </h2>
//             <p className="text-gray-500 text-sm">
//               Welcome back! Please enter your details.
//             </p>
//           </div>

//           {error && (
//             <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
//               {error}
//             </div>
//           )}
//           {success && (
//             <div className="mb-4 p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-bold border border-emerald-100">
//               {success}
//             </div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-4">
//             <div className="space-y-1">
//               <label className="text-xs font-bold text-gray-400 uppercase ml-2">
//                 Email
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
//                   placeholder="traveler@example.com"
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
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50"
//             >
//               {loading ? "Authenticating..." : "Login Account"}
//             </button>
//           </form>

//           {/* Google Login Component */}
//           <SocialLogin />

//           <p className="text-center mt-8 text-sm text-gray-500 font-medium">
//             Don't have an account?{" "}
//             <Link
//               href="/register"
//               className="text-blue-600 font-bold hover:underline"
//             >
//               Sign up
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
import SocialLogin from "@/Component/Button/SocialLogin";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.message || "Login failed!");

      const tokenSource = resData.data ? resData.data : resData;
      setAuth(tokenSource?.accessToken, tokenSource?.refreshToken || "");

      setSuccess("Login Successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ অটো-ফিল লজিক
  const handleDemoLogin = (role: "user" | "admin") => {
    if (role === "user") {
      setEmail("user@example.com");
      setPassword("123456");
    } else {
      setEmail("admin@example.com");
      setPassword("123456");
    }
    setSuccess(`${role.toUpperCase()} credentials filled! Click Login.`);
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-gray-950 font-sans">
      {/* --- বাম পাশ: Visual Branding --- */}
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

        <div className="relative z-10 p-16 flex flex-col justify-between w-full">
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
            <h1 className="text-6xl font-black text-white leading-tight mb-4">
              Explore the <br />{" "}
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

      {/* --- ডান পাশ: Form --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 border border-gray-100 dark:border-gray-800"
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
            <div className="mb-4 p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-bold border border-emerald-100 animate-pulse">
              {success}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-2">
                Email Address
              </label>
              <div className="relative">
                <AiOutlineMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-2">
                Password
              </label>
              <div className="relative">
                <AiOutlineLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Login Account"}
            </button>
          </form>

          {/* Social Login Section */}
          <SocialLogin />

          {/* ✅ উন্নত ডেমো লগইন সেকশন */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <p className="text-[10px] text-center font-bold text-gray-400 uppercase tracking-widest mb-4">
              Quick Demo Access
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin("user")}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all"
              >
                <AiOutlineUser size={16} /> User Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("admin")}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 transition-all"
              >
                <AiOutlineSetting size={16} /> Admin Demo
              </button>
            </div>
          </div>

          <p className="text-center mt-8 text-sm text-gray-500 font-medium">
            New here?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-black hover:underline ml-1"
            >
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
