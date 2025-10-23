import React, { useState } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  forgotPassword,
} from "../services/api";
import { useAuth } from "../hooks/AuthContext";

export const Login_register = ({ isLogin, setIsLogin, onSuccess }) => {
    const {  setUser } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const usernameRegex = /^[A-Za-z0-9_]+$/;

    if (!isLogin) {
      if (!formData.username.trim()) {
        newErrors.username = "Username is required";
      } else if (
        formData.username.length < 3 ||
        formData.username.length > 15
      ) {
        newErrors.username = "Username must be between 3 and 15 characters";
      } else if (!usernameRegex.test(formData.username)) {
        newErrors.username = "Username must not contain special characters";
      }
    }

    if (!formData.email.trim()) newErrors.email = "Email is required";

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6 || formData.password.length > 20) {
      newErrors.password = "Password must be between 6 and 20 characters";
    } else if (!isLogin && formData.password === formData.username) {
      newErrors.password = "Password cannot be the same as username";
    }

    if (!isLogin && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const { email, password, displayName, confirmPassword } = formData;
      let user = null;
      if (isLogin) {
         user = await apiLogin({ email, password });
      
        if (!user.email) {
          setErrors({ ...errors, server: "User not found" });
          return;
        }
      } else {
        if (password !== confirmPassword) {
          setErrors("Passwords do not match");
          return;
        }
       user =  await apiRegister({ email, password, displayName });
      }
        setUser(user);
      setLoading(false);
      onSuccess && onSuccess();
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Error";
      setErrors(message);
    } finally {
      // setSubmitting(false);
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email.trim()) {
      alert("Please enter your email to reset your password.");
      return;
    }

    try {
      setLoading(true);
      const res = await forgotPassword(formData.email);
      alert(
        res.message || res.detail || "Password reset link sent to your email!"
      );
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {!isLogin && (
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white focus:outline-none transition-all"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>
      )}

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white focus:outline-none transition-all"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white focus:outline-none transition-all"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}

        {isLogin && (
          <p
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 mt-2 cursor-pointer hover:underline text-right"
          >
            Forgot Password?
          </p>
        )}
      </div>

      {!isLogin && (
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white focus:outline-none transition-all"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        
      )}
       <div>
          {errors.server && (
            <p className="text-red-500 text-sm mt-1">
              {errors.server}
            </p>
          )}
       </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-black text-white p-3 rounded-lg font-medium shadow-sm flex justify-center items-center ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        )}
        {isLogin ? "Login" : "Register"}
      </button>

      <p className="text-center mt-4 text-sm text-black">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-black font-medium hover:underline cursor-pointer"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </form>
  );
};
