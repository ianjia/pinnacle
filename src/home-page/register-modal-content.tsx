import React, { useState } from 'react';
import { api } from '../auth';
import { useStyles } from './hooks/use-login-register-modal-styles';
import { passwordMeetsRequirements } from './utils/password-validator';

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

    // 1. Check if password meets requirement
    if (!passwordMeetsRequirements(password)) {
      setError(
        'Password must be at least 8 characters, include a number, and a special character.'
      );
      return;
    }

    // 2. Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // 3. If validations pass, call the API
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

  // Whether the two passwords match
  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  // Whether the password meets the requirement
  const passwordValid = passwordMeetsRequirements(password);

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

        {/* Show warning if password doesn't meet the requirements */}
        {password && !passwordValid && (
          <p className={styles.error}>
            Password must be at least 8 characters, include a number, and a special character.
          </p>
        )}

        {/* Show warning if both fields are filled and do not match */}
        {password && confirmPassword && !passwordsMatch && (
          <p className={styles.error}>Passwords do not match</p>
        )}

        {/* Display error/success messages */}
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        {/* Disable button if password doesn't meet requirements or passwords don't match */}
        <button
          type="submit"
          className={styles.button}
          disabled={!passwordValid || !passwordsMatch}
        >
          Register
        </button>
      </form>
    </div>
  );
};
