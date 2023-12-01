import React from "react";
import logo from '../images/Logo.png';

function Footer() {
  return (
    <footer className=" bg-crimson bg-opacity-90 hover:opacity-90 text-white p-8 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
      <div className="container mx-auto flex flex-wrap justify-between ">
        {/* First Section: Company Image and Description */}
        <img src={logo} alt="Company Logo" width="150" height="70" />
        <div className="mb-6 md:mb-0 w-full md:w-1/4">
          
          <p className="text-center">
          CollabHub - Unite, Communicate, Achieve
          </p>
          
        </div>

        {/* Second Section: Company Address and Phone Number */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>
            123 Example Street, <br />
            City, State 12345 <br />
            Phone: +91 8159426548
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
              <a href="/contact">Contact</a>
            </li>
            <li>
            <a href="/chat" >ChatS Space</a>
            </li>
          </ul>
        </div>

        {/* Fourth Section: Social Media Links */}
        <div className="flex flex-col space-y-3 md:flex-row md:space-x-4">
  <a
    href="https://www.youtube.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center"
  >
    <img src="youtube-icon.png" alt="YouTube" className="w-6 h-6" />
    <span className="ml-2">YouTube</span>
  </a>

  <a
    href="https://www.instagram.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center"
  >
    <img src="instagram-icon.png" alt="Instagram" className="w-6 h-6" />
    <span className="ml-2">Instagram</span>
  </a>

  <a
    href="https://www.linkedin.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center"
  >
    <img src="linkedin-icon.png" alt="LinkedIn" className="w-6 h-6" />
    <span className="ml-2">LinkedIn</span>
  </a>

  <a href="mailto:info@example.com" className="flex items-center">
    <img src="email-icon.png" alt="Email" className="w-6 h-6" />
    <span className="ml-2">Email</span>
  </a>
</div>

      </div>
    </footer>
  );
}

export default Footer;
