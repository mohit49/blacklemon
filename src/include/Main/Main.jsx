import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Dashboard from "../../pages/Dashboard";
import Strategies from '../../pages/Strategies';
import { Routes, Route, Navigate } from "react-router-dom";
import Bots from '../../pages/bots';
import BotName from '../../pages/BotName';
import Credentials from '../../pages/Credentials';
import PpmSimple from '../../pages/ppmSimple';
import Configurations from '../../pages/Configurations';
import Signup from '../../components/Signup';
import Login from '../../components/Login';
import ProtectedRoute from '../../components/ProtectedRoute ';
import Tnc from '../../components/tnc';
import Uniswap from '../../pages/Uniswap';
import TncGuard from '../../components/TncGuard';

function Main({ menuState }) {

  // Manage login state
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Monitor `localStorage` for changes to the token
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  console.log("isLoggedIn==>", isLoggedIn)

  return (
    <main>
        <Sidebar menuState={menuState} />
        <div className="dashboard">
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tnc" element={<Tnc />} />

            {/* Protected Routes */}
            <Route
              exact
              path="/dashboard"
              element={
                <TncGuard>
                  <Dashboard />
                </TncGuard>
              }
            />
            <Route
              exact
              path="/uniswap"
              element={
                <Uniswap />
              }
            />
            <Route
              exact
              path="/credentials"
              element={
                <ProtectedRoute>
                  <Credentials />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/strategies"
              element={
                <ProtectedRoute>
                  <Strategies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bots"
              element={
                <ProtectedRoute>
                  <Bots />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ppm-simple"
              element={
                <ProtectedRoute>
                  <PpmSimple />
                </ProtectedRoute>
              }
            />
            <Route
              path="/active-bots"
              element={
                <ProtectedRoute>
                  <BotName />
                </ProtectedRoute>
              }
            />
            <Route
              path="/configurations"
              element={
                <ProtectedRoute>
                  <Configurations />
                </ProtectedRoute>
              }
            />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

          </Routes>
        </div>
    </main>
  );
}

export default Main;