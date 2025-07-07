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

  /* click handlers */
  const handleUserHeader = (col: string) =>
    setUserSort(s =>
      s.col === col ? { col, dir: toggle(s.dir) } : { col, dir: 'asc' }
    );

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
    </div>
  );
};
