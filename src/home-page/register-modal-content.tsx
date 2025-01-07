import React, { useState } from 'react';
import { api } from '../auth';
import { useStyles } from './hooks/use-login-register-modal-styles';

interface RegisterModalContentProps {
  onSuccess?: () => void;
}

export const RegisterModalContent: React.FC<RegisterModalContentProps> = ({ onSuccess }) => {
  const styles = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if passwords match before making the API call
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await api.post('/register', { email, password });
      setSuccess('Registration successful!');
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  // Whether the passwords match (only check if both fields have content)
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  return (
    <div className={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister} className={styles.form}>
        <input
          type="text"
          placeholder="email"
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
          required
        />

        {/* Show warning if both fields are filled but do not match */}
        {password && confirmPassword && !passwordsMatch && (
          <p className={styles.error}>Passwords do not match</p>
        )}

        {/* Display API or matching error */}
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        {/* Disable register button if passwords do not match */}
        <button type="submit" className={styles.button} disabled={!passwordsMatch}>
          Register
        </button>
      </form>
    </div>
  );
};
