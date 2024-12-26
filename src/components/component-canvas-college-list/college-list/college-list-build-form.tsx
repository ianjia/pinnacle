import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  collegeListWorkshopActions,
  committeeReviewActions,
  interviewConversationActions,
  navigationTabActions,
  RootState
} from '../../../store';

import {
  CollegeDataAndChanceRequest,
  CollegeListBuildRequest,
  ProgressModal,
  GetCollegeDataChanceTaskResult,
  BuildCollegeListTaskResult,
  TaskResult,
  TaskType,
  useTaskRunner,
  collegeAdmissionDataService
} from '../../component-service-proxy';

import {
  Card,
  Button,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  mergeClasses
} from '@fluentui/react-components';

import { Add20Regular, Delete20Regular } from '@fluentui/react-icons';
import { useStyles } from './college-list-build-form.styles';
import { CollegePreferences, NavTabType } from '../../../shared';
import { getCollegeNameKey } from '../../component-map';
import { AuthContext } from '../../../auth';

/** The CombinedCollegeData structure is stored in each CollegeAdmissionData.data */
interface CombinedCollegeData {
  admitRate: number;
  undergradEnroll: number;
  annualCost: number;
  nationalRanking: number;
  programRanking?: number;
  chance: number;
  category: 1 | 2 | 3;  // 1 = Reach, 2 = Target, 3 = Safe
  reason: string;
}

interface CollegeAdmissionData {
  id: number;
  user_id: number;
  college: string;
  data?: CombinedCollegeData;
}

export const CollegeListBuildForm: React.FC = () => {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);
  const styles = useStyles();

  const collegeList = useSelector((state: RootState) => state.collegeListWorkshop.collegeList);

  /** Pulling user preferences from store */
  const collegePref: CollegePreferences = useSelector(
    (state: RootState) => state.collegePreferences.collegePreferences
  );
  const majorPref: string = collegePref.specializedProgram.value;

  /**
   * Track which college (by its .college string) is currently selected.
   * Could also store selected college by `id`, if preferred.
   */
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCollegeName, setNewCollegeName] = useState('');

  const [activeTask, setActiveTask] = useState<"collegeList" | "evaluation" | null>(null);

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
        const buildResult = data as BuildCollegeListTaskResult; // buildResult.college_list is an array of strings

        // 1. Transform each string into a CollegeAdmissionData with a *temporary* ID
        const newCollegeList = buildResult.college_list.map((collegeName, index) => ({
          id: 0,
          user_id: userId as number,    
          college: collegeName,
          data: undefined,
        }));
      
        try {
          // 2. For each CollegeAdmissionData, call create() to get the real ID
          //    Use Promise.all to run them in parallel.
          const updatedCollegeList = await Promise.all(
            newCollegeList.map(async (collegeItem) => {
              const returnedId = await collegeAdmissionDataService.create(collegeItem);
              // Override the temporary ID with the returned ID
              return { ...collegeItem, id: returnedId };
            })
          );
      
          // 3. Dispatch the final array of CollegeAdmissionData, each with its real ID
          dispatch(collegeListWorkshopActions.setCollegeList(updatedCollegeList));
        } catch (error) {
          console.error('Failed to create new college items: ', error);
          // Optionally handle the error for your UI or set some error state
        } finally {
          setActiveTask(null);
        }
      },
  });

  /**
   * Task runner for evaluating a particular college (selectedCollege).
   * We assume the server returns a CombinedCollegeData object for .data_chance.
   */
    const {
        startTask: startEvaluationTask,
        showModal: showEvaluationModal,
        progressMessage: progressEvaluationMessage
    } = useTaskRunner({
        taskType: TaskType.GetCollegeDataChance,
        requestData: { college_name: selectedCollege, major: majorPref } as CollegeDataAndChanceRequest,
        onResult: async (data: TaskResult) => {
        const result = data as GetCollegeDataChanceTaskResult;
        // Find the matching college in our list
        const foundCollege = collegeList.find((c) => c.college === selectedCollege);
    
        if (foundCollege) {
            // 1) Update the Redux store
            dispatch(
            collegeListWorkshopActions.setCollegeData({
                id: foundCollege.id,
                data: result.data_chance,
            })
            );
    
            // 2) Update the server with the newly added data
            try {
            await collegeAdmissionDataService.update({
                ...foundCollege,
                data: result.data_chance,
            });
            } catch (err) {
            console.error('Failed to update server:', err);
            // Optionally show an error message to the user here
            }
        }
    
        setActiveTask(null);
        },
    });

  /** Create initial list: triggers the BuildCollegeListTask */
  const handleStartCollegeListTask = () => {
    setActiveTask("collegeList");
    startCollegeListTask();
  };

  /** Evaluate data for the selected college. */
  const handleStartEvaluationTask = () => {
    setActiveTask("evaluation");
    startEvaluationTask();
  };

  /** Navigation to Committee Review tab (if a college is selected). */
  const handleCommitteeReview = () => {
    dispatch(navigationTabActions.setActiveTab(NavTabType.ComitteReview));
  };

  /**
   * Add a new college: open a modal to input the name,
   * then dispatch addCollege with a stub ID, user_id, etc.
   */
  const handleAddCollege = () => {
    setIsAddModalOpen(true);
  };

  const handleAddCollegeDone = async () => {
    const matchedCollegeName = getCollegeNameKey(newCollegeName.trim());
  
    if (!matchedCollegeName) {
      alert('The college name you entered is not valid. Please re-enter.');
      return;
    }
  
    // Build a new CollegeAdmissionData object (with a placeholder ID of 0).
    const newCollegeItem = {
      id: 0,           // This is a dummy; the server will return the real ID
      user_id: userId as number,      
      college: matchedCollegeName,
      data: undefined,
    };
  
    try {
      // 1) Create the new record on the server to get the actual ID
      const newId = await collegeAdmissionDataService.create(newCollegeItem);
  
      // 2) Dispatch addCollege with the correct, real ID
      dispatch(
        collegeListWorkshopActions.addCollege({
          ...newCollegeItem,
          id: newId,
        })
      );
  
      // Close modal and reset
      setIsAddModalOpen(false);
      setNewCollegeName('');
    } catch (error: any) {
      // Show error to user, or handle however you like
      alert(`Error creating college in server: ${error.message}`);
    }
  };
  
  const handleAddCollegeCancel = () => {
    setIsAddModalOpen(false);
    setNewCollegeName('');
  };

  /**
   * Delete a college from the list by its name (currently storing name in `selectedCollege`).
   * We first find the college object by name, then dispatch deleteCollege using the college's id.
   */
    const handleDeleteCollege = async (collegeName: string) => {
        const foundCollege = collegeList.find((c) => c.college === collegeName);
        if (!foundCollege) return;
    
        try {
            // 1) Delete from the remote database (note: userId must be provided)
            await collegeAdmissionDataService.deleteById(foundCollege.id, foundCollege.user_id);
        
            // 2) Remove from the Redux store
            dispatch(collegeListWorkshopActions.deleteCollege(foundCollege.id));
        
            // 3) If this was the selected college, clear the selection
            if (selectedCollege === collegeName) {
                setSelectedCollege(null);
            }
        } catch (error: any) {
        // Handle error (e.g., show an alert or custom error message)
        alert(`Error deleting college in server: ${error.message}`);
        }
    };
  

  /**
   * When user selects a row, store that college's .college string as `selectedCollege`.
   * Then set the same in committeeReviewActions & interviewConversationActions, if needed.
   */
  const handleSelectCollege = (collegeItem: CollegeAdmissionData) => {
    setSelectedCollege(collegeItem.college);

    dispatch(committeeReviewActions.setLiveReviewCollege(collegeItem.college));
    dispatch(committeeReviewActions.setLiveReviewMajor(majorPref));

    dispatch(interviewConversationActions.setLiveConversationCollege(collegeItem.college));
    dispatch(interviewConversationActions.setLiveConversationMajor(majorPref));
  };

  /**
   * DataGrid columns: now typed to CollegeAdmissionData, 
   * referencing .college for the name, .data for chance, etc.
   */
  const columns: TableColumnDefinition<CollegeAdmissionData>[] = [
    createTableColumn<CollegeAdmissionData>({
      columnId: 'name',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={mergeClasses(styles.headerCell, styles.wideColumn)}>
          College Name
        </DataGridHeaderCell>
      ),
      renderCell: (collegeItem) => (
        <DataGridCell className={mergeClasses(styles.cell, styles.wideColumn)}>
          <TableCellLayout>{collegeItem.college}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'myChance',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>My Chance</DataGridHeaderCell>
      ),
      renderCell: (collegeItem) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>
            {collegeItem.data?.chance != null ? `${collegeItem.data.chance}%` : ''}
          </TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'admitRate',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Admit Rate</DataGridHeaderCell>
      ),
      renderCell: (collegeItem) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>
            {collegeItem.data?.admitRate != null ? `${collegeItem.data.admitRate}%` : ''}
          </TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'undergradEnroll',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Undergrad. Enrollment</DataGridHeaderCell>
      ),
      renderCell: (collegeItem) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>
            {collegeItem.data?.undergradEnroll ?? ''}
          </TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'annualCost',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Annual Cost ($)</DataGridHeaderCell>
      ),
      renderCell: (collegeItem) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{collegeItem.data?.annualCost ?? ''}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'nationalRanking',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>National Ranking</DataGridHeaderCell>
      ),
      renderCell: (collegeItem) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{collegeItem.data?.nationalRanking ?? ''}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'programRanking',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Major Ranking</DataGridHeaderCell>
      ),
      renderCell: (collegeItem) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{collegeItem.data?.programRanking ?? ''}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'category',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Category</DataGridHeaderCell>
      ),
      renderCell: (collegeItem) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>
            {collegeItem.data?.category === 1
              ? 'Reach'
              : collegeItem.data?.category === 2
              ? 'Target'
              : collegeItem.data?.category === 3
              ? 'Safe'
              : ''}
          </TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'actions',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}></DataGridHeaderCell>
      ),
      renderCell: (collegeItem) => (
        <DataGridCell className={mergeClasses(styles.cell, styles.actionCell)}>
          <Button
            icon={<Delete20Regular />}
            onClick={() => handleDeleteCollege(collegeItem.college)}
            appearance="subtle"
            size="small"
            aria-label="Delete College"
            className={styles.actionButton}
          />
        </DataGridCell>
      ),
    }),
  ];

  return (
    <div>
      {/* Progress Modal: triggered while tasks are running */}
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

      {/* First Card: Crafting Operations */}
      <Card className={styles.card}>
        <h2 className={styles.header} style={{ textAlign: 'left' }}>
          Crafting Operations
        </h2>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <Button onClick={handleStartCollegeListTask}>Create Initial List</Button>
          <Button onClick={handleStartEvaluationTask} disabled={!selectedCollege}>
            Evaluate
          </Button>
          <Button onClick={handleCommitteeReview} disabled={!selectedCollege}>
            Committee Review
          </Button>
        </div>
      </Card>

      {/* Second Card: College List */}
      <Card className={styles.card}>
        <h2 className={styles.header} style={{ textAlign: 'left' }}>
          College List
        </h2>

        <DataGrid
          items={collegeList}
          columns={columns}
          getRowId={(item) => item.id}
          sortable
        >
          <DataGridHeader>
            <DataGridRow className={styles.row}>
              {({ renderHeaderCell }) => (
                <DataGridHeaderCell className={styles.headerCell}>
                  {renderHeaderCell()}
                </DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody<CollegeAdmissionData>>
            {({ item }) => (
              <DataGridRow
                key={item.id}
                className={styles.row}
                /** highlight row if .college matches selectedCollege */
                style={{
                  backgroundColor:
                    selectedCollege === item.college ? '#80d4ff' : 'white',
                }}
                onClick={() => handleSelectCollege(item)}
              >
                {({ renderCell }) => (
                  <DataGridCell className={styles.cell}>{renderCell(item)}</DataGridCell>
                )}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>

        <div className={styles.addItemContainer}>
          <Button
            icon={<Add20Regular />}
            onClick={handleAddCollege}
            className={styles.addItemButton}
          >
            Add an Item
          </Button>
        </div>
      </Card>

      {/* Add College Modal */}
      {isAddModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Add College</h3>
            <input
              type="text"
              value={newCollegeName}
              onChange={(e) => setNewCollegeName(e.target.value)}
              placeholder="Enter college name"
              className={styles.modalInput}
            />
            <div className={styles.modalButtons}>
              <Button onClick={handleAddCollegeDone}>Done</Button>
              <Button onClick={handleAddCollegeCancel}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
