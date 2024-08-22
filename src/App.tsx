import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark')
      document.documentElement.classList.add('dark');
  }, [])

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route element={<PublicRoute />} >
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />} >
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;