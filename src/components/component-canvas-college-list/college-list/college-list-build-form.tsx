import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  collegeListWorkshopActions, 
  committeeReviewActions, 
  interviewConversationActions, 
  navigationTabActions, 
  RootState 
} from '../../../store';

import { getCollegeNameKey } from '../../component-map';
import {
  CollegeDataAndChanceRequest,
  CollegeListBuildRequest,
  ProgressModal,
  GetCollegeDataChanceTaskResult,
  BuildCollegeListTaskResult,
  TaskResult,
  TaskType,
  useTaskRunner
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

export const CollegeListBuildForm: React.FC = () => {
  const dispatch = useDispatch();
  const styles = useStyles();

  const collegeList = useSelector((state: RootState) => state.collegeListWorkshop.collegeList);
  const collegeDetails = useSelector((state: RootState) => state.collegeListWorkshop.collegeDetails);
  const collegePref: CollegePreferences = useSelector(
    (state: RootState) => state.collegePreferences.collegePreferences
  );
  const majorPref: string = collegePref.specializedProgram.value;

  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCollegeName, setNewCollegeName] = useState('');

  const [activeTask, setActiveTask] = useState<"collegeList" | "evaluation" | null>(null);

  const {startTask: startCollegeListTask, showModal: showCollegeListModal, progressMessage: progressCollegeListMessage } = useTaskRunner({
    taskType: TaskType.BuildCollegeList,
    requestData: {} as CollegeListBuildRequest,
    onResult: (data: TaskResult) => {
      dispatch(collegeListWorkshopActions.setCollegeList((data as BuildCollegeListTaskResult).college_list));
      setActiveTask(null);
    }
  });

  const {startTask: startEvaluationTask, showModal: showEvaluationModal, progressMessage: progressEvaluationMessage } = useTaskRunner({
    taskType: TaskType.GetCollegeDataChance,
    requestData: { college_name: selectedCollege, major: majorPref } as CollegeDataAndChanceRequest, 
    onResult: (data: TaskResult) => {
      dispatch(collegeListWorkshopActions.addCollegeDetail({
        name: selectedCollege as string,
        detail: (data as GetCollegeDataChanceTaskResult).data_chance
      }));
      setActiveTask(null);
    }
  });

  const handleStartCollegeListTask = () => {
    setActiveTask("collegeList");
    startCollegeListTask();
  };

  const handleStartEvaluationTask = () => {
    setActiveTask("evaluation");
    startEvaluationTask();
  };

  const handleAddCollege = () => {
    setIsAddModalOpen(true);
  };

  const handleAddCollegeDone = () => {
    const matchedCollegeName = getCollegeNameKey(newCollegeName.trim());

    if (matchedCollegeName) {
      dispatch(collegeListWorkshopActions.addCollege(matchedCollegeName));
      setIsAddModalOpen(false);
      setNewCollegeName('');
    } else {
      alert("The college name you entered is not valid. Please re-enter.");
    }
  }

  const handleAddCollegeCancel = () => {
    setIsAddModalOpen(false);
    setNewCollegeName('');
  };

  const handleDeleteCollege = (collegeToDelete: string) => {
    dispatch(collegeListWorkshopActions.deleteCollege(collegeToDelete));
    dispatch(collegeListWorkshopActions.deleteCollegeDetail(collegeToDelete));
    if (selectedCollege === collegeToDelete) {
      setSelectedCollege(null);
    }
  };

  const handleSelectCollege = (college: string) => {
    setSelectedCollege(college);
    dispatch(committeeReviewActions.setCollege(college));
    dispatch(committeeReviewActions.setMajor(majorPref));

    dispatch(interviewConversationActions.setLiveConversationCollege(college));
    dispatch(interviewConversationActions.setLiveConversationMajor(majorPref));   
  }

  const handleCommitteeReview = () => {
    dispatch(navigationTabActions.setActiveTab(NavTabType.ComitteReview
    ));
  };

  // DataGrid columns definition
  const columns: TableColumnDefinition<string>[] = [
    createTableColumn<string>({
        columnId: 'name',
        renderHeaderCell: () => (
          <DataGridHeaderCell className={mergeClasses(styles.headerCell, styles.wideColumn)}>
            College Name
          </DataGridHeaderCell>
        ),
        renderCell: (college) => (
          <DataGridCell className={mergeClasses(styles.cell, styles.wideColumn)}>
            <TableCellLayout>{college}</TableCellLayout>
          </DataGridCell>
        ),
      }),
    createTableColumn<string>({
      columnId: 'myChance',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>My Chance</DataGridHeaderCell>
      ),
      renderCell: (college) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>
            {collegeDetails[college]?.chance != null ? `${collegeDetails[college].chance}%` : ''}
          </TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<string>({
      columnId: 'admitRate',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Admit Rate</DataGridHeaderCell>
      ),
      renderCell: (college) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>
            {collegeDetails[college]?.admitRate != null ? `${collegeDetails[college].admitRate}%` : ''}
          </TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<string>({
      columnId: 'undergradEnroll',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Undergrad. Enrollment</DataGridHeaderCell>
      ),
      renderCell: (college) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>
            {collegeDetails[college]?.undergradEnroll ?? ''}
          </TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<string>({
      columnId: 'annualCost',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Annual Cost ($)</DataGridHeaderCell>
      ),
      renderCell: (college) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>
            {collegeDetails[college]?.annualCost ?? ''}
          </TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<string>({
      columnId: 'nationalRanking',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>National Ranking</DataGridHeaderCell>
      ),
      renderCell: (college) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>
            {collegeDetails[college]?.nationalRanking ?? ''}
          </TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<string>({
      columnId: 'majorRanking',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Major Ranking</DataGridHeaderCell>
      ),
      renderCell: (college) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>
            {collegeDetails[college]?.programRanking ?? ''}
          </TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<string>({
      columnId: 'category',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Category</DataGridHeaderCell>
      ),
      renderCell: (college) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>
            {collegeDetails[college]?.category === 1
              ? 'Reach'
              : collegeDetails[college]?.category === 2
              ? 'Target'
              : collegeDetails[college]?.category === 3
              ? 'Safe'
              : ''}
          </TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<string>({
      columnId: 'actions',
      renderHeaderCell: () => <DataGridHeaderCell className={styles.headerCell}></DataGridHeaderCell>,
      renderCell: (college) => (
        <DataGridCell className={mergeClasses(styles.cell, styles.actionCell)}>
          <Button
            icon={<Delete20Regular />}
            onClick={() => handleDeleteCollege(college)}
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
      <ProgressModal
        show={activeTask !== null && (showCollegeListModal || showEvaluationModal)}
        message={
          activeTask === "collegeList"
            ? progressCollegeListMessage
            : activeTask === "evaluation"
            ? progressEvaluationMessage
            : ""
        }
      />

      {/* First Card: Crafting Operations */}
      <Card className={styles.card}>
        <h2 className={styles.header} style={{ textAlign: 'left' }}>Crafting Operations</h2>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <Button onClick={handleStartCollegeListTask}>Create Initial List</Button>
          <Button onClick={handleStartEvaluationTask} disabled={!selectedCollege}>Evaluate</Button>
          <Button onClick={handleCommitteeReview}  disabled={!selectedCollege}>Committee Review</Button>
        </div>
      </Card>

      {/* Second Card: College List */}
      <Card className={styles.card}>
        <h2 className={styles.header} style={{ textAlign: 'left' }} >College List</h2>
        <DataGrid
            items={collegeList}
            columns={columns}
            getRowId={(item) => item}
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
            <DataGridBody<string>>
                {({ item }) => (
                <DataGridRow
                    key={item}
                    className={styles.row}
                    style={{ backgroundColor: selectedCollege === item ? '#80d4ff' : 'white' }}
                    onClick={() => handleSelectCollege(item)} // Use `onClick` here
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
