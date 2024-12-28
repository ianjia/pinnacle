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
import { Essay } from '../../../shared';
import { useStyles } from './essay-list-table.styles';

interface EssayListTableProps {
  essays: Essay[];
  onSelect: (essay: Essay) => void;
  onDelete: (essayId: number) => void;
  selectedEssayId?: number;
}

/**
 * Renders a table of essays, with columns for time & prompt,
 * plus a delete button for each row.
 */
export const EssayListTable: React.FC<EssayListTableProps> = ({
  essays,
  onSelect,
  onDelete,
  selectedEssayId
}) => {
  const styles = useStyles();

  // Sort essays by time descending (most recent first).
  const sortedEssays = React.useMemo(() => {
    return [...essays].sort((a, b) => {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
  }, [essays]);

  // Define the columns for the DataGrid
  const columns: TableColumnDefinition<Essay>[] = [
    createTableColumn<Essay>({
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
    createTableColumn<Essay>({
      columnId: 'prompt',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={styles.headerCell}>Prompt</DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={styles.cell}>
          <TableCellLayout>{item.prompt}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    // Optionally add a Delete action column, following the CommitteeReview pattern
    createTableColumn<Essay>({
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
            aria-label="Delete Essay"
            className={styles.actionButton}
          />
        </DataGridCell>
      ),
    }),
  ];

  return (
    <Card className={styles.card}>
      <div className={styles.headerContainer}>
        <h3 className={styles.header}>Essay History</h3>
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
            Please select a row to see details for this Essay.
          </PopoverSurface>
        </Popover>
      </div>

      <DataGrid
        items={sortedEssays}
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
        <DataGridBody<Essay>>
          {({ item }) => (
            <DataGridRow
              key={item.id}
              className={styles.row}
              onClick={() => onSelect(item)}
              style={{
                backgroundColor: selectedEssayId === item.id ? '#e0f0ff' : 'white',
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
