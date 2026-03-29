"use client";

import NavbarLogo from "@/app/(main)/NavbarLogo/NavbarLogo";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* ✈️ Brand Section */}
          <div className="space-y-6">
            <NavbarLogo></NavbarLogo>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              আপনার ভ্রমণকে আরও সহজ এবং আনন্দদায়ক করতে আমাদের AI অ্যাসিস্ট্যান্ট
              সবসময় আপনার পাশে আছে। সেরা ডিল এবং গাইড পান আমাদের সাথে।
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FaFacebookF, href: "#" },
                { Icon: FaTwitter, href: "#" },
                { Icon: FaInstagram, href: "#" },
                { Icon: FaLinkedinIn, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300 shadow-sm"
                >
                  <social.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* 🔗 Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {["Home", "Explore", "About Us", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 bg-gray-300 dark:bg-gray-700 rounded-full group-hover:w-3 group-hover:bg-blue-600 transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 🛠 Services */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Flight Booking", path: "" },
                { name: "Hotel Booking", path: "/" },
                { name: "Tour Packages", path: "/" },
                { name: "AI Assistant", path: "/" },
              ].map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.path}
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 📩 Contact & Newsletter */}
          <div className="space-y-6">
            <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <HiOutlineMail size={20} className="text-blue-600" />
                <span>abdulmajed5618@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <HiOutlinePhone size={20} className="text-blue-600" />
                <span>+880 1893505618</span>
              </div>
              <div className="flex items-start gap-3 text-gray-500 dark:text-gray-400">
                <HiOutlineLocationMarker
                  size={20}
                  className="text-blue-600 shrink-0"
                />
                <span>Jamalpur, Mymensingh, Bangladesh</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="relative mt-6">
              <input
                type="email"
                placeholder="Your email..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
              />
              <button className="absolute right-2 top-1.5 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                <FaPaperPlane size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 📜 Bottom Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            © {currentYear}{" "}
            <span className="font-semibold text-gray-600 dark:text-gray-300">
              TravelAI
            </span>
            . All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400 font-medium">
            <Link
              href="/privacy"
              className="hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
