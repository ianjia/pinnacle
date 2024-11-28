import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from './api';
import { AuthContext } from './auth-context';
import { useLoadData } from '../init';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login
  const navigate = useNavigate();
  const { loginUser, userId } = useContext(AuthContext);

  // Get the load data function
  const loadData = useLoadData();

  useEffect(() => {
    if (isLoggedIn && userId != null) {
      loadData(userId); // Call the returned function to load data
      navigate('/home'); // Navigate after loading data
    }
  }, [isLoggedIn, userId, loadData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      const { token } = response.data;
      loginUser(token); // Update context with the new token
      setIsLoggedIn(true); // Set login status
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
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
      <div style={styles.registerContainer}>
        <button onClick={() => navigate('/register')} style={styles.button}>
          Register
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '300px',
    margin: '100px auto',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '8px',
    margin: '5px 0',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
  },
  error: {
    color: 'red',
  },
  registerContainer: {
    marginTop: '20px',
  },
};
