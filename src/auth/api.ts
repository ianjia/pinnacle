import axios, {
  AxiosError,
  AxiosResponse,
  AxiosHeaders,          // the runtime class
  RawAxiosRequestHeaders // the plain-object type
} from 'axios';

import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../components/component-service-proxy';

/* ──────────────────────────────────────────────────────────────
   1.  Session-ID  (one per tab / login)
   ────────────────────────────────────────────────────────────── */
const SESSION_KEY = 'session-id';
export const sessionId: string =
  localStorage.getItem(SESSION_KEY) ??
  (() => {
    const id = uuidv4();
    localStorage.setItem(SESSION_KEY, id);
    return id;
  })();

/* ──────────────────────────────────────────────────────────────
   2.  Correlation-ID  (new every outbound HTTP request)
   ────────────────────────────────────────────────────────────── */
let lastCorrelationId = uuidv4();              // placeholder before first response
const setLastCorrelation = (id?: string) => { if (id) lastCorrelationId = id; };
const nextCorrelationId = () => uuidv4();

/* ──────────────────────────────────────────────────────────────
   3.  Axios instance
   ────────────────────────────────────────────────────────────── */
export const api = axios.create({
  baseURL: SERVER_URL,
  headers: { 'Content-Type': 'application/json' }
});

/* ----------  REQUEST interceptor  ---------- */
api.interceptors.request.use(config => {
  /* 1 ─ ensure we have a header container of the right type */
  if (!config.headers) {
    config.headers = new AxiosHeaders();     // ✅ satisfies AxiosRequestHeaders
  }

  /* 2 ─ write the two IDs */
  if (config.headers instanceof AxiosHeaders) {
    config.headers
      .set('x-session-id',  sessionId)
      .set('x-correlation-id', nextCorrelationId());
  } else {
    // (This branch is unlikely now, but keeps the code future-proof.)
    const h = config.headers as RawAxiosRequestHeaders;
    h['x-session-id']     = sessionId;
    h['x-correlation-id'] = nextCorrelationId();
  }

  return config;
});

/* ──────────────────────────────────────────────────────────────
   5.  RESPONSE interceptor chain
       a) remember correlationId echoed by the server
       b) keep your 401 handling
   ────────────────────────────────────────────────────────────── */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    setLastCorrelation(response.headers['x-correlation-id'] as string);
    return response;
  },
  (error: AxiosError) => {
    // capture correlationId even on failures
    if (error.response) {
      setLastCorrelation(error.response.headers['x-correlation-id'] as string);
      if (error.response.status === 401) {
        // Clear both header and storage to avoid stale Authorization on immediate retries
        try {
          delete api.defaults.headers.common['Authorization'];
        } catch {}
        localStorage.removeItem('token');

        alert('Please login again');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

/* ──────────────────────────────────────────────────────────────
   6.  Auth helpers
   ────────────────────────────────────────────────────────────── */
export const initializeAuthToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

/* ──────────────────────────────────────────────────────────────
   7.  Helper to let client-side code read the latest IDs
       (useful in your logToServer() implementation)
   ────────────────────────────────────────────────────────────── */
export const getIds = () => ({
  sessionId,
  correlationId: lastCorrelationId,
});
