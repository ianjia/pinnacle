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
export const myBrand: BrandVariants = {
  10:  '#000048',
  20:  '#00087A',
  30:  '#0012B0',
  40:  '#1022D0',
  50:  '#3333CC',   // ← key accent
  60:  '#4950D6',
  70:  '#636BDE',
  80:  '#8289E7',
  90:  '#A6ACF0',
 100:  '#C7CDF6',
 110:  '#D9DEF9',
 120:  '#E8ECFB',
 130:  '#F1F3FC',
 140:  '#F7F7FD',
 150:  '#FCFCFE',
 160:  '#FFFFFF',
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
