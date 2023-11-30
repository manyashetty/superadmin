import React from "react";
import logo from "../images/logo.png"

function Footer() {
  return (
    <footer className=" bg-crimson bg-opacity-90 hover:opacity-90 text-white p-8 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
      <div className="container mx-auto flex flex-wrap justify-between ">
        {/* First Section: Company Image and Description */}
        <div className="mb-6 md:mb-0 w-full md:w-1/4">
          <img
            src={logo}
            alt="Company Image"
            className="w-40 h-40 rounded-lg mb-4"
          />
          
          <p className="text-center">
            We are a leading company dedicated to providing high-quality
            services and products.
          </p>
          
        </div>

        {/* Second Section: Company Address and Phone Number */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>
            123 Example Street, <br />
            City, State 12345 <br />
            Phone: (123) 456-7890
          </p>
        </div>

        {/* Third Section: Navigation Links */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Fourth Section: Social Media Links */}
        <div className="w-full md:w-1/4 flex flex-col ">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="space-y-3">
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center">
                <img src="youtube-icon.png" alt="YouTube" className="w-6 h-6" />
                <span className="mr-2">YouTube</span>
              </div>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center">
                <img
                  src="instagram-icon.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
                <span className="mr-2">Instagram</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center">
                <img
                  src="linkedin-icon.png"
                  alt="LinkedIn"
                  className="w-6 h-6"
                />
                <span className="mr-2">LinkedIn</span>
              </div>
            </a>

            <a href="mailto:info@example.com">
              <div className="flex items-center">
                <img src="email-icon.png" alt="Email" className="w-6 h-6" />
                <span className="mr-2">email</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
