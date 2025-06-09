import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminRoute, ProtectedRoute } from './auth';
import { MainApp } from './components/component-main-app';
import { Root } from './home-page/root';

import './App.css';
import { ForgotPassword } from './home-page/forgot-password';
import { ResetPassword } from './home-page/reset-password';
import { RootState } from './store';
import { AlertDialog } from './components/component-dialog';
import { alertDialogActions } from './store/alert-dialog-slice';
import { AdminPage } from './home-page/admin-page';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, title, message } = useSelector((state: RootState) => state.alertDialg);

  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
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

        <AlertDialog
          isOpen={isOpen}
          title={title}
          message={message}
          onClose={() => dispatch(alertDialogActions.hideAlert())}
        />
      </div>
  );
};

export default App;
