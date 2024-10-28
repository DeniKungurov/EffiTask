import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AppRouter from "./routing/AppRouter";
import StarryBackground from "./StarryBackground";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const authCookie = Cookies.get("authorization");
    if (!authCookie) {
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <StarryBackground />
      <AppRouter />
    </div>
  );
}

export default App;
