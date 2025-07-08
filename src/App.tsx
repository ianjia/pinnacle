import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminRoute, ProtectedRoute } from './auth';
import { MainApp } from './components/component-main-app';
import { StartPage } from './home-page/start-page';
import { ForgotPassword } from './home-page/forgot-password';
import { ResetPassword } from './home-page/reset-password';
import { AlertDialog } from './components/component-dialog';
import { alertDialogActions } from './store/alert-dialog-slice';
import { AdminPage } from './home-page/admin-page';
import { RootState } from './store';
import './App.css';
import { IThemeToggleProps } from './components/component-util';

const App: React.FC<IThemeToggleProps> = ({ toggleTheme, isDarkMode }) => {
  const dispatch = useDispatch();
  const { isOpen, title, message } = useSelector(
    (s: RootState) => s.alertDialg,
  );

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
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
                <MainApp
                  toggleTheme={toggleTheme}
                  isDarkMode={isDarkMode}
                />
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
