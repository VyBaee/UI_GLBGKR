import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/Authen/Login';
import Dashboard from './components/Main/Dashboard/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
