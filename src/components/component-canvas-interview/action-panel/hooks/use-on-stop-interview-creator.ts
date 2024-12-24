import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../../../auth";
import { conversationService } from "../../../component-service-proxy";
import { interviewConversationActions, store } from "../../../../store"; // Import your store
import { Conversation } from "../../../../shared";

export function useOnStopInterviewCreator() {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  const onStopInterview = useCallback(async (): Promise<void> => {
    try {
      // 1) Get the fresh conversation state from the store
      const {
        liveConversationItems,
        liveConversationCollege,
        liveConversationMajor,
        liveConverstationId,
        liveConversationReview,
      } = store.getState().conversation;

      // 2) Build the conversation object with current data
      const conversationToCreate: Conversation = {
        id: liveConverstationId, // Might be 0 if new
        user_id: userId as number,
        college: liveConversationCollege,
        major: liveConversationMajor,
        messages: liveConversationItems,
        review: liveConversationReview,
        time: new Date().toISOString(),
      };

      // 3) Create in the backend (returns new ID)
      const newId: number = await conversationService.create(conversationToCreate);

      // 4) Update Redux with new ID
      dispatch(interviewConversationActions.setLiveConversationId(newId));

    } catch (error) {
      console.error("Error saving conversation to server:", error);
      throw error;
    }
  }, [dispatch, userId]);

  return onStopInterview;
}
