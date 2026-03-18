"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    alert("Login Successful (demo)");
  };

  const handleDemoLogin = () => {
    setValue("email", "user@example.com");
    setValue("password", "123456");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-lg grid md:grid-cols-2 overflow-hidden">
        {/* Left Side (Image / Info) */}
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white p-8">
          <h2 className="text-3xl font-bold">Welcome Back 👋</h2>
          <p className="mt-3 text-center text-sm">
            Login to explore amazing destinations and plan your next trip with
            AI.
          </p>
        </div>

        {/* Right Side (Form) */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
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
                {...register("password", { required: "Password is required" })}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            {/* Demo Login */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full border py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Demo Login
            </button>

            {/* Register Link */}
            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
