// import React from "react";
// import { FcGoogle } from "react-icons/fc"; // এটি ব্যবহার করতে `npm install react-icons` দিন

// const SocialLogin = () => {
//   const handleGoogleLogin = () => {
//     // আপনার ব্যাকএন্ডের বেস URL অনুযায়ী এটি পরিবর্তন করুন
//     const backendUrl = "http://localhost:5000/api/v1/auth/google";

//     // ইউজারকে সরাসরি ব্যাকএন্ডের গুগল লগইন রাউটে পাঠিয়ে দিবে
//     window.location.href = backendUrl;
//   };

//   return (
//     <div className="flex flex-col items-center justify-center gap-4 p-4">
//       <p className="text-gray-600">Or continue with</p>

//       <button
//         onClick={handleGoogleLogin}
//         className="flex items-center justify-center gap-2 w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200 font-medium"
//       >
//         <FcGoogle className="text-2xl" />
//         <span>Login with Google</span>
//       </button>
//     </div>
//   );
// };

// export default SocialLogin;

"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/v1/auth/google";
  };

  return (
    <div className="w-full mt-6">
      <div className="flex items-center my-4">
        <div className="flex-1 border-t border-gray-100 dark:border-gray-800"></div>
        <span className="px-4 text-xs text-gray-400 font-bold uppercase">
          Or continue with
        </span>
        <div className="flex-1 border-t border-gray-100 dark:border-gray-800"></div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-3 w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-bold text-gray-700 dark:text-white"
      >
        <FcGoogle className="text-2xl" />
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
