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
            <Route path="/bot/signup" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/bot/login" element={<Login />} />
            <Route path="/login" element={<Login />} />


            {/* Protected Routes */}
            <Route
              exact
              path="/bot/tnc"
              element={
                <Tnc />
              }
            />
            <Route
              exact
              path="/tnc"
              element={
                <Tnc />
              }
            />
            <Route
              exact
              path="/bot/dashboard"
              element={
                <Dashboard />
              }
            />
            <Route
              exact
              path="/bot/uniswap"
              element={
                <Uniswap />
              }
            />

            <Route
              exact
              path="/bot/credentials"
              element={
                <ProtectedRoute>
                  <Credentials />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/bot/strategies"
              element={
                <ProtectedRoute>
                  <Strategies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bot/bots"
              element={
                <ProtectedRoute>
                  <Bots />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bot/ppm-simple"
              element={
                <ProtectedRoute>
                  <PpmSimple />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bot/active-bots"
              element={
                <ProtectedRoute>
                  <BotName />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bot/configurations"
              element={
                <ProtectedRoute>
                  <Configurations />
                </ProtectedRoute>
              }
            />

            {/* Legacy routes for backward compatibility */}
            <Route
              exact
              path="/dashboard"
              element={<Navigate to="/bot/dashboard" replace />}
            />
            <Route
              exact
              path="/uniswap"
              element={<Navigate to="/bot/uniswap" replace />}
            />
            <Route
              exact
              path="/credentials"
              element={<Navigate to="/bot/credentials" replace />}
            />
            <Route
              exact
              path="/strategies"
              element={<Navigate to="/bot/strategies" replace />}
            />
            <Route
              path="/bots"
              element={<Navigate to="/bot/bots" replace />}
            />
            <Route
              path="/ppm-simple"
              element={<Navigate to="/bot/ppm-simple" replace />}
            />
            <Route
              path="/active-bots"
              element={<Navigate to="/bot/active-bots" replace />}
            />
            <Route
              path="/configurations"
              element={<Navigate to="/bot/configurations" replace />}
            />

            <Route path="/bot" element={<Navigate to="/bot/tnc" replace />} />
            <Route path="/bot/*" element={<Navigate to="/bot/dashboard" />} />

          </Routes>
        </div>
    </main>
  );
}

export default Main;