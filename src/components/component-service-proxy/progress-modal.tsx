import React from 'react';

interface ProgressModalProps {
  show: boolean;
  message: string;
}

export const ProgressModal: React.FC<ProgressModalProps> = ({ show, message }) => {
  if (!show) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <p>{message}</p>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex' as 'flex',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
  },
  content: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '4px',
  },
};

