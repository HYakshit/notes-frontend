import { Link, useLocation } from "react-router-dom";
import { PROJECT_NAME } from "../../utill/constants";

export default function Footer() {
  const location = useLocation();

  const links = [
   
    { to: "/notes", label: "All Notes" },
    { to: "/pinned", label: "Pinned" },
     { to: "/", label: "Login/Register" },
  ];

  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-4 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-2">
        {/* Navigation Links */}
        <nav className="flex gap-4 text-sm">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-yellow-400 transition ${
                location.pathname === link.to ? "text-yellow-400" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Branding / Copyright */}
        <p className="text-xs text-gray-500 dark:text-gray-300 text-center md:text-right">
          © {new Date().getFullYear() } {PROJECT_NAME} by <a href="https://akshitmahajan.netlify.app/" target="_blank">Akshit</a> & Deeksha.
        </p>
      </div>
    </footer>
  );
}