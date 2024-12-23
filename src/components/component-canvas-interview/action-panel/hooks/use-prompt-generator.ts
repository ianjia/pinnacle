import { useCallback } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { getStudentProfileInStr } from '../../../component-service-proxy';


function getSystemPrompt(college: string) : string {
    return `Your are a college admission officer representing ${college}, you are now playing the role of an interviewer. \
    and going to interview a high school student. You will be provided with details about the student's background and application information. \
    Please conduct the interview by asking well designed questions and answering student's questions. Your questions should be able to help find \
    out whether this student is a good fit for the college and whether the candidate should be admitted. Please limit the interview within 15 minutes. \
    Of course, if there is strong signal that the student does not fit, you could end the interview early. `;
}

 // Returns an async prompt function which will be called to generate prompt to be sent to OpenAI realtimie backend as session instruction.
 export function usePromptGenerator() {
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
        console.error('Error fetching prompt from server:', error);
        throw error;
      }
    }, [converstationCollege, converstationMajor]); // <-- include them here
  
    return promptGenerator;
  }