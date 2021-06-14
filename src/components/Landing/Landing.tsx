import React from "react";
import styles from "./Landing.module.css";
import Button from "@material-ui/core/Button";
import { MdExplore } from "react-icons/md";
import { useTheme, Theme } from "../../contexts/themeContext";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { useAuth0 } from '@auth0/auth0-react';



const Header: React.FC = () => {
  const { theme } = useTheme();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div
      className={
        theme === Theme.Dark ? `${styles.header} ${styles.darkHeader}` : `${styles.header} ${styles.lightHeader}`
      }
    >
      <h1>
        <span style={{color:"#93C5FD"}}>Welcome to </span><span>Scribble</span>
      </h1>
      <div className={styles.small}>
        <small>Store all your notes in one place</small>
        <small>Save paper, Use Scribble</small>
      </div>
      {
        (isAuthenticated ? (
          <Link className={styles.link} to="/notes">
            <Button color="primary" variant="contained" endIcon={<MdExplore />}>
              Explore
            </Button>
          </Link>
        ) : (
        <Button
          color="primary"
          variant="contained"
          endIcon={<BiLogIn />}
          onClick={() => loginWithRedirect()}
        >
          Sign In
        </Button>
        ))}
    </div>
  );
};

export default Header;
