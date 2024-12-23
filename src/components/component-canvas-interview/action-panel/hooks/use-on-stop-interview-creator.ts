import { useCallback, useContext } from "react";
import { AuthContext } from "../../../../auth";
import { Conversation, ConversationItem } from "../../../../shared";
import { useDispatch, useSelector } from "react-redux";
import { interviewConversationActions, RootState } from "../../../../store";
import { conversationService } from "../../../component-service-proxy";

export function useOnStopInterviewCreator() {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  // 1. Call useSelector at the top level, not inside a callback
  const conversationItems: ConversationItem[] = useSelector(
    (state: RootState) => state.conversation.liveConversationItems
  );
  const conversationCollege: string = useSelector(
    (state: RootState) => state.conversation.liveConversationCollege
  );
  const conversationMajor: string = useSelector(
    (state: RootState) => state.conversation.liveConversationMajor
  );

  // 2. Pass everything your callback needs in the dependency array
  const onStopInterviewCreator = useCallback(async (): Promise<void> => {
    try {
      const newConversation: Conversation = {
        id: 0,
        user_id: userId as number,
        college: conversationCollege,
        major: conversationMajor,
        messages: conversationItems,
        review: undefined,
        time: new Date().toISOString(),
      };

      const id: number = await conversationService.create(newConversation);
      newConversation.id = id;

      dispatch(interviewConversationActions.setLiveConversationId(id));
    } catch (error) {
      console.error('Error saving conversation to server:', error);
      throw error;
    }
  }, [dispatch, userId, conversationItems, conversationCollege, conversationMajor]);

  return onStopInterviewCreator;
}