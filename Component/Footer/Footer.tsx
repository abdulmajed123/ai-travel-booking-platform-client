import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-bold text-blue-600">TravelAI</h2>
          <p className="mt-3 text-sm">
            Discover amazing destinations and book your dream trips بسهولة with
            AI-powered recommendations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/explore">Explore</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/flights">Flight Booking</Link>
            </li>
            <li>
              <Link href="/hotels">Hotel Booking</Link>
            </li>
            <li>
              <Link href="/tours">Tour Packages</Link>
            </li>
            <li>
              <Link href="/ai-assistant">AI Assistant</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@travelai.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>

          {/* Social */}
          <div className="flex gap-3 mt-4">
            <a href="#" className="hover:text-blue-500">
              Facebook
            </a>
            <a href="#" className="hover:text-blue-500">
              Twitter
            </a>
            <a href="#" className="hover:text-blue-500">
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 dark:border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} TravelAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
