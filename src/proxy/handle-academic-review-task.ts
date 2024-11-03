import {TaskReturnType } from "./task-result-types";
import {MIDDLE_SERVER_URL} from '../common';
import { ITaskParameterWithCollegeAndMajor } from "./task-parameter-types";

export async function handleAcademicReviewTask(_params: ITaskParameterWithCollegeAndMajor): Promise<TaskReturnType> {
    try {
        // Send request to Server 1 to initiate the task
        const response = await fetch(`${MIDDLE_SERVER_URL}/api/start-task`, { method: 'POST' });
        const data = await response.json();
        const taskId = data.taskId;

        // Poll for task status without blocking UI, though in HomePage we are using a modal dialog, in the future, potentially we could change by removing that modal dialog
        const resultRes = await pollTaskStatus(taskId);

        return {result: resultRes.result, error: resultRes.error};
    } catch (error) {
        console.error('Error:', error);
        return {error: 'Error fetching task status:'}
    }
}

async function pollTaskStatus(taskId: string): Promise<TaskReturnType>  {
    let isTaskCompleted = false;

    while (!isTaskCompleted) {
        await sleep(2000); 

        try {
        const statusResponse = await fetch(`${MIDDLE_SERVER_URL}/api/task-status/${taskId}`, { method: 'GET' });
        const statusData = await statusResponse.json();

        if (statusData.status === 'completed') {
            isTaskCompleted = true;
            return { result: statusData.result}
        } else if (statusData.status === 'failed') {
            isTaskCompleted = true;
            return { error: statusData.error}
        } 
        } catch (error) {
            console.error('Error fetching task status:', error);
            return {error: 'Error fetching task status:'}
        }
    }

    return {error: 'Error fetching task status - though task complete'}
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  