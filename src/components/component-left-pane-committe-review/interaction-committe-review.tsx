import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITaskParameterWithCollegeAndMajor, TaskType } from '../../proxy';
import { LoadingModal } from '../component-loading-modal-dialog';
import { RootState, AppDispatch, fetchCommitteeReviewData, setCollegeToEvaluate, setMajorToEvaluate } from '../../store';
import { SpecializedProgram } from '../component-specalized-program';
import './interaction-committe-review.css';
import { getCollegeNameKey } from '../component-map';

export const InteractionCommitteeReview: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, error, college_to_evaluate, major_to_evalute } = useSelector((state: RootState) => state.committeeReview);

    const [collegeInput, setCollegeInput] = useState(college_to_evaluate || '');
    const collegeInputRef = useRef<HTMLInputElement>(null); // Reference for the input field

    const sendData = () => {
        if (college_to_evaluate === undefined) {
            alert("College Name is empty, please fill in");
        }
        const taskParams: ITaskParameterWithCollegeAndMajor 
            = {college_name: college_to_evaluate as string, major: major_to_evalute, taskType: TaskType.ComitteeReview};
        dispatch(fetchCommitteeReviewData(taskParams));
    };

    const handleCollegeBlur = () => {
        const matchedCollegeName = getCollegeNameKey(collegeInput);
        
        if (matchedCollegeName) {
            // Update collegeInput with the matched college name
            setCollegeInput(matchedCollegeName);
            dispatch(setCollegeToEvaluate(matchedCollegeName));
        } else {
            // Alert user if no match is found
            alert("The college name you entered is not valid. Please re-enter.");
        }
    };

    const handleCollegeKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Trigger blur to remove focus, which in turn calls handleCollegeBlur due to onBlur event
            collegeInputRef.current?.blur();
        }
    };

    return (
        <div className="interaction-container">
            <h2>AI-Powered Admission Committee Review</h2>
            <div className="interaction-header">
                <button className="review-button" onClick={sendData}>Admission Evaluation</button>
            </div>

            <div className="interaction-input">
                <label htmlFor="collegeInput">College:</label>
                <input
                    id="collegeInput"
                    type="text"
                    value={collegeInput}
                    ref={collegeInputRef} // Assign the ref to the input
                    onChange={(e) => setCollegeInput(e.target.value)}
                    onBlur={handleCollegeBlur} // Handle blur for both Enter and clicking outside
                    onKeyDown={handleCollegeKeyPress} // Handle Enter key press
                />
            </div>

            <div className="interaction-input">
                <label>Major:</label>
                <SpecializedProgram
                    value={major_to_evalute}
                    onPreferenceChange={(newMajor) => dispatch(setMajorToEvaluate(newMajor))}
                />
            </div>

            {isLoading && <LoadingModal isVisible={isLoading} message="Evaluating ..." />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
