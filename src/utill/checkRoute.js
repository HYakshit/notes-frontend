import { useLocation } from "react-router-dom";
export default function isNotesRoute() {
  const location = useLocation();
  return location.pathname === "/notes" || location.pathname === "/pinned";
}
