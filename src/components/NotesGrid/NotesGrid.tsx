import { useTheme, Theme } from "../../contexts/themeContext";
import { Input } from "semantic-ui-react";
import styles from "./NotesGrid.module.css";
import { useScribble } from "../../contexts/notesContext";
import { NavLink } from "react-router-dom";

function NotesGrid() {
  const { theme, setTheme } = useTheme();
  const { state, dispatch } = useScribble();

  console.log(state.notes);

  return (
    <div className={theme === "Dark" ? styles.container : styles.container}>
      <div
        className={
          theme === "Dark"
            ? "dark--header home--searchbar"
            : "light--header home--searchbar"
        }
      >
        {/* <Input icon="search" placeholder="Search Notes.." /> */}
      </div>
      {/* {loading && (
        <CircularProgress
          style={{ margin: "10rem auto", width: "10rem", height: "10rem" }}
        />
      )} */}
      <div className={styles.homeGrid}>
        {state.notes.map((note) => (
          <NavLink to={`/notes/${note._id}`}>
          <div className={styles.noteBox}>
            <h1>{note.title}</h1>
            <p>{note.label}</p>
          </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default NotesGrid;
