import { api } from "../../../auth";
import { SERVER_URL } from "../port-url-config";
import { InterviewDurationPayload, InterviewStartPayload } from "./request-types";

export interface InterviewSessionInfo {
  sessionId: string;       // the “id” field
  ephemeralKey: string;    // client_secret.value
  allowedSeconds: number;    
  countdownSeconds: number;   
}

export async function createInterviewSession(): Promise<InterviewSessionInfo> {
    try {
        const { data } = await api.get(`${SERVER_URL}/api/v1/interview/session`);
        
        if (
          !data?.sessionId ||
          !data?.ephemeralKey ||
          typeof data.allowedSeconds !== 'number' ||
          typeof data.countdownSeconds !== 'number'
        ) {
          throw new Error('Malformed response from /interview/session');
        }

        return data;

    } catch (error) {
      console.error("Error creating interview session:", error);
      throw error;
    }
  }

export async function getStudentProfileInStr(): Promise<string> {
    try {
        const response = await api.post(
          `${SERVER_URL}/api/v1/interview/start`,
          {
          } as InterviewStartPayload
        );
        
        // The response data is of type InterviewStartResult
        return response.data.message;  
      } catch (error) {
        throw error; // throw, as here we do not have dispatch to call AlertDialog
      }
}

export async function reportInterviewDuration(
  payload: InterviewDurationPayload
): Promise<void> {
  try {
    await api.post(`${SERVER_URL}/api/v1/interview/duration`, payload);
  } catch (error) {
    console.error("Error reporting interview duration:", error);
    // swallow – the interview itself is already over
  }
}
