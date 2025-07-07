import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
} from '@fluentui/react-components';

import { api, AuthContext } from '../auth';
import { useLoadData } from '../init';
import { navigationTabActions } from '../store';
import { useLoginRegisterStyles } from './hooks/use-login-register-modal-styles';

interface LoginModalContentProps { onSuccess?: () => void; }

export const LoginModalContent: React.FC<LoginModalContentProps> = ({ onSuccess }) => {
  const styles   = useLoginRegisterStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginUser, userId } = useContext(AuthContext);
  const loadData = useLoadData();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  /* ─── load profile after login ─── */
  useEffect(() => {
    if (loggedIn && userId != null) {
      loadData(userId);
      onSuccess?.();
      navigate('/mainapp');
    }
  }, [loggedIn, userId, loadData, onSuccess, navigate]);

  /* ─── submit ─── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { token } } = await api.post('/login', { email, password });
      loginUser(token);

      const { data: profile } = await api.get('/api/v1/user/profile');
      dispatch(navigationTabActions.setEmail(profile.email));
      dispatch(navigationTabActions.setProfileImage(profile.profile_picture_url ?? 'default'));

      setLoggedIn(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  /* ─── UI ─── */
  return (
    <div className={styles.container}>
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(_, v) => setEmail(v.value)}
          className={styles.input}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(_, v) => setPassword(v.value)}
          className={styles.input}
          required
        />

        {error && <p className={styles.error}>{error}</p>}

        <Button appearance="primary" type="submit" className={styles.button}>
          Login
        </Button>
      </form>

      <div className={styles.forgotPasswordWrapper}>
        <button
          className={styles.linkButton}
          onClick={() => navigate('/forgot-password')}
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
};
