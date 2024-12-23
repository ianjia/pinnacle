
import React from 'react';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { useStyles } from './live-interview-canvas.styles';
import { ConversationReviewContainer } from '../display-combined-container/converstation-review-container';
import { InterviewActionPanel } from '../action-panel/interview-action-panel';

export const LiveInterviewCanvas: React.FC = () => {
    const conversationItems = useSelector((state: RootState) => state.conversation.liveConversationItems);
    const review: string = "test";
    const styles = useStyles();


    return (
    <div>
        <div className={styles.actionContainer}>
            <InterviewActionPanel 
            />
        </div>    
        <div className={styles.contentContainer}>
            <ConversationReviewContainer conversation={conversationItems} review = {review} />
        </div>
    </div>
    );
};
