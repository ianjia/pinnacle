import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { InterviewWorkshopType } from '../../shared';
import { LiveInterviewCanvas } from './live-interview/live-interview-canvas';
import { ConversationHistoryMainContainer } from './history-interview/conversation-history-main-container';
import { useCanvasBackgroundStyles } from '../component-util';

export const InterviewCanvas: React.FC = () => {
    const activeWorkshop = useSelector((state: RootState) => state.conversation.activeInterviewWorkshop);

    const styles = useCanvasBackgroundStyles();

    return (
        <div className = {styles.container}>
            {activeWorkshop === InterviewWorkshopType.LiveInterview && <LiveInterviewCanvas/>}
            {activeWorkshop === InterviewWorkshopType.InterviewHistory && <ConversationHistoryMainContainer/>}
        </div>
    );
};

