import { useState, useRef } from 'react';
import { SERVER_URL } from "../port-url-config";
import { ITaskRequest } from "./request-types";
import { TaskResult } from "./result-types";
import { api } from '../../../auth';

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

const TIMEOUT_DURATION = 60 * 1000; // 1 minute
const FETCH_TIMEOUT_DURATION = 30 * 1000; // 30 seconds for fetch timeout

export const useTaskRunner = ({ taskType, requestData, onResult }: UseTaskRunnerParams): UseTaskRunnerReturn => {
  const [showModal, setShowModal] = useState(false);
  const [progressMessage, setProgressMessage] = useState('Talking to server ...');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTask = async () => {
    try {
      const controller = new AbortController(); // For fetch timeout
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_DURATION);

      const response = await api.post(`${SERVER_URL}/api/v1/task/schedule`, {
        taskType,
        requestData,
      });

      clearTimeout(timeoutId); // Clear the timeout on success
      const { taskId } = response.data;

      // Show the modal dialog
      setShowModal(true);

      // Initialize SSE for progress updates
      const eventSource = new EventSource(`${SERVER_URL}/api/v1/task/progress?taskId=${taskId}`);

      // Helper function to reset the timeout on each message
      const resetTimeout = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setShowModal(false);
          eventSource.close();
          alert("Request timed out, please try again later.");
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
          alert("Task could not be scheduled, please try again later");
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE Error:', error);
        setProgressMessage('An error occurred.');
        setShowModal(false);
        eventSource.close();
        if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear timeout on error
      };
    } catch (error) {
      console.error('Error in startTask:', error);
      alert("Could not reach server, please try again later.");
    }
  };

  return {
    startTask,
    showModal,
    progressMessage,
  };
};
