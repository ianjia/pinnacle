import React, { useState } from 'react';
import { api } from '../auth/api'; 

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      await api.post('/forgot-password', { email });
      setSuccessMessage('Reset link has been sent. Check console or your email.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send reset link.');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem' }}
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};
