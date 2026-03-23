// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";

// export default function RegisterPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // input change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // submit handler
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const res = await fetch("http://localhost:5000/api/v1/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const text = await res.text();
//       let result;

//       try {
//         result = JSON.parse(text);
//       } catch {
//         throw new Error("Server is not returning JSON");
//       }

//       if (!res.ok) {
//         throw new Error(result.message || "Registration failed");
//       }

//       // 🔥 AUTO LOGIN
//       localStorage.setItem("accessToken", result.accessToken);
//       localStorage.setItem("refreshToken", result.refreshToken);

//       // 🔥 redirect home
//       window.location.href = "/";
//     } catch (error: any) {
//       console.error(error);
//       alert(error.message || "❌ Server Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex bg-white dark:bg-gray-950">
//       {/* LEFT SIDE */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="hidden lg:flex lg:w-1/2 relative bg-blue-900"
//       >
//         <img
//           src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
//           alt="bg"
//           className="absolute inset-0 w-full h-full object-cover opacity-50"
//         />
//       </motion.div>

//       {/* RIGHT SIDE */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="max-w-md w-full space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
//         >
//           <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
//             Create Account
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* NAME */}
//             <div className="relative">
//               <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 placeholder="Full Name"
//                 onChange={handleChange}
//                 className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* EMAIL */}
//             <div className="relative">
//               <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 placeholder="Email"
//                 onChange={handleChange}
//                 className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* PASSWORD */}
//             <div className="relative">
//               <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 placeholder="Password"
//                 onChange={handleChange}
//                 className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* BUTTON */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition"
//             >
//               {loading ? "Creating..." : "Create Account"}
//             </button>
//           </form>

//           {/* LOGIN LINK */}
//           <p className="text-center text-gray-500">
//             Already have an account?{" "}
//             <Link href="/login" className="text-blue-600 font-bold">
//               Login
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
  AiOutlineUser,
  AiOutlineArrowLeft,
  AiOutlineCamera,
  AiFillStar,
} from "react-icons/ai";
import SocialLogin from "@/Component/Button/SocialLogin";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "", // প্রোফাইল ইমেজের জন্য
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Registration failed");
      }

      // অটো লগইন লজিক
      localStorage.setItem(
        "accessToken",
        result.data?.accessToken || result.accessToken,
      );
      localStorage.setItem(
        "refreshToken",
        result.data?.refreshToken || result.refreshToken,
      );

      window.location.href = "/";
    } catch (error: any) {
      setError(error.message || "❌ Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-gray-950 font-sans">
      {/* --- ১. বাম পাশ: Visual Branding (Login এর সাথে মিল রেখে) --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden lg:flex lg:w-1/2 relative bg-gray-900"
      >
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200"
          alt="Travel Adventure"
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
              Start Your <br />{" "}
              <span className="text-blue-400">Journey Today</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-sm font-light">
              Create an account and unlock exclusive travel deals and AI-powered
              itineraries.
            </p>
          </div>
          <p className="text-white/40 text-xs tracking-widest uppercase">
            © 2026 TravelAI Global
          </p>
        </div>
      </motion.div>

      {/* --- ২. ডান পাশ: Register Form --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 border border-gray-100 dark:border-gray-800"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              Join our community of world travelers.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* PROFILE IMAGE URL INPUT */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-2">
                Profile Image URL
              </label>
              <div className="relative">
                <AiOutlineCamera
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  placeholder="https://image-link.com"
                />
              </div>
            </div>

            {/* FULL NAME */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-2">
                Full Name
              </label>
              <div className="relative">
                <AiOutlineUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* EMAIL */}
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
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* PASSWORD */}
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
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98] disabled:opacity-50 mt-2"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Social Login Section */}
          <SocialLogin />

          <p className="text-center mt-8 text-sm text-gray-500 font-medium">
            Already have an account?
            <Link
              href="/login"
              className="text-blue-600 font-black hover:underline ml-1"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
