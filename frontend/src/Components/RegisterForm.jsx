import React, { useContext, useState } from "react";
import { register } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RegisterForm = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const { actions } = useContext(AuthContext);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formData);

      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        await actions.fetchUser();

        navigate("/dashboard");
      } else {
        alert("Registration was not successful.");
      }
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Registration failed", error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>

        <form
          className="space-y-4"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          {/* <!-- First Name --> */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="firstName"
              name="Fname"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* <!-- Last Name --> */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="lastName"
              name="Lname"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* <!-- Email --> */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* <!-- Phone Number --> */}
          {/* <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
            onChange={handleChange}
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          {/* <!-- Password --> */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button --> */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?
          <a href="#" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
