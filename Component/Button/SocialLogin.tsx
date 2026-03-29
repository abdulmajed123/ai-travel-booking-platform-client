"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href =
      "https://ai-travel-booking-platform-server.onrender.com/api/v1/auth/google";
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
