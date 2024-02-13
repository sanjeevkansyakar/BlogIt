import { useEffect } from "react";
import { useState } from "react";
import authService from "./auth/authService";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
// Import Css
import "./App.css";
// Import from store
import { login, logout } from "./store/authSlice";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return !loading ? (
    <div className="min-h-screen bg-gray-400 flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
