import "./App.css";
import Header from "./include/Header/Header";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./include/Main/Main";
import LandingPage from "./pages/LandingPageReact";

function MainApp() {
  const [menu, setMenu] = useState(false);

  function hendlmobilemenu() {
    setMenu(!menu);
  }

  return (
    <div className="darkpulse-app">
      <Header hendlmobilemenu={hendlmobilemenu} />
      <Main menuState={menu} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
