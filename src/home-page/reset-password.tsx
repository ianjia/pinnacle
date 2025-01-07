import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../auth/api';
import { passwordMeetsRequirements } from './utils/password-validator';

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

    // 1. Check if the password meets the requirement
    if (!passwordMeetsRequirements(newPassword)) {
      setError(
        'Password must be at least 8 characters, include a number, and a special character.'
      );
      return;
    }

    // 2. Check if the two passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // 3. If all validations pass, call the API
    try {
      await api.post('/reset-password', {
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

  // Check if the two password fields match
  const passwordsMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;

  // Check if newPassword meets requirements
  const newPasswordValid = passwordMeetsRequirements(newPassword);

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

        {/* Show a warning if password does not meet requirements */}
        {newPassword && !newPasswordValid && (
          <p style={{ color: 'red' }}>
            Password must be at least 8 characters, include a number, and a special character.
          </p>
        )}

        {/* Show a warning if both fields are filled and do not match */}
        {newPassword && confirmPassword && !passwordsMatch && (
          <p style={{ color: 'red' }}>Passwords do not match</p>
        )}

        {/* Disable the button if password is invalid or passwords don't match */}
        <button type="submit" disabled={!newPasswordValid || !passwordsMatch}>
          Reset Password
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
    </div>
  );
};
