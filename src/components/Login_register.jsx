import React, { useState } from "react";

export const Login_register = ({ isLogin, setIsLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!isLogin && !formData.username.trim()) newErrors.username = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!isLogin && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (isLogin) {
        if (
          registeredUser &&
          formData.email === registeredUser.email &&
          formData.password === registeredUser.password
        ) {
          alert("Login Successful");
        } else {
          setErrors({
            email: "Invalid email or password",
            password: "Invalid email or password",
          });
        }
      } else {
        setRegisteredUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        alert("Registration Successful");
        setIsLogin(true);
      }
    }, 2000);
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
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
      )}

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
