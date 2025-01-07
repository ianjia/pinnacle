import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './auth';
import { MainApp } from './components/component-main-app';
import { Root } from './home-page/root';

import './App.css';
import { ForgotPassword } from './home-page/forgot-password';
import { ResetPassword } from './home-page/reset-password';

const App: React.FC = () => {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
                        
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
