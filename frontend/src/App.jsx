import "./App.css";
import DashboardPage from "./pages/dashboard";
import Register from "./pages/register";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
