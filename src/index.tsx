import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  FluentProvider,
  createLightTheme,
  createDarkTheme,
  BrandVariants,
} from '@fluentui/react-components';
import { store } from './store';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { AuthProvider, initializeAuthToken } from './auth';

initializeAuthToken();

/* ── custom brand palette ─────────────────────────────── */
export const myBrand: BrandVariants = {
  10: '#000048',  20: '#00087A',  30: '#0012B0',  40: '#1022D0',
  50: '#3333CC',  60: '#4950D6',  70: '#636BDE',  80: '#8289E7',
  90: '#A6ACF0', 100: '#C7CDF6', 110: '#D9DEF9', 120: '#E8ECFB',
 130: '#F1F3FC', 140: '#F7F7FD', 150: '#FCFCFE', 160: '#FFFFFF',
};

const lightTheme = createLightTheme(myBrand);
const darkTheme  = createDarkTheme(myBrand);

/* ── root component with theme state ───────────────────── */
const Root: React.FC = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDarkMode, setDarkMode]   = useState(prefersDark);
  const [followSystem, setFollow]   = useState(true); // true → follow browser

  /* follow browser changes only while followSystem is true */
  useEffect(() => {
    if (!followSystem) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [followSystem]);

  /* manual toggle overrides browser thereafter */
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
    setFollow(false);
  };

  return (
    <AuthProvider>
      <FluentProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <Provider store={store}>
          {/* forward the toggler to any component that needs it */}
          <App toggleTheme={toggleTheme} />
        </Provider>
      </FluentProvider>
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Root />);

reportWebVitals();
