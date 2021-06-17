import styles from "./App.module.css";
import "semantic-ui-css/semantic.min.css";
import Landing from "./components/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import NotesGrid from "./components/NotesGrid/NotesGrid";
import Editor from "./components/Editor/Editor";
import Note from "./components/Note/Note";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";


function App() {
  const { isAuthenticated, user } = useAuth0();
  console.log(useLocation());
  return (
    <div className={styles.App}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="notes"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        >
          <Route path="/" element={<NotesGrid />}/>
          <Route path="/new" element={<Editor />}/>
          <Route path="/:noteId" element={<Note />}/>
          <Route path="/pinned" element={<p>Pinned Notes</p>} />
          <Route path="/archived" element={<p>Archived Notes</p>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
