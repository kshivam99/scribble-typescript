import React from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme, Theme } from "../../contexts/themeContext";
import Switch from "@material-ui/core/Switch";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar: React.FC = () => {
  const [showDropDownNav, setShowDropDownNav] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth0();

  function handleMenuIconClick() {
    setShowDropDownNav((prev) => !prev);
  }

  return (
    <div className={theme === Theme.Dark ? "nav dark" : "nav light"}>
      <div className="menu-icon" onClick={handleMenuIconClick}>
        {!showDropDownNav ? <FaBars /> : <FaTimes />}
      </div>
      <Link className="link" to="/" onClick={() => setShowDropDownNav(false)}>
        <h2 className={theme === Theme.Dark ? "dark" : "light"}>
          <span>S</span>
          <span style={{ color: "#93C5FD" }}>cribble</span>
        </h2>
      </Link>

      <ul
        style={{ backgroundColor: theme === Theme.Dark ? "#151515" : "#fff" }}
        className={!showDropDownNav ? "menu" : "menu active"}
      >
        <Link className="link" to="/notes" onClick={handleMenuIconClick}>
          {user && (
            <li className={theme === Theme.Dark ? "dark" : "light"}>Notes</li>
          )}
        </Link>
        <Link className="link" to="/logout">
          {user && (
            <li
              onClick={() => logout()}
              className={theme === Theme.Dark ? "dark" : "light"}
            >
              Sign out
            </li>
          )}
        </Link>
        <Switch
          defaultChecked
          onChange={() =>
            setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark)
          }
          color="primary"
        />
      </ul>
    </div>
  );
};

export default Navbar;
