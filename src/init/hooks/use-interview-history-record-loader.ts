import { useDispatch } from 'react-redux';
import { logError } from '../../util';
import { Conversation } from '../../shared';
import { conversationService } from '../../components/component-service-proxy';
import { interviewConversationActions } from '../../store';

export function useInterviewHistoryRecordLoader() {
    const dispatch = useDispatch();

    const loadInterviewHisotry = async (userId: number): Promise<void> => {
        try {
            const interviewHistory: Conversation[] = await conversationService.getAllByUserId(userId);
            dispatch(interviewConversationActions.setInterviewHistoryList(interviewHistory));
        } catch (error: unknown) {
            logError(error);
        }
    };

    return { loadInterviewHisotry };
}
