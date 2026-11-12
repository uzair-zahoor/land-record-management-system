'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';

import { useAppStore } from '../../../store/useAppStore';
import { useRevenueStore } from '../../../store/useRevenueStore';
import { PageHeader } from '../../../components/common/PageHeader';
import { dlrmsPalette } from '../../../theme/palette';
import { UserRole } from '../../../types';

export default function UsersPage() {
  const { currentUser, setCurrentUserRole, showNotification } = useAppStore();
  const { users } = useRevenueStore();

  const permissionsMatrix = [
    { module: 'View Land & Parcel Records', roles: ['All Roles'] },
    { module: 'Create & Edit Landowners', roles: ['Super Admin', 'Revenue Admin', 'Tehsildar', 'Patwari', 'Data Entry'] },
    { module: 'Submit Mutation Application', roles: ['Super Admin', 'Revenue Admin', 'Tehsildar', 'Data Entry'] },
    { module: 'Verify Field Documents & Pedigree', roles: ['Super Admin', 'Revenue Admin', 'Tehsildar', 'Qanoongo', 'Patwari'] },
    { module: 'Sanction & Approve Mutations (حکمِ تصدیق)', roles: ['Super Admin', 'Revenue Admin', 'Tehsildar', 'Naib Tehsildar'] },
    { module: 'Generate & Print Official Fard', roles: ['Super Admin', 'Revenue Admin', 'Tehsildar', 'Patwari', 'Data Entry'] },
    { module: 'Record Seasonal Girdawari', roles: ['Super Admin', 'Patwari', 'Qanoongo'] },
    { module: 'System Audit Logs & Security Admin', roles: ['Super Admin', 'Revenue Admin', 'Read-only Auditor'] },
  ];

  const handleSwitchCurrentRole = (role: UserRole) => {
    setCurrentUserRole(role);
    showNotification(`Switched active user role to: ${role}`, 'success');
  };

  return (
    <Box>
      <PageHeader
        title="Users & Role-Based Access Control (صارفین و اختیارات)"
        urduTitle="صارفین، عہدے و اختیارات"
        subtitle="Manage government revenue officers, field patwaris, data operators, and role-based operational permissions"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Administration', href: '/administration/users' },
          { label: 'Users & Roles' },
        ]}
      />

      {/* Active User Persona Switcher */}
      <Card sx={{ p: 2.5, mb: 3, backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#166534' }}>
              Current Active Officer Persona: {currentUser.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#15803D' }}>
              Role: <strong>{currentUser.role}</strong> | Jurisdiction: {currentUser.jurisdiction}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {(['Tehsildar', 'Patwari', 'Qanoongo', 'Revenue Administrator', 'Read-only Auditor'] as UserRole[]).map((r) => (
              <Button
                key={r}
                size="small"
                variant={currentUser.role === r ? 'contained' : 'outlined'}
                color="success"
                onClick={() => handleSwitchCurrentRole(r)}
                sx={{ fontSize: '0.75rem', py: 0.5 }}
              >
                Act as {r}
              </Button>
            ))}
          </Box>
        </Box>
      </Card>

      {/* Users Table */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Enrolled Government Revenue Personnel" />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Officer Name</TableCell>
                <TableCell>Urdu Name</TableCell>
                <TableCell>Designated Role</TableCell>
                <TableCell>Official Email</TableCell>
                <TableCell>Assigned Jurisdiction</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Switch Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, backgroundColor: dlrmsPalette.primary.main, fontSize: '0.8rem' }}>
                        {user.name.charAt(0)}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {user.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI' }}>
                    {user.urduName}
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={user.role}
                      color={
                        user.role === 'Tehsildar'
                          ? 'primary'
                          : user.role === 'Patwari'
                          ? 'secondary'
                          : user.role === 'Super Administrator'
                          ? 'error'
                          : 'default'
                      }
                      sx={{ fontWeight: 600, fontSize: '0.72rem' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{user.email}</TableCell>
                  <TableCell>{user.jurisdiction}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      icon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
                      label="Active"
                      color="success"
                      variant="outlined"
                      sx={{ height: 20, fontSize: '0.68rem' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleSwitchCurrentRole(user.role)}
                    >
                      Assume Role
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Role-Based Permissions Matrix */}
      <Card>
        <CardHeader
          title="Role-Based Security & Authorization Matrix"
          subheader="Frontend permission guards enforced across revenue workflows"
        />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>System Operation / Workflow Capability</TableCell>
                <TableCell>Authorized Roles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissionsMatrix.map((item, idx) => (
                <TableRow key={idx} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{item.module}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {item.roles.map((r) => (
                        <Chip key={r} size="small" label={r} sx={{ height: 22, fontSize: '0.7rem' }} />
                      ))}
                    </Box>
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
