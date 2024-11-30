import React from 'react';
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
import { Course, CourseType, CourseGrade, Score_IB } from '../../../shared';
import { DropdownCustom } from '../../component-customized-fluent-ui';
import { useStyles } from './couse-list-styles';

interface CourseListCardProps {
  courseList: Course[];
  onAddCourse: () => void;
  onUpdateCourse: (updatedCourse: Course) => void;
  onDeleteCourse: (courseId: number) => void;
}

export const CourseListCard: React.FC<CourseListCardProps> = ({
  courseList,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
}) => {
  const styles = useStyles();

  const columns: TableColumnDefinition<Course>[] = [
    createTableColumn<Course>({
      columnId: 'name',
      compare: (a, b) => (a.name || '').localeCompare(b.name || ''),
      renderHeaderCell: () => 'Course Name',
      renderCell: (item) => (
        <TableCellLayout className={styles.cell}>
          <input
            type="text"
            value={item.name || ''}
            onChange={(e) => onUpdateCourse({ ...item, name: e.target.value })}
            className={styles.input}
          />
        </TableCellLayout>
      ),
    }),
    createTableColumn<Course>({
      columnId: 'type',
      compare: (a, b) => (a.type || '').localeCompare(b.type || ''),
      renderHeaderCell: () => 'Course Type',
      renderCell: (item) => (
        <TableCellLayout className={styles.cell}>
          <DropdownCustom
            options={CourseType}
            value={item.type}
            onOptionSelect={(e, option) =>
              onUpdateCourse({ ...item, type: option.optionValue as CourseType })
            }
            placeHolder="Select Type"
          />
        </TableCellLayout>
      ),
    }),
    createTableColumn<Course>({
      columnId: 'gradeOrScore',
      compare: (a, b) => {
        if (a.type === CourseType.IB && b.type === CourseType.IB) {
          return (a.score || 0) - (b.score || 0);
        }
        return (a.grade || '').localeCompare(b.grade || '');
      },
      renderHeaderCell: () => 'Grade / Score',
      renderCell: (item) => (
        <TableCellLayout className={styles.cell}>
          {item.type === CourseType.IB ? (
            <DropdownCustom
              options={Score_IB}
              value={item.score}
              onOptionSelect={(e, option) =>
                onUpdateCourse({ ...item, score: Number(option.optionValue) })
              }
              placeHolder="Select Score"
            />
          ) : (
            <DropdownCustom
              options={CourseGrade}
              value={item.grade}
              onOptionSelect={(e, option) =>
                onUpdateCourse({ ...item, grade: option.optionValue as CourseGrade })
              }
              placeHolder="Select Grade"
            />
          )}
        </TableCellLayout>
      ),
    }),
    createTableColumn<Course>({
      columnId: 'actions',
      renderHeaderCell: () => '',
      renderCell: (item) => (
        <TableCellLayout className={mergeClasses(styles.cell, styles.actionCell)}>
          <Button
            icon={<Delete20Regular />}
            onClick={() => onDeleteCourse(item.id)}
            appearance="subtle"
            size="small"
            aria-label="Delete Course"
            className={styles.actionButton}
          />
        </TableCellLayout>
      ),
    }),
  ];

  return (
    <Card className={styles.card}>
      <h2 className={styles.header} style={{ textAlign: 'left' }}>Course List</h2>
      <DataGrid
        items={courseList}
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
        <DataGridBody<Course>>
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
          onClick={onAddCourse}
          className={styles.addItemButton}
        >
          Add an Item
        </Button>
      </div>
    </Card>
  );
};
