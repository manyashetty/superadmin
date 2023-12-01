import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import emailjs from 'emailjs-com';
import Cookies from "js-cookie";
import { jwtDecode, InvalidTokenError } from "jwt-decode";

const ContactPage = () => {
  const accessToken = Cookies.get("accessToken");
  let userRole = "user";
  // Decode the access token to get user information
  try {
    const decodedToken = jwtDecode(accessToken);
    userRole = decodedToken.role || userRole;
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      console.error("Invalid access token:", error);
    }
  }
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showForm, setShowForm] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using EmailJS
    emailjs.send(
      'service_wv4j43r',
      'template_mk21ele',
      formData,
      'Xk3prhiHrIJBBgwIK'
    )
    .then((response) => {
      alert("Email sent Successfully");
      console.log('Email sent successfully', response);
    })
    .catch((error) => {
      console.error('Email sending failed', error);
    });
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };
  useEffect(() => {
    // Fetch contact form data from your API endpoint
    axios
      .get("http://localhost:4000/contacts", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setContacts(response.data.form);
      })
      .catch((error) => {
        console.error("Error fetching contact data: ", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="max-w-md mx-auto mt-10 p-6 bg-crimson rounded-xl shadow-black shadow-lg mt-10 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-white">Contact Us</h2>
          {showForm ? (
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-white"
              >
                Submit
              </button>
            </form>
          ) : (
            <p className="text-white">Thank you for your submission!</p>
          )}
        </div>
      </div>

      {userRole === "admin" && (
      <div className="flex flex-wrap">
        {contacts.map((contact, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div className="bg-gradient-to-r from-red-100 to-red-400 shadow-black shadow-lg rounded p-4">
              <h2 className="text-xl font-semibold">{contact.name}</h2>
              <p className="text-gray-500 mb-2">{contact.email}</p>
              <p className="text-gray-700">{contact.message}</p>
            </div>
          </div>
        ))}
        
      </div>
      )}
      <Footer />
    </>
  );
};

export default ContactPage;
