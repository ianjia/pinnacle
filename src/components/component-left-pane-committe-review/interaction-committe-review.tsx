import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, committeeReviewActions} from '../../store';
import './interaction-committe-review.css';
import { getCollegeNameKey } from '../component-map';
import { CommitteeReviewRequest, ProgressModal, CommitteeReviewTaskResult, TaskResult, TaskType, useTaskRunner } from '../component-service-proxy';
import { DropdownCustom } from '../component-customized-fluent-ui';
import { Major } from '../../shared';

export const InteractionCommitteeReview: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [collegeInput, setCollegeInput] = useState('');
    const collegeInputRef = useRef<HTMLInputElement>(null); // Reference for the input field

    const college: string = useSelector((state: RootState) => state.committeeReview.college);
    const major: string = useSelector((state: RootState) => state.committeeReview.major);

    const {startTask: startReviewTask, showModal, progressMessage } = useTaskRunner({
        taskType: TaskType.CommitteReview,
        requestData: {college_name: college, major: major} as CommitteeReviewRequest, 
        onResult: (data: TaskResult) => {
          dispatch(committeeReviewActions.setReviewResult((data as CommitteeReviewTaskResult).review));
          }
        }
      )

    const handleStartReviewTask = () => {
        if (college === "") {
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
            dispatch(committeeReviewActions.setCollege(matchedCollegeName));
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
                    value={college}
                    ref={collegeInputRef} // Assign the ref to the input
                    onChange={(e) => setCollegeInput(e.target.value)}
                    onBlur={handleCollegeBlur} // Handle blur for both Enter and clicking outside
                    onKeyDown={handleCollegeKeyPress} // Handle Enter key press
                />
            </div>

            <div className="interaction-input">
                <label>Major:</label>
                <DropdownCustom
                    options={Major}
                    onOptionSelect={(e, option) =>
                        dispatch(committeeReviewActions.setMajor(option.optionValue as Major))
                    }
                    value={major}
                    placeHolder={undefined}
                />
            </div>
        </div>
    );
};
