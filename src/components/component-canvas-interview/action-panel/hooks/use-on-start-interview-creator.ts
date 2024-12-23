
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { interviewConversationActions } from "../../../../store";

export function useOnStartInterviewCreator() {
  const dispatch = useDispatch();
  
  const onStartInterview = useCallback((): void => {
      dispatch(interviewConversationActions.resetLiveConversation())

  }, [dispatch]);

  return onStartInterview;
}
