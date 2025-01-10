import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Button,
  CardPreview,
  Field,
  mergeClasses,
  Dropdown,
  Option,
  SelectionEvents,
  OptionOnSelectData,
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from '@fluentui/react-components';
import { Info24Regular } from '@fluentui/react-icons';

import { getCollegeNameKey } from '../../component-navigation-map';
import {
  alertDialogActions,
  interviewConversationActions,
  RootState,
} from '../../../store';
import { useStyles } from './interview-action-panel.styles';
import { DropdownCustom } from '../../component-customized-fluent-ui';
import { Major } from '../../../shared';
import { useOnStartInterviewCreator } from './hooks/use-on-start-interview-creator';
import { useOnStopInterviewCreator } from './hooks/use-on-stop-interview-creator';
import { useInterviewConnection } from './hooks/use-interview-connection';
import { useOnReviewCompleteCreator } from './hooks/use-on-review-complete-creator';
import {
  InterviewAnalyzeRequest,
  InterviewAnalyzeResult,
  ProgressModal,
  TaskResult,
  TaskType,
  useTaskRunner,
} from '../../component-service-proxy';

export const InterviewActionPanel: React.FC = () => {
  const dispatch = useDispatch();
  const styles = useStyles();

  // Redux state
  const liveCollege: string = useSelector(
    (state: RootState) => state.conversation.liveConversationCollege
  );
  const liveMajor: string = useSelector(
    (state: RootState) => state.conversation.liveConversationMajor
  );
  const liveId: number = useSelector(
    (state: RootState) => state.conversation.liveConverstationId
  );
  const collegeList = useSelector(
    (state: RootState) => state.collegeListWorkshop.collegeList
  );

  // Hooks for interview start/stop, post-review, etc.
  const onStartInterview = useOnStartInterviewCreator();
  const onStopInterview = useOnStopInterviewCreator();
  const onReviewComplete = useOnReviewCompleteCreator();

  // Manages real-time / PeerConnection logic
  const { interviewActive, isProcessing, toggleInterview } = useInterviewConnection({
    onStartInterview,
    onStopInterview,
  });

  // Manages “AnalyzeInterview” tasks
  const { startTask: startInterviewReviewTask, showModal, progressMessage } = useTaskRunner({
    taskType: TaskType.AnalyzeInterview,
    requestData: { conversation_id: liveId } as InterviewAnalyzeRequest,
    onResult: (data: TaskResult) => {
      const review = (data as InterviewAnalyzeResult).message;
      dispatch(interviewConversationActions.setLiveConversationReview(review));
      onReviewComplete();
    },
  });

  /**
   * Handle user selecting a different college in the dropdown.
   */
  const handleCollegeSelect = (event: SelectionEvents, data: OptionOnSelectData) => {
    // data.optionValue can be undefined, so check it first:
    if (!data.optionValue) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Validation Error',
          message: 'The college name you selected is not valid. Please check.',
        })
      );      return;
    }
    const matchedCollegeName = getCollegeNameKey(data.optionValue);
    if (!matchedCollegeName) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Validation Error',
          message: 'The college name you selected is not valid. Please check.',
        })
      );
      return;
    }
    // Update Redux
    dispatch(interviewConversationActions.setLiveConversationCollege(matchedCollegeName));
  };

  /**
   * Handle changes to the Major field.
   */
  const handleMajorChange = (newMajor: string) => {
    dispatch(interviewConversationActions.setLiveConversationMajor(newMajor));
  };

  /**
   * Start/Stop Interview button handler.
   */
  const toggleInterviewHandler = () => {
    const matchedCollegeName = getCollegeNameKey(liveCollege);
    if (!matchedCollegeName || matchedCollegeName.length < 3) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Validation Error',
          message: 'The college name you entered is not valid. Please re-enter.',
        })
      );
      return;
    }
    toggleInterview();
  };

  /**
   * For "Interview Review" button, triggers the analysis task.
   */
  const handleReviewClick = async () => {
    try {
      if (liveId === 0) {
        dispatch(
          alertDialogActions.showAlert({
            title: 'Validation Error',
            message: 'Review can only be performed after finishing the interview.',
          })
        );
        return;
      }
      startInterviewReviewTask();
    } catch (error) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Review Error',
          message: 'Error happend during review on server side.',
        })
      );
      console.error('Error in review flow:', error);
    }
  };

  return (
    <div className={styles.container}>
      <ProgressModal show={showModal} message={progressMessage} />

      <Card className={styles.card}>
        <h2 className={styles.header} style={{ textAlign: 'left' }}>
          Action Panel
        </h2>

        <CardPreview>
          <div className={styles.grid}>
            {/* Field for College (with popover on label) */}
            <Field
              label={
                <span className={styles.labelContainer}>
                  <span>College</span>
                  <Popover positioning={{ position: 'after', align: 'top' }}>
                    <PopoverTrigger>
                      <Button
                        icon={<Info24Regular />}
                        appearance="subtle"
                        size="small"
                        aria-label="Information"
                        className={styles.infoIcon}
                      />
                    </PopoverTrigger>
                    <PopoverSurface>
                      Please make sure the college list was created before selecting a college here
                    </PopoverSurface>
                  </Popover>
                </span>
              }
              className={styles.field}
            >
              <Dropdown
                placeholder="Select a college"
                value={liveCollege}
                onOptionSelect={handleCollegeSelect}
                disabled={collegeList.length === 0} // Disable if no colleges
              >
                {collegeList.map((c) => (
                  <Option key={c.id} value={c.college}>
                    {c.college}
                  </Option>
                ))}
              </Dropdown>
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

            {/* Review Button */}
            <Field className={styles.fieldButton}>
              <Button className={styles.buttonSmall} onClick={handleReviewClick}>
                Review
              </Button>
            </Field>
          </div>
        </CardPreview>
      </Card>

      {/* “isProcessing” overlay */}
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
