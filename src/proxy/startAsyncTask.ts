import { TaskParameterType, TaskReturnType } from "./asyncTaskTypes";

export const startAsyncTask = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  handleAsyncTask: (params: TaskParameterType) => Promise<TaskReturnType>,
  params: TaskParameterType
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
