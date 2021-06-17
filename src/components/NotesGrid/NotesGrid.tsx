import { useTheme, Theme } from "../../contexts/themeContext";
import { Input } from "semantic-ui-react";
import styles from "./NotesGrid.module.css";
import { useScribble } from "../../contexts/notesContext";
import { NavLink } from "react-router-dom";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { deleteNoteThunk } from "../../middlewares/notesMiddleware";

function NotesGrid() {
  const { theme, setTheme } = useTheme();
  const { state, dispatch } = useScribble();

  console.log(state.notes);

  return (
    <div className={theme === "Dark" ? styles.container : styles.container}>
      <div>
        {state.notes.length === 0 && <h1 style={{marginTop:"5rem"}}>No Notes Found, Create one</h1>}
      </div>
      <div className={styles.homeGrid}>
        {state.notes.map((note) => (
          <div className={styles.noteBox}>
            <RiDeleteBack2Fill
              color={"#000"}
              style={{ marginLeft: "auto" }}
              onClick={() => deleteNoteThunk(dispatch, note._id)}
            />
            <NavLink to={`/notes/${note._id}`}>
              <h1>{note.title}</h1>
            </NavLink>
            <p>{note.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesGrid;
