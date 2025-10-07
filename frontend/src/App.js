import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import BirthdayPage from "./pages/BirthdayPage";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  useEffect(() => {
    // Health check
    const healthCheck = async () => {
      try {
        await axios.get(`${API}/`);
      } catch (e) {
        console.error(e, `errored out requesting / api`);
      }
    };
    healthCheck();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BirthdayPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;