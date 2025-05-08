import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertDialogActions, RootState, useBasicInfoFilled } from '../../../store';
import {
  collegeListWorkshopActions,
  committeeReviewActions,
  interviewConversationActions,
  navigationTabActions
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
  toCombinedCollegeData
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
  Button as FluentButton
} from '@fluentui/react-components';
import { Info24Regular } from '@fluentui/react-icons'; // <-- NEW import

import { useStyles } from './college-list-build-form.styles';

export const CollegeListBuildMainContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);
  const styles = useStyles();
  
  // Pull college list and preferences from Redux
  const collegeList = useSelector((state: RootState) => state.collegeListWorkshop.collegeList);
  const collegePref: CollegePreferences = useSelector(
    (state: RootState) => state.collegePreferences.collegePreferences
  );
  const majorPref: string = collegePref.specializedProgram.value;

  // Track which college row is selected
  const [selectedCollege, setSelectedCollege] = useState<CollegeAdmissionData | null>(null);

  // State for opening the "Add college" modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCollegeName, setNewCollegeName] = useState('');

  // Track which (if any) task is active (so we can show the ProgressModal)
  const [activeTask, setActiveTask] = useState<"collegeList" | "evaluation" | null>(null);

  const [showConfirmCleanUpDialog, setShowConfirmCleanUpDialog] = useState(false);

  const hasBasicInfoFilled = useBasicInfoFilled();

  /**
   * Task runner for building a college list:
   */
  const {
    startTask: startCollegeListTask,
    showModal: showCollegeListModal,
    progressMessage: progressCollegeListMessage
  } = useTaskRunner({
    taskType: TaskType.BuildCollegeList,
    requestData: {} as CollegeListBuildRequest,

    onResult: async (data: TaskResult) => {
      const buildResult = data as BuildCollegeListTaskResult; 
      const newCollegeList = buildResult.college_list.map((college) => ({
        id: 0,
        user_id: userId as number,
        college: college.college,
        data: {
            admitRate: college.admitRate,
            undergradEnroll: college.undergradEnroll,
            annualCost: college.annualCost,
            nationalRanking: college.nationalRanking,
            programRanking: college.programRanking,
            chance: college.chance,
            category: college.category,
            reason: college.reason,
        },
      }));

      try {
        // Create each new college item on the server, one by one
        const updatedCollegeList: CollegeAdmissionData[] = [];
      
        for (const collegeItem of newCollegeList) {
          const returnedId = await collegeAdmissionDataService.create(collegeItem);
          updatedCollegeList.push({ ...collegeItem, id: returnedId });
        }
      
        // Dispatch to Redux store
        dispatch(collegeListWorkshopActions.setCollegeList(updatedCollegeList));
      
      } catch (error) {
        console.error('Failed to create new college items: ', error);
      } finally {
        setActiveTask(null);
      }
    },
  });

  /**
   * Task runner for evaluating a particular college's data/chance:
   */
  const {
    startTask: startEvaluationTask,
    showModal: showEvaluationModal,
    progressMessage: progressEvaluationMessage
  } = useTaskRunner({
    taskType: TaskType.GetCollegeDataChance,
    requestData: { college_name: selectedCollege?.college, major: majorPref } as CollegeDataAndChanceRequest,
    onResult: async (data: TaskResult) => {
      const result = data as GetCollegeDataChanceTaskResult;
      if (!selectedCollege) return;

      // 1) Update Redux store
      dispatch(
        collegeListWorkshopActions.setCollegeData({
          id: selectedCollege.id,
          data: toCombinedCollegeData(result.data_chance),
        })
      );

      // 2) Update server
      try {
        await collegeAdmissionDataService.update({
          ...selectedCollege,
          data: toCombinedCollegeData(result.data_chance),
        });
      } catch (err) {
        console.error('Failed to update server:', err);
      }

      setActiveTask(null);
    },
  });

  /**
   *  If the existing collegeList is not empty, show a confirmation dialog;
   *  if user cancels, do nothing; if user confirms, delete all, then proceed.
   */
  const handleStartCollegeListTask = () => {
    if (!hasBasicInfoFilled) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Insuffient Information',
          message: 'Please fill in basic information in student profile before performing the task',
        }));

      return;
    }

    if (collegeList.length > 0) {
      // Show the confirmation dialog if there's anything in the list
      setShowConfirmCleanUpDialog(true);
    } else {
      // If the list is empty, proceed as before
      setActiveTask('collegeList');
      startCollegeListTask();
    }
  };

  // Called if user clicks "Ok" to confirm clearing the list
  const handleConfirmCleanUpOk = async () => {
    // Delete all colleges in the current list (sequentially)
    for (const college of collegeList) {
      await handleDeleteCollege(college.id);
    }
    
    // Proceed with the original logic
    setActiveTask('collegeList');
    startCollegeListTask();
  
    // Hide the dialog
    setShowConfirmCleanUpDialog(false);
  };

  // Called if user clicks "Cancel" in the confirmation dialog
  const handleConfirmCleanUpCancel = () => {
    setShowConfirmCleanUpDialog(false);
    // Do nothing else
  };

  /** Evaluate the selected college's data/chance */
  const handleStartEvaluationTask = () => {
    if (!hasBasicInfoFilled) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Insuffient Information',
          message: 'Please fill in basic information in student profile before performing the task',
        }));

      return;
    }

    if (!selectedCollege) {
       return 
    };

    setActiveTask("evaluation");
    startEvaluationTask();
  };

  /** Jump to the Committee Review tab (only if a college is selected) */
  const handleCommitteeReview = () => {
    if (!selectedCollege) return;
    dispatch(navigationTabActions.setActiveTab(NavTabType.ComitteReview));
  };

  /** When user wants to add a new college */
  const handleAddCollege = () => {
    setIsAddModalOpen(true);
  };

  const handleAddCollegeDone = async () => {
    const matchedCollegeName = getCollegeNameKey(newCollegeName.trim());
    if (!matchedCollegeName) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Validation Error',
          message: 'The college name you entered is not valid. Please re-enter.',
        })
      );
      return;
    }

    const existingCollege = collegeList.find(
      (c) => c.college === matchedCollegeName
    );
    if (existingCollege) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Validation Error',
          message:  `${matchedCollegeName} already exists in college list, please try a different one`,
        })
      );
      return;
    }    

    const newCollegeItem = {
      id: 0,
      user_id: userId as number,
      college: matchedCollegeName,
      data: undefined,
    };

    try {
      const newId = await collegeAdmissionDataService.create(newCollegeItem);
      dispatch(
        collegeListWorkshopActions.addCollege({
          ...newCollegeItem,
          id: newId,
        })
      );
      setIsAddModalOpen(false);
      setNewCollegeName('');
    } catch (error: any) {
        dispatch(
          alertDialogActions.showAlert({
            title: 'Saving Error',
            message: `Error creating college on server side: ${error.message}`,
          })
        );
    }
  };

  const handleAddCollegeCancel = () => {
    setIsAddModalOpen(false);
    setNewCollegeName('');
  };

  /** Delete a college by id (from the table’s row) */
  const handleDeleteCollege = async (collegeId: number) => {
    const foundCollege = collegeList.find((c) => c.id === collegeId);
    if (!foundCollege) return;

    try {
      await collegeAdmissionDataService.deleteById(foundCollege.id, foundCollege.user_id);
      dispatch(collegeListWorkshopActions.deleteCollege(foundCollege.id));

      // Clear selection if we just deleted the selectedCollege
      if (selectedCollege?.id === collegeId) {
        setSelectedCollege(null);
      }
    } catch (error: any) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Saving Error',
          message: `Error deleting college on server side: ${error.message}`,
        })
      );
    }
  };

  /** Row selection in the table */
  const handleSelectCollege = (collegeItem: CollegeAdmissionData) => {
    setSelectedCollege(collegeItem);

    // Also set live college/major for committeeReview or interview
    dispatch(committeeReviewActions.setLiveReviewCollege(collegeItem.college));
    dispatch(committeeReviewActions.setLiveReviewMajor(majorPref));
    dispatch(interviewConversationActions.setLiveConversationCollege(collegeItem.college));
    dispatch(interviewConversationActions.setLiveConversationMajor(majorPref));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Progress Modal while tasks run */}
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

      {/* (NEW) Confirmation dialog for cleaning up existing colleges */}
      {showConfirmCleanUpDialog && (
        <div
          style={{
            position: 'fixed',
            zIndex: 9999,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          }}
        >
          <h3>Please be noticed...</h3>
          <p>Continuing this task will remove all current colleges in the list.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={handleConfirmCleanUpOk}>Ok</button>
            <button onClick={handleConfirmCleanUpCancel}>Cancel</button>
          </div>
        </div>
      )}

      {/* Top buttons: Build list, Evaluate, Committee Review */}
      <Card className={styles.card}>
        <h2 className={styles.header} style={{ textAlign: 'left' }}>
          Action Panel
        </h2>

        <div style={{ display: 'flex', gap: '50px' }}>
          {/* Create/Refresh List + info popover */}
          <div className={styles.buttonWithInfo}>
            <button
              className={styles.actionPanelButton}
              onClick={handleStartCollegeListTask}
            >
              Create/Refresh List
            </button>
            <Popover positioning={{ position: 'after', align: 'center' }}>
              <PopoverTrigger>
                <FluentButton
                  icon={<Info24Regular />}
                  appearance="subtle"
                  size="small"
                  aria-label="Information on creating a recommended college list"
                  className={styles.infoIcon}
                />
              </PopoverTrigger>
              <PopoverSurface>
                Create a recommended college list
              </PopoverSurface>
            </Popover>
          </div>

          {/* Evaluate + info popover */}
          <div className={styles.buttonWithInfo}>
            <button
              className={styles.actionPanelButton}
              onClick={handleStartEvaluationTask}
              disabled={!selectedCollege || selectedCollege.data !== undefined}
            >
              Evaluate
            </button>
            <Popover positioning={{ position: 'after', align: 'center' }}>
              <PopoverTrigger>
                <FluentButton
                  icon={<Info24Regular />}
                  appearance="subtle"
                  size="small"
                  aria-label="Information on evaluation"
                  className={styles.infoIcon}
                />
              </PopoverTrigger>
              <PopoverSurface>
                Please use Add an Item to create a row and then select it to evaluate
              </PopoverSurface>
            </Popover>
          </div>

          {/* Holistic Review + info popover */}
          <div className={styles.buttonWithInfo}>
            <button
              className={styles.actionPanelButton}
              onClick={handleCommitteeReview}
              disabled={!selectedCollege}
            >
              Holistic Review
            </button>
            <Popover positioning={{ position: 'after', align: 'center' }}>
              <PopoverTrigger>
                <FluentButton
                  icon={<Info24Regular />}
                  appearance="subtle"
                  size="small"
                  aria-label="Information on holistic review"
                  className={styles.infoIcon}
                />
              </PopoverTrigger>
              <PopoverSurface>
                Please select a row for a comprehensive review
              </PopoverSurface>
            </Popover>
          </div>
        </div>
      </Card>

      {/* The table component */}
      <CollegeListBuildForm
        collegeList={collegeList}
        selectedCollegeId={selectedCollege?.id}
        onSelectCollege={handleSelectCollege}
        onDeleteCollege={handleDeleteCollege}
        onAddCollege={handleAddCollege}
      />

      {/* "Add College" modal */}
      {isAddModalOpen && (
        <div
          style={{
            position: 'fixed',
            zIndex: 9999,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          }}
        >
          <h3>Add College</h3>
          <input
            type="text"
            value={newCollegeName}
            onChange={(e) => setNewCollegeName(e.target.value)}
            placeholder="Enter college name"
            style={{
              marginBottom: '10px',
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={handleAddCollegeDone}>Done</button>
            <button onClick={handleAddCollegeCancel}>Cancel</button>
          </div>
        </div>
      )}

      {/* If a row is selected AND it has a `reason`, show it in ReviewDisplay */}
      {selectedCollege?.data?.reason && (
        <Card className={styles.card}>
          <h3 className={styles.reviewHeader} style={{ textAlign: 'left' }}>
            Reasons for My Chance
          </h3>
          <ReviewDisplay review={selectedCollege.data.reason} />
        </Card>
      )}
    </div>
  );
};
