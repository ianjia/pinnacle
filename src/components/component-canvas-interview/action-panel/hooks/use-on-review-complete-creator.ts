import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../../../auth";
import { conversationService } from "../../../component-service-proxy";
import { interviewConversationActions, store } from "../../../../store";
import { Conversation, LiveConversationDisplayType } from "../../../../shared";

export function useOnReviewCompleteCreator() {
    const dispatch = useDispatch();
    const { userId } = useContext(AuthContext);
    
    const onReviewComplete = useCallback(async (): Promise<void> => {
      try {       
        const state = store.getState(); // Or use a typed hook like `useAppSelector`
        const { 
          liveConverstationId, 
          liveConversationCollege,
          liveConversationMajor,
          liveConversationItems,
          liveConversationReview
        } = state.conversation;
  
        const conversationToSave: Conversation = {
          id: liveConverstationId,
          user_id: userId as number,
          college: liveConversationCollege,
          major: liveConversationMajor,
          messages: liveConversationItems,
          review: liveConversationReview,
          time: new Date().toISOString(),
        };
  
        // though we send the whole conversation update, backend we only update the review field to DB
        await conversationService.update(conversationToSave);
        dispatch(interviewConversationActions.setActiveConversationDisplay(LiveConversationDisplayType.Review));
  
      } catch (error) {
        console.error("Error saving conversation to server:", error);
        throw error;
      }
    }, [dispatch, userId]);
  
    return onReviewComplete;
  }
  