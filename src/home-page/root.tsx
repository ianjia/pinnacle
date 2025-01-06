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
      <div style={topSectionStyles.logoContainer}>
        <img src={birdie} alt="Brand Logo" style={topSectionStyles.logo} />
        <img src={birdietext} alt="Brand Logo Text" style={topSectionStyles.logoText} />
      </div>

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
    padding: '0 20px',       // add some horizontal padding
    minHeight: '120px',      // ensures enough space for logos
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '80px',
    marginRight: '10px',
  },
  logoText: {
    height: '60px',
  },
  buttonPanel: {
    display: 'flex',
    gap: '10px',
    marginRight: '20px',
  },
  button: {
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

const MiddleSection: React.FC = () => {
  return (
    <div style={middleSectionStyles.container}>
      {/* 1) Image Sub-section */}
      <div style={middleSectionStyles.subBox}>
        <img src={eagle} style={middleSectionStyles.image} alt="Eagle" />
      </div>

      {/* 2) Text Sub-section (different font) */}
      <div style={middleSectionStyles.subBox}>
        <div style={middleSectionStyles.textSection1}>
          Pathway to Dream College -  Your Personalized AI Counselor
        </div>
      </div>

      {/* 3) Text Sub-section (another different font, now bullet points) */}
      <div style={middleSectionStyles.subBox}>
        <ul style={middleSectionStyles.textSection2}>
          <li>Build college list</li>
          <li>Mock interview</li>
          <li>Holistic review</li>
          <li>Essay workshop</li>
          <li>And more to come ...</li>
        </ul>
      </div>
    </div>
  );
};

const middleSectionStyles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '40px 20px', // 20px horizontal padding for some spacing
    gap: '20px',          // gap between each sub-box
    flex: 1,              // let this section expand to fill remaining space
  },
  subBox: {
    flex: 1,                      // each sub-box takes equal width
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '400px',            // optional, limit the max width
    textAlign: 'center',
    padding: '10px',              // internal padding for breathing room
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    objectFit: 'cover',
  },
  textSection1: {
    fontFamily: 'Georgia, serif', 
    fontSize: '45px',
    lineHeight: 1.4,
    wordWrap: 'break-word',
  },
  textSection2: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '20px',
    lineHeight: 1.6,
    wordWrap: 'break-word',
    textAlign: 'left',          // left-align bullet points
    listStylePosition: 'inside', // ensures bullets appear inside the container
    margin: 0,
    padding: 0,
  },
};

const BottomSection: React.FC = () => {
  return (
    <div style={bottomSectionStyles.container}>
      <p>© 2025 All rights reserved.</p>
      <p>Contact: ianjiawa@gmail.com</p>
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
