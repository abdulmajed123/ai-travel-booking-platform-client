"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>();

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    console.log(data);
    alert("Registration Successful (demo)");
  };

  const handleDemoUser = () => {
    setValue("name", "Demo User");
    setValue("email", "user@example.com");
    setValue("password", "123456");
    setValue("confirmPassword", "123456");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-lg grid md:grid-cols-2 overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white p-8">
          <h2 className="text-3xl font-bold">Join TravelAI ✈️</h2>
          <p className="mt-3 text-center text-sm">
            Create your account and start exploring the world with AI-powered
            travel planning.
          </p>
        </div>

        {/* Right Side (Form) */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Creating account..." : "Register"}
            </button>

            {/* Demo User */}
            <button
              type="button"
              onClick={handleDemoUser}
              className="w-full border py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Demo Fill
            </button>

            {/* Login Link */}
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
