import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
} from '@fluentui/react-components';
import { api } from '../auth';
import { useStyles } from './hooks/use-login-register-modal-styles';
import { passwordMeetsRequirements } from './utils/password-validator';
import { TermsScrollArea } from './utils/terms-area';

interface RegisterModalContentProps {
  onSuccess?: () => void;
}

// ─────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────
export const RegisterModalContent: React.FC<RegisterModalContentProps> = ({
  onSuccess,
}) => {
  const styles = useStyles();

  // form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // feedback
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // dialog
  const [showTerms, setShowTerms] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const resetMessages = () => {
    setError('');
    setSuccess('');
  };

  const preValidate = () => {
    if (!passwordMeetsRequirements(password)) {
      setError(
        'Password must be at least 8 characters, include a number, and a special character.',
      );
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  // 1️⃣ First click — just open the dialog
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    if (preValidate()) {
      setAgreed(false);
      setShowTerms(true);
    }
  };

  // 2️⃣ Second click — API call
  const handleContinue = useCallback(async () => {
    if (!agreed || submitting) return;
    setSubmitting(true);
    resetMessages();
    try {
      await api.post('/register', { email, password });
      setSuccess('Registration successful!');
      setShowTerms(false);
      setTimeout(() => onSuccess?.(), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed, try again later');
    } finally {
      setSubmitting(false);
    }
  }, [agreed, submitting, email, password, onSuccess]);

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const passwordValid = passwordMeetsRequirements(password);

  return (
    <>
      {/* ──────────── sign-up form ──────────── */}
      <div className={styles.container}>
        <h2>Sign Up</h2>

        <form onSubmit={handleRegister} className={styles.form}>
          <input
            type="text"
            placeholder="Email (Use real email, in case you need to reset password)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className={styles.input}
            required
          />

          {password && !passwordValid && (
            <p className={styles.error}>
              Password must be at least 8 characters, include a number, and a
              special character.
            </p>
          )}
          {password && confirmPassword && !passwordsMatch && (
            <p className={styles.error}>Passwords do not match</p>
          )}
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <Button
            appearance="primary"
            type="submit"
            disabled={!passwordValid || !passwordsMatch}
          >
            Register
          </Button>
        </form>
      </div>

      {/* ──────────── terms dialog ──────────── */}
      <Dialog
        open={showTerms}
        modalType="modal"
        onOpenChange={(_, data) => setShowTerms(data.open)}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Terms &amp; Policies</DialogTitle>

            <DialogContent>
              <TermsScrollArea />
              <Checkbox
                label="I have read and agree to the Terms and Policies"
                checked={agreed}
                onChange={(_, d) => setAgreed(!!d.checked)}
                style={{ marginTop: 12 }}
              />
            </DialogContent>

            <DialogActions>
              <Button
                appearance="primary"
                onClick={handleContinue}
                disabled={!agreed || submitting}
              >
                Continue
              </Button>
              <Button onClick={() => setShowTerms(false)} disabled={submitting}>
                Cancel
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};
