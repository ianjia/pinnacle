import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, committeeReviewActions} from '../../store';
import { SpecializedProgram } from '../component-specalized-program';
import './interaction-committe-review.css';
import { getCollegeNameKey } from '../component-map';
import { CommitteeReviewRequest, ProgressModal, ResultType_CommitteeReview, TaskResultType, TaskType, useTaskRunner } from '../component-service-proxy';

export const InteractionCommitteeReview: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [collegeInput, setCollegeInput] = useState('');
    const collegeInputRef = useRef<HTMLInputElement>(null); // Reference for the input field

    const college_to_evaluate: string = useSelector((state: RootState) => state.committeeReview.college_to_evaluate);
    const major_to_evaluate: string = useSelector((state: RootState) => state.committeeReview.major_to_evalute);

    const {startTask: startReviewTask, showModal, progressMessage } = useTaskRunner({
        taskType: TaskType.CommitteReview,
        requestData: {college_name: college_to_evaluate, major: major_to_evaluate} as CommitteeReviewRequest, 
        onResult: (data: TaskResultType) => {
          dispatch(committeeReviewActions.setReviewResult(data as ResultType_CommitteeReview));
          }
        }
      )

    const handleStartReviewTask = () => {
        if (college_to_evaluate === "") {
            alert("College Name is empty, please fill in");
            return;
        }

        startReviewTask();
    };

    const handleCollegeBlur = () => {
        const matchedCollegeName = getCollegeNameKey(collegeInput); // Fuzzy search/match
        
        if (matchedCollegeName) {
            // Update collegeInput with the matched college name
            setCollegeInput(matchedCollegeName);
            dispatch(committeeReviewActions.setCollegeToEvaluate(matchedCollegeName));
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

            <ProgressModal show = {showModal} message = {progressMessage}/>

            <div className="interaction-header">
                <button className="review-button" onClick={handleStartReviewTask}>Admission Evaluation</button>
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
                    value={major_to_evaluate}
                    onPreferenceChange={(newMajor) => dispatch(committeeReviewActions.setMajorToEvaluate(newMajor))}
                />
            </div>
        </div>
    );
};
