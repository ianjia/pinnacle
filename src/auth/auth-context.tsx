import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { setAuthToken } from './api';
import { jwtDecode } from 'jwt-decode';


interface DecodedToken {
  user_id: number;
  role: 'user' | 'admin';
  exp?: number;              // seconds since Unix epoch
}

interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  role: 'user' | 'admin' | null;
  loginUser: (token: string) => void;
  logout: () => void;
}

/* ------------------------------------------------------------------ */
/*  Context                                                           */
/* ------------------------------------------------------------------ */
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userId: null,
  role: null,
  loginUser: () => {},
  logout: () => {},
});

/* ------------------------------------------------------------------ */
/*  Provider                                                          */
/* ------------------------------------------------------------------ */
const INACTIVITY_LIMIT = 2 * 60 * 60 * 1000;    // 2 hours in ms

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /* ------------------------------- helpers ------------------------ */
  const clearToken = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  const idleTimerId = useRef<number | null>(null);

  const logout = useCallback(() => {
    if (idleTimerId.current) clearTimeout(idleTimerId.current);
    clearToken();
    setIsAuthenticated(false);
    setUserId(null);
    setRole(null);
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (idleTimerId.current) clearTimeout(idleTimerId.current);
    idleTimerId.current = window.setTimeout(logout, INACTIVITY_LIMIT);
  }, [logout]);

  /* ------------------------------- state -------------------------- */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId]                 = useState<number | null>(null);
  const [role, setRole]                     = useState<
    'user' | 'admin' | null
  >(null);

  /* --------------------- token validation on mount ---------------- */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    let decoded: DecodedToken;
    try {
      decoded = jwtDecode<DecodedToken>(token);
    } catch {
      logout();
      return;
    }

    if (decoded.exp && decoded.exp * 1000 <= Date.now()) {
      logout();
      return;
    }

    // token is valid
    setAuthToken(token);
    setIsAuthenticated(true);
    setUserId(decoded.user_id);
    setRole(decoded.role);

    // schedule auto logout at JWT expiry if sooner than inactivity limit
    const jwtRemaining = decoded.exp
      ? decoded.exp * 1000 - Date.now()
      : INACTIVITY_LIMIT;
    const firstTimeout = Math.min(jwtRemaining, INACTIVITY_LIMIT);
    idleTimerId.current = window.setTimeout(logout, firstTimeout);
  }, [logout]);

  /* --------------- beforeunload: clear token on refresh ----------- */
  useEffect(() => {
    const handleUnload = () => clearToken();
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  /* --------------- inactivity listener (rolling timeout) ---------- */
  useEffect(() => {
    const events = [
      'mousemove',
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
    ] as const;

    events.forEach(evt => window.addEventListener(evt, resetInactivityTimer));
    resetInactivityTimer(); // start immediately on mount

    return () => {
      events.forEach(evt =>
        window.removeEventListener(evt, resetInactivityTimer),
      );
      if (idleTimerId.current) clearTimeout(idleTimerId.current);
    };
  }, [resetInactivityTimer]);

  /* ------------------------------ login --------------------------- */
  const loginUser = (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);

      setAuthToken(token);
      localStorage.setItem('token', token);

      setIsAuthenticated(true);
      setUserId(decoded.user_id);
      setRole(decoded.role);

      resetInactivityTimer();
    } catch (err) {
      console.error('Failed to log in user', err);
      logout();
    }
  };

  /* ------------------------------ UI ------------------------------ */
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, role, loginUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
