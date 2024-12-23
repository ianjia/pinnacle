
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Input, Button, CardPreview, Field, mergeClasses} from '@fluentui/react-components';
import { getCollegeNameKey } from '../../component-map';
import { interviewConversationActions, RootState } from '../../../store';
import { useStyles } from './interview-action-panel.styles';
import { DropdownCustom } from '../../component-customized-fluent-ui';
import { Major } from '../../../shared';
import { useOnStartInterviewCreator } from './hooks/use-on-start-interview-creator';
import { useOnStopInterviewCreator } from './hooks/use-on-stop-interview-creator';
import { useInterviewConnection } from './hooks/use-interview-connection';

export const InterviewActionPanel: React.FC = () => {
  const dispatch = useDispatch();
  const styles = useStyles();

  const storeCollege: string = useSelector(
    (state: RootState) => state.conversation.liveConversationCollege
  );
  const storeMajor: string = useSelector(
    (state: RootState) => state.conversation.liveConversationMajor
  );

  // Local states
  const [collegeInput, setCollegeInput] = useState(storeCollege);
  const collegeInputRef = useRef<HTMLInputElement>(null);

  const onStartInterview = useOnStartInterviewCreator();
  const onStopInterview = useOnStopInterviewCreator();

  // Hook that handles all the real-time / PeerConnection logic
  const { interviewActive, isProcessing, toggleInterview } = useInterviewConnection({
    onStartInterview,
    onStopInterview,   // async
  });

  /**
   * Validate and set the college name from user input.
   */
  const handleCollegeBlur = () => {
    const matchedCollegeName = getCollegeNameKey(collegeInput);
    if (matchedCollegeName) {
      setCollegeInput(matchedCollegeName);
      dispatch(interviewConversationActions.setLiveConversationCollege(matchedCollegeName));
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
    dispatch(interviewConversationActions.setLiveConversationMajor(newMajor));
  };

  const toggleInterviewHandler = () => {
    const matchedCollegeName = getCollegeNameKey(storeCollege);
    // Check if matchedCollegeName is not undefined/null and has length >= 3
    if (!matchedCollegeName || matchedCollegeName.length < 3) {
      alert('The college name you entered is not valid. Please re-enter.');
      return;
    }

    // If valid, proceed to toggle
    toggleInterview();
  };

  /**
   * For "Interview Review" button, now a local handler
   */
  const handleReviewClick = () => {
    // To be implemented, temp hack to test
    onStopInterview();
  };

  return (
    <div className={styles.container}>
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
                value={storeMajor}
                placeHolder="Select a major"
              />
            </Field>

            {/* Start/Stop Interview */}
            <Field className={styles.fieldButton}>
              <Button
                className={mergeClasses(
                  styles.buttonSmall,
                  interviewActive ? styles.buttonRed : styles.buttonGreen
                )}
                onClick={toggleInterviewHandler}
              >
                {interviewActive ? 'Stop Interview' : 'Start Interview'}
              </Button>
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

      {/* isProcessing overlay */}
      {isProcessing && (
        <div className={styles.processingModal}>
          <div className={styles.processingDialog}>
            <h2>Processing...</h2>
            <p>Please wait while we connect to the real-time API.</p>
          </div>
        </div>
      )}
    </div>
  );
};
