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
//           "Content-Type": "application/json", // ✅ JSON
//         },
//         body: JSON.stringify(formData),
//       });

//       // 🔥 safe parsing
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

//       alert("✅ Registration Successful");
//       console.log(result);

//       // reset form
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//       });
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

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
//             >
//               {loading ? "Creating..." : "Create Account"}
//             </button>
//           </form>

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
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Server is not returning JSON");
      }

      if (!res.ok) {
        throw new Error(result.message || "Registration failed");
      }

      // 🔥 AUTO LOGIN
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);

      // 🔥 redirect home
      window.location.href = "/";
    } catch (error: any) {
      console.error(error);
      alert(error.message || "❌ Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-gray-950">
      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden lg:flex lg:w-1/2 relative bg-blue-900"
      >
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      </motion.div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-md w-full space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NAME */}
            <div className="relative">
              <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="relative">
              <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
                className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-bold">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
