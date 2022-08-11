import { Routes, Route } from "react-router-dom";
import Header from "./components/navbar/Header";
import Home from "./pages/home";
import Login from "./pages/login/Login";
import Register from "./pages/register";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
