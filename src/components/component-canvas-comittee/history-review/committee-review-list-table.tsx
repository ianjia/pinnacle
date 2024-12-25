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
  PopoverSurface,
  PopoverTrigger
} from '@fluentui/react-components';

import { Delete20Regular, Info24Regular } from '@fluentui/react-icons';
import { mergeClasses } from '@fluentui/react-components';
import { CommitteeReview } from '../../../shared';
import { useStyles } from './committee-review-list-table.styles';

interface CommitteeReviewListTableProps {
  reviews: CommitteeReview[];
  onSelect: (review: CommitteeReview) => void;
  onDelete: (reviewId: number) => void;
  selectedReviewId?: number;
}

export const CommitteeReviewListTable: React.FC<CommitteeReviewListTableProps> = ({
  reviews,
  onSelect,
  onDelete,
  selectedReviewId
}) => {
  const styles = useStyles();

  // Sort reviews by time descending (most recent first).
  const sortedReviews = React.useMemo(() => {
    return [...reviews].sort((a, b) => {
      // Adjust parsing based on how your 'time' is represented
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
  }, [reviews]);

  // Define the columns for the DataGrid
  const columns: TableColumnDefinition<CommitteeReview>[] = [
    createTableColumn<CommitteeReview>({
      columnId: 'time',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Time</DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{item.time}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CommitteeReview>({
      columnId: 'college',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>College</DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{item.college}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CommitteeReview>({
      columnId: 'major',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Major</DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{item.major}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn<CommitteeReview>({
      columnId: 'actions',
      renderHeaderCell: () => <DataGridHeaderCell />,
      renderCell: (item) => (
        <DataGridCell className={mergeClasses(styles.cell, styles.actionCell)}>
          <Button
            icon={<Delete20Regular />}
            onClick={(e) => {
              e.stopPropagation(); // Prevent row selection if clicking on delete
              onDelete(item.id);
            }}
            appearance="subtle"
            size="small"
            aria-label="Delete Review"
            className={styles.actionButton}
          />
        </DataGridCell>
      ),
    }),
  ];

  return (
    <Card className={styles.card}>
      <div className={styles.headerContainer}>
        <h3 className={styles.header}>Committee Review History</h3>
        <Popover>
          <PopoverTrigger>
            <Button
              icon={<Info24Regular />}
              appearance="subtle"
              size="small"
              aria-label="Information"
              className={styles.infoIcon}
            />
          </PopoverTrigger>
          <PopoverSurface>
            Please select a row to see details for this Committee Review.
          </PopoverSurface>
        </Popover>
      </div>

      <DataGrid
        items={sortedReviews}
        columns={columns}
        getRowId={(item) => String(item.id)}
      >
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
              className={styles.row}
              onClick={() => onSelect(item)}
              style={{
                backgroundColor: selectedReviewId === item.id ? '#e0f0ff' : 'white',
              }}
            >
              {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </Card>
  );
};
