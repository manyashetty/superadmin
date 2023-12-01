
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode, InvalidTokenError } from "jwt-decode";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      const response = await Axios.get("http://localhost:4000/projects", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const projectsData = response.data.data;
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      const response = await Axios.delete(
        `http://localhost:4000/projects?id=${projectId}`
      );
      const deletedProject = response.data.deleted_project;
      alert(`${deletedProject.project_name} deleted successfully`);
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleUpdateClick = (projectId) => {
    const projectToUpdate = projects.find(
      (project) => project._id === projectId
    );

    navigate(`/projects/${projectId}/update`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-200 to-blue-700">
      <Navbar />
      <div className="container mx-auto bg-white p-10 bg-gradient-to-r from-blue-200 to-blue-700">
        <h1 className="text-3xl font-minimal font-bold mb-4 text-center text-white">
          PROJECTS
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-9">
          {projects.map((project) => (
            <div
              key={project._id}
              className="max-w-sm rounded-xl overflow-hidden shadow-black shadow-lg bg-crimson transform hover:scale-105 transition-transform"
            >
              <img
                src={project.project_image || "https://via.placeholder.com/300"}
                alt={project.project_name}
                className="w-full h-60 object-cover"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-white">
                  {project.project_name}
                </div>
                <p className="text-gray-700 text-base text-white">
                  {project.project_description}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2"></div>
              <div className="px-6 pt-4 pb-2 flex justify-between">
                {userRole === "admin" && (
                  <>
                    <button
                      onClick={() => handleUpdateClick(project._id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {userRole === "admin" && (
          <div className="flex justify-end mt-8">
            <label htmlFor="project_image_input" className="cursor-pointer">
              <Link to="/projectform">
                <button className="bg-crimson  text-white font-bold rounded border-b-2 border-green-500 hover:border-green-900 hover:bg-green-900 hover:text-white shadow-md py-3 px-8 inline-flex items-center">
                  <svg
                    fill="#FFF"
                    height="18"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                  </svg>
                  <span className="ml-2">Upload</span>
                </button>
              </Link>
            </label>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;

