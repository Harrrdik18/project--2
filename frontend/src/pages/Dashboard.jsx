import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/projects");
      if (response.data.success) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/projects", { name: projectName });
      if (response.data.success) {
        setProjects([response.data.project, ...projects]);
        setShowModal(false);
        setProjectName("");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Failed to create project");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
      }
    }
    return "just now";
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] p-6">
      <nav className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <img
            src="/assets/logo-purple.png"
            alt="Ques.AI Logo"
            className="h-8"
          />
          <h1 className="text-[#7E22CE] text-2xl font-bold">Ques.AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="">
            <img src="/assets/setting.png" alt="Settings" className="w-6 h-6" />
          </div>
          <div className=" ">
            <img
              src="/assets/notifications.png"
              alt="Notifications"
              className="w-6 h-6"
            />
          </div>
        </div>
      </nav>

      {projects.length > 0 ? (
        <div className="max-w-6xl mx-auto mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-800">Projects</h2>
            <div className="ml-auto">
              <button
                onClick={() => setShowModal(true)}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Create New Project
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
                onClick={() => navigate(`/project/${project._id}`)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-400 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">
                      {project.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#1C1C1C] mb-0.5">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-0.5">
                      {project.fileCount || 0} Files
                    </p>
                    <p className="text-sm text-gray-400">
                      Last edited{" "}
                      {getTimeAgo(project.updatedAt || project.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
          <h2 className="text-4xl text-purple-700 font-bold mb-8">
            Create New Project
          </h2>
          <img
            src="/assets/Dashboard.png"
            alt="People discussing"
            className="h-45 mb-8"
          />
          <p className="text-gray-600 text-center mb-8 max-w-lg">
            Start your journey by creating your first project. Click the button
            below to begin.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Create New Project
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Create New Project</h3>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleCreateProject}>
              <div>
                <label className="block text-gray-700 mb-2">
                  Enter Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Project name"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setError("");
                    setProjectName("");
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
