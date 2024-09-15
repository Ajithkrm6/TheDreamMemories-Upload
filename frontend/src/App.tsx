import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomeScreen } from "./pages/home";
import { MainScreen } from "./pages/main";
import { LoginScreen } from "./pages/login";
import { SignupScreen } from "./pages/signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
