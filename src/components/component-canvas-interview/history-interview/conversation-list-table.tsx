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
import { Conversation } from '../../../shared';
import { mergeClasses } from '@fluentui/react-components';
import { useStyles } from './conversation-list-table.styles';

interface ConversationListTableProps {
  conversations: Conversation[];
  onSelect: (conversation: Conversation) => void;
  onDelete: (conversationId: number) => void;
  selectedConversationId?: number;
}

export const ConversationListTable: React.FC<ConversationListTableProps> = ({
  conversations,
  onSelect,
  onDelete,
  selectedConversationId
}) => {
  const styles = useStyles();

  // Sort conversations by time descending (most recent first).
  const sortedConversations = React.useMemo(() => {
    return [...conversations].sort((a, b) => {
      // Adjust parsing based on how your 'time' is represented (e.g., Date object, timestamp, string).
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
  }, [conversations]);

  // Define the columns for the DataGrid
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
            onClick={(e) => {
              e.stopPropagation(); // Prevent row selection if clicking on delete
              onDelete(item.id);
            }}
            appearance="subtle"
            size="small"
            aria-label="Delete Conversation"
            className={styles.actionButton}
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
              aria-label="Information"
              className={styles.infoIcon}
            />
          </PopoverTrigger>
          <PopoverSurface>
            Please select a row to see transcript and review
          </PopoverSurface>
        </Popover>
      </div>

      <DataGrid
        items={sortedConversations}
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
        <DataGridBody<Conversation>>
          {({ item }) => (
            <DataGridRow
              key={item.id}
              className={styles.row}
              onClick={() => onSelect(item)}
              style={{
                backgroundColor: selectedConversationId === item.id ? '#e0f0ff' : 'white',
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
