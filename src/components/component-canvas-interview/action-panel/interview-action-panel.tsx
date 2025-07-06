import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Button,
  CardPreview,
  Field,
  Dropdown,
  Option,
  SelectionEvents,
  OptionOnSelectData,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  tokens,
} from '@fluentui/react-components';
import { Info24Regular } from '@fluentui/react-icons';

import { getCollegeNameKey } from '../../component-navigation-map';
import {
  alertDialogActions,
  interviewConversationActions,
  RootState,
  useBasicInfoFilled,
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
  const styles   = useStyles();

  /* ─────────── Redux data ─────────── */
  const liveCollege = useSelector((s: RootState) => s.conversation.liveConversationCollege);
  const liveMajor   = useSelector((s: RootState) => s.conversation.liveConversationMajor);
  const liveId      = useSelector((s: RootState) => s.conversation.liveConverstationId);
  const collegeList = useSelector((s: RootState) => s.collegeListWorkshop.collegeList);
  const hasBasicInfoFilled = useBasicInfoFilled();

  /* ─────────── Interview hooks ────── */
  const onStartInterview  = useOnStartInterviewCreator();
  const onStopInterview   = useOnStopInterviewCreator();
  const onReviewComplete  = useOnReviewCompleteCreator();
  const { interviewActive, isProcessing, toggleInterview } = useInterviewConnection({
    onStartInterview,
    onStopInterview,
  });

  /* ─────────── Review task runner ─── */
  const { startTask: startReview, showModal, progressMessage } = useTaskRunner({
    taskType: TaskType.AnalyzeInterview,
    requestData: { conversation_id: liveId } as InterviewAnalyzeRequest,
    onResult: (d: TaskResult) => {
      const review = (d as InterviewAnalyzeResult).message;
      dispatch(interviewConversationActions.setLiveConversationReview(review));
      onReviewComplete();
    },
  });

  /* ─────────── Handlers ───────────── */
  const handleCollegeSelect = (_: SelectionEvents, d: OptionOnSelectData) => {
    const key = d.optionValue ? getCollegeNameKey(d.optionValue) : undefined;
    if (!key) {
      dispatch(alertDialogActions.showAlert({
        title: 'Validation Error',
        message: 'The college name you selected is not valid.',
      }));
      return;
    }
    dispatch(interviewConversationActions.setLiveConversationCollege(key));
  };

  const handleMajorChange = (m: string) =>
    dispatch(interviewConversationActions.setLiveConversationMajor(m));

  const toggleInterviewHandler = () => {
    if (!hasBasicInfoFilled) {
      dispatch(alertDialogActions.showAlert({
        title: 'Insufficient Information',
        message: 'Please complete basic student information first.',
      }));
      return;
    }
    if (!getCollegeNameKey(liveCollege)) {
      dispatch(alertDialogActions.showAlert({
        title: 'Validation Error',
        message: 'Please choose a valid college before starting.',
      }));
      return;
    }
    toggleInterview();
  };

  const handleReviewClick = () => {
    if (!hasBasicInfoFilled) {
      dispatch(alertDialogActions.showAlert({
        title: 'Insufficient Information',
        message: 'Please complete basic student information first.',
      }));
      return;
    }
    if (liveId === 0) {
      dispatch(alertDialogActions.showAlert({
        title: 'Validation Error',
        message: 'You can only review after finishing an interview.',
      }));
      return;
    }
    startReview();
  };

  /* ─────────── UI ─────────────────── */
  return (
    <div className={styles.container}>
      <ProgressModal show={showModal} message={progressMessage} />

      <Card className={styles.card}>
        <h2 className={styles.header}>Action Panel</h2>

        <CardPreview>
          <div className={styles.grid}>
            {/* -------- row‑1: College ---------------- */}
            <Field
              label={
                <span className={styles.labelContainer}>
                  College
                  <Popover positioning={{ position: 'after', align: 'top' }}>
                    <PopoverTrigger>
                      <Button
                        icon={<Info24Regular />}
                        appearance="subtle"
                        size="small"
                        aria-label="Info"
                        className={styles.infoIcon}
                      />
                    </PopoverTrigger>
                    <PopoverSurface>
                      Build your list first, then pick one here.
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
                disabled={!collegeList.length}
              >
                {collegeList.map(({ id, college }) => (
                  <Option key={id} value={college}>{college}</Option>
                ))}
              </Dropdown>
            </Field>

            {/* -------- row‑1: Major ------------------ */}
            <Field label="Major" className={styles.field}>
              <DropdownCustom
                options={Major}
                value={liveMajor}
                placeHolder="Select a major"
                onOptionSelect={(_, o) => handleMajorChange(o.optionValue as Major)}
              />
            </Field>

            {/* -------- row‑2: Start/Stop ------------- */}
            <Field className={styles.field}>
              <Button
                className={styles.buttonWide}
                appearance={interviewActive ? 'primary' : 'secondary'}
                style={{
                  backgroundColor: interviewActive
                    ? tokens.colorPaletteRedBackground3
                    : tokens.colorPaletteGreenBackground3,
                  color: tokens.colorNeutralForegroundOnBrand,
                }}
                onClick={toggleInterviewHandler}
              >
                {interviewActive ? 'Stop Interview' : 'Start Interview'}
              </Button>
            </Field>

            {/* -------- row‑2: Review ----------------- */}
            <Field className={styles.field}>
              <Button className={styles.buttonWide} onClick={handleReviewClick}>
                Review
              </Button>
            </Field>
          </div>
        </CardPreview>
      </Card>

      {/* overlay while WebRTC spins up */}
      {isProcessing && (
        <div className={styles.processingModal}>
          <div className={styles.processingDialog}>
            <h2>Processing…</h2>
            <p>Please wait while we connect to the real‑time API.</p>
          </div>
        </div>
      )}
    </div>
  );
};
