import React, { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    // Fetch project data from your API endpoint
    Axios.get("http://localhost:4000/projects", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

      .then((response) => {
        setProjects(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <div className="md:mt-0  ">
      <h2 className="text-3xl font-bold  mb-6 mt-10 font-tech text-center text-crimson">
        SOME OF MY PROJECTS
      </h2>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-crimson bg-opacity-70 p-4 rounded-xl shadow-black shadow-lg hover:shadow-lg transition-transform transform hover:scale-105 hover:border-gray-900 border-2 border-transparent cursor-pointer"
          >
            <img
              src={project.project_image}
              alt={project.project_name}
              className="object-cover w-full h-40 rounded-md mb-4"
            />
            <h2 className="text-xl text-white font-semibold mb-2">
              {project.project_name}
            </h2>
            <p className="text-white-600 mb-4 text-white">
              {project.project_description}
            </p>
          </div>
        ))}
          
      </div>
    
    </div>
  );
};

export default Projects;
