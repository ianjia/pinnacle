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

import {
  alertDialogActions,
  essayWorkshopActions,
  RootState,
  useBasicInfoFilled,
} from '../../../store';

import {
  EssayIdeaRefinementRequest,
  ProgressModal,
  RefineEssayIdeaTaskResult,
  TaskResult,
  TaskType,
  useTaskRunner,
} from '../../component-service-proxy';

import { useTableStyles } from './ideas-table.styles';
import { useCardStyles } from './essay-common-card.styles';

interface Props {
  editable: boolean;
  selectCallback?: (k: string) => void;
}

export const IdeasTable: React.FC<Props> = ({ editable, selectCallback }) => {
  const cardCommon = useCardStyles();
  const styles = useTableStyles();
  const dispatch = useDispatch();

  /* Redux data */
  const ideas = useSelector((s: RootState) => s.essayWorkshop.ideas);
  const ideaEntries = Object.entries(ideas);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  /* modal (add idea) */
  const [showAdd, setShowAdd] = useState(false);
  const [newIdea, setNewIdea] = useState('');

  /* refinement feedback */
  const [feedback, setFeedback] = useState('');
  const hasProfile = useBasicInfoFilled();

  /* task‑runner data */
  const college = useSelector((s: RootState) => s.essayWorkshop.college);
  const major   = useSelector((s: RootState) => s.essayWorkshop.major);
  const prompt  = useSelector((s: RootState) => s.essayWorkshop.essayPrompt);
  const addn    = useSelector((s: RootState) => s.essayWorkshop.additionalAsk);

  const { startTask, showModal, progressMessage } = useTaskRunner({
    taskType: TaskType.RefineEssayIdea,
    requestData: {
      college,
      major,
      prompt,
      additionalInfo: addn,
      idea: ideas[selectedKey as string],
      feedback,
    } as EssayIdeaRefinementRequest,
    onResult: (d: TaskResult) =>
      dispatch(
        essayWorkshopActions.addIdea({
          key: selectedKey as string,
          value: (d as RefineEssayIdeaTaskResult).idea,
        })
      ),
  });

  /* ---------- helpers ---------- */
  const selectRow = (k: string) => {
    setSelectedKey(k);
    selectCallback?.(k);
  };

  const deleteRow = (
    e: React.MouseEvent<HTMLButtonElement>,
    k: string
  ) => {
    e.stopPropagation();
    dispatch(essayWorkshopActions.deleteIdea(k));
    if (selectedKey === k) setSelectedKey(null);
  };

  const addIdea = () => {
    if (newIdea.trim()) {
      dispatch(essayWorkshopActions.addIdea({ key: uuidv4(), value: newIdea }));
      setNewIdea('');
    }
    setShowAdd(false);
  };

  const refineIdea = () => {
    if (!hasProfile)
      return dispatch(
        alertDialogActions.showAlert({
          title: 'Insuffient Information',
          message: 'Fill basic profile first.',
        })
      );
    if (!selectedKey)
      return dispatch(
        alertDialogActions.showAlert({
          title: 'Validation Error',
          message: 'Select an idea first.',
        })
      );
    startTask();
  };

  /* ---------- JSX ---------- */
  return (
    <Card className={cardCommon.card}>
      <h2 className={cardCommon.header}>Essay Ideas</h2>
      <ProgressModal show={showModal} message={progressMessage} />

      {/* Add‑idea modal */}
      {showAdd && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Add new idea</h3>

            <textarea
              className={styles.textarea}
              value={newIdea}
              onChange={(e) => setNewIdea(e.target.value)}
            />

            <div className={styles.modalButtonRow}>
              <Button appearance="primary" onClick={addIdea}>
                Done
              </Button>
              <Button appearance="primary" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* Ideas table */}
      <div className={styles.tableContainer}>
        <Table aria-label="ideas">
          <TableHeader>
            <TableRow className={styles.headerRow}>
              <TableHeaderCell style={{ width: '40px' }}>#</TableHeaderCell>
              <TableHeaderCell>Idea</TableHeaderCell>
              <TableHeaderCell style={{ width: '50px' }} />
            </TableRow>
          </TableHeader>

          <TableBody>
            {ideaEntries.map(([k, v], i) => (
              <TableRow
                key={k}
                onClick={() => selectRow(k)}
                className={mergeClasses(
                  styles.rowHover,
                  selectedKey === k && styles.selectedRow
                )}
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell>{v}</TableCell>
                <TableCell className={styles.actionsCell}>
                  <Button
                    icon={<Delete16Regular />}
                    appearance="subtle"
                    size="small"
                    aria-label="delete"
                    onClick={(e) => deleteRow(e, k)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add item button */}
      {editable && (
        <>
          <div className={styles.addItemContainer}>
            <Button appearance='secondary' icon={<Add16Regular />} onClick={() => setShowAdd(true)} className={styles.addItemButton}>
              Add an item
            </Button>
          </div>

          {/* Feedback + refine */}
          <div className={styles.feedbackBlock}>
            <strong>Refinement feedback:</strong>
            <textarea
              className={styles.textarea}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className={styles.buttonField}>
              <Button appearance = 'primary' onClick={refineIdea} disabled={!selectedKey} className= {styles.button}>
                Refine Idea
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
