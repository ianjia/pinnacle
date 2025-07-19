// Auth provider that:
//
// • Lets users log in normally (token is kept in localStorage for API calls).
// • Clears that token on every refresh / tab close (via beforeunload),
//   so a browser refresh forces a fresh login and the app redirects to “/”.
// • Still enforces inactivity and JWT‑expiry auto‑logout.

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { setAuthToken } from './api';
import { jwtDecode } from 'jwt-decode';
import { logoutAction } from '../store/auth-slice';
import { useDispatch } from 'react-redux';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */
interface DecodedToken {
  user_id: number;
  role: 'user' | 'admin';
  exp?: number; // seconds since Unix epoch
}

interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  role: 'user' | 'admin' | null;
  loginUser: (token: string) => void;
  logout: () => void;
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userId: null,
  role: null,
  loginUser: () => {},
  logout: () => {},
});

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const INACTIVITY_LIMIT = 2 * 60 * 60 * 1000; // 2 hours (ms)

/** Read & validate token synchronously so the first render is correct */
const getInitialAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) return { ok: false, id: null, role: null, exp: undefined };

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const expired = decoded.exp && decoded.exp * 1000 <= Date.now();
    if (expired) {
      localStorage.removeItem('token');
      return { ok: false, id: null, role: null, exp: undefined };
    }

    setAuthToken(token);
    return {
      ok: true,
      id: decoded.user_id,
      role: decoded.role,
      exp: decoded.exp,
    };
  } catch {
    localStorage.removeItem('token');
    return { ok: false, id: null, role: null, exp: undefined };
  }
};

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const idleTimerId = useRef<number | null>(null);
  const reduxDispatch = useDispatch();

  /** One piece of state holding all auth info */
  const [auth, setAuth] = useState(getInitialAuth);
  const { ok: isAuthenticated, id: userId, role, exp } = auth;

  /* -------------------------- core actions ------------------------ */
  const clearToken = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  const logout = useCallback(() => {
    if (idleTimerId.current) clearTimeout(idleTimerId.current);
    clearToken();
    setAuth({ ok: false, id: null, role: null, exp: undefined });
    reduxDispatch(logoutAction()); 
  }, [reduxDispatch]);

  const resetInactivityTimer = useCallback(() => {
    if (idleTimerId.current) clearTimeout(idleTimerId.current);
    idleTimerId.current = window.setTimeout(logout, INACTIVITY_LIMIT);
  }, [logout]);

  /* --------- schedule auto‑logout for expiry / inactivity --------- */
  useEffect(() => {
    if (!isAuthenticated) return;

    const now = Date.now();
    let jwtRemaining = exp ? exp * 1000 - now : INACTIVITY_LIMIT;
    if (jwtRemaining < 0) jwtRemaining = 0;

    const firstTimeout = Math.min(jwtRemaining, INACTIVITY_LIMIT);
    idleTimerId.current = window.setTimeout(logout, firstTimeout);

    return () => {
      if (idleTimerId.current) clearTimeout(idleTimerId.current);
    };
  }, [isAuthenticated, exp, logout]);

  /* --------- rolling inactivity timeout (mouse / key / touch) ----- */
  useEffect(() => {
    if (!isAuthenticated) return;

    const events = [
      'mousemove',
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
    ] as const;

    events.forEach(e => window.addEventListener(e, resetInactivityTimer));
    resetInactivityTimer(); // kick‑off timer immediately

    return () => {
      events.forEach(e => window.removeEventListener(e, resetInactivityTimer));
      if (idleTimerId.current) clearTimeout(idleTimerId.current);
    };
  }, [isAuthenticated, resetInactivityTimer]);

  /* ------------- clear token whenever the tab is refreshed -------- */
  useEffect(() => {
    const handleUnload = () => clearToken();
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  /* ----------------------------- login ---------------------------- */
  const loginUser = (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);

      setAuthToken(token);            // sets default header for api client
      localStorage.setItem('token', token);

      setAuth({
        ok: true,
        id: decoded.user_id,
        role: decoded.role,
        exp: decoded.exp,
      });

      resetInactivityTimer();
    } catch (err) {
      console.error('Failed to log in user:', err);
      logout();
    }
  };

  /* ----------------------------- UI ------------------------------- */
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, role, loginUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};


