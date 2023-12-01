import React from 'react';
import Profile from '../components/Profile';
import Projects from '../components/Projects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import img from '../images/pexels-fauxels-3183150.jpg';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-12">
        <div className="col-span-full">
          {/* Image within the content */}
          <img
            src={img}
            alt="img"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              maxWidth: '100%',
              marginBottom: '-5px', // Adjust this value as needed to avoid extra space
            }}
          />
        </div>

        <div className="col-span-full">
        <h3><a
                    className="bg-white  hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
                    href="/Profile"
                  >
               My Profile
                  </a></h3>
        </div>

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
