import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TaskParameterType } from '../../proxy';
import { LoadingModal } from '../component-loading-modal-dialog';
import { RootState, AppDispatch, fetchCommitteeReviewData } from '../../store';

export const InteractionCommitteeReview: React.FC = () => {
    // Use AppDispatch to type the dispatch function correctly
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, error } = useSelector((state: RootState) => state.committeeReview);

    const taskParams: TaskParameterType = {};

    const sendData = () => {
        dispatch(fetchCommitteeReviewData(taskParams)); // Correctly typed dispatch
    };

    return (
        <div>
            <button onClick={sendData}>Admission Evaluation</button>
            {isLoading && <LoadingModal isVisible={isLoading} message="Evaluating ..." />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
