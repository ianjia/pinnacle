import React from 'react';
import {
  Card,
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
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from '@fluentui/react-components';
import { Delete20Regular, Info24Regular } from '@fluentui/react-icons';
import { mergeClasses } from '@fluentui/react-components';

import { CommitteeReview } from '../../../shared';
import { useStyles } from './committee-review-list-table.styles';

interface Props {
  reviews: CommitteeReview[];
  onSelect: (r: CommitteeReview) => void;
  onDelete: (id: number) => void;
  selectedReviewId?: number;
}

export const CommitteeReviewListTable: React.FC<Props> = ({
  reviews,
  onSelect,
  onDelete,
  selectedReviewId,
}) => {
  const styles = useStyles();

  /* newest first */
  const data = React.useMemo(
    () =>
      [...reviews].sort(
        (a, b) => +new Date(b.time) - +new Date(a.time)
      ),
    [reviews]
  );

  /* columns */
  const columns: TableColumnDefinition<CommitteeReview>[] = [
    createTableColumn({
      columnId: 'time',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>
          Time
        </DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{item.time}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn({
      columnId: 'college',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>
          College
        </DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{item.college}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn({
      columnId: 'major',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>
          Major
        </DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{item.major}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn({
      columnId: 'actions',
      renderHeaderCell: () => <DataGridHeaderCell />, // empty
      renderCell: (item) => (
        <DataGridCell
          className={mergeClasses(styles.cell, styles.actionCell)}
        >
          <Button
            icon={<Delete20Regular />}
            appearance="subtle"
            size="small"
            aria-label="Delete review"
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
          />
        </DataGridCell>
      ),
    }),
  ];

  return (
    <Card className={styles.card}>
      <div className={styles.headerRow}>
        <h3 className={styles.header}>Holistic Review History</h3>
        <Popover>
          <PopoverTrigger>
            <Button
              icon={<Info24Regular />}
              appearance="subtle"
              aria-label="info"
              size="small"
              className={styles.infoIcon}
            />
          </PopoverTrigger>
          <PopoverSurface>
            Please select a row to view its review.
          </PopoverSurface>
        </Popover>
      </div>

      <DataGrid items={data} columns={columns} getRowId={(r) => `${r.id}`}>
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>

        <DataGridBody<CommitteeReview>>
          {({ item }) => (
            <DataGridRow
              key={item.id}
              className={mergeClasses(
                styles.row,
                selectedReviewId === item.id && styles.rowSelected
              )}
              onClick={() => onSelect(item)}
            >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </Card>
  );
};
