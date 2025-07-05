import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { InterviewWorkshopType } from '../../shared';
import { LiveInterviewCanvas } from './live-interview/live-interview-canvas';
import { ConversationHistoryMainContainer } from './history-interview/conversation-history-main-container';
export const InterviewCanvas: React.FC = () => {
    const activeWorkshop = useSelector((state: RootState) => state.conversation.activeInterviewWorkshop);

    return (
        <div>
            {activeWorkshop === InterviewWorkshopType.LiveInterview && <LiveInterviewCanvas/>}
            {activeWorkshop === InterviewWorkshopType.InterviewHistory && <ConversationHistoryMainContainer/>}
        </div>
    );
};

