// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import logo from "../images/logo.png";
// import Cookies from "js-cookie";

// const accessToken = Cookies.get("accessToken");

// const UserForm = () => {
//   const [formData, setFormData] = useState({
//     profile_pic: "",
//     name: "",
//     phone_number: "",
//     gender: "",
//     email_id: "",
//     role: "",
//   });
//   const { userId } = useParams(); // Assuming you have a route parameter for the user's ID
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const navigate = useNavigate();

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/user", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       const existingUserData = response.data.data;
//       setFormData(existingUserData);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchData();
//     }
//   }, [userId]);

//   const handleChange = (e) => {
//     const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
//     setFormData({ ...formData, [e.target.name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Set isLoading to true to show the loader
//     setIsLoading(true);

//     try {
//       const formDataForSubmit = new FormData();
//       formDataForSubmit.append("profile_pic", formData.profile_pic);
//       formDataForSubmit.append("name", formData.name);
//       formDataForSubmit.append("phone_number", formData.phone_number);
//       formDataForSubmit.append("gender", formData.gender);

//       const response = await axios.put(
//         `http://localhost:4000/users?id=${userId}`,
//         formDataForSubmit
//       );

//       alert("User data updated successfully");
//       navigate("/"); // Redirect to the user's profile
//     } catch (error) {
//       console.error("Error updating user data:", error);
//     } finally {
//       // Set isLoading back to false, whether the operation succeeds or fails
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="bg-gradient-to-r from-red-100 to-red-400 h-screen flex flex-col justify-center items-center">
//         {/* Circular component for company logo */}
//         <div className="bg-white rounded-full h-20 w-80 flex items-center justify-center mb-8">
//           <img
//             src={logo}
//             alt="Company Image"
//             className="w-40 h-40 rounded-lg mb-4"
//           />
//         </div>

//         {/* Heading */}
//         <h1 className="text-4xl font-bold text-crimson mb-8">
//           Edit User Profile
//         </h1>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-crimson p-8 rounded-md max-w-xl w-full md:w-3/4 lg:w-1/2 xl:w-3/4"
//         >
//           <div className="mb-4">
//             <label
//               htmlFor="profile_pic"
//               className="block text-sm font-medium text-white"
//             >
//                           Profile Picture (Link)

//             </label>
//             <input
//                 type="text"
//               id="profile_pic"
//               placeholder="Link to your profile picture"
//               name="profile_pic"
//               value={formData.profile_pic}
//               onChange={handleChange}
           
            
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-white"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="phone_number"
//               className="block text-sm font-medium text-white"
//             >
//               Phone Number
//             </label>
//             <input
//               type="text"
//               id="phone_number"
//               name="phone_number"
//               value={formData.phone_number}
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="gender"
//               className="block text-sm font-medium text-white"
//             >
//               Gender
//             </label>
//             <input
//               type="text"
//               id="gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="role"
//               className="block text-sm font-medium text-white"
//             >
//               Role
//             </label>
//             <input
//               type="text"
//               id="role"
//               name="role"
//               value={formData.role}
              
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//               required
//             />
//           </div>

//           <div className="mt-4">
//             {isLoading ? (
//               <div className="text-center mt-4">
//                 <div className="inline-block animate-spin ease-linear rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//                 <span className="sr-only">Loading...</span>
//               </div>
//             ) : (
//               <button
//                 className="bg-white hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
//                 onClick={handleSubmit}
//               >
//                 Update User
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default UserForm;


//------------------------------------------------------------------------------------------
// ... (Previous imports and other code)
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const accessToken = Cookies.get("accessToken");

const UserForm = () => {
  const [formData, setFormData] = useState({
    profile_pic: "",
    name: "",
    phone_number: "",
    gender: "",
    email_id: "",
    role: "",
  });
  const { userId } = useParams(); // Assuming you have a route parameter for the user's ID
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/users?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const existingUserData = response.data.data;
      setFormData(existingUserData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set isLoading to true to show the loader
    setIsLoading(true);

    try {
            const updatedUserData = {
              profile_pic: formData.profile_pic,
              name: formData.name,
              phone_number: formData.phone_number,
              gender: formData.gender,
              role: formData.role,
            };

      await axios.put(`http://localhost:4000/users?id=${userId}`, updatedUserData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert("User data updated successfully");
      navigate("/"); // Redirect to the user's profile
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      // Set isLoading back to false, whether the operation succeeds or fails
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-red-100 to-red-400 h-screen flex flex-col justify-center items-center">
        {/* Circular component for company logo */}
        

        {/* Heading */}
        <h1 className="text-4xl font-bold text-crimson mb-8">
          Edit User Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-crimson p-8 rounded-md max-w-xl w-full md:w-3/4 lg:w-1/2 xl:w-3/4"
        >
          {/* Profile Picture (URL) */}
          <div className="mb-4">
            <label
              htmlFor="profile_pic"
              className="block text-sm font-medium text-white"
            >
              Profile Picture (URL)
            </label>
            <input
              type="text"
              id="profile_pic"
              placeholder="Enter link to your profile picture"
              name="profile_pic"
              value={formData.profile_pic}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

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
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium text-white"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-white"
            >
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-white"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              
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
                type="submit"
                className="bg-white hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
              >
                Update User
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default UserForm;
