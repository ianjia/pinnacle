
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Input, Button, CardPreview, Field} from '@fluentui/react-components';
import { getCollegeNameKey } from '../../component-map';
import { committeeReviewActions, RootState } from '../../../store';
import { useStyles } from './committee-review-action-panel.styles';
import { DropdownCustom } from '../../component-customized-fluent-ui';
import { Major } from '../../../shared';

import { CommitteeReviewRequest, CommitteeReviewTaskResult, ProgressModal, TaskResult, TaskType, useTaskRunner } from '../../component-service-proxy';
import { useOnReviewCompleteCreator } from './hooks/use-on-review-complete-creator';

export const CommitteeReviewActionPanel: React.FC = () => {
  const dispatch = useDispatch();
  const styles = useStyles();

  const liveCollege: string = useSelector(
    (state: RootState) => state.committeeReview.liveReviewCollege
  );
  const liveMajor: string = useSelector(
    (state: RootState) => state.committeeReview.liveReviewMajor
  );

  const liveId: number = useSelector(
    (state: RootState) => state.committeeReview.liveReviewId
  );

  // Local states
  const [collegeInput, setCollegeInput] = useState(liveCollege);
  const collegeInputRef = useRef<HTMLInputElement>(null);

  const onReviewComplete = useOnReviewCompleteCreator();

  const {startTask: startCommitteeReviewTask, showModal, progressMessage } = useTaskRunner({
    taskType: TaskType.CommitteReview,
    requestData: {college_name: liveCollege, major: liveMajor} as CommitteeReviewRequest, 
    onResult: (data: TaskResult) => {
      const review = (data as CommitteeReviewTaskResult).review;
      dispatch(committeeReviewActions.setLiveReviewResult(review))
      onReviewComplete();
    }
})    

  /**
   * Validate and set the college name from user input.
   */
  const handleCollegeBlur = () => {
    const matchedCollegeName = getCollegeNameKey(collegeInput);
    if (matchedCollegeName) {
      setCollegeInput(matchedCollegeName);
      dispatch(committeeReviewActions.setLiveReviewCollege(matchedCollegeName));
    } else {
      alert('The college name you entered is not valid. Please re-enter.');
    }
  };

  const handleCollegeKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      collegeInputRef.current?.blur();
    }
  };

  const handleMajorChange = (newMajor: string) => {
    dispatch(committeeReviewActions.setLiveReviewMajor(newMajor));
  };

  /**
   * For "Interview Review" button, now a local handler
   */
  const handleReviewClick = async () => {
    try {
      const matchedCollegeName = getCollegeNameKey(collegeInput);
      if (!matchedCollegeName) {
        alert("College Name not valid, please check ");
        return;
      }

      startCommitteeReviewTask();
    } catch (error) {
      console.error("Error in review flow:", error);
    }
  };

  return (
    <div className={styles.container}>
      <ProgressModal show = {showModal} message = {progressMessage}/>

      <Card className={styles.card}>
        <h2 className={styles.header} style={{ textAlign: 'left' }}>
          Action Panel
        </h2>

        <CardPreview>
          <div className={styles.grid}>
            {/* Field for College */}
            <Field label="College" className={styles.field}>
              <Input
                className={styles.input}
                ref={collegeInputRef}
                value={collegeInput}
                onChange={(e) => setCollegeInput(e.target.value)}
                onBlur={handleCollegeBlur}
                onKeyDown={handleCollegeKeyPress}
              />
            </Field>

            {/* Field for Major */}
            <Field label="Major" className={styles.field}>
              <DropdownCustom
                options={Major}
                onOptionSelect={(e, option) =>
                  handleMajorChange(option.optionValue as Major)
                }
                value={liveMajor}
                placeHolder="Select a major"
              />
            </Field>

            {/* Review Button (local handler) */}
            <Field className={styles.fieldButton}>
              <Button className={styles.buttonSmall} onClick={handleReviewClick}>
                Review
              </Button>
            </Field>
          </div>
        </CardPreview>
      </Card>
    </div>
  );
};
