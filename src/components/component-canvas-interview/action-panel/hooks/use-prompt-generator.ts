import { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { alertDialogActions, RootState } from "../../../../store";
import { getStudentProfileInStr } from '../../../component-service-proxy';
import axios from 'axios';


function getSystemPrompt(college: string) : string {
    return `Your are a college admission officer representing ${college}, you are now playing the role of an interviewer. \
    and going to interview a high school student. You will be provided with details about the student's background and application information. \
    Please conduct the interview by asking well designed questions and answering student's questions. Your questions should be able to help find \
    out whether this student is a good fit for the college and whether the candidate should be admitted. Please limit the interview within 15 minutes. \
    Of course, if there is strong signal that the student does not fit, you could end the interview early. `;
}

 // Returns an async prompt function which will be called to generate prompt to be sent to OpenAI realtimie backend as session instruction.
 export function usePromptGenerator() {
    const dispatch = useDispatch();
    const converstationCollege: string = useSelector(
      (state: RootState) => state.conversation.liveConversationCollege
    );
    const converstationMajor: string = useSelector(
      (state: RootState) => state.conversation.liveConversationMajor
    );
  
    const promptGenerator = useCallback(async (): Promise<string> => {
      try {
        const system_prompt: string = getSystemPrompt(converstationCollege);
        const major_info: string = `Regarding the major that the student is going to apply: ${converstationMajor} `;
        const student_profile: string = await getStudentProfileInStr();
  
        const finalPrompt: string = system_prompt + major_info + student_profile;
        return finalPrompt;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 429) {
          console.error("Rate Limit Exceeded:", error.response.data);
          dispatch(
            alertDialogActions.showAlert({
              title: 'Rate Limit Exceeded',
              message: 'You have exceeded the rate limit. Please wait before trying again.',
            })
          );
        } else {
          console.error("Error starting interview:", error);
          dispatch(
            alertDialogActions.showAlert({
              title: 'Service Error',
              message: 'Could not get prompt response from server side, try again.',
            })
          );
        }

        throw error;
      }
    }, [dispatch, converstationCollege, converstationMajor]);
  
    return promptGenerator;
  }