import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Button,
  FluentProvider,
  useFluent,                 // text-direction and targetDocument
} from '@fluentui/react-components';
import { Dismiss16Regular } from '@fluentui/react-icons';
import { useModalDialogStyles } from './hooks/use-modal-dialog-styles';

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({ children, onClose }) => {
  const css       = useModalDialogStyles();
  const { dir }   = useFluent();            // ltr / rtl

  /* ── lock body scrolling while the dialog is open ───────── */
  useEffect(() => {
    const saved = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = saved;
    };
  }, []);

  /* ── render inside a new FluentProvider so tokens resolve ─ */
  return createPortal(
    <FluentProvider dir={dir}>              {/* default theme */}
      <div className={css.overlay} role="dialog" aria-modal="true">
        <div className={css.content}>
          <Button
            appearance="subtle"
            shape="circular"
            icon={<Dismiss16Regular />}
            onClick={onClose}
            className={css.closeBtn}
            aria-label="Close"
          />
          {children}
        </div>
      </div>
    </FluentProvider>,
    document.body,
  );
};
