import "./App.css";
import Header from "./include/Header/Header";
import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Main from "./include/Main/Main";
import LandingPage from "./pages/LandingPage";
import TncGuard from "./components/TncGuard";

function BotApp() {
  const [menu, setMenu] = useState(false);

  function hendlmobilemenu() {
    setMenu(!menu);
  }

  return (
    <TncGuard>
      <div className="darkpulse-app">
        <Header hendlmobilemenu={hendlmobilemenu} />
        <Main menuState={menu} />
      </div>
    </TncGuard>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/bot/*" element={<BotApp />} />
        <Route path="/login" element={<BotApp />} />
        <Route path="/signup" element={<BotApp />} />
        <Route path="/tnc" element={<BotApp />} />
        {/* Legacy route redirects */}
        <Route path="/dashboard" element={<Navigate to="/bot/dashboard" replace />} />
        <Route path="/strategies" element={<Navigate to="/bot/strategies" replace />} />
        <Route path="/bots" element={<Navigate to="/bot/bots" replace />} />
        <Route path="/credentials" element={<Navigate to="/bot/credentials" replace />} />
        <Route path="/uniswap" element={<Navigate to="/bot/uniswap" replace />} />
        <Route path="/ppm-simple" element={<Navigate to="/bot/ppm-simple" replace />} />
        <Route path="/active-bots" element={<Navigate to="/bot/active-bots" replace />} />
        <Route path="/configurations" element={<Navigate to="/bot/configurations" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
