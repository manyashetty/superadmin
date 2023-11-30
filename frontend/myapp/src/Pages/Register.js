
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ar from "../images/ar.png"
import { Link } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    gender: "",
    email_id: "",
    password: "",
    profile_pic: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate= useNavigate()

  // Handle changes in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input for profile picture
  // const handleFileChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     profile_pic: e.target.files[0],
  //   });
  // };

  const handleSubmit = async (e) => {
    // Set isLoading to true to show the loader
    setIsLoading(true);
    e.preventDefault();

    // Create a FormData object to handle file uploads
    // const formDataToSend = new FormData();
    // formDataToSend.append("name", formData.name);
    // formDataToSend.append("phone_number", formData.phone_number);
    // formDataToSend.append("gender", formData.gender);
    // formDataToSend.append("email_id", formData.email_id);
    // formDataToSend.append("password", formData.password);
    // formDataToSend.append("profile_pic", formData.profile_pic);

    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        formData
      );
      // Handle the response as needed (e.g., show success message or redirect)
      console.log("Registration successful:", response.data);
      alert("User registered successfully");
      navigate("/login")
    } catch (error) {
      console.error("Registration failed:", error);

      
    }
    finally {
      // Set isLoading back to false, whether the operation succeeds or fails
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen bg-gradient-to-r from-red-100 to-red-400 flex items-center justify-center  ">
        {/* Display the image above the form on mobile view */}
        <img
          src={ar}
          alt="nothing"
          className="hidden md:block max-w-7xl mb-6"
          
        />
        <div className="bg-crimson p-10 rounded-xl shadow-black shadow-lg md:w-96 md:mb-5 lg:w-1/3 w-full mb-6 mt-15 m-5">
          <h2 className="text-2xl font-bold mb-4 text-white">Register</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium  text-white">
              Name
            </label>
            <div className="flex flex-col md:flex-row">
              <input
                type="text"
                className="mt-1 p-2 w-full  mb-2 md:mr-2 border shadow-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium  text-white">
              Phone Number
            </label>
            <input
              type="tel"
              className="mt-1 p-2 w-full border shadow-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Your phone number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium  text-white">
              Gender
            </label>
            <select
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select your gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 p-2 w-full border shadow-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Your email address"
              name="email_id"
              value={formData.email_id}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full border shadow-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Your secure password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Profile Picture (Link)
            </label>
            <input
              type="text"
              
              className="mt-1 p-2 w-full border shadow-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Link to your profile picture"
              name="profile_pic"
              value={formData.profile_pic}
               onChange={handleInputChange}
            />
          </div>
         
          <div className="flex items-center justify-between mt-6">
            <button
              className="bg-white  text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>

          <p className="text-center mt-4 text-sm text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-white">
              Log In
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Registration;

