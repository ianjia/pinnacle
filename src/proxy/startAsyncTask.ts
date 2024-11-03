
// Todo - this general function is not get used yet, for now directly called handle-committe-review-task, call, 
// To be refactored and use this one. 

import { ITaskParameter } from "./task-parameter-types";
import { TaskReturnType } from "./task-result-types";

export const startAsyncTask = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  handleAsyncTask: (params: ITaskParameter) => Promise<TaskReturnType>,
  params: ITaskParameter
): Promise<TaskReturnType> => {
  setIsLoading(true); // Show the modal

  try {
    // Call the passed async function with parameters
    const result = await handleAsyncTask(params);
    console.log('Task result:', result);

    return result;
  } catch (error) {
    console.error('Task error:', error);
    
    // Return an object with the error message
    return {
      error: error instanceof Error ? error.message : String(error)
    };
  } finally {
    setIsLoading(false); // Hide the modal when the task is complete
  }
};
