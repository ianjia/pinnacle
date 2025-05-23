import React from 'react';

interface ProgressModalProps {
  show: boolean;
  message?: string;
}

export const ProgressModal: React.FC<ProgressModalProps> = ({ show, message }) => {
  if (!show) return null;

  return (
    <>
      <style>
        {`
          @keyframes slide {
            0%   { background-position-x: -200%; }
            100% { background-position-x: 200%; }
          }
          .progress-banner {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 12px;
            background: linear-gradient(
              90deg,
              rgba(59,130,246,0)   0%,
              rgba(59,130,246,0.6) 50%,
              rgba(59,130,246,0) 100%
            );
            background-size: 200% 100%;
            animation: slide 2s linear infinite;
            pointer-events: none;
          }
        `}
      </style>

      <div style={modalStyles.overlay}>
        <div style={modalStyles.content}>
          <p style={modalStyles.message}>{message ?? 'Working…'}</p>
          <div className="progress-banner" />
        </div>
      </div>
    </>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  content: {
    position: 'relative' as const,
    backgroundColor: '#fff',
    padding: '40px 50px',  
    width: '320px',      
    minHeight: '100px',    
    borderRadius: '10px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
    textAlign: 'center' as const,
  },
  message: {
    fontSize: 18,
    color: '#333',
    margin: 0,
  },
};
