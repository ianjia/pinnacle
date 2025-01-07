import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../auth/api';

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token') || '';
  
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenFromUrl) {
      setError('No reset token provided in the URL.');
    }
  }, [tokenFromUrl]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      const response = await api.post('/reset-password', {
        token: tokenFromUrl,
        newPassword,
      });
      setSuccessMsg('Password has been reset successfully. You can now log in.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error resetting password.');
    }
  };

  if (!tokenFromUrl) {
    return <div>Invalid token</div>;
  }

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter a new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem' }}
        />
        <button type="submit">Reset Password</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
    </div>
  );
};
