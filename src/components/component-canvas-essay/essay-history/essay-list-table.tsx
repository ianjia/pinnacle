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
} from '@fluentui/react-components';
import { Delete20Regular, Info24Regular } from '@fluentui/react-icons';
import { mergeClasses } from '@fluentui/react-components';

import { Essay } from '../../../shared';
import { useStyles } from './essay-list-table.styles';

interface Props {
  essays: Essay[];
  onSelect: (e: Essay) => void;
  onDelete: (id: number) => void;
  selectedEssayId?: number;
}

export const EssayListTable: React.FC<Props> = ({
  essays,
  onSelect,
  onDelete,
  selectedEssayId,
}) => {
  const s = useStyles();

  /* newest first */
  const rows = React.useMemo(
    () => [...essays].sort((a, b) => +new Date(b.time) - +new Date(a.time)),
    [essays]
  );

  /* column definitions */
  const columns: TableColumnDefinition<Essay>[] = [
    createTableColumn({
      columnId: 'time',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={s.headerCell}>Time</DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={s.cell}>
          <TableCellLayout>{item.time}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn({
      columnId: 'prompt',
      renderHeaderCell: () => (
        <DataGridHeaderCell className={s.headerCell}>Prompt</DataGridHeaderCell>
      ),
      renderCell: (item) => (
        <DataGridCell className={s.cell}>
          <TableCellLayout>{item.prompt}</TableCellLayout>
        </DataGridCell>
      ),
    }),
    createTableColumn({
      columnId: 'actions',
      renderHeaderCell: () => <DataGridHeaderCell />,
      renderCell: (item) => (
        <DataGridCell className={mergeClasses(s.cell, s.actionCell)}>
          <Button
            icon={<Delete20Regular />}
            appearance="subtle"
            size="small"
            aria-label="delete"
            className={s.actionButton}
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
    <Card className={s.card}>
      <div className={s.headerContainer}>
        <h3 className={s.header}>Essay History</h3>
        <Popover>
          <PopoverTrigger>
            <Button
              icon={<Info24Regular />}
              appearance="subtle"
              size="small"
              aria-label="info"
              className={s.infoIcon}
            />
          </PopoverTrigger>
          <PopoverSurface>
            Please select a row to view the essay content.
          </PopoverSurface>
        </Popover>
      </div>

      <DataGrid items={rows} columns={columns} getRowId={(r) => `${r.id}`}>
        <DataGridHeader>
           <DataGridRow>{({ renderHeaderCell }) => renderHeaderCell()}</DataGridRow>
        </DataGridHeader>

        <DataGridBody<Essay>>
          {({ item }) => {
            const isSelected = selectedEssayId === item.id;
            return (
              <DataGridRow
                key={item.id}
                aria-selected={isSelected}
                onClick={() => onSelect(item)}
                className={mergeClasses(s.row, isSelected && s.rowSelected)}
              >
                {({ renderCell }) => renderCell(item)}
              </DataGridRow>
            );
          }}

        </DataGridBody>
      </DataGrid>
    </Card>
  );
};
