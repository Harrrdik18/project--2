import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";

function EditTranscript() {
  const [transcript, setTranscript] = useState("");
  const [originalTranscript, setOriginalTranscript] = useState("");
  const [file, setFile] = useState(null);
  const { projectId, fileId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(`/projects/${projectId}/files/${fileId}`);
        if (response.data.success) {
          setFile(response.data.file);
          setTranscript(response.data.file.transcript);
          setOriginalTranscript(response.data.file.transcript);
        }
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchFile();
  }, [projectId, fileId]);

  const handleSave = async () => {
    try {
      await axios.put(`/projects/${projectId}/files/${fileId}`, {
        transcript
      });
      navigate(`/project/${projectId}`);
    } catch (error) {
      console.error('Error saving transcript:', error);
    }
  };

  const handleDiscard = () => {
    if (transcript !== originalTranscript) {
      if (window.confirm('Are you sure you want to discard your changes?')) {
        navigate(`/project/${projectId}`);
      }
    } else {
      navigate(`/project/${projectId}`);
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F6FA]">
      {/* Sidebar */}
      <div className="w-64 bg-white h-full flex flex-col border-r">
        {/* Logo */}
        <div className="p-4 border-b">
          <img src="/assets/logo-purple.png" alt="Ques.AI" className="h-8" />
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
            <div className="px-4 py-2 text-gray-600 hover:bg-gray-50">
              Upgrade
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t p-4 space-y-4">
          <div className="px-4 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer">
            Help
          </div>
          <div className="flex items-center gap-3 px-4">
            <img
              src="/assets/avatar.png"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="text-sm font-medium">Username</div>
              <div className="text-xs text-gray-500">username@gmail.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <span>Home Page</span>
              <span>/</span>
              <span>Sample Project</span>
              <span>/</span>
              <span className="text-purple-600">Add your podcast</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleDiscard}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
              >
                ← Edit Transcript
              </button>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDiscard}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#1C1C1C] text-white rounded-lg hover:bg-gray-800"
            >
              Save
            </button>
          </div>
        </div>

        {/* Transcript Editor */}
        <div className="bg-white rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-purple-600 font-medium mb-2">Speaker</h3>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="w-full h-[calc(100vh-300px)] p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter transcript here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTranscript; 