import styles from "./Sidebar.module.css";
import { MdLabel } from "react-icons/md";
import { BiLabel } from "react-icons/bi";
import { AiFillPushpin, AiFillFileAdd } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { FaFileArchive } from "react-icons/fa";
import { useScribble } from "../../contexts/notesContext";
import { addNoteThunk } from "../../middlewares/notesMiddleware";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, useLocation } from "react-router-dom";


function Sidebar() {
  const { state, dispatch } = useScribble();
  const { user } = useAuth0();
  const path = useLocation().pathname;
  console.log(path==="/notes")
  return (
    <div className={styles.sideBar}>
      <NavLink to="/notes/new" >
        <div className={styles.newNote}>
          <AiFillFileAdd color={"#1D4ED8"} className={styles.icon} />
          New Note
        </div>
      </NavLink>
      <div className={styles.sideBarList}>
      <NavLink to="/notes" >
        <div className={path==="/notes" ? `${styles.activeTag} ${styles.tag}`: styles.tag}>
          <MdLabel className={styles.icon} /> 
          All notes
        </div>
        </NavLink>
        <NavLink to="/notes/pinned" >
        <div className={false ? styles.activeTag : styles.tag}>
          <AiFillPushpin className={styles.icon} />
          Pinned notes
        </div>
        </NavLink>
        <NavLink to="/notes/archived" >
        <div className={false ? styles.activeTag : styles.tag}>
          <FaFileArchive className={styles.icon} />
          Archived notes
        </div>
        </NavLink>
        <div className={styles.tagList}>
          <div className={false ? styles.activeTag : styles.tag}>
            <BiLabel className={styles.icon} />
            Todo
          </div>
        </div>
        <div className={styles.addTag}>
          <MdAddCircle color={"#1D4ED8"} className={styles.icon} />
          Add new Label
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
