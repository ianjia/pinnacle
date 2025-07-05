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
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider, initializeAuthToken } from './auth';

initializeAuthToken();

/* 1 ─ Brand palette (same values you supplied) */
const myBrand: BrandVariants = {
  10: '#003D3C',  20: '#027371',  30: '#049C99',  40: '#06C4C1',
  50: '#07DFDB',  60: '#21E6E2',  70: '#4EECEA',  80: '#79F1EF',
  90: '#A3F6F5', 100: '#CCFBFA', 110: '#E6FEFD', 120: '#F0FFFE',
  130: '#F5FFFE', 140: '#FAFFFE', 150: '#FDFFFE', 160: '#FFFFFF',
};

/* 2 ─ Theme objects */
const lightTheme = createLightTheme(myBrand);
const darkTheme  = createDarkTheme(myBrand);

/* 3 ─ Root component */
const Root: React.FC = () => {
  // start with system preference
  const [isDarkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  // listen for later system changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (ev: MediaQueryListEvent) => setDarkMode(ev.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // manual toggle (wired into App)
  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <AuthProvider>
      <FluentProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <Provider store={store}>
          <App toggleTheme={toggleTheme} />
        </Provider>
      </FluentProvider>
    </AuthProvider>
  );
};

/* 4 ─ Bootstrap */
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Root />);

// Todo: what is this? should I just delete it?
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
