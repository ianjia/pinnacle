import React from 'react';

interface ProgressModalProps {
  show: boolean;
  message?: string;
}

export const ProgressModal: React.FC<ProgressModalProps> = ({ show, message}) => {
  if (!show) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <p style={modalStyles.message}>{message}</p>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#fff',
    padding: '30px',
    width: '300px',
    height: '100px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',   // Center the message both horizontally and vertically
    textAlign: 'center' as 'center',
  },
  message: {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#333',
    margin: 0,                 // Remove default margin from the <p> tag
  },
};
