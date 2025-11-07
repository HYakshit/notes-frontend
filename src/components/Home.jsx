import React, { useState } from "react";
import { Login_register } from "./Login_register";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const onSuccess = () => {
    if (isLogin) {
      navigate("/notes");
      return;
    }
    setSuccessMessage("Registered! Login to continue");
    setIsLogin(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100  dark:bg-gray-600 dark:text-white">
      <div className="bg-white dark:bg-gray-900  shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>
        {successMessage && (
          <p className="text-green-600 text-sm mb-3" role="status">
            {successMessage}
          </p>
        )}

        {/* Form */}
        <Login_register
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
};
