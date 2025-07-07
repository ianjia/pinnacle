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

interface AppProps {
  toggleTheme: () => void;
}

const App: React.FC<AppProps> = ({ toggleTheme }) => {
  const dispatch = useDispatch();
  const { isOpen, title, message } = useSelector(
    (state: RootState) => state.alertDialg,
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

          {/* pass toggleTheme to MainApp via the route element */}
          <Route
            path="/mainapp"
            element={
              <ProtectedRoute>
                <MainApp toggleTheme={toggleTheme} />
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
