import React, { useContext, useEffect, useState } from 'react';

import { useLoadData } from '../init';
import { api, AuthContext } from '../auth';
import { useNavigate } from 'react-router-dom';

interface LoginModalContentProps {
  onSuccess?: () => void; 
}

export const LoginModalContent: React.FC<LoginModalContentProps> = ({ onSuccess }) => {
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
      // Optionally trigger callback to close modal on success
      if (onSuccess) {
        onSuccess();
      }
      navigate('/mainapp'); // Navigate after loading data
    }
  }, [isLoggedIn, userId, loadData, onSuccess]);

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
    <div style={styles.container}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minWidth: '300px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  input: {
    padding: '8px',
    margin: '5px 0',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    marginTop: '10px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
};
