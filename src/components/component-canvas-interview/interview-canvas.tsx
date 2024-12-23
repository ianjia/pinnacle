import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { InterviewWorkshopType } from '../../shared';
import './interview-canvas.css';
import { LiveInterviewCanvas } from './live-interview/live-interview-canvas';
import { HistoryInterviewCanvas } from './history-interview/history-interview-canvas';

export const InterviewCanvas: React.FC = () => {
    const activeWorkshop = useSelector((state: RootState) => state.conversation.activeInterviewWorkshop);

    return (
        <div className="interview-background">
            {activeWorkshop === InterviewWorkshopType.LiveInterview && <LiveInterviewCanvas/>}
            {activeWorkshop === InterviewWorkshopType.InterviewHistory && <HistoryInterviewCanvas/>}
        </div>
    );
};

