import React, { useState } from 'react';
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
  mergeClasses,
} from '@fluentui/react-components';
import { Add20Regular, Delete20Regular } from '@fluentui/react-icons';
import { ApExam, Score_AP_Exam } from '../../../../shared';
import { DropdownCustom } from '../../../component-customized-fluent-ui';
import { useStyles } from './data-list-styles';
import { ApExamListCardProps } from './data-list-types';
import { useDispatch } from 'react-redux';
import { alertDialogActions } from '../../../../store';

const ApExamNameCell: React.FC<{
  value: string;
  onUpdate: (updatedValue: string) => void;
  className?: string;
}> = ({ value, onUpdate, className }) => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState(value || '');

  const handleBlur = () => {
    if (inputValue.trim() === '') {
        dispatch(
          alertDialogActions.showAlert({
            title: 'Validation Error',
            message: 'AP Exam Name cannot be empty.',
          })
        );
    } else if (inputValue !== value) {
      onUpdate(inputValue);
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleBlur}
      className={className}
    />
  );
};

export const ApExamListCard: React.FC<ApExamListCardProps> = ({
  title,
  apExamList,
  onAddApExam,
  onUpdateApExam,
  onDeleteApExam,
}) => {
  const styles = useStyles();

  const columns: TableColumnDefinition<ApExam>[] = [
    createTableColumn<ApExam>({
      columnId: 'name',
      compare: (a, b) => (a.name || '').localeCompare(b.name || ''),
      renderHeaderCell: () => 'Exam Name',
      renderCell: (item) => (
        <TableCellLayout className={styles.cell}>
          <ApExamNameCell
            value={item.name || ''}
            onUpdate={(updatedValue) => onUpdateApExam({ ...item, name: updatedValue })}
            className={styles.input}
          />
        </TableCellLayout>
      ),
    }),
    createTableColumn<ApExam>({
      columnId: 'score',
      compare: (a, b) => (a.score || 0) - (b.score || 0),
      renderHeaderCell: () => 'Score',
      renderCell: (item) => (
        <TableCellLayout className={styles.cell}>
          <DropdownCustom
            options={Score_AP_Exam}
            value={item.score}
            onOptionSelect={(e, option) =>
              onUpdateApExam({
                ...item,
                score: Number(option.optionValue) as Score_AP_Exam,
              })
            }
            placeHolder="Select Score"
          />
        </TableCellLayout>
      ),
    }),
    createTableColumn<ApExam>({
      columnId: 'actions',
      renderHeaderCell: () => '',
      renderCell: (item) => (
        <TableCellLayout className={mergeClasses(styles.cell, styles.actionCell)}>
          <Button
            icon={<Delete20Regular />}
            onClick={() => onDeleteApExam(item.id)}
            appearance="subtle"
            size="small"
            aria-label="Delete AP Exam"
            className={styles.actionButton}
          />
        </TableCellLayout>
      ),
    }),
  ];

  return (
    <Card className={styles.subcard}>
      <h2 className={styles.subcardheader} style={{ textAlign: 'left' }}>{title}</h2>
      <DataGrid
        items={apExamList}
        columns={columns}
        sortable
        getRowId={(item) => item.id.toString()}
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
        <DataGridBody<ApExam>>
          {({ item }) => (
            <DataGridRow key={item.id} className={styles.row}>
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
          onClick={onAddApExam}
          className={styles.addItemButton}
        >
          Add an Item
        </Button>
      </div>
    </Card>
  );
};
