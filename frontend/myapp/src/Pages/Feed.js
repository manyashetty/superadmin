// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";
// import Footer from "../components/Footer";

// import { useEffect } from "react";
// import Axios from "axios";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode, InvalidTokenError } from "jwt-decode";


// const FeedsPage = () => {
//   const [feeds, setFeeds] = useState([]);
//   const navigate = useNavigate();

//   const accessToken = Cookies.get("accessToken");
//   let userRole = "user"; 

//     // Decode the access token to get user information
//     try {
//       const decodedToken = jwtDecode(accessToken);
//       userRole = decodedToken.role || userRole;
//     } catch (error) {
//       if (error instanceof InvalidTokenError) {
//         // Handle the case where the token is invalid
//         console.error("Invalid access token:", error);
//         // You can add further error handling logic here if needed.
//       }
//     }

//   useEffect(() => {
//     getFeeds();
//   }, []);

//   const getFeeds = async () => {
//     try {
//       const response = await Axios.get("http://localhost:4000/feeds", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       const feedsData = response.data.data;
//       setFeeds(feedsData);
//     } catch (error) {
//       console.error("Error fetching Feeds:", error);
//     }
//   };

//   const handleDelete = async (feedId) => {
//     try {
//       const response = await Axios.delete(
//         `http://localhost:4000/feeds?id=${feedId}`
//       );
//       const deletedFeed = response.data.deleted_feed;
//       alert(" deleted successfully");
//       setFeeds(feeds.filter((feed) => feed._id !== feedId));
//     } catch (error) {
//       console.error("Error deleting project:", error);
//     }
//   };

//   const handleUpdateClick = (feedId) => {
//     const feedToUpdate = feeds.find((feed) => feed._id === feedId);

//     navigate(`/feeds/${feedId}/update`);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto bg-gradient-to-r from-red-100 to-red-400  bg-white p-10 h-screen">
//         <h1 className="text-3xl font-bold mb-4 text-center font-minimal text-white">MY FEEDS</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-9">
//           {feeds.map((feed) => (
//             <div
//               key={feed._id}
//               className="max-w-sm rounded overflow-hidden  shadow-black shadow-lg bg-crimson  transform hover:scale-105 transition-transform"
//             >
//               <img
//                 src={feed.image || "https://via.placeholder.com/300"}
//                 alt={feed.description}
//                 className="w-full h-60 object-cover"
//               />
//               <div className="px-6 py-4">
//                 <p className="text-base text-white">{feed.description}</p>
//               </div>
//               <div className="px-6 pt-4 pb-2"></div>
//               <div className="px-6 pt-4 pb-2 flex justify-between">
//               {userRole === "admin" && ( // Check userRole to conditionally render buttons
//                   <>
//                     <button
//                       onClick={() => handleUpdateClick(feed._id)}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
//                     >
//                       Update
//                     </button>
//                     <button
//                       onClick={() => handleDelete(feed._id)}
//                       className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//         {userRole === "admin" && ( // Check userRole to conditionally render the "Upload" button
//           <div className="flex justify-end mt-8">
//             <label htmlFor="image_input" className="cursor-pointer">
//               <Link to="/feedform">
//                 <button className="bg-crimson text-white font-bold rounded border-b-2 border-green-500 hover:border-green-900 hover:bg-green-900 hover:text-white shadow-md py-3 px-8 inline-flex items-center">
//                   <svg
//                     fill="#FFF"
//                     height="18"
//                     viewBox="0 0 24 24"
//                     width="24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M0 0h24v24H0z" fill="none" />
//                     <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
//                   </svg>
//                   <span className="ml-2">Upload</span>
//                 </button>
//               </Link>
//             </label>
//           </div>
//         )}
//       </div>
//       <Footer/>
//     </>
//   );
// };

// export default FeedsPage;

// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";

// import Axios from "axios";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode, InvalidTokenError } from "jwt-decode";

// const FeedsPage = () => {
//   const [feeds, setFeeds] = useState([]);
//   const navigate = useNavigate();

//   const accessToken = Cookies.get("accessToken");
//   let userRole = "user";

//   // Decode the access token to get user information
//   try {
//     const decodedToken = jwtDecode(accessToken);
//     userRole = decodedToken.role || userRole;
//   } catch (error) {
//     if (error instanceof InvalidTokenError) {
//       console.error("Invalid access token:", error);
//     }
//   }

//   useEffect(() => {
//     getFeeds();
//   }, []);

//   const getFeeds = async () => {
//     try {
//       const response = await Axios.get("http://localhost:4000/feeds", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       const feedsData = response.data.data;
//       setFeeds(feedsData);
//     } catch (error) {
//       console.error("Error fetching Feeds:", error);
//     }
//   };

//   const handleDelete = async (feedId) => {
//     try {
//       const response = await Axios.delete(
//         `http://localhost:4000/feeds?id=${feedId}`
//       );
//       const deletedFeed = response.data.deleted_feed;
//       alert(" deleted successfully");
//       setFeeds(feeds.filter((feed) => feed._id !== feedId));
//     } catch (error) {
//       console.error("Error deleting project:", error);
//     }
//   };

//   const handleUpdateClick = (feedId) => {
//     const feedToUpdate = feeds.find((feed) => feed._id === feedId);

//     navigate(`/feeds/${feedId}/update`);
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div className="container mx-auto bg-gradient-to-r from-red-100 to-red-400 bg-white p-10 flex-grow">
//         <h1 className="text-3xl font-bold mb-4 text-center font-minimal text-white">
//           MY FEEDS
//         </h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-9">
//           {feeds.map((feed) => (
//             <div
//               key={feed._id}
//               className="max-w-sm rounded overflow-hidden shadow-black shadow-lg bg-crimson transform hover:scale-105 transition-transform"
//             >
//               <img
//                 src={feed.image || "https://via.placeholder.com/300"}
//                 alt={feed.description}
//                 className="w-full h-60 object-cover"
//               />
//               <div className="px-6 py-4">
//                 <p className="text-base text-white">{feed.description}</p>
//               </div>
//               <div className="px-6 pt-4 pb-2"></div>
//               <div className="px-6 pt-4 pb-2 flex justify-between">
//                 {userRole === "admin" && (
//                   <>
//                     <button
//                       onClick={() => handleUpdateClick(feed._id)}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
//                     >
//                       Update
//                     </button>
//                     <button
//                       onClick={() => handleDelete(feed._id)}
//                       className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//         {userRole === "user" && (
//           <div className="flex justify-end mt-8">
//             <label htmlFor="image_input" className="cursor-pointer">
//               <Link to="/feedform">
//                 <button className="bg-crimson text-white font-bold rounded border-b-2 border-green-500 hover:border-green-900 hover:bg-green-900 hover:text-white shadow-md py-3 px-8 inline-flex items-center">
//                   <svg
//                     fill="#FFF"
//                     height="18"
//                     viewBox="0 0 24 24"
//                     width="24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M0 0h24v24H0z" fill="none" />
//                     <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
//                   </svg>
//                   <span className="ml-2">Upload</span>
//                 </button>
//               </Link>
//             </label>
//           </div>
//         )}
//       </div>
    
//     </div>
//   );
// };

// export default FeedsPage;

