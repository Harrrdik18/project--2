import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.success) {
        // Store the token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.error ||
          error.response?.data?.email ||
          "An error occurred during registration"
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F6FA]">
      <div className='w-2/3 bg-[url("/assets/Frame-20.png")] bg-cover bg-center'>
        <div className="flex flex-col items-start m-4 mx-30">
          <img src="./assets/Logo-white.png" className="h-8 m-5" alt="Logo" />
          <section className="w-5/9 m-2 mt-5 text-white">
            <h1 className="font-arial font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Your podcast will no longer be just a hobby.
            </h1>
            <p className="w-75 font-[Arial] font-thin text-sm sm:text-base md:text-lg lg:text-xl font-stretch-normal my-4 sm:my-6 lg:my-8">
              Supercharge Your Distribution using our AI assistant!
            </p>
          </section>
        </div>
      </div>

      <div className="w-1/3 bg-[#F5F6FA] flex flex-col my-15">
        <img src="/assets/logo-purple.png" className="self-center h-20" alt="Purple Logo" />
        <h1 className="text-[#7E22CE] text-3xl self-center w-1/2 text-center mb-8">
          Create your <span className="font-bold">Account</span>
        </h1>

        {error && (
          <div className="mx-12 p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
            {error}
          </div>
        )}

        <form className="flex flex-col px-12 gap-4" onSubmit={handleRegister}>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400"
              placeholder="Email"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400"
              placeholder="Password"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="p-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400"
              placeholder="Confirm Password"
              required
            />
          </div>

          <button className="bg-purple-600 text-white py-2 rounded-lg mt-4 hover:bg-purple-700">
            Create Account
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <button className="flex items-center bg-white justify-center gap-3 border border-gray-300 p-2 rounded-lg hover:bg-gray-50">
            <img
              src="/assets/google-logo.png"
              alt="Google"
              className="w-5 h-5 ml-1"
            />
            <span className="font-semibold text-gray-900 text-start">
              Continue with Google
            </span>
          </button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?
            <a
              href="/"
              className="text-purple-600 hover:text-purple-800 ml-1"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register; 