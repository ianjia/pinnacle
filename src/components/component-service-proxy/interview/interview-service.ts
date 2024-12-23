import { api } from "../../../auth";
import { SERVER_URL } from "../port-url-config";
import { InterviewStartRequest } from "./request-types";

export async function getEphemeralKey(): Promise<string> {
    try {
        const tokenResponse = await api.get(`${SERVER_URL}/api/v1/interview/session`);
        const ephemeralKey = tokenResponse.data.client_secret.value;

        return ephemeralKey;
    } catch (error) {
        console.error("Error getting ephemera key for interview:", error);
        throw error;
    }
  }

export async function getStudentProfileInStr(): Promise<string> {
    try {
        const response = await api.post(
          `${SERVER_URL}/api/v1/interview/start`,
          {
          } as InterviewStartRequest
        );
        
        // The response data is of type InterviewStartResult
        return response.data.message;  
      } catch (error) {
        console.error("Error starting interview:", error);
        throw error;
      }
}