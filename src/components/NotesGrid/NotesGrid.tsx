import { useTheme, Theme } from "../../contexts/themeContext";
import { Input } from "semantic-ui-react";
import styles from "./NotesGrid.module.css";
import { notesType, useScribble } from "../../contexts/notesContext";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { deleteNoteThunk } from "../../middlewares/notesMiddleware";

function NotesGrid() {
  const { theme, setTheme } = useTheme();
  const { state, dispatch } = useScribble();
  let renderNotes: notesType[] = [];

  const path = useLocation().pathname;
  const { labelName } = useParams();
  
  renderNotes = (() => {
    switch (path) {
      case "/notes":
        return renderNotes.concat(state.notes);
      case "/notes/pinned":
        return renderNotes.concat(state.notes.filter((note) => note.pinned));
      case "/notes/archived":
        return renderNotes.concat(state.notes.filter((note) => note.archived));
      default:
        return renderNotes.concat(
          state.notes.filter((note) => note.label === labelName)
        );
    }
  })();
  
  return (
    <div className={theme === "Dark" ? styles.container : styles.container}>
      <div>
        {renderNotes.length === 0 && (
          <h1 style={{ marginTop: "5rem" }}>No Notes Found</h1>
        )}
      </div>
      <div className={styles.homeGrid}>
        {renderNotes.map((note) => (
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
