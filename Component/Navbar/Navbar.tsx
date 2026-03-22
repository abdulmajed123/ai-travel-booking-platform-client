// "use client";

// import Link from "next/link";
// import { useState } from "react";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   return (
//     <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="text-xl font-bold text-blue-600">
//           TravelAI
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6">
//           <Link href="/" className="hover:text-blue-500">
//             Home
//           </Link>
//           <Link href="/explore" className="hover:text-blue-500">
//             Explore
//           </Link>

//           {/* Dropdown */}
//           <div className="relative group">
//             <button className="hover:text-blue-500">Services ▾</button>
//             <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-md mt-2 rounded-md w-40">
//               <Link
//                 href="/flights"
//                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 Flights
//               </Link>
//               <Link
//                 href="/hotels"
//                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 Hotels
//               </Link>
//               <Link
//                 href="/tours"
//                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 Tours
//               </Link>
//             </div>
//           </div>

//           <Link href="/about" className="hover:text-blue-500">
//             About
//           </Link>
//           <Link href="/contact" className="hover:text-blue-500">
//             Contact
//           </Link>
//         </div>

//         {/* Right Side */}
//         <div className="hidden md:flex items-center gap-4">
//           {/* <Link
//             href="/login"
//             className="px-4 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             Login
//           </Link> */}

//           {/* Profile */}
//           <div className="relative">
//             <button
//               onClick={() => setProfileOpen(!profileOpen)}
//               className="w-8 h-8 rounded-full bg-gray-300"
//             ></button>

//             {profileOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-md rounded-md">
//                 <Link
//                   href="/dashboard"
//                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   href="/profile"
//                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   Profile
//                 </Link>
//                 <Link
//                   href={"/login"}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   Login
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Button */}
//         <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
//           ☰
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900">
//           <Link href="/" className="block">
//             Home
//           </Link>
//           <Link href="/explore" className="block">
//             Explore
//           </Link>
//           <Link href="/about" className="block">
//             About
//           </Link>
//           <Link href="/contact" className="block">
//             Contact
//           </Link>
//           <Link href="/login" className="block">
//             Login
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import { AiOutlineMenu, AiOutlineClose, AiOutlineUser } from "react-icons/ai";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const pathname = usePathname(); // বর্তমান পাথ জানার জন্য

//   // নেভবার লিংকগুলো (সহজেই ম্যানেজ করার জন্য)
//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Explore", href: "/explore" },
//     { name: "About", href: "/about" },
//     { name: "Contact", href: "/contact" },
//   ];

//   // একটিভ লিংক স্টাইল করার ফাংশন
//   const isActive = (path: string) => pathname === path;

//   return (
//     <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Logo */}
//         <Link
//           href="/"
//           className="text-2xl font-black text-blue-600 italic tracking-tighter"
//         >
//           Trvl
//           <span className="text-gray-900 dark:text-white font-bold">AI</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-8">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`text-sm font-semibold transition-colors hover:text-blue-600 ${
//                 isActive(link.href)
//                   ? "text-blue-600"
//                   : "text-gray-600 dark:text-gray-300"
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {/* Advanced Dropdown Menu (Services) */}
//           <div className="relative group cursor-pointer">
//             <button
//               className={`text-sm font-semibold flex items-center gap-1 hover:text-blue-600 ${
//                 pathname.includes("/services")
//                   ? "text-blue-600"
//                   : "text-gray-600 dark:text-gray-300"
//               }`}
//             >
//               Services <span className="text-[10px]">▼</span>
//             </button>
//             <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-xl mt-0 pt-4 rounded-xl w-48 border border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-top-2">
//               <Link
//                 href="/flights"
//                 className="block px-5 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-all"
//               >
//                 Flights
//               </Link>
//               <Link
//                 href="/hotels"
//                 className="block px-5 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-all"
//               >
//                 Hotels
//               </Link>
//               <Link
//                 href="/tours"
//                 className="block px-5 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-all rounded-b-xl"
//               >
//                 Tour Packages
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Right Side (Profile & Theme) */}
//         <div className="hidden md:flex items-center gap-5">
//           <div className="relative">
//             <button
//               onClick={() => setProfileOpen(!profileOpen)}
//               className="flex items-center gap-2 p-1 pr-3 border border-gray-200 dark:border-gray-700 rounded-full hover:shadow-md transition-all"
//             >
//               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
//                 <AiOutlineUser size={20} />
//               </div>
//               <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
//                 Account
//               </span>
//             </button>

//             {profileOpen && (
//               <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
//                 <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
//                   <p className="text-xs text-gray-500">Welcome back!</p>
//                   <p className="text-sm font-bold text-gray-900 dark:text-white">
//                     Guest User
//                   </p>
//                 </div>
//                 <Link
//                   href="/dashboard"
//                   className="block px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   href="/profile"
//                   className="block px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   My Profile
//                 </Link>
//                 <Link
//                   href="/login"
//                   className="block px-4 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors border-t border-gray-100 dark:border-gray-700"
//                 >
//                   Login / Signup
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Button */}
//         <button
//           className="md:hidden text-gray-700 dark:text-white"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? (
//             <AiOutlineClose size={24} />
//           ) : (
//             <AiOutlineMenu size={24} />
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden p-4 space-y-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-right">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={() => setMenuOpen(false)}
//               className={`block py-2 font-medium ${isActive(link.href) ? "text-blue-600" : "text-gray-600 dark:text-gray-300"}`}
//             >
//               {link.name}
//             </Link>
//           ))}
//           <Link
//             href="/login"
//             onClick={() => setMenuOpen(false)}
//             className="block py-3 px-4 bg-blue-600 text-white rounded-xl text-center font-bold"
//           >
//             Login
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname(); // ✅ current path

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          TravelAI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`hover:text-blue-500 ${
              isActive("/") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/explore"
            className={`hover:text-blue-500 ${
              isActive("/explore") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Explore
          </Link>

          <Link
            href="/about"
            className={`hover:text-blue-500 ${
              isActive("/about") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`hover:text-blue-500 ${
              isActive("/contact") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-8 h-8 rounded-full bg-gray-300"
            ></button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-md rounded-md">
                <Link
                  href="/dashboard"
                  className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isActive("/dashboard") ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isActive("/profile") ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                >
                  Profile
                </Link>
                <Link
                  href="/login"
                  className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isActive("/login") ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900">
          <Link
            href="/"
            className={`${isActive("/") ? "text-blue-600 font-semibold" : ""} block`}
          >
            Home
          </Link>
          <Link
            href="/explore"
            className={`${isActive("/explore") ? "text-blue-600 font-semibold" : ""} block`}
          >
            Explore
          </Link>
          <Link
            href="/about"
            className={`${isActive("/about") ? "text-blue-600 font-semibold" : ""} block`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`${isActive("/contact") ? "text-blue-600 font-semibold" : ""} block`}
          >
            Contact
          </Link>
          <Link
            href="/login"
            className={`${isActive("/login") ? "text-blue-600 font-semibold" : ""} block`}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
