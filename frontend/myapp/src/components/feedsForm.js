import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import logo from "../images/logo.png"

const accessToken = Cookies.get("accessToken");

const FeedForm = () => {
  const [formData, setFormData] = useState({
    image: null,
    description: "",
  });
  const { feedId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const fetchData = async () => {
    try {
      const response1 = await axios.get(
        `http://localhost:4000/feeds?feedId=${feedId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const existingfeedData = response1.data.data;
      setFormData(existingfeedData);
    } catch (error) {
      console.error("Error fetching feed data:", error);
    }
  };

  useEffect(() => {
    if (feedId) {
      fetchData();
    }
  }, [feedId]);

  const handleChange = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set isLoading to true to show the loader
    setIsLoading(true);

    try {
      const formDataForSubmit = new FormData();
      formDataForSubmit.append("image", formData.image);
      formDataForSubmit.append("description", formData.description);

      if (feedId) {
        const response = await axios.put(
          `http://localhost:4000/feeds?id=${feedId}`,
          formDataForSubmit
        );

        const updatedFeed = response.data.data;
        alert("Updated successfully");
        navigate("/feeds");
      } else {
        await axios.post("http://localhost:4000/feeds", formDataForSubmit, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("Feeds submitted successfully");
        alert("Feeds submitted successfully");
      }
    } catch (error) {
      console.error("Error submitting Feeds:", error);
    } finally {
      // Set isLoading back to false, whether the operation succeeds or fails
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white h-screen flex flex-col justify-center items-center">
        <div className="bg-white rounded-full h-20 w-80 flex items-center justify-center mb-8">
        <img
            src={logo}
            alt="Company Image"
            className="w-40 h-40 rounded-lg mb-4"
          />
        </div>
        <h1 className="text-4xl font-bold text-white mb-8">
          Create a new Feed
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-crimson p-8 rounded-md max-w-xl w-full md:w-3/4 lg:w-1/2 xl:w-3/4"
        >
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-white"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mt-4">
            {isLoading ? (
              <div className="text-center mt-4">
                <div className="inline-block animate-spin ease-linear rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <button
                className="bg-white text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
                onClick={handleSubmit}
              >
                {feedId ? "Update" : "Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default FeedForm;
