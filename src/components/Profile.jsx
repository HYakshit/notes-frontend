import { Link } from "react-router-dom";
import profileImg from "../assets/profile.png";
import { useAuth } from "../hooks/AuthContext";
import { LogoutBtn } from "./common/LogoutBtn";
export const Profile = () => {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-600 dark:text-white flex items-center justify-center  p-5">
      <div className="w-full max-w-sm bg-white  dark:bg-gray-900 dark:text-white  p-6 rounded-lg shadow-md text-center">
        <img
          src={profileImg}
          alt="Profile"
          className="w-16 dark:bg-blue-500 h-16 rounded-full mx-auto filter"
        />

        <div className="mt-4">
          <p className=" text-sm font-semibold">Username</p>
          <p className=" text-lg font-medium">
            {user?.user_metadata?.name ?? "Guest"}
          </p>
        </div>
        <hr className="my-4" />

        <div>
          <p className=" text-sm font-semibold">Email</p>
          <p className=" text-lg font-medium">
            {user?.email ?? "Guest Email"}
          </p>
        </div>
        <hr className="my-4" />

        {user && !loading ? <LogoutBtn></LogoutBtn> : <Link to="/">Login</Link>}
      </div>
    </div>
  );
};
