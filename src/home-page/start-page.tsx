import React, { useState } from 'react';
import { Button } from '@fluentui/react-components';

import { LoginModalContent } from './login-modal-content';
import { RegisterModalContent } from './register-modal-content';
import { Modal } from './modal-dialog';

import { useStartPageShellStyles } from './hooks/use-start-page-shell-styles';
import { MiddleShowcase } from './middle/middle-showcase';

const birdie_text = '/assets/images/birdie_brand_text.png';

export const StartPage: React.FC = () => {
  const css  = useStartPageShellStyles();
  const [open, setOpen] = useState<'signin' | 'signup' | null>(null);

  return (
    <div className={css.root}>
      {/* ── TOP ───────────────────────────────── */}
      <header className={css.top}>
        <div className={css.logoGroup}>
          <img src={birdie_text} alt="Birdie text" className={css.logoText} />
        </div>

        <div className={css.topButtons}>
          <Button appearance="primary" size="large" onClick={() => setOpen('signin')}>Sign In</Button>
          <Button appearance="primary" size="large" onClick={() => setOpen('signup')}>Sign Up</Button>
        </div>
      </header>

      {/* ── MIDDLE (new, encapsulated) ───────── */}
      <MiddleShowcase />

      {/* ── FOOTER ───────────────────────────── */}
      <footer className={css.footer}>
        © 2025 All rights reserved.  Contact: birdie.counselor@gmail.com
      </footer>

      {/* ── MODALS ───────────────────────────── */}
      {open === 'signin' && (
        <Modal onClose={() => setOpen(null)}>
          <LoginModalContent onSuccess={() => setOpen(null)} />
        </Modal>
      )}
      {open === 'signup' && (
        <Modal onClose={() => setOpen(null)}>
          <RegisterModalContent onSuccess={() => setOpen(null)} />
        </Modal>
      )}
    </div>
  );
};
