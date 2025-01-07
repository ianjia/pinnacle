import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, AuthContext } from '../auth';
import { useLoadData } from '../init';
import { useStyles } from './hooks/use-login-register-modal-styles';


interface LoginModalContentProps {
  onSuccess?: () => void;
}

export const LoginModalContent: React.FC<LoginModalContentProps> = ({ onSuccess }) => {
  const styles = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const { loginUser, userId } = useContext(AuthContext);
  const loadData = useLoadData();

  useEffect(() => {
    if (isLoggedIn && userId != null) {
      loadData(userId);
      if (onSuccess) {
        onSuccess();
      }
      navigate('/mainapp');
    }
  }, [isLoggedIn, userId, loadData, onSuccess, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      const { token } = response.data;
      loginUser(token);
      setIsLoggedIn(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>

      {/* Forgot Password Link */}
      <div className={styles.forgotPasswordWrapper}>
        <button className={styles.button} onClick={() => navigate('/forgot-password')}>
          Forgot Password?
        </button>
      </div>
    </div>
  );
};
