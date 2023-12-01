// import React, { useState } from "react";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import logo from "../images/logo.png"

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const accessToken = Cookies.get("accessToken");
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   const handleLogout = () => {
//     // Delete the accessToken cookie
//     Cookies.remove("accessToken");

//     // Navigate to the login page
//     navigate("/login");
//   };

//   return (
//     <header className="top-0 left-0 right-0 z-50 bg-crimson  hover:opacity-80 text-white p-2 flex items-center w-screen h-20 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none rounded-b">
//       <div className="container mx-auto flex justify-between items-center">
//       <div className="flex items-center space-x-4">
//           <img src={logo} alt="Company Logo" width="90" height="70" />{/* Use your image here */}
//         </div>
//         <button
//           className="sm:hidden text-white hover:text-gray-200"
//           onClick={toggleMenu}
//           aria-label="Toggle Menu"
//         >
//           {isMenuOpen ? (
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           ) : (
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           )}
//         </button>
//       </div>
//       {isMenuOpen && (
//         <div className="fixed top-0 left-0 w-full h-screen bg-crimson text-white text-center pt-20 ">
//           <button
//             className="text-xl hover:text-gray-200 absolute top-4 left-4"
//             onClick={closeMenu}
//             aria-label="Close Menu"
//           >
//             &#8599;
//           </button>
//           <ul className="space-y-4 z-50 ">
//             <li>
//               <a
//                 className="text-white text-3xl hover:text-gray-200 hover:underline font-serif"
//                 href="/"
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 className="text-3xl hover:text-gray-200 hover:underline font-serif"
//                 href="/projects"
//                 onClick={closeMenu}
//               >
//                 Projects
//               </a>
//             </li>
            

//             <li>
//               <a
//                 className="text-3xl hover:text-gray-200 hover:underline font-serif"
//                 href="/feeds"
//               >
//                 Feeds
//               </a>
//             </li>

//             <li>
//               <a
//                 className="text-3xl hover:text-gray-200 hover:underline font-serif"
//                 href="/contacts"
//               >
//                 Contact
//               </a>
//             </li>

//             {accessToken ? (
//               <li>
//                 <button
//                   className="text-3xl bg-white text-crimson hover:text-gray-200 hover:underline font-serif"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </li>
//             ) : (
//               <>
//                 <li>
//                   <a
//                     className="bg-white  hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
//                     href="/login"
//                   >
//                     Login
//                   </a>
//                 </li>
//                 <li>
//                 <a className="bg-white  hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
//                 href="/chat">Chat</a>
//                 </li>
//                 <li>
//                   <a
//                     className="bg-white hover:bg-cyan-600  text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
//                     href="/register"
//                   >
//                     Register
//                   </a>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       )}
//       <ul className={`hidden sm:flex space-x-4 mt`}>
//         <li>
//           <a
//             className="text-white hover:text-gray-200 hover:underline font-serif"
//             href="/"
//           >
//             Home
//           </a>
//         </li>
//         <li>
//           <a
//             className="text-white hover:text-gray-200 hover:underline font-serif"
//             href="/projects"
//           >
//             Projects
//           </a>
//         </li>
        
//         <li>
//           <a
//             className="text-white hover:text-gray-200 hover:underline font-serif"
//             href="/feeds"
//           >
//             Feeds
//           </a>
//         </li>
//         <li>
//           <a
//             className="text-white hover:text-gray-200 hover:underline font-serif"
//             href="/contacts"
//           >
//             Contact
//           </a>
//         </li>
//         {accessToken ? (
//           <li>
//             <button
//               className="bg-white hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </li>
//         ) : (
//           <>
//             <li>
//               <a
//                 className="bg-white  hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
//                 href="/login"
//               >
//                 Login
//               </a>
//             </li>
//             <li>
//                 <a className="bg-white  hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
//                 href="/chat">Chat</a>
//                 </li>
//             <li>
//               <a
//                 className="bg-white hover:bg-cyan-600  text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
//                 href="/register"
//               >
//                 Register
//               </a>
//             </li>
//           </>
//         )}
//       </ul>
//     </header>
//   );
// }

// export default Navbar;








import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Delete the accessToken cookie
    Cookies.remove("accessToken");

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <header className="top-0 left-0 right-0 z-50 bg-crimson  hover:opacity-80 text-white p-2 flex items-center w-screen h-20 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none rounded-b">
      <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">{/* Use your image here */}
      <img src={logo} alt="Company Logo" width="90" height="70" />
      <h1>CollabHub</h1>
        </div>
        <button
          className="sm:hidden text-white hover:text-gray-200"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-crimson text-white text-center pt-20 ">
          <button
            className="text-xl hover:text-gray-200 absolute top-4 left-4"
            onClick={closeMenu}
            aria-label="Close Menu"
          >
            &#8599;
          </button>
          <ul className="space-y-4 z-50 ">
            <li>
              <a
                className="text-white text-3xl hover:text-gray-200 hover:underline font-serif"
                href="/"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="text-3xl hover:text-gray-200 hover:underline font-serif"
                href="/projects"
                onClick={closeMenu}
              >
                Projects
              </a>
            </li>
            

            

            <li>
              <a
                className="text-3xl hover:text-gray-200 hover:underline font-serif"
                href="/contacts"
              >
                Contact
              </a>
            </li>

            {accessToken ? (
              <li>
                <button
                  className="text-3xl bg-white text-crimson hover:text-gray-200 hover:underline font-serif"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <a
                    className="bg-white  hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
                    href="/login"
                  >
                    Login
                  </a>
                </li>
                <li>
                <a className="bg-white  hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
                href="/chat">Chat</a>
                </li>
                <li>
                  <a
                    className="bg-white hover:bg-cyan-600  text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
                    href="/register"
                  >
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
      <ul className={`hidden sm:flex space-x-4 mt`}>
        <li>
          <a
            className="text-white hover:text-gray-200 hover:underline font-serif"
            href="/"
          >
            Home
          </a>
        </li>
        <li>
          <a
            className="text-white hover:text-gray-200 hover:underline font-serif"
            href="/projects"
          >
            Projects
          </a>
        </li>
        
        
        <li>
          <a
            className="text-white hover:text-gray-200 hover:underline font-serif"
            href="/contacts"
          >
            Contact
          </a>
        </li>
        {accessToken ? (
          <li>
            <button
              className="bg-white hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <a
                className="bg-white  hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
                href="/login"
              >
                Login
              </a>
            </li>
            <li>
            <a className="bg-white  hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
            href="/chat">Chat</a>
            </li>
            <li>
              <a
                className="bg-white hover:bg-cyan-600  text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
                href="/register"
              >
                Register
              </a>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Navbar;