import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';

import Dashboard from "../../pages/Dashboard";
import Strategies from '../../pages/Strategies';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function Main() {
  return (
  <main>
    <BrowserRouter>
    <Sidebar/>
    <div className="dashboard">
    <Routes>
   
  <Route exact path="/" element={<Dashboard />} />
  <Route exact path="/strategies" element={<Strategies />} />
  <Route exact path="/bot" element={<Dashboard/>} >
  <Route path="/bot/new-bot" element={<Strategies />} />
  </Route>
  </Routes>
  </div>
  </BrowserRouter>
  </main>
  )
}

export default Main