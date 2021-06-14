import styles from "./App.module.css";
import Landing from "./components/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { useAuth0 } from '@auth0/auth0-react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className={styles.App}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/notes">
          {isAuthenticated ? <Home />:<Navigate to="/" />}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
