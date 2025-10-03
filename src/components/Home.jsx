import React, { useState } from "react";
import { Login_register } from "./Login_register";

export const Home = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* Form */}
      <Login_register isLogin={isLogin} setIsLogin={setIsLogin} />

    
      </div>
    </div>
  );
};
