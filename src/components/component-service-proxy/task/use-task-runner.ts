import { useState, useRef } from 'react';
import { SERVER_URL } from '../port-url-config';
import { ITaskRequest } from './request-types';
import { TaskResult } from './result-types';
import { api } from '../../../auth';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { alertDialogActions } from '../../../store';

interface UseTaskRunnerParams {
  taskType: string;
  requestData: ITaskRequest;
  onResult: (resultData: TaskResult) => void;
}
interface UseTaskRunnerReturn {
  startTask: () => void;
  showModal: boolean;
  progressMessage: string;
}

const TIMEOUT_DURATION = 150_000;
const FETCH_TIMEOUT_DURATION = 60_000;
const POLL_INTERVAL = 3_000;

export const useTaskRunner = ({
  taskType,
  requestData,
  onResult,
}: UseTaskRunnerParams): UseTaskRunnerReturn => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [progressMessage, setProgressMessage] =
    useState('Talking to server …');

  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const taskIdRef = useRef<string>();
  const inFlightRef = useRef(false);

  const resetOverallTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleTimeout, TIMEOUT_DURATION);
  };
  const handleTimeout = () => {
    cleanup();
    dispatch(
      alertDialogActions.showAlert({
        title: 'Time-out',
        message: 'Request took too long, please try again later.',
      })
    );
  };
  const cleanup = () => {
    setShowModal(false);
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    pollIntervalRef.current = null;
    timeoutRef.current = null;
    taskIdRef.current = undefined;
    inFlightRef.current = false;
  };

  /* ---------- polling tick ---------- */
  const poll = async () => {
    if (inFlightRef.current) return; // skip overlapping calls
    inFlightRef.current = true;

    try {
      const { data, status } = await api.get(
        `${SERVER_URL}/api/v1/task/progress`,
        { params: { taskId: taskIdRef.current } }
      );

      if (status === 202 || data.status === 'pending' || !data.status) {
        /* still running – leave spinner text as-is */
        resetOverallTimeout();
      } else if (data.status === 'complete') {
        setProgressMessage('complete');
        onResult(data.result);
        cleanup();
        return;
      } else if (data.status === 'failed') {
        dispatch(
          alertDialogActions.showAlert({
            title: 'Task Failed',
            message: 'Task failed on the server. Please try again later.',
          })
        );
        cleanup();
        return;
      } else {
        setProgressMessage(data.status ?? 'running');
        resetOverallTimeout();
      }
    } catch (err) {
      console.error('Polling error', err);
      /* keep polling after transient error */
    } finally {
      inFlightRef.current = false;   // <-- crucial: always clear the flag
    }
  };

  /* ---------- startTask ---------- */
  const startTask = async () => {
    try {
      setProgressMessage('Talking to server …');
      setShowModal(true);

      const controller = new AbortController();
      const abortId = setTimeout(
        () => controller.abort(),
        FETCH_TIMEOUT_DURATION
      );

      const resp = await api.post(
        `${SERVER_URL}/api/v1/task/schedule`,
        { taskType, requestData },
        { signal: controller.signal }
      );
      clearTimeout(abortId);

      taskIdRef.current = resp.data.taskId;
      resetOverallTimeout();

      poll();                                        // first tick
      pollIntervalRef.current = setInterval(poll, POLL_INTERVAL);
    } catch (error: any) {
      setShowModal(false);

      if (error.name === 'AbortError') {
        dispatch(
          alertDialogActions.showAlert({
            title: 'Backend slow',
            message: 'Request aborted, try again later.',
          })
        );
        return;
      }

      let code: string | undefined;
      if (axios.isAxiosError(error) && error.response) {
        code =
          (error.response.headers['x-error-code'] as string | undefined) ??
          (error.response.headers['X-Error-Code'] as string | undefined);
      }
      if (code === 'INSUFFICIENT_CREDITS') {
        dispatch(
          alertDialogActions.showAlert({
            title: 'Insufficient Credits',
            message: 'Please top-up and try again.',
          })
        );
        return;
      }
      if (code === 'WALLET_NOT_FOUND') {
        dispatch(
          alertDialogActions.showAlert({
            title: 'Wallet Not Found',
            message: 'Could not locate your credit wallet.',
          })
        );
        return;
      }
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        dispatch(
          alertDialogActions.showAlert({
            title: 'Rate limit exceeded',
            message: 'Please wait before trying again.',
          })
        );
        return;
      }

      console.error('startTask failed', error);
      dispatch(
        alertDialogActions.showAlert({
          title: 'Backend error',
          message: 'Could not start task, please try again.',
        })
      );
    }
  };

  return { startTask, showModal, progressMessage };
};
