import { useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../../../../auth";
import { conversationService } from "../../../component-service-proxy";
import { RootState, interviewConversationActions, store } from "../../../../store";
import { Conversation } from "../../../../shared";

// Option A: On each call, read from Redux store
export function useOnReviewCompleteCreator() {
    const dispatch = useDispatch();
    const { userId } = useContext(AuthContext);
    
    const onReviewComplete = useCallback(async (): Promise<void> => {
      try {       
        // 2) Grab the current state *inside* the callback
        const state = store.getState(); // Or use a typed hook like `useAppSelector`
        const { 
          liveConverstationId, 
          liveConversationCollege,
          liveConversationMajor,
          liveConversationItems,
          liveConversationReview
        } = state.conversation;
  
        // 3) Construct & update
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
  
      } catch (error) {
        console.error("Error saving conversation to server:", error);
        throw error;
      }
    }, [dispatch, userId]);
  
    return onReviewComplete;
  }
  