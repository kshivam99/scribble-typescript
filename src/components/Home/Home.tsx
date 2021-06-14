import { useAuth0 } from "@auth0/auth0-react";
import { useScribble } from "../../contexts/notesContext";
import { addNoteThunk } from "../../middlewares/notesMiddleware";
import styles from "./Home.module.css";

function Home() {
  const { state, dispatch } = useScribble();
  const { user } = useAuth0();

  console.log(user?.email)

  console.log(state);

  return (
    <div>
      <button
        style={{marginTop:"6rem"}}
        onClick={() =>
          addNoteThunk(dispatch, {
            text: "My first note",
            email: user?.email!,
            label: "Others",
            pinned: true,
          })
        }
      >
        ADD note
      </button>
    </div>
  );
}

export default Home;
