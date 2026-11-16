
import React from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">

        {/* Brand */}
        <div>
          <Link to="/" className="mb-4 inline-flex items-center gap-2">
            <span className="rounded-xl bg-orange-500 p-2 text-white">
              <FiShoppingCart size={22} />
            </span>

            <span className="text-2xl font-bold text-white">
              Apna<span className="text-orange-500">Cart</span>
            </span>
          </Link>

          <p className="max-w-xs text-sm leading-7 text-slate-400">
            Your everyday shopping destination. Discover products that
            match your style and make shopping simple.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="transition hover:text-orange-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/collections" className="transition hover:text-orange-400">
                Collections
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition hover:text-orange-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition hover:text-orange-400">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Customer Service
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/orders" className="transition hover:text-orange-400">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/shipping-policy" className="transition hover:text-orange-400">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to="/return-policy" className="transition hover:text-orange-400">
                Return Policy
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="transition hover:text-orange-400">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Get in Touch
          </h3>

          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <FiMail className="mt-1 shrink-0 text-orange-400" />
              <a
                href="mailto:support@apnacart.com"
                className="break-all transition hover:text-orange-400"
              >
                support@apnacart.com
              </a>
            </li>

            <li className="flex items-start gap-3">
              <FiPhone className="mt-1 shrink-0 text-orange-400" />
              <span>Contact details coming soon</span>
            </li>

            <li className="flex items-start gap-3">
              <FiMapPin className="mt-1 shrink-0 text-orange-400" />
              <span>Online shopping across India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-xs text-slate-400 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} ApnaCart. All rights reserved.
          </p>

          <p>Made with care for your shopping experience.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
