
import React from 'react';
import Profile from '../components/Profile';
import Projects from '../components/Projects';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
const HomePage = () => {
  return (
    <>
    <div className="grid  grid-cols-12">
    <Navbar/>
      {/* Profile section */}
      <div className="col-span-full ">
        <Profile />
      </div>

     
      {/* <div className="col-span-full p-4 bg-cover bg-center bg-no-repeat h-96 flex items-center justify-center shadow-lg shadow-blue-500" style={{ backgroundImage: `url(${backgroundImg})` }}>

      </div> */}

      {/* Gradient background section */}
      <div className="col-span-full bg-white">
        {/* Projects section */}
        <div className="p-4">
          <div className="w-full md:w-2/3 mx-auto">
            <Projects />
          </div>
        </div>
      </div>

      
    </div>
    <Footer />
    </>
  );
};

export default HomePage;