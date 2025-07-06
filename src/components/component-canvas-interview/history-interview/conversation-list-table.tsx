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
  PopoverTrigger,
  mergeClasses,
} from '@fluentui/react-components';
import { Delete20Regular, Info24Regular } from '@fluentui/react-icons';
import { Conversation } from '../../../shared';
import { useStyles } from './conversation-list-table.styles';

interface Props {
  conversations: Conversation[];
  onSelect: (c: Conversation) => void;
  onDelete: (id: number) => void;
  selectedConversationId?: number;
}

export const ConversationListTable: React.FC<Props> = ({
  conversations,
  onSelect,
  onDelete,
  selectedConversationId,
}) => {
  const styles = useStyles();

  const sorted = React.useMemo(
    () =>
      [...conversations].sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      ),
    [conversations]
  );

  const columns: TableColumnDefinition<Conversation>[] = [
    createTableColumn<Conversation>({
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
    createTableColumn<Conversation>({
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
    createTableColumn<Conversation>({
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
    createTableColumn<Conversation>({
      columnId: 'actions',
      renderHeaderCell: () => <DataGridHeaderCell />,
      renderCell: (item) => (
        <DataGridCell className={mergeClasses(styles.cell, styles.actionCell)}>
          <Button
            icon={<Delete20Regular />}
            appearance="subtle"
            size="small"
            aria-label="Delete"
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
      <div className={styles.headerContainer}>
        <h3 className={styles.header}>Conversation History</h3>
        <Popover>
          <PopoverTrigger>
            <Button
              icon={<Info24Regular />}
              appearance="subtle"
              size="small"
              aria-label="Info"
              className={styles.infoIcon}
            />
          </PopoverTrigger>
          <PopoverSurface>Please select a row to see transcript and review</PopoverSurface>
        </Popover>
      </div>

      <DataGrid items={sorted} columns={columns} getRowId={(i) => String(i.id)}>
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>

        <DataGridBody<Conversation>>
          {({ item }) => (
            <DataGridRow
              key={item.id}
              onClick={() => onSelect(item)}
              className={mergeClasses(
                styles.row,
                item.id === selectedConversationId && styles.rowSelected
              )}
            >
              {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </Card>
  );
};
