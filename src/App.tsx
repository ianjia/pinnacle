import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, ProtectedRoute, Register } from './auth';
import { MainApp } from './components/component-main-app';
import { Root } from './home-page/root';

import './App.css';

const App: React.FC = () => {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/mainapp"
              element={
                <ProtectedRoute>
                  <MainApp />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
  );
};

export default App;
