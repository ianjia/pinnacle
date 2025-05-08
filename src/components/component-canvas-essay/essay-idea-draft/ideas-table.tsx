import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  Card,
  Button,
  mergeClasses,
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableBody,
} from '@fluentui/react-components';
import { Add16Regular, Delete16Regular } from '@fluentui/react-icons';

import { alertDialogActions, essayWorkshopActions, RootState, useBasicInfoFilled } from '../../../store';
import {
  EssayIdeaRefinementRequest,
  ProgressModal,
  RefineEssayIdeaTaskResult,
  TaskResult,
  TaskType,
  useTaskRunner,
} from '../../component-service-proxy';
import { useStyles } from './ideas-table.styles';

interface IdeasTableProps {
  editable: boolean;
  selectCallback?: (selectedValue: string) => void;
}

export const IdeasTable: React.FC<IdeasTableProps> = ({
  editable,
  selectCallback,
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  // Ideas from Redux
  const ideas = useSelector((state: RootState) => state.essayWorkshop.ideas);
  const ideaEntries = Object.entries(ideas);

  // Local state
  const [selectedIdeaKey, setSelectedIdeaKey] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newIdeaText, setNewIdeaText] = useState<string>('');
  const [textAreaValue, setTextAreaValue] = useState<string>('');

  // Redux references for refining an idea
  const college = useSelector((state: RootState) => state.essayWorkshop.college);
  const major = useSelector((state: RootState) => state.essayWorkshop.major);
  const essay_prompt = useSelector(
    (state: RootState) => state.essayWorkshop.essayPrompt
  );
  const additional_ask = useSelector(
    (state: RootState) => state.essayWorkshop.additionalAsk
  );

  const hasBasicInfoFilled = useBasicInfoFilled();

  // Task Runner for "Refine" button
  const { startTask: startRefineEssayIdeaTask, showModal, progressMessage } =
    useTaskRunner({
      taskType: TaskType.RefineEssayIdea,
      requestData: {
        college,
        major,
        prompt: essay_prompt,
        additionalInfo: additional_ask,
        idea: ideas[selectedIdeaKey as string],
        feedback: textAreaValue,
      } as EssayIdeaRefinementRequest,
      onResult: (data: TaskResult) => {
        const result = (data as RefineEssayIdeaTaskResult).idea;
        dispatch(
          essayWorkshopActions.addIdea({
            key: selectedIdeaKey as string,
            value: result,
          })
        );
      },
    });

  // --------------------- HANDLERS ---------------------
  // Row selection
  const handleRowClick = (key: string) => {
    setSelectedIdeaKey(key);
    selectCallback?.(key);
  };

  // Delete a row (idea)
  const handleRowDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string
  ) => {
    e.stopPropagation(); // avoid triggering row-click selection
    dispatch(essayWorkshopActions.deleteIdea(key));
    if (selectedIdeaKey === key) {
      setSelectedIdeaKey(null);
    }
  };

  // Refine
  const handleRefine = () => {
    if (!hasBasicInfoFilled) {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Insuffient Information',
          message: 'Please fill in basic information in student profile before performing the task',
        }));

      return;
    }

    if (selectedIdeaKey) {
      startRefineEssayIdeaTask();
    } else {
      dispatch(
        alertDialogActions.showAlert({
          title: 'Validation Error',
          message: 'Please select an idea.',
        })
      );
    }
  };

  // Add item (modal open/close)
  const handleAdd = () => {
    setShowAddModal(true);
  };
  const handleAddCancel = () => {
    setNewIdeaText('');
    setShowAddModal(false);
  };
  const handleAddDone = () => {
    if (newIdeaText.trim() !== '') {
      const newKey = uuidv4();
      dispatch(essayWorkshopActions.addIdea({ key: newKey, value: newIdeaText }));
      setNewIdeaText('');
    }
    setShowAddModal(false);
  };

  // --------------------- RENDER ---------------------
  return (
    <Card className={styles.card}>
      <ProgressModal show={showModal} message={progressMessage} />
      <h2 className={styles.header} style={{ textAlign: 'left' }}>
        Essay Ideas
      </h2>

      {/* If there's a modal for adding a new idea */}
      {showAddModal && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <h3>Add New Idea</h3>
            {/* Changed from <input> to <textarea> */}
            <textarea
              className={styles.textAreaInput}
              value={newIdeaText}
              onChange={(e) => setNewIdeaText(e.target.value)}
              rows={4} // Adjust the number of rows as needed
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button appearance="primary" onClick={handleAddDone}>
                Done
              </Button>
              <Button onClick={handleAddCancel}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className={styles.tableContainer}>
        <Table aria-label="Ideas Table">
          <TableHeader>
            <TableRow className={styles.headerRow}>
              <TableHeaderCell style={{ width: '40px' }}>#</TableHeaderCell>
              <TableHeaderCell>Idea</TableHeaderCell>
              {/* Actions column */}
              <TableHeaderCell style={{ width: '50px' }} />
            </TableRow>
          </TableHeader>

          <TableBody>
            {ideaEntries.map(([key, value], index) => {
              const isSelected = selectedIdeaKey === key;
              return (
                <TableRow
                  as="div"
                  role="row"         // optional for accessibility
                  tabIndex={0}       // optional if you want tab-focus
                  onClick={() => handleRowClick(key)}
                  className={mergeClasses(styles.rowHover, isSelected && styles.selectedRow)}
                  >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{value}</TableCell>
                  {/* Delete (trash can) button */}
                  <TableCell className={styles.actionsCell}>
                    <Button
                      icon={<Delete16Regular />}
                      appearance="subtle"
                      size="small"
                      onClick={(e) => handleRowDelete(e, key)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* "Add an item" button below the table */}
      {editable && (
        <div className={styles.buttonRow}>
          <Button icon={<Add16Regular />} onClick={handleAdd}>
            Add an item
          </Button>
        </div>
      )}

      {/* Refinement feedback textarea + "Refine" button */}
      {editable && (
        <div className={styles.feedbackContainer}>
          <div className={styles.feedbackLabel}>Refinement Feedback:</div>
          <textarea
            className={styles.feedbackTextarea}
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />

          <div className={styles.refineButtonContainer}>
            <Button onClick={handleRefine} disabled={!selectedIdeaKey}>
              Refine Idea
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
