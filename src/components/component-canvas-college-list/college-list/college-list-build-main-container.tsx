// CollegeListBuildMainContainer.tsx
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  alertDialogActions,
  RootState,
  useBasicInfoFilled,
  collegeListWorkshopActions,
  committeeReviewActions,
  interviewConversationActions,
  navigationTabActions,
} from '../../../store';

import {
  TaskType,
  useTaskRunner,
  collegeAdmissionDataService,
  CollegeListBuildRequest,
  BuildCollegeListTaskResult,
  TaskResult,
  GetCollegeDataChanceTaskResult,
  CollegeDataAndChanceRequest,
  ProgressModal,
  toCombinedCollegeData,
} from '../../component-service-proxy';

import { AuthContext } from '../../../auth';
import { NavTabType, CollegePreferences, CollegeAdmissionData } from '../../../shared';
import { getCollegeNameKey } from '../../component-navigation-map';

import { ReviewDisplay } from '../../component-review-display/review-dislay';
import { CollegeListBuildForm } from './college-list-build-form';

import {
  Card,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Button,
  Input,
  tokens,
} from '@fluentui/react-components';
import { Info24Regular } from '@fluentui/react-icons';
import { useStyles } from './college-list-build-form.styles';

export const CollegeListBuildMainContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);
  const styles = useStyles();

  /* ------------------------------------------------------------------ */
  /* Redux state */
  const collegeList = useSelector((s: RootState) => s.collegeListWorkshop.collegeList);
  const collegePref: CollegePreferences = useSelector(
    (s: RootState) => s.collegePreferences.collegePreferences
  );
  const majorPref = collegePref.specializedProgram.value;
  const hasBasicInfoFilled = useBasicInfoFilled();

  /* ------------------------------------------------------------------ */
  /* Local state */
  const [selectedCollege, setSelectedCollege] = useState<CollegeAdmissionData | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCollegeName, setNewCollegeName] = useState('');
  const [activeTask, setActiveTask] = useState<'collegeList' | 'evaluation' | null>(null);
  const [showConfirmCleanUpDialog, setShowConfirmCleanUpDialog] = useState(false);

  /* ------------------------------------------------------------------ */
  /* Task runner – build list */
  const {
    startTask: startCollegeListTask,
    showModal: showCollegeListModal,
    progressMessage: progressCollegeListMessage,
  } = useTaskRunner({
    taskType: TaskType.BuildCollegeList,
    requestData: {} as CollegeListBuildRequest,
    onResult: async (data: TaskResult) => {
      const buildResult = data as BuildCollegeListTaskResult;
      const newItems = buildResult.college_list.map((c) => ({
        id: 0,
        user_id: userId as number,
        college: c.college,
        data: {
          admitRate: c.admitRate,
          undergradEnroll: c.undergradEnroll,
          annualCost: c.annualCost,
          nationalRanking: c.nationalRanking,
          programRanking: c.programRanking,
          chance: c.chance,
          category: c.category,
          reason: c.reason,
        },
      }));

      try {
        const updated: CollegeAdmissionData[] = [];
        for (const item of newItems) {
          const id = await collegeAdmissionDataService.create(item);
          updated.push({ ...item, id });
        }
        dispatch(collegeListWorkshopActions.setCollegeList(updated));
      } finally {
        setActiveTask(null);
      }
    },
  });

  /* ------------------------------------------------------------------ */
  /* Task runner – evaluate college */
  const {
    startTask: startEvaluationTask,
    showModal: showEvaluationModal,
    progressMessage: progressEvaluationMessage,
  } = useTaskRunner({
    taskType: TaskType.GetCollegeDataChance,
    requestData: { college_name: selectedCollege?.college, major: majorPref } as CollegeDataAndChanceRequest,
    onResult: async (data: TaskResult) => {
      if (!selectedCollege) return;
      const result = data as GetCollegeDataChanceTaskResult;

      dispatch(
        collegeListWorkshopActions.setCollegeData({
          id: selectedCollege.id,
          data: toCombinedCollegeData(result.data_chance),
        })
      );

      try {
        await collegeAdmissionDataService.update({
          ...selectedCollege,
          data: toCombinedCollegeData(result.data_chance),
        });
      } finally {
        setActiveTask(null);
      }
    },
  });

  /* ------------------------------------------------------------------ */
  /* Helpers */
  const handleDeleteCollege = async (collegeId: number) => {
    const found = collegeList.find((c) => c.id === collegeId);
    if (!found) return;
    await collegeAdmissionDataService.deleteById(found.id, found.user_id);
    dispatch(collegeListWorkshopActions.deleteCollege(found.id));
    if (selectedCollege?.id === collegeId) setSelectedCollege(null);
  };

  const handleSelectCollege = (collegeItem: CollegeAdmissionData) => {
    setSelectedCollege(collegeItem);
    dispatch(committeeReviewActions.setLiveReviewCollege(collegeItem.college));
    dispatch(committeeReviewActions.setLiveReviewMajor(majorPref));
    dispatch(interviewConversationActions.setLiveConversationCollege(collegeItem.college));
    dispatch(interviewConversationActions.setLiveConversationMajor(majorPref));
  };

  /* ------------------------------------------------------------------ */
  /* Action panel handlers */
  const handleStartCollegeListTask = () => {
    if (!hasBasicInfoFilled) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Insufficient Information',
          message: 'Please fill in basic information in student profile before performing the task.',
        })
      );
      return;
    }

    if (collegeList.length) setShowConfirmCleanUpDialog(true);
    else {
      setActiveTask('collegeList');
      startCollegeListTask();
    }
  };

  const handleStartEvaluationTask = () => {
    if (!hasBasicInfoFilled) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Insufficient Information',
          message: 'Please fill in basic information in student profile before performing the task.',
        })
      );
      return;
    }
    if (!selectedCollege) return;

    setActiveTask('evaluation');
    startEvaluationTask();
  };

  const handleCommitteeReview = () => {
    if (selectedCollege) dispatch(navigationTabActions.setActiveTab(NavTabType.ComitteReview));
  };

  /* ------------------------------------------------------------------ */
  /* Clean-up confirmation */
  const confirmCleanUpOk = async () => {
    setShowConfirmCleanUpDialog(false);
    for (const c of collegeList) await handleDeleteCollege(c.id);
    setActiveTask('collegeList');
    startCollegeListTask();
  };

  /* ------------------------------------------------------------------ */
  /* Add-college dialog */
  const handleAddCollegeDone = async () => {
    const key = getCollegeNameKey(newCollegeName.trim());
    if (!key) {
      dispatch(
        alertDialogActions.showAlert({ title: 'Validation Error', message: 'Invalid college name.' })
      );
      return;
    }
    if (collegeList.some((c) => c.college === key)) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Validation Error',
          message: `${key} already exists in the list.`,
        })
      );
      return;
    }

    const item = { id: 0, user_id: userId as number, college: key, data: undefined };
    const id = await collegeAdmissionDataService.create(item);
    dispatch(collegeListWorkshopActions.addCollege({ ...item, id }));
    setIsAddModalOpen(false);
    setNewCollegeName('');
  };

  /* ------------------------------------------------------------------ */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL }}>
      {/* Progress modal */}
      <ProgressModal
        show={activeTask !== null && (showCollegeListModal || showEvaluationModal)}
        message={
          activeTask === 'collegeList'
            ? progressCollegeListMessage
            : activeTask === 'evaluation'
            ? progressEvaluationMessage
            : ''
        }
      />

      {/* Clean-up confirmation dialog */}
      {showConfirmCleanUpDialog && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Please be noticed…</h3>
            <p>Continuing this task will remove all current colleges in the list.</p>
            <div className={styles.modalButtonRow}>
              <Button appearance="primary" onClick={confirmCleanUpOk}>
                Ok
              </Button>
              <Button onClick={() => setShowConfirmCleanUpDialog(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* Action panel */}
      <Card className={styles.card}>
        <h2 className={styles.header}>Action Panel</h2>

        <div style={{ display: 'flex', gap: tokens.spacingHorizontalXL }}>
          {/* Build list */}
          <div className={styles.buttonWithInfo}>
            <Button className={styles.actionPanelButton} onClick={handleStartCollegeListTask}>
              Build College List
            </Button>
            <Popover positioning={{ position: 'after', align: 'center' }}>
              <PopoverTrigger>
                <Button
                  icon={<Info24Regular />}
                  appearance="subtle"
                  size="small"
                  aria-label="Info"
                  className={styles.infoIcon}
                />
              </PopoverTrigger>
              <PopoverSurface>Create a recommended college list</PopoverSurface>
            </Popover>
          </div>

          {/* Evaluate */}
          <div className={styles.buttonWithInfo}>
            <Button
              className={styles.actionPanelButton}
              onClick={handleStartEvaluationTask}
              disabled={!selectedCollege || selectedCollege.data !== undefined}
            >
              Evaluate a College
            </Button>
            <Popover positioning={{ position: 'after', align: 'center' }}>
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
                Use “Add an Item” to create a row then select it to evaluate
              </PopoverSurface>
            </Popover>
          </div>

          {/* Holistic review */}
          <div className={styles.buttonWithInfo}>
            <Button
              className={styles.actionPanelButton}
              onClick={handleCommitteeReview}
              disabled={!selectedCollege}
            >
              Holistic Review on My Chance
            </Button>
            <Popover positioning={{ position: 'after', align: 'center' }}>
              <PopoverTrigger>
                <Button
                  icon={<Info24Regular />}
                  appearance="subtle"
                  size="small"
                  aria-label="Info"
                  className={styles.infoIcon}
                />
              </PopoverTrigger>
              <PopoverSurface>Select a row for a comprehensive review</PopoverSurface>
            </Popover>
          </div>
        </div>
      </Card>

      {/* Selected college reason */}
      {selectedCollege?.data?.reason && (
        <Card className={styles.card}>
          <h3 className={styles.reviewHeader}>My fit with this college</h3>
          <ReviewDisplay review={selectedCollege.data.reason} />
        </Card>
      )}

      {/* Data grid */}
      <CollegeListBuildForm
        collegeList={collegeList}
        selectedCollegeId={selectedCollege?.id}
        onSelectCollege={handleSelectCollege}
        onDeleteCollege={(id) => handleDeleteCollege(id)}
        onAddCollege={() => setIsAddModalOpen(true)}
      />

      {/* Add-college dialog */}
      {isAddModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Add College</h3>
            <Input
              value={newCollegeName}
              onChange={(_, d) => setNewCollegeName(d.value)}
              placeholder="Enter college name"
              className={styles.modalInput}
            />
            <div className={styles.modalButtonRow}>
              <Button appearance="primary" onClick={handleAddCollegeDone}>
                Done
              </Button>
              <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
