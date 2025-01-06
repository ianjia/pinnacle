import React, { useState } from 'react';
import { Modal } from './modal';
import { LoginModalContent } from './login-modal-content';
import { RegisterModalContent } from './register-modal-content';
import birdie from '../assets/images/birdie_brand.png';
import birdietext from '../assets/images/birdie_brand_text.png';
import eagle from '../assets/images/eagle.jpg';

export const Root: React.FC = () => {
  // Which modal is currently open: 'signin', 'signup', or null
  const [openModal, setOpenModal] = useState<'signin' | 'signup' | null>(null);

  const handleOpenSignIn = () => setOpenModal('signin');
  const handleOpenSignUp = () => setOpenModal('signup');
  const handleCloseModal = () => setOpenModal(null);

  return (
    <div style={styles.rootContainer}>
      {/* Top Section */}
      <TopSection onSignInClick={handleOpenSignIn} onSignUpClick={handleOpenSignUp} />

      {/* Middle Section */}
      <MiddleSection />

      {/* Bottom Section */}
      <BottomSection />

      {/* Sign In Modal */}
      {openModal === 'signin' && (
        <Modal onClose={handleCloseModal}>
          <LoginModalContent onSuccess={handleCloseModal} />
        </Modal>
      )}

      {/* Sign Up Modal */}
      {openModal === 'signup' && (
        <Modal onClose={handleCloseModal}>
          <RegisterModalContent onSuccess={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

// Example inline styles
const styles: { [key: string]: React.CSSProperties } = {
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
};

// Sub-components for layout clarity

interface TopSectionProps {
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

const TopSection: React.FC<TopSectionProps> = ({ onSignInClick, onSignUpClick }) => {
  return (
    <div style={topSectionStyles.container}>
      {/* Brand Logo */}
      <img
        src= {birdie}
        alt="Brand Logo"
        style={topSectionStyles.logo}
      />
      <img
        src= {birdietext}
        alt="Brand Logo Text"
        style={topSectionStyles.logo}
      />
      {/* Buttons */}
      <div style={topSectionStyles.buttonPanel}>
        <button style={topSectionStyles.button} onClick={onSignInClick}>
          Sign In
        </button>
        <button style={topSectionStyles.button} onClick={onSignUpClick}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

const topSectionStyles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
  },
  logo: {
    height: '100px',
  },
  buttonPanel: {
    marginRight: '200px',
  },
  button: {
    margin: '0 10px',
    padding: '8px 16px',
    cursor: 'pointer',
  },
};

const MiddleSection: React.FC = () => {
  return (
    <div style={middleSectionStyles.container}>
      {/* You could have 3 sub-sections with images or any content */}
      <div style={middleSectionStyles.subBox}>
        <img src={eagle} style={middleSectionStyles.image} 
        />
      </div>
      <div style={middleSectionStyles.subBox}>
        <img src="https://via.placeholder.com/300" alt="placeholder2" />
      </div>
      <div style={middleSectionStyles.subBox}>
        <img src="https://via.placeholder.com/300" alt="placeholder3" />
      </div>
    </div>
  );
};

const middleSectionStyles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '40px 0',
  },
  subBox: {
    margin: '0 10px',
  },
  image: {
    maxWidth: '500px',   // or a fixed width like '300px'
    height: 'auto',
    display: 'block',   // ensures extra space below image is removed
    objectFit: 'cover', // optionally crop if the container aspect ratio differs
  },
};

const BottomSection: React.FC = () => {
  return (
    <div style={bottomSectionStyles.container}>
      <p>© 2025 Your Company. All rights reserved.</p>
      <p>Contact: info@yourcompany.com</p>
    </div>
  );
};

const bottomSectionStyles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    padding: '20px',
    borderTop: '1px solid #ccc',
  },
};
