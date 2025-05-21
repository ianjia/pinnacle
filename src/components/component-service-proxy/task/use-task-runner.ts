import { useState, useRef } from 'react';
import { SERVER_URL } from "../port-url-config";
import { ITaskRequest } from "./request-types";
import { TaskResult } from "./result-types";
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

const TIMEOUT_DURATION = 150 * 1000; // 3 minutes
const FETCH_TIMEOUT_DURATION = 60 * 1000; // 30 seconds for fetch timeout

export const useTaskRunner = ({ taskType, requestData, onResult }: UseTaskRunnerParams): UseTaskRunnerReturn => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [progressMessage, setProgressMessage] = useState('Talking to server ...');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTask = async () => {
    try {
      // Show the modal dialog
      setShowModal(true);
      const controller = new AbortController(); // For fetch timeout
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_DURATION);

      const response = await api.post(`${SERVER_URL}/api/v1/task/schedule`, {
        taskType,
        requestData,
      });

      clearTimeout(timeoutId); // Clear the timeout on success
      const { taskId } = response.data;

      // Initialize SSE for progress updates
      const eventSource = new EventSource(`${SERVER_URL}/api/v1/task/progress?taskId=${taskId}`);

      // Helper function to reset the timeout on each message
      const resetTimeout = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setShowModal(false);
          eventSource.close();
          dispatch(
            alertDialogActions.showAlert({
              title: 'Time out',
              message: 'Request timed out, please try again later.',
            })
          );
        }, TIMEOUT_DURATION);
      };

      resetTimeout(); // Start the initial timeout

      eventSource.onmessage = (event) => {
        resetTimeout(); // Reset timeout on every message
        const data = JSON.parse(event.data);
        setProgressMessage(`${data.status}`);

        if (data.status === 'complete') {
          onResult(data.result);
          setShowModal(false);
          eventSource.close();
          if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear timeout on complete
        } else if (data.status === 'failed') {
          setShowModal(false);
          eventSource.close();
          if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear timeout on failure
          dispatch(
            alertDialogActions.showAlert({
              title: 'Task Schedule Failed on Server',
              message: 'Task could not be scheduled, please try again later.',
            })
          );          
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE Error:', error);
        setProgressMessage('An error occurred.');
        setShowModal(false);
        eventSource.close();
        if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear timeout on error
      };
    } catch (error: any) {
      setShowModal(false);
      // First, check if it's a fetch abort error
      if (error.name === 'AbortError') {
        console.error('Fetch aborted:', error);
        dispatch(
          alertDialogActions.showAlert({
            title: 'Request Aborted on Backend',
            message: 'Request took too long, please try again later.',
          })
        ); 
        return;
      }

      const code = error.response.headers['x-error-code'] as string | undefined;

      switch (code) {
        case 'INSUFFICIENT_CREDITS':
          dispatch(alertDialogActions.showAlert({
            title: 'Insufficient Credits',
            message: 'You do not have enough credits to run this task. Please top up and try again.',
          }));
          return;
    
        case 'WALLET_NOT_FOUND':
          dispatch(alertDialogActions.showAlert({
            title: 'Wallet Not Found',
            message: 'We could not locate your credit wallet. Please contact support.',
          }));
          return;
      }

      // Next, check if it's an AxiosError with 429 status
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        dispatch(
          alertDialogActions.showAlert({
            title: 'Rate Limit Exceeded',
            message: 'Rate limit exceeded. Please wait before trying again.',
          })
        ); 

        console.error("Rate Limit Exceeded:", error.response.data);

        return;
      } else {
        dispatch(
          alertDialogActions.showAlert({
            title: 'Could not start task on backend',
            message: 'Could not start task on backend, please try again.',
          })
        ); 
        console.error('Error in startTask:', error);

        return;
      }
    }
  };

  return {
    startTask,
    showModal,
    progressMessage,
  };
};
