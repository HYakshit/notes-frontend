import React from "react";

export const Login_register = ({ isLogin, setIsLogin }) => {
  return (
    <form className="space-y-4">
      {!isLogin && (
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {!isLogin && (
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
      >
        {isLogin ? "Login" : "Register"}
      </button>
      {/* Toggle */}
      <p className="text-center mt-4 text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </form>
  );
};
