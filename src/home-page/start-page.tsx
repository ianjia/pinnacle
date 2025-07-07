import React, { useState } from 'react';
import { Button } from '@fluentui/react-components';

import { LoginModalContent } from './login-modal-content';
import { RegisterModalContent } from './register-modal-content';
import { useStartPageStyles } from './hooks/use-start-page-styles';
import { Modal } from './modal-dialog';

const birdie_img  = '/assets/images/birdie_brand.png';
const birdie_text = '/assets/images/birdie_brand_text.png';
const eagle       = '/assets/images/eagle.jpg';

export const StartPage: React.FC = () => {
  const css  = useStartPageStyles();
  const [open, setOpen] = useState<'signin' | 'signup' | null>(null);

  return (
    <div className={css.root}>
      {/* ── TOP ───────────────────────────────── */}
      <header className={css.top}>
        <div className={css.logoGroup}>
          <img src={birdie_img}  alt="Birdie logo" className={css.logo} />
          <img src={birdie_text} alt="Birdie text" className={css.logoText} />
        </div>

        <div className={css.topButtons}>
          <Button appearance="primary"  onClick={() => setOpen('signin')}>Sign In</Button>
          <Button appearance="primary"  onClick={() => setOpen('signup')}>Sign Up</Button>
        </div>
      </header>

      {/* ── MIDDLE ───────────────────────────── */}
      <section className={css.middle}>
        <div className={css.middleBox}>
          <img src={eagle} alt="Eagle soaring" className={css.eagle} />
        </div>

        <div className={css.middleBox}>
          <h1 className={css.headline}>
            Plan Your College Path –<br />Your Personalized AI College Guide
          </h1>
          <span className={css.note}>
            Note: Advice is informational only and does not guarantee admission.
          </span>
        </div>

        <div className={css.middleBox}>
          <ul className={css.bulletList}>
            <li>Build college list</li>
            <li>Mock interview</li>
            <li>Holistic review</li>
            <li>Essay workshop</li>
            <li>…and more to come</li>
          </ul>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <footer className={css.bottom}>
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
