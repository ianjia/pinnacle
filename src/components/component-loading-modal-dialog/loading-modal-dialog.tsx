import React from 'react';
import './loading-modal-dialog.css'

type LoadingModalProps = {
  isVisible: boolean;
  message: string
};

export const LoadingModal: React.FC<LoadingModalProps> = ({ isVisible, message }) => {
  if (!isVisible) return null;

  return (
    <div className='modalOverlay'>
      <div className='modalContent'>
        <p> { message }</p>
        <div className="loading-animation">
          <div className="spinner"></div>
        </div>
      </div>
    </div>
  );
};
