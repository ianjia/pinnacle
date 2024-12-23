
import React from 'react';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { useStyles } from './live-interview-canvas.styles';
import { ConversationReviewContainer } from '../display-combined-container/converstation-review-container';
import { useInterviewActions } from '../hooks/use-interview-actions';
import { InterviewActionPanelProps } from '../action-panel/interview-action-panel.types';
import { InterviewActionPanel } from '../action-panel/interview-action-panel';

export const LiveInterviewCanvas: React.FC = () => {
    const conversation = useSelector((state: RootState) => state.conversation.conversation);
    const review: string = "test";
    const styles = useStyles();

    const actionProps: InterviewActionPanelProps = useInterviewActions();

    return (
    <div>
        <div className={styles.actionContainer}>
            <InterviewActionPanel 
                {...actionProps}
            />
        </div>    
        <div className={styles.contentContainer}>
            <ConversationReviewContainer conversation={conversation} review = {review} />
        </div>
    </div>
    );
};
