import { useAuth0 } from "@auth0/auth0-react";
import { useScribble } from "../../contexts/notesContext";
import Sidebar from "../Sidebar/Sidebar";
import { getNotes } from "../../middlewares/notesMiddleware";
import styles from "./Home.module.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function Home() {
  const { state, dispatch } = useScribble();
  const { user } = useAuth0();

  useEffect(() => {
    getNotes(dispatch, user?.email);
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Home;
