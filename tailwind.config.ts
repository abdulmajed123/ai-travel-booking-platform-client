import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // এটি নিশ্চিত করুন
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Component/**/*.{js,ts,jsx,tsx,mdx}", // এখানে 'C' বড় হাতের দিন
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // নিরাপত্তার জন্য এটিও রাখুন
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
