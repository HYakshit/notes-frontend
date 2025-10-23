import { Link } from "react-router-dom";
import profileImg from "../assets/profile.png";
import { useAuth } from "../hooks/AuthContext";
import { LogoutBtn } from "./common/LogoutBtn";
export const Profile = () => {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-5">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md text-center">
        <img
          src={profileImg}
          alt="Profile"
          className="w-16 h-16 rounded-full mx-auto filter brightness-0"
        />

        <div className="mt-4">
          <p className="text-gray-500 text-sm font-semibold">Username</p>
          <p className="text-black text-lg font-medium">
            {user?.user_metadata?.display_name ?? "Guest"}
          </p>
        </div>
        <hr className="my-4" />

        <div>
          <p className="text-gray-500 text-sm font-semibold">Email</p>
          <p className="text-black text-lg font-medium">
            {user?.email ?? "Guest Email"}
          </p>
        </div>
        <hr className="my-4" />

        {user && !loading ? <LogoutBtn></LogoutBtn> : <Link to="/">Login</Link>}
      </div>
    </div>
  );
};
