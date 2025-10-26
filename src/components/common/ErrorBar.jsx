import { useState, useEffect } from "react";
import { health } from "../../services/api";
import { SUPPORT_EMAIL } from "../../utill/constants";


export function ErrorBar() {
  const [alert, setAlert] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await health();

        if (!response || response.status !== "OK") {
          setAlert("API Server Down. Contact -");
        }
      } catch (error) {
        setAlert("API Server Down. Contact -");
      }
    })();
  }, []);

  if (!alert) return null;

  return (
    <div className="bg-red-500 text-white text-sm py-2 flex justify-center items-center gap-1">
      {alert}{" "}
      <a
        href={`mailto:${SUPPORT_EMAIL}`}
        className="flex items-center text-blue-200 underline hover:text-blue-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="w-4 h-4 mr-1"
        >
          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"></path>
          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"></path>
        </svg>
        <span>{SUPPORT_EMAIL}</span>
      </a>
    </div>
  );
}
