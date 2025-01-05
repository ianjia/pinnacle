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

import {
  Add20Regular,
  Delete20Regular,
  ChevronUp12Regular,
  ChevronDown12Regular
} from '@fluentui/react-icons';

import { mergeClasses } from '@fluentui/react-components';

import { CollegeAdmissionData } from '../../../shared';
import { useStyles } from './college-list-build-form.styles';

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

  // -- 1. State to track which column is sorted & direction
  // Use a default sort on "myChance" (ascending):
  const [sortConfig, setSortConfig] = React.useState({
    column: 'myChance',
    direction: 'asc',
  });
 
  // -- 2. Handler that toggles ascending/descending
  const requestSort = (column: string) => {
    // Don’t sort on the trash column
    if (!column || column === 'actions') return;

    let direction: 'asc' | 'desc' = 'asc';

    // If the same column is clicked, toggle
    if (sortConfig && sortConfig.column === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ column, direction });
  };

  // -- 3. Sort the collegeList based on sortConfig
  const sortedData = React.useMemo(() => {
    if (!sortConfig) {
      return collegeList;
    }
    const { column, direction } = sortConfig;
    const sorted = [...collegeList];

    // Simple numeric/string comparisons (tweak logic as needed):
    sorted.sort((a, b) => {
      let valA: string | number = '';
      let valB: string | number = '';

      switch (column) {
        case 'collegeName':
          valA = a.college ?? '';
          valB = b.college ?? '';
          return valA.localeCompare(valB);
        case 'myChance':
          valA = a.data?.chance ?? 0;
          valB = b.data?.chance ?? 0;
          return valA - valB;
        case 'admitRate':
          valA = a.data?.admitRate ?? 0;
          valB = b.data?.admitRate ?? 0;
          return valA - valB;
        case 'undergradEnroll':
          valA = a.data?.undergradEnroll ?? 0;
          valB = b.data?.undergradEnroll ?? 0;
          return valA - valB;
        case 'annualCost':
          valA = a.data?.annualCost ?? 0;
          valB = b.data?.annualCost ?? 0;
          return valA - valB;
        case 'nationalRanking':
          valA = a.data?.nationalRanking ?? 99999; // or Infinity
          valB = b.data?.nationalRanking ?? 99999;
          return valA - valB;
        case 'programRanking':
          valA = a.data?.programRanking ?? 99999;
          valB = b.data?.programRanking ?? 99999;
          return valA - valB;
        case 'category':
          valA = a.data?.category ?? 0;
          valB = b.data?.category ?? 0;
          return valA - valB;
        default:
          return 0;
      }
    });

    if (direction === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [collegeList, sortConfig]);

  // -- 4. Helper for rendering the column header w/ optional arrow
  const renderSortableHeaderCell = (label: string, columnId: string, extraClass?: string) => {
    const isSorted = sortConfig?.column === columnId;
    const isAsc = sortConfig?.direction === 'asc';
    return (
      <DataGridHeaderCell
        className={mergeClasses(styles.headerCell, extraClass)}
        onClick={() => requestSort(columnId)}
        style={{ cursor: 'pointer' }} // indicate clickable
      >
        {label}
        {isSorted && (
          isAsc ? (
            <ChevronUp12Regular style={{ marginLeft: 4 }} />
          ) : (
            <ChevronDown12Regular style={{ marginLeft: 4 }} />
          )
        )}
      </DataGridHeaderCell>
    );
  };

  // Define the columns with "renderHeaderCell" and "renderCell"
  const columns: TableColumnDefinition<CollegeAdmissionData>[] = [
    createTableColumn<CollegeAdmissionData>({
      columnId: 'collegeName',
      renderHeaderCell: () => renderSortableHeaderCell('College Name', 'collegeName', styles.wideColumn),
      renderCell: (item) => (
        <DataGridCell className={mergeClasses(styles.cell, styles.wideColumn)}>
          <TableCellLayout>{item.college}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'myChance',
      renderHeaderCell: () => renderSortableHeaderCell('My Chance', 'myChance'),
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
      renderHeaderCell: () => renderSortableHeaderCell('Admit Rate', 'admitRate'),
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
      renderHeaderCell: () => renderSortableHeaderCell('Undergrad. Enrollment', 'undergradEnroll'),
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
      renderHeaderCell: () => renderSortableHeaderCell('Annual Cost ($)', 'annualCost'),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{item.data?.annualCost ?? ''}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'nationalRanking',
      renderHeaderCell: () => renderSortableHeaderCell('National Ranking', 'nationalRanking'),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{item.data?.nationalRanking ?? ''}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'programRanking',
      renderHeaderCell: () => renderSortableHeaderCell('Major Ranking', 'programRanking'),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{item.data?.programRanking ?? ''}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CollegeAdmissionData>({
      columnId: 'category',
      renderHeaderCell: () => renderSortableHeaderCell('Category', 'category'),
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
    // Non-sortable trash-can (delete) column:
    createTableColumn<CollegeAdmissionData>({
      columnId: 'actions',
      // No need for arrow or onClick
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

      {/* 
        Pass the sorted data to DataGrid.
        Note: DataGrid also supports `sortable` & `onSortChange` props,
        but here we handle sorting ourselves via sortConfig/requestSort.
      */}
      <DataGrid
        items={sortedData}
        columns={columns}
        getRowId={(item) => String(item.id)}
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
                backgroundColor: item.id === selectedCollegeId ? '#e0f0ff' : 'white',
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
