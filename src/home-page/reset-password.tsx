import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../auth/api';

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    // Check if the two passwords match before making the API call
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

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

  // Whether the passwords match
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

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

        <label>Confirm New Password</label>
        <input
          type="password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem' }}
        />

        {/* Show a warning if both fields are filled and do not match */}
        {newPassword && confirmPassword && !passwordsMatch && (
          <p style={{ color: 'red' }}>Passwords do not match</p>
        )}

        <button type="submit" disabled={!passwordsMatch}>
          Reset Password
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
    </div>
  );
};
