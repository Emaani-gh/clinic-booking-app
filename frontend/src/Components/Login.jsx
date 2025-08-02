import { useNavigate } from "react-router-dom";
import { login } from "../services/authServices";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { actions } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login(formData);

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        await actions.fetchUser();
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("login failed");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              id="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              name="password"
              onChange={handleChange}
              type="password"
              id="password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
