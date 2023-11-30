// import React, { useEffect, useId, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import imageSm from "../images/imageSm.jpeg";
// import imageLg from "../images/imageLg.jpeg";
// import Cookies from "js-cookie";
// import { jwtDecode, InvalidTokenError } from "jwt-decode";

// const accessToken = Cookies.get("accessToken");

// const Profile = () => {
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate()
//   let userId = ""

//   // Decode the access token to get user information
//   try {
//     const decodedToken = jwtDecode(accessToken);
//      userId = decodedToken.user_id;
//   } catch (error) {
//     if (error instanceof InvalidTokenError) {
//       console.error("Invalid access token:", error);
//     }
//   }

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth < 768);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     console.log(accessToken);
//     axios
//       .get("https://web-app-s92f.onrender.com/user", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((response) => {
//         setUserData(response.data.data);
//         console.log(response.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data", error);
//       });
//   }, []);

//   const handleUpdateClick = (userId) => {
    
//     navigate(`/user/${userId}/update`);
//   };

//   return (
//     <div className="relative">
//       {isSmallScreen ? (
//         <img
//           className="mx-auto max-w-full h-auto"
//           style={{
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             zIndex: "-1",
//           }}
//           src={imageLg}
//           alt="imagLg"
//         />
//       ) : (
//         <img className="mx-auto w-full h-auto " src={imageSm} alt="imageSm" />
//       )}
//       <div
//         className={`${
//           isSmallScreen ? "text-center h-2/6" : "text-left"
//         } bg-gradient-to-r from-red-200 to-red-100 hover opacity-70 p-2 h-2/4 rounded-xl shadow-black shadow-lg max-w-md mx-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200 mt-20 ml-10 mr-5  absolute top-0 left-0 right-0 bottom-0 `}
//       >
//         {userData ? (
//           <div className="flex flex-col items-start ">
//             <div className="w-48 h-32 overflow-hidden rounded-full mr-4 mt-5 ml-5">
//               <img
//                 src={userData.profile_pic}
//                 alt="Profile"
//                 className="object-cover"
//               />
//             </div>
//             <div className="text-left">
//               <h2 className="text-2xl font-semibold mb-2 text-crimson">
//                 {userData.name}
//               </h2>
//               <p className="text-gray-300 mb-2 text-crimson">
//                 Contact: {userData.phone_number}
//               </p>
//               <p className="text-gray-300 mb-2 text-crimson">
//                 Gender: {userData.gender}
//               </p>
//               <p className="text-gray-300 mb-2 text-crimson">
//                 Email: {userData.email_id}
//               </p>
//               <p className="text-gray-300 mb-4 text-crimson">
//                 Role: {userData.role}
//               </p>
//             </div>
//             <button
//               onClick={() => handleUpdateClick(userId)}
//               className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2 relative bottom-3"
//             >
//               Update
//             </button>
//           </div>
//         ) : (
//           <p>Loading user data...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import imageSm from "../images/imageSm.jpeg";
import imageLg from "../images/imageLg.jpeg";
import Cookies from "js-cookie";
import { jwtDecode, InvalidTokenError } from "jwt-decode";

const accessToken = Cookies.get("accessToken");

const Profile = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  let userId = "";

  // Decode the access token to get user information
  try {
    const decodedToken = jwtDecode(accessToken);
    userId = decodedToken.user_id;
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      console.error("Invalid access token:", error);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(accessToken);
    axios
      .get("http://localhost:4000/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setUserData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, []);

  const handleUpdateClick = (userId) => {
    navigate(`/user/${userId}/update`);
  };

  return (
    <div className="relative">
      {isSmallScreen ? (
        <img
          className="mx-auto max-w-full h-auto"
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            zIndex: "-1",
          }}
          src={imageLg}
          alt="imagLg"
        />
      ) : (
        <img className="mx-auto w-full h-auto " src={imageSm} alt="imageSm" />
      )}
      <div
        className={`${
          isSmallScreen ? "text-center" : "text-left"
        } bg-gradient-to-r from-red-200 to-red-100 hover opacity-70 p-2 rounded-xl shadow-black shadow-lg max-w-md mx-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200 mt-20 ml-10 mr-5  absolute top-0 left-0 right-0`}
        style={{ maxHeight: "80vh", overflowY: "auto" }} // Added CSS
      >
        {userData ? (
          <div className="flex flex-col items-start ">
            <div className="w-48 h-32 overflow-hidden rounded-full mr-4 mt-5 ml-5">
              <img src={userData.profile_pic} alt="Profile" className="object-cover" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-semibold mb-2 text-crimson">
                {userData.name}
              </h2>
              <p className="text-gray-300 mb-2 text-crimson">
                Contact: {userData.phone_number}
              </p>
              <p className="text-gray-300 mb-2 text-crimson">
                Gender: {userData.gender}
              </p>
              <p className="text-gray-300 mb-2 text-crimson">
                Email: {userData.email_id}
              </p>
              <p className="text-gray-300 mb-4 text-crimson">
                Role: {userData.role}
              </p>
            </div>
            <button
              onClick={() => handleUpdateClick(userId)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2 relative bottom-3"
            >
              Update
            </button>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

