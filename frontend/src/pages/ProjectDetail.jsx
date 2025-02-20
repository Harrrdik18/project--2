import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";

function ProjectDetail() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [files, setFiles] = useState([]);
  const [projectName, setProjectName] = useState("");
  const { projectId } = useParams();
  const navigate = useNavigate();

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  // Add useEffect to fetch files when component mounts
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`/projects/${projectId}/files`);
        if (response.data.success) {
          setFiles(response.data.files);
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [projectId]);

  // Update handleUpload function
  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      transcript: e.target.transcript.value,
    };

    try {
      const response = await axios.post(
        `/projects/${projectId}/files`,
        formData
      );

      if (response.data.success) {
        setFiles([response.data.file, ...files]);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.response?.data?.error || "Error uploading file");
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await axios.delete(`/projects/${projectId}/files/${fileId}`);
      setFiles(files.filter((file) => file._id !== fileId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Add this section after the Cards Grid
  const FilesSection = () => (
    <div className="mt-12">
      {files.length > 0 ? (
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Your Files</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="py-3 px-4 rounded-l-lg">No.</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Upload Date & Time</th>
                  <th className="py-3 px-4 rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={file._id} className="border-b border-gray-100">
                    <td className="py-4 px-4">{index + 1}</td>
                    <td className="py-4 px-4">
                      <input
                        type="text"
                        value={file.name}
                        onChange={(e) => {
                          const updatedFiles = [...files];
                          updatedFiles[index].name = e.target.value;
                          setFiles(updatedFiles);
                        }}
                        className="border-none focus:ring-0 p-0 bg-transparent"
                      />
                    </td>
                    <td className="py-4 px-4">
                      {new Date(file.createdAt).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            navigate(`/project/${projectId}/file/${file._id}`)
                          }
                          className="px-4 py-1 rounded border border-gray-300 hover:bg-gray-50"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(file._id)}
                          className="px-4 py-1 rounded border border-red-300 text-red-500 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            No Files Yet
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Get started by adding your first file. You can add files using RSS
            Feed, YouTube Video, or by uploading directly.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleOpenModal("upload")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <img src="/assets/upload.png" alt="Upload" className="w-5 h-5" />
              <span>Upload Files</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Add this near the top of the component with other functions
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#F5F6FA]">
      {/* Sidebar */}
      <div className="w-74 bg-white h-full flex flex-col ">
        {/* Logo */}
        <div className="p-4 order- flex items-center">
          <img src="/assets/logo-purple.png" alt="Ques.AI" className="h-8" />
          <h1 className="mx-2 font-bold text-purple-700 text-xl">
            Ques.<span className="font-normal">AI</span>
          </h1>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-4">
          <div className="space-y-2">
            <div className="px-4 py-2 bg-purple-50 text-purple-700 font-medium">
              <span className="flex items-center gap-2">
                <span className="text-lg">+</span>
                Add your Podcast(s)
              </span>
            </div>
            <div className="px-4 py-2 text-gray-600 hover:bg-gray-50">
              Create & Repurpose
            </div>
            <div className="px-4 py-2 text-gray-600 hover:bg-gray-50">
              Podcast Widget
            </div>
            <div className="px-4 py-2 text-gray-600 hover:bg-gray-50 border-b border-gray-200">
              Upgrade
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 space-y-4">
          <div className="px-4 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer">
            Help
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div 
              className="flex items-center gap-3 px-4 cursor-pointer hover:bg-gray-50 rounded-lg py-2"
              onClick={() => navigate('/account-settings')}
            >
              <img
                src="/assets/avatar.png"
                alt="User"
                className="w-8 h-8 rounded-lg"
              />
              <div>
                <div className="text-sm font-medium">Username</div>
                <div className="text-xs text-gray-500">username@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-gray-500">
            <span>Home Page</span>
            <span>/</span>
            <span>Sample Project</span>
            <span>/</span>
            <span className="text-purple-600">Add your podcast</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
              <img src="/assets/bell.png" alt="Notifications" className="w-6 h-6" />
            </div>
            <div 
              onClick={handleLogout}
              className="flex items-center gap-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <img src="/assets/logout.png" alt="Logout" className="w-6 h-6" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-8">Add Podcast</h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* RSS Feed Card */}
          <div
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleOpenModal("rss")}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">RSS Feed</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit. Dolor lorem sit.
                </p>
              </div>
              <img src="/assets/rss.png" alt="RSS" className="w-12 h-12" />
            </div>
          </div>

          {/* YouTube Video Card */}
          <div
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleOpenModal("youtube")}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">Youtube Video</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit. Dolor lorem sit.
                </p>
              </div>
              <img
                src="/assets/youtube.png"
                alt="YouTube"
                className="w-12 h-12"
              />
            </div>
          </div>

          {/* Upload Files Card */}
          <div
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleOpenModal("upload")}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">Upload Files</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit. Dolor lorem sit.
                </p>
              </div>
              <img
                src="/assets/upload.png"
                alt="Upload"
                className="w-12 h-12"
              />
            </div>
          </div>
        </div>

        <FilesSection />

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">
                {modalType === "rss" && "Add RSS Feed"}
                {modalType === "youtube" && "Add YouTube Video"}
                {modalType === "upload" && "Upload Files"}
              </h3>

              <form className="space-y-4" onSubmit={handleUpload}>
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Transcript</label>
                  <textarea
                    name="transcript"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
                    placeholder="Enter transcript"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;
