import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-800 border-t border-gray-300 mt-auto">
      <div className="container mx-auto py-6 px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-start gap-6 pb-6 border-b border-gray-300">
          {/* About Section */}
          <div className="w-full md:w-1/4">
            <h4 className="text-md font-semibold text-gray-400 uppercase mb-3">
              About Us
            </h4>
            <p className="text-gray-200 text-sm leading-relaxed">
              Example.bd is dedicated to providing exceptional service and
              creating meaningful experiences for our users.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4">
            <h4 className="text-md font-semibold text-gray-400 uppercase mb-3">
              Quick Links
            </h4>
            <ul className="space-y-1">
              <li>
                <a
                  href="#about"
                  className="text-gray-200 hover:text-green-500 transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-200 hover:text-green-500 transition"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-200 hover:text-green-500 transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-1/4">
            <h4 className="text-md font-semibold text-gray-400 uppercase mb-3">
              Newsletter
            </h4>
            <form className="flex flex-col">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-1.5 border border-gray-300 rounded-md focus:ring focus:ring-green-300 mb-2 text-sm"
              />
              <button
                type="submit"
                className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-wrap items-center justify-between pt-4">
          <p className="text-gray-200 text-sm">
            &copy; 2024 Example.bd. All rights reserved.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-3">
            <a
              href="#"
              className="text-gray-600 hover:text-green-500 text-base transition"
            >
              <FaFacebookF size={24}/>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-green-500 text-base transition"
            >
              <FaTwitter size={24}/>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-green-500 text-base transition"
            >
              <FaInstagram size={24}/>
            </a>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={scrollToTop}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
