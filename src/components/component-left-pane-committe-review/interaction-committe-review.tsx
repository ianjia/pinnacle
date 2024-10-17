import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TaskParameterType } from '../../proxy';
import { LoadingModal } from '../component-loading-modal-dialog';
import { RootState, AppDispatch, fetchCommitteeReviewData } from '../../store';
import './interaction-committe-review.css';

export const InteractionCommitteeReview: React.FC = () => {
    // Use AppDispatch to type the dispatch function correctly
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, error } = useSelector((state: RootState) => state.committeeReview);

    const taskParams: TaskParameterType = {};

    const sendData = () => {
        dispatch(fetchCommitteeReviewData(taskParams)); // Correctly typed dispatch
    };

    return (
        <div className="interaction-container">
            <h2>AI-Powered Admission Committe Review</h2>
            <div className="interaction-header">
            <button className = "review-button" onClick={sendData}>Admission Evaluation</button>
            </div>
            {isLoading && <LoadingModal isVisible={isLoading} message="Evaluating ..." />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
