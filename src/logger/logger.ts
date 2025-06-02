import axios from 'axios';
import { getIds } from '../auth';

export type LogLevel = 'fatal'|'error'|'warn'|'info'|'debug'|'trace';

const showConsoleLogs =
  process.env.REACT_APP_SHOW_CONSOLE_LOGS === 'true';   // ← string compare

export function logToServer(level: LogLevel, data: Record<string, unknown>) {
  const { sessionId, correlationId } = getIds();
  const payload = {
    level,
    sessionId,
    correlationId,
    utcTime: new Date().toISOString(),
    ...data,
  };

  /* echo to DevTools only in the environments that allow it */
  if (showConsoleLogs) console.log(payload);

  axios
    .post(
      '/api/logs',
      payload,
      { headers: { 'x-session-id': sessionId, 'x-correlation-id': correlationId } },
    )
    .catch(() => { 
       // no-op, log error never breaks UI
    });
}


// Catch uncaught JavaScript errors
window.addEventListener("error", (event) => {
  logToServer("error", { 
    message: event.message, 
    source: event.filename, 
    line: event.lineno, 
    col: event.colno, 
    stack: event.error?.stack 
  });
});

// Catch unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  const err = event.reason;
  logToServer("error", { 
    message: err?.message || String(event.reason), 
    stack: err?.stack 
  });
});