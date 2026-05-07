import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <Link to="/">Activities</Link>
        <Link to="/routines">Routines</Link>
        {token ? (
          <button className="nav-button" onClick={handleLogout}>Log out</button>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
