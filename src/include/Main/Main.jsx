import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';

import Dashboard from "../../pages/Dashboard";
import Strategies from '../../pages/Strategies';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bots from '../../pages/bots';
import BotName from '../../pages/BotName';
import Credentials from '../../pages/Credentials';
function Main({menuState}) {
  return (
  <main>
    <BrowserRouter>
  <Sidebar menuState={menuState}/>
    <div className="dashboard">
    <Routes>
    <Route exact path="/credentials" element={<Credentials />} />
  <Route exact path="/" element={<Dashboard />} />
  <Route exact path="/strategies" element={<Strategies />} />
  <Route  path="/bots" element={<Bots/>} >
 
  </Route>
  <Route path="/my-first-bot" element={<BotName/>} />
  </Routes>
  </div>
  </BrowserRouter>
  </main>
  )
}

export default Main