import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/register';
import Protected from './components/pages/protected';
import ProtectedRoute from './components/pages/protectedRoute';
import Home from "./components/pages/Home";
import Userpanel from "./components/pages/Userpanel";
import Alerts from "./components/pages/Alerts";
import Catalog from "./components/pages/Catalog";
import Logs from "./components/pages/Logs";
import Orders from "./components/pages/Orders";
import TestPage from "./components/pages/testPage";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/protected" 
          element={
            <ProtectedRoute>
              <Protected />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/userpanel" element={<Userpanel/>} />
        <Route path="/alerts" element={<Alerts/>} />
        <Route path="/catalog" element={<Catalog/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/logs" element={<Logs/>} />
        <Route path="/testPage" element={<TestPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
