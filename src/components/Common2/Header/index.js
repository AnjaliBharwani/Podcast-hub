import React from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="navbar">
      <div className="gradient"></div>
      <div className="links">
        <Link
          to="/"
          style={{ color: currentPath == "/" ? "white" : "#8ea6bb" }}
        >
          Signup
        </Link>
        <Link
          to="/podcasts"
          style={{ color: currentPath == "/podcasts" ? "white" : "#8ea6bb" }}
        >
          Podcasts
        </Link>
        <Link
          to="/create-a-podcast"
          style={{
            color: currentPath == "/create-a-podcast" ? "white" : "#8ea6bb",
          }}
        >
          Start A Podcast
        </Link>
        <Link
          to="/profile"
          style={{ color: currentPath == "/profile" ? "white" : "#8ea6bb" }}
        >
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Header;
