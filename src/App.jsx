import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login/Login";
import Register from "./pages/register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
