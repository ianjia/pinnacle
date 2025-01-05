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
  PopoverTrigger
} from '@fluentui/react-components';
import { Info24Regular } from '@fluentui/react-icons';
import { getCollegeNameKey } from '../../component-navigation-map';
import { committeeReviewActions, RootState } from '../../../store';
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

  const liveCollege: string = useSelector(
    (state: RootState) => state.committeeReview.liveReviewCollege
  );
  const liveMajor: string = useSelector(
    (state: RootState) => state.committeeReview.liveReviewMajor
  );

  const collegeList = useSelector(
    (state: RootState) => state.collegeListWorkshop.collegeList
  );

  const myChance = collegeList.find((c) => c.college === liveCollege)?.data?.chance;
 
  // Custom hook for post-review logic
  const onReviewComplete = useOnReviewCompleteCreator();

  // Task runner hook
  const { startTask: startCommitteeReviewTask, showModal, progressMessage } = useTaskRunner({
    taskType: TaskType.CommitteReview,
    requestData: {
      college_name: liveCollege,
      major: liveMajor,
      my_chance: myChance ?? 0,
    } as CommitteeReviewRequest,
    onResult: (data: TaskResult) => {
      const review = (data as CommitteeReviewTaskResult).review;
      dispatch(committeeReviewActions.setLiveReviewResult(review));
      onReviewComplete();
    },
  });

  /**
   * Handle user selecting a different college in the dropdown.
   */
  const handleCollegeSelect = (
    event: SelectionEvents,
    data: OptionOnSelectData
  ) => {
    // data.optionValue can be undefined, so check it first:
    if (!data.optionValue) {
      alert('The college name you selected is not valid. Please check.');
      return;
    }
    const matchedCollegeName = getCollegeNameKey(data.optionValue);
    if (!matchedCollegeName) {
      alert('The college name you selected is not valid. Please check.');
      return;
    }
    // Update Redux state
    dispatch(committeeReviewActions.setLiveReviewCollege(matchedCollegeName));
  };

  /**
   * Handle changes to the Major field.
   */
  const handleMajorChange = (newMajor: string) => {
    dispatch(committeeReviewActions.setLiveReviewMajor(newMajor));
  };

  /**
   * For "Review" button: Validate and start the review task.
   */
/**
 * For "Review" button: Validate and start the review task.
 */
const handleReviewClick = async () => {
  try {
    // Double-check if the selected college is valid
    const matchedCollegeName = getCollegeNameKey(liveCollege);
    if (!matchedCollegeName) {
      alert('College Name not valid, please check.');
      return;
    }

    // Find the college in the redux collegeList
    const selectedCollege = collegeList.find(
      (c) => c.college === matchedCollegeName
    );

    // If selectedCollege doesn't exist or its data is undefined, show alert
    if (!selectedCollege || !selectedCollege.data) {
      alert('Please perform initial evaluation in Build College List panel');
      return;
    }

    // If everything is valid, start the review task
    startCommitteeReviewTask();
  } catch (error) {
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
            {/* Field for College */}
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
            {/* Field for Major (existing custom Dropdown) */}
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

            {/* Review Button */}
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
