import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHeaderCell,
} from '@fluentui/react-components';
import { api } from '../auth/api';
import { useEffect, useMemo, useState } from 'react';

/* ────────────────────────────
   1. Small helpers
──────────────────────────────*/
type Dir = 'asc' | 'desc';
const toggle = (d: Dir): Dir => (d === 'asc' ? 'desc' : 'asc');

const sortRows = <T extends Record<string, any>>(
  rows: T[],
  column: string,
  dir: Dir
) =>
  [...rows].sort((a, b) => {
    const aVal = a[column];
    const bVal = b[column];
    if (aVal === bVal) return 0;
    const cmp = aVal > bVal ? 1 : -1;
    return dir === 'asc' ? cmp : -cmp;
  });

/* ────────────────────────────
   2. Component
──────────────────────────────*/
export const AdminPage = () => {
  /* users + wallet */
  const [userRows, setUserRows] = useState<any[]>([]);
  const [userSort, setUserSort] = useState<{ col: string; dir: Dir }>({
    col: 'user_id',
    dir: 'asc',
  });

  /* usage events */
//   const [usageRows, setUsageRows] = useState<any[]>([]);
//   const [usageSort, setUsageSort] = useState<{ col: string; dir: Dir }>({
//     col: 'created_at',
//     dir: 'desc',
//   });

  /* fetch once */
  useEffect(() => {
    api.get('/api/v1/admin/users').then(r => setUserRows(r.data));
    // api.get('/api/v1/admin/usage').then(r => setUsageRows(r.data));
  }, []);

  /* memo-sorted results */
  const sortedUsers = useMemo(
    () => sortRows(userRows, userSort.col, userSort.dir),
    [userRows, userSort]
  );
//   const sortedUsage = useMemo(
//     () => sortRows(usageRows, usageSort.col, usageSort.dir),
//     [usageRows, usageSort]
//   );

  /* click handlers */
  const handleUserHeader = (col: string) =>
    setUserSort(s =>
      s.col === col ? { col, dir: toggle(s.dir) } : { col, dir: 'asc' }
    );

//   const handleUsageHeader = (col: string) =>
//     setUsageSort(s =>
//       s.col === col ? { col, dir: toggle(s.dir) } : { col, dir: 'asc' }
//     );

  /* UI */
  return (
    <div style={{ padding: 24 }}>
      {/* ───── Users / Wallet ───── */}
      <h2>Users / Wallet</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell onClick={() => handleUserHeader('user_id')}>
              User&nbsp;ID
            </TableHeaderCell>
            <TableHeaderCell onClick={() => handleUserHeader('email')}>
              Email
            </TableHeaderCell>
            <TableHeaderCell onClick={() => handleUserHeader('balance')}>
              Balance
            </TableHeaderCell>
            <TableHeaderCell onClick={() => handleUserHeader('updated_reason')}>
              Reason
            </TableHeaderCell>
            <TableHeaderCell onClick={() => handleUserHeader('updated_time')}>
              Updated&nbsp;At
            </TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedUsers.map(r => (
            <TableRow key={r.user_id}>
              <TableCell>{r.user_id}</TableCell>
              <TableCell>{r.email}</TableCell>
              <TableCell>{r.balance}</TableCell>
              <TableCell>{r.updated_reason}</TableCell>
              <TableCell>{new Date(r.updated_time).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ───── AI Usage Events ───── */}
      {/* <h2 style={{ marginTop: 32 }}>AI Usage Events</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell onClick={() => handleUsageHeader('user_id')}>
              User&nbsp;ID
            </TableHeaderCell>
            <TableHeaderCell onClick={() => handleUsageHeader('task_type')}>
              Task Type
            </TableHeaderCell>
            <TableHeaderCell
              onClick={() => handleUsageHeader('credit_consumption')}
            >
              Credits
            </TableHeaderCell>
            <TableHeaderCell onClick={() => handleUsageHeader('created_at')}>
              Created&nbsp;At
            </TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedUsage.map(r => (
            <TableRow key={`${r.user_id}-${r.created_at}`}>
              <TableCell>{r.user_id}</TableCell>
              <TableCell>{r.task_type}</TableCell>
              <TableCell>{r.credit_consumption}</TableCell>
              <TableCell>{new Date(r.created_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </div>
  );
};
