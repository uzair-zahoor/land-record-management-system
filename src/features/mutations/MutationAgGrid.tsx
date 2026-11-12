'use client';

import React, { useMemo } from 'react';
import { ColDef } from 'ag-grid-community';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

import { DlrmsAgGrid } from '../../components/tables/DlrmsAgGrid';
import { StatusChip } from '../../components/common/StatusChip';
import { MutationRecord } from '../../types';

interface MutationAgGridProps {
  data: MutationRecord[];
  onAddNew: () => void;
}

export const MutationAgGrid: React.FC<MutationAgGridProps> = ({ data, onAddNew }) => {
  const columnDefs = useMemo<ColDef<MutationRecord>[]>(
    () => [
      {
        headerName: 'Mutation # (انتقال نمبر)',
        field: 'mutationNumber',
        width: 140,
        pinned: 'left',
        cellRenderer: (params: any) => (
          <Link
            href={`/mutations/${params.data?.id}`}
            style={{ fontWeight: 800, color: '#14532D', textDecoration: 'none' }}
          >
            {params.value}
          </Link>
        ),
      },
      {
        headerName: 'Mutation Type',
        field: 'mutationType',
        width: 170,
        cellRenderer: (params: any) => <strong>{params.value}</strong>,
      },
      {
        headerName: 'Applicant',
        field: 'applicantName',
        width: 180,
        cellRenderer: (params: any) => (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.data?.applicantCnic}
            </Typography>
          </Box>
        ),
      },
      {
        headerName: 'Mouza (موضع)',
        field: 'mouzaName',
        width: 130,
      },
      {
        headerName: 'Khasra #',
        field: 'khasraNumbers',
        width: 120,
        cellRenderer: (params: any) => params.value?.join(', '),
      },
      {
        headerName: 'Area (رقبہ)',
        field: 'transferArea.formatted',
        width: 130,
        cellRenderer: (params: any) => <strong>{params.value}</strong>,
      },
      {
        headerName: 'Application Date',
        field: 'applicationDate',
        width: 130,
      },
      {
        headerName: 'Status',
        field: 'currentStatus',
        width: 140,
        cellRenderer: (params: any) => <StatusChip status={params.value} />,
      },
      {
        headerName: 'Assigned Officer',
        field: 'assignedOfficer',
        width: 180,
      },
      {
        headerName: 'Action',
        width: 120,
        pinned: 'right',
        sortable: false,
        filter: false,
        cellRenderer: (params: any) => (
          <Button
            component={Link}
            href={`/mutations/${params.data?.id}`}
            size="small"
            variant="outlined"
          >
            Workflow
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <DlrmsAgGrid<MutationRecord>
      rowData={data}
      columnDefs={columnDefs}
      title="Mutation (Intiqal) Applications Register"
      urduTitle="رجسٹر انتقالات اراضی"
      subtitle="Statutory land ownership mutation workflows: Sale, Inheritance, Gift, and Partition"
      actions={
        <Button variant="contained" color="primary" onClick={onAddNew}>
          Apply Mutation (درخواست انتقال)
        </Button>
      }
    />
  );
};
