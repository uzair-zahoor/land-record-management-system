'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

import { useRevenueStore } from '../../../store/useRevenueStore';
import { PageHeader } from '../../../components/common/PageHeader';

export default function AuditLogsPage() {
  const { auditLogs } = useRevenueStore();

  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [moduleFilter, setModuleFilter] = useState('ALL');

  const filtered = auditLogs.filter((log) => {
    const matchSearch =
      log.description.toLowerCase().includes(search.toLowerCase()) ||
      log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.recordId.toLowerCase().includes(search.toLowerCase());
    const matchAction = actionFilter === 'ALL' || log.action === actionFilter;
    const matchModule = moduleFilter === 'ALL' || log.module === moduleFilter;
    return matchSearch && matchAction && matchModule;
  });

  return (
    <Box>
      <PageHeader
        title="Revenue Audit Logs & Accountability (آڈٹ لاگز)"
        urduTitle="سسٹم آڈٹ لاگز و احتساب ریکارڈ"
        subtitle="Immutable security audit trail of all mutations, Fard issuances, status modifications, and officer logins"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Administration', href: '/administration/users' },
          { label: 'Audit Logs' },
        ]}
      />

      <Card sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by Officer, Record ID, Description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Action Filter</InputLabel>
              <Select
                value={actionFilter}
                label="Action Filter"
                onChange={(e) => setActionFilter(e.target.value)}
              >
                <MenuItem value="ALL">All Actions</MenuItem>
                <MenuItem value="CREATE">CREATE</MenuItem>
                <MenuItem value="UPDATE">UPDATE</MenuItem>
                <MenuItem value="APPROVE">APPROVE (منظوری)</MenuItem>
                <MenuItem value="VERIFY">VERIFY (تصدیق)</MenuItem>
                <MenuItem value="PRINT">PRINT (اجراء فرد)</MenuItem>
                <MenuItem value="LOGIN">LOGIN</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Module Filter</InputLabel>
              <Select
                value={moduleFilter}
                label="Module Filter"
                onChange={(e) => setModuleFilter(e.target.value)}
              >
                <MenuItem value="ALL">All Modules</MenuItem>
                <MenuItem value="Mutations">Mutations</MenuItem>
                <MenuItem value="Fard">Fard</MenuItem>
                <MenuItem value="Landowners">Landowners</MenuItem>
                <MenuItem value="Girdawari">Girdawari</MenuItem>
                <MenuItem value="Users">Users</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Officer</TableCell>
                <TableCell>Designated Role</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Module</TableCell>
                <TableCell>Record ID</TableCell>
                <TableCell>Action Description</TableCell>
                <TableCell>Client IP</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((log) => (
                <TableRow key={log.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                    {log.timestamp}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{log.userName}</TableCell>
                  <TableCell>{log.userRole}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={log.action}
                      color={
                        log.action === 'APPROVE'
                          ? 'success'
                          : log.action === 'CREATE'
                          ? 'primary'
                          : log.action === 'PRINT'
                          ? 'secondary'
                          : 'default'
                      }
                      sx={{ fontWeight: 700, fontSize: '0.68rem', height: 20 }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{log.module}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{log.recordId}</TableCell>
                  <TableCell sx={{ fontSize: '0.82rem', maxWidth: 300 }}>{log.description}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.78rem' }}>{log.ipAddress}</TableCell>
                  <TableCell>
                    <Chip size="small" label={log.status} color="success" sx={{ height: 18, fontSize: '0.65rem' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
