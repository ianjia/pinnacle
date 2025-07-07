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
  Input,
} from '@fluentui/react-components';

import { api } from '../auth';
import { useLoginRegisterStyles } from './hooks/use-login-register-modal-styles';
import { passwordMeetsRequirements } from './utils/password-validator';
import { TermsScrollArea } from './utils/terms-area';

interface Props { onSuccess?: () => void; }

export const RegisterModalContent: React.FC<Props> = ({ onSuccess }) => {
  const styles = useLoginRegisterStyles();

  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [confirmPassword, setConfirmPwd]  = useState('');
  const [error, setError]                 = useState('');
  const [success, setSuccess]             = useState('');

  const [showTerms, setShowTerms] = useState(false);
  const [agreed, setAgreed]       = useState(false);
  const [busy, setBusy]           = useState(false);

  const pwdValid = passwordMeetsRequirements(password);
  const match    = password && confirmPassword && password === confirmPassword;

  const clearMsg = () => { setError(''); setSuccess(''); };

  /* first click */
  const openTerms = (e: React.FormEvent) => {
    e.preventDefault();
    clearMsg();
    if (!pwdValid)  { setError('Password must be ≥8 chars, include a number & symbol.'); return; }
    if (!match)     { setError('Passwords do not match'); return; }
    setAgreed(false);
    setShowTerms(true);
  };

  /* continue inside dialog */
  const handleContinue = useCallback(async () => {
    if (!agreed || busy) return;
    setBusy(true); clearMsg();
    try {
      await api.post('/register', { email, password });
      setSuccess('Registration successful!');
      setShowTerms(false);
      setTimeout(() => onSuccess?.(), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setBusy(false); }
  }, [agreed, busy, email, password, onSuccess]);

  return (
    <>
      {/* sign-up form */}
      <div className={styles.container}>
        <h2>Sign Up</h2>

        <form onSubmit={openTerms} className={styles.form}>
          <Input
            placeholder="Email (use real email for reset)"
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
          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(_, v) => setConfirmPwd(v.value)}
            className={styles.input}
            required
          />

          {password && !pwdValid      && <p className={styles.error}>Password must be ≥8 chars, include a number &amp; symbol.</p>}
          {password && confirmPassword && !match && <p className={styles.error}>Passwords do not match</p>}
          {error   && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <Button appearance="primary" type="submit" className={styles.button} disabled={!pwdValid || !match}>
            Register
          </Button>
        </form>
      </div>

      {/* terms dialog */}
      <Dialog open={showTerms} modalType="modal" onOpenChange={(_, d) => setShowTerms(d.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Terms &amp; Policies</DialogTitle>

            <DialogContent>
              <TermsScrollArea />
              <Checkbox
                label="I have read and agree"
                checked={agreed}
                onChange={(_, d) => setAgreed(!!d.checked)}
                className={styles.checkboxSpacing}
              />
            </DialogContent>

            <DialogActions>
              <Button appearance="primary" onClick={handleContinue} disabled={!agreed || busy}>
                Continue
              </Button>
              <Button onClick={() => setShowTerms(false)} disabled={busy}>
                Cancel
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};
