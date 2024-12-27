// CollegeListBuildForm.tsx
import React from 'react';
import {
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Button,
  Card
} from '@fluentui/react-components';

import { Add20Regular, Delete20Regular } from '@fluentui/react-icons';
import { mergeClasses } from '@fluentui/react-components';

import { CollegeAdmissionData } from '../../../shared';
import { useStyles } from './college-list-build-form.styles';

// Define the props that this component needs
interface CollegeListBuildFormProps {
  collegeList: CollegeAdmissionData[];
  selectedCollegeId?: number;
  onSelectCollege: (college: CollegeAdmissionData) => void;
  onDeleteCollege: (collegeId: number) => void;
  onAddCollege: () => void;
}

export const CollegeListBuildForm: React.FC<CollegeListBuildFormProps> = ({
  collegeList,
  selectedCollegeId,
  onSelectCollege,
  onDeleteCollege,
  onAddCollege
}) => {
  const styles = useStyles();

  // Define the columns for DataGrid
  const columns: TableColumnDefinition<CollegeAdmissionData>[] = [
    createTableColumn<CollegeAdmissionData>({
      columnId: 'collegeName',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={mergeClasses(styles.headerCell, styles.wideColumn)}>
          College Name
        </DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={mergeClasses(styles.cell, styles.wideColumn)}>
          <TableCellLayout>{item.college}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'myChance',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>My Chance</DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>
            {item.data?.chance != null ? `${item.data.chance}%` : ''}
          </TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'admitRate',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Admit Rate</DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>
            {item.data?.admitRate != null ? `${item.data.admitRate}%` : ''}
          </TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'undergradEnroll',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Undergrad. Enrollment</DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>
            {item.data?.undergradEnroll ?? ''}
          </TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'annualCost',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Annual Cost ($)</DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{item.data?.annualCost ?? ''}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'nationalRanking',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>National Ranking</DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{item.data?.nationalRanking ?? ''}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'programRanking',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Major Ranking</DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{item.data?.programRanking ?? ''}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'category',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Category</DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>
            {item.data?.category === 1
              ? 'Reach'
              : item.data?.category === 2
              ? 'Target'
              : item.data?.category === 3
              ? 'Safe'
              : ''}
          </TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'actions',
      renderHeaderCell: () => <DataGridHeaderCell className={styles.headerCell} />,
      renderCell: (item) => (
        <DataGridCell className={mergeClasses(styles.cell, styles.actionCell)}>
          <Button
            icon={<Delete20Regular />}
            onClick={(e) => {
              e.stopPropagation(); // prevent row selection
              onDeleteCollege(item.id);
            }}
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
    <Card className={styles.card}>
      <h2 className={styles.header} style={{ textAlign: 'left' }}>
        College List
      </h2>

      <DataGrid
        items={collegeList}
        columns={columns}
        getRowId={(item) => String(item.id)}
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
              style={{
                backgroundColor: item.id === selectedCollegeId ? '#80d4ff' : 'white',
              }}
              onClick={() => onSelectCollege(item)}
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
          onClick={onAddCollege}
          className={styles.addItemButton}
        >
          Add an Item
        </Button>
      </div>
    </Card>
  );
};
