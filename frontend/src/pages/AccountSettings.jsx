import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

function AccountSettings() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: ''
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser({
        username: userData.username || '',
        email: userData.email || ''
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#F5F6FA]">
      <div className="w-74 bg-white h-full flex flex-col">
        <div className="p-4 flex items-center">
          <img src="/assets/logo-purple.png" alt="Ques.AI" className="h-8" />
          <h1 className="mx-2 font-bold text-purple-700 text-xl">
            Ques.<span className="font-normal">AI</span>
          </h1>
        </div>

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

        <div className="p-4 space-y-4">
          <div className="px-4 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer">
            Help
          </div>
          <div className="border-t border-gray-200 pt-4">
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
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-gray-500">
            <span>Home Page</span>
            <span>/</span>
            <span>Sample Project</span>
            <span>/</span>
            <span className="text-purple-600">Add your podcast</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <img src="/assets/notifications.png" alt="Notifications" className="w-6 h-6" />
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <img src="/assets/logout.png" alt="Logout" className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600"
          >
            <span>←</span>
            <span className="font-bold">Account Settings</span>
          </button>
        </div>

        <div className="max-w-4xl">
          <div className="flex items-center gap-6 mb-12">
            <img 
              src="/assets/avatar.png" 
              alt="Profile" 
              className="w-24 h-24 rounded-lg"
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">User Name</h2>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={user.username}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="alphauser"
                />
                <input
                  type="email"
                  value={user.email}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="alphauser@gmail.com"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Subscriptions</h2>
            <div className="bg-[#FDF4FF] rounded-lg p-6 flex justify-between items-center">
              <div>
                <p className="text-purple-600 font-medium mb-1">
                  Oops! You don't have any active plans.
                  <span className="text-purple-700 font-semibold ml-1">
                    Upgrade now!
                  </span>
                </p>
              </div>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings; 