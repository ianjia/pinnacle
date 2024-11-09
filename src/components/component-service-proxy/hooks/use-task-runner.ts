import { useState } from 'react';
import { SERVER_URL } from "../port-url-config";
import { ITaskRequest } from "../request-types";
import { TaskResultType } from "../result-types";

interface UseTaskRunnerParams {
  taskType: string;
  requestData: ITaskRequest;
  onResult: (resultData: TaskResultType) => void;
}

interface UseTaskRunnerReturn {
  startTask: () => void;
  showModal: boolean;
  progressMessage: string;
}

export const useTaskRunner = ({ taskType, requestData, onResult }: UseTaskRunnerParams): UseTaskRunnerReturn => {
  const [showModal, setShowModal] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');

  const startTask = async () => {
    // Initiate the task
    const response = await fetch(`${SERVER_URL}/api/v1/task/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskType, requestData }),
    });

    const { taskId } = await response.json();

    // Show the modal
    setShowModal(true);

    // Connect to SSE endpoint for progress updates
    const eventSource = new EventSource(`${SERVER_URL}/api/v1/task/progress?taskId=${taskId}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setProgressMessage(`Status: ${data.status}`);

      if (data.status === 'complete') {
        // Process result data
        onResult(data.result);
        setShowModal(false);
        eventSource.close();
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      setProgressMessage('An error occurred.');
      setShowModal(false);
      eventSource.close();
    };
  };

  return {
    startTask,
    showModal,
    progressMessage,
  };
};