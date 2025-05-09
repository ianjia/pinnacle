import React, { useState } from 'react';
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
  Textarea,
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogActions,
} from '@fluentui/react-components';
import { Info24Regular } from '@fluentui/react-icons';
import { getCollegeNameKey } from '../../component-navigation-map';
import {
  alertDialogActions,
  committeeReviewActions,
  RootState,
  useBasicInfoFilled,
} from '../../../store';
import { useStyles } from './committee-review-action-panel.styles';
import { DropdownCustom } from '../../component-customized-fluent-ui';
import { Major } from '../../../shared';

import {
  CommitteeReviewRequest,
  CommitteeReviewTaskResult,
  ProgressModal,
  TaskResult,
  TaskType,
  useTaskRunner,
} from '../../component-service-proxy';
import { useOnReviewCompleteCreator } from './hooks/use-on-review-complete-creator';

export const CommitteeReviewActionPanel: React.FC = () => {
  const dispatch = useDispatch();
  const styles = useStyles();

  const [essayContent, setEssayContent] = useState<string>('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const liveCollege = useSelector((s: RootState) => s.committeeReview.liveReviewCollege);
  const liveMajor   = useSelector((s: RootState) => s.committeeReview.liveReviewMajor);
  const collegeList = useSelector((s: RootState) => s.collegeListWorkshop.collegeList);

  const hasBasicInfoFilled = useBasicInfoFilled();
  const myChance =
    collegeList.find((c) => c.college === liveCollege)?.data?.chance ?? 0;

  const onReviewComplete = useOnReviewCompleteCreator();
  const {
    startTask: startCommitteeReviewTask,
    showModal,
    progressMessage,
  } = useTaskRunner({
    taskType: TaskType.CommitteReview,
    requestData: {
      college_name: liveCollege,
      major: liveMajor,
      my_chance: myChance,
      essay: essayContent,              
    } as CommitteeReviewRequest,
    onResult: (data: TaskResult) => {
      const review = (data as CommitteeReviewTaskResult).review;
      dispatch(committeeReviewActions.setLiveReviewResult(review));
      onReviewComplete();
    },
  });

  /** -------------------- Handlers ---------------------------------- */
  const handleCollegeSelect = (_: SelectionEvents, data: OptionOnSelectData) => {
    const key = data.optionValue && getCollegeNameKey(data.optionValue);
    if (!key) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Validation Error',
          message: 'The college name you selected is not valid. Please check.',
        })
      );
      return;
    }
    dispatch(committeeReviewActions.setLiveReviewCollege(key));
  };

  const handleMajorChange = (newMajor: string) =>
    dispatch(committeeReviewActions.setLiveReviewMajor(newMajor));

  const performReviewTask = () => {
    /* All validations already passed at this point */
    startCommitteeReviewTask();
  };

  const handleReviewClick = () => {
    /* Basic profile / college-list validations */
    if (!hasBasicInfoFilled) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Insuffient Information',
          message:
            'Please fill in basic information in student profile before performing the task',
        })
      );
      return;
    }

    const key = getCollegeNameKey(liveCollege);
    if (!key) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Validation Error',
          message: 'The college name you selected is not valid. Please check.',
        })
      );
      return;
    }

    const selectedCollege = collegeList.find((c) => c.college === key);
    if (!selectedCollege?.data) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Validation Error',
          message: 'Please perform initial evaluation in Build College List panel',
        })
      );
      return;
    }

    /* Essay empty? → Ask for confirmation, else run immediately. */
    if (essayContent.trim() === '') {
      setConfirmDialogOpen(true);
    } else {
      performReviewTask();
    }
  };

  /** ----------------------- JSX ------------------------------------ */
  return (
    <div className={styles.container}>
      {/* Progress-modal shown during async task */}
      <ProgressModal show={showModal} message={progressMessage} />

      {/* Empty-essay confirmation dialog */}
      <Dialog
        modalType="modal"
        open={confirmDialogOpen}
        onOpenChange={(_, data) => setConfirmDialogOpen(data.open)}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Essay text area is empty</DialogTitle>
            <p>
              You haven&rsquo;t pasted any essays. Do you still want to proceed with
              the review?
            </p>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setConfirmDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                appearance="primary"
                onClick={() => {
                  setConfirmDialogOpen(false);
                  performReviewTask();
                }}
              >
                Confirm
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      {/* Main action card */}
      <Card className={styles.card}>
        <h2 className={styles.header}>Action Panel</h2>

        <CardPreview>
          <div className={styles.grid}>
            {/* College field ------------------------------------------------ */}
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
                      Please make sure the college list was created before selecting
                      a college here.
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
                disabled={collegeList.length === 0}
              >
                {collegeList.map((c) => (
                  <Option key={c.id} value={c.college}>
                    {c.college}
                  </Option>
                ))}
              </Dropdown>
            </Field>

            {/* Major field -------------------------------------------------- */}
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

            {/* NEW – Essay text area (spans full width) ------------------- */}
            <Field
              className={styles.textAreaField}
              label={
                <span className={styles.labelContainer}>
                  <span>My Essays</span>
                  <Popover positioning={{ position: 'after', align: 'top' }}>
                    <PopoverTrigger>
                      <Button
                        icon={<Info24Regular />}
                        appearance="subtle"
                        size="small"
                        aria-label="Essay information"
                        className={styles.infoIcon}
                      />
                    </PopoverTrigger>
                    <PopoverSurface>
                      Please paste all your application essays (personal statement,
                      supplement essays, etc.) below.
                    </PopoverSurface>
                  </Popover>
                </span>
              }
            >
              <Textarea
                resize="vertical"
                value={essayContent}
                onChange={(_, data) => setEssayContent(data.value)}
                placeholder="Paste your essays here…"
                className={styles.textarea}
              />
            </Field>

            {/* Review button ---------------------------------------------- */}
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
