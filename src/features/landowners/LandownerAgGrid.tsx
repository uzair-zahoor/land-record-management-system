'use client';

import React, { useMemo } from 'react';
import { ColDef } from 'ag-grid-community';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import Link from 'next/link';

import { DlrmsAgGrid } from '../../components/tables/DlrmsAgGrid';
import { StatusChip } from '../../components/common/StatusChip';
import { Landowner } from '../../types';

interface LandownerAgGridProps {
  data: Landowner[];
  onEdit: (owner: Landowner) => void;
  onAddNew: () => void;
}

export const LandownerAgGrid: React.FC<LandownerAgGridProps> = ({
  data,
  onEdit,
  onAddNew,
}) => {
  const columnDefs = useMemo<ColDef<Landowner>[]>(
    () => [
      {
        headerName: 'Owner ID',
        field: 'id',
        width: 110,
        pinned: 'left',
        cellRenderer: (params: any) => (
          <Box sx={{ fontFamily: 'monospace', fontWeight: 700, color: '#14532D' }}>
            {params.value}
          </Box>
        ),
      },
      {
        headerName: 'Owner Name',
        field: 'name',
        width: 170,
        cellRenderer: (params: any) => (
          <Link
            href={`/landowners/${params.data?.id}`}
            style={{ fontWeight: 700, color: '#14532D', textDecoration: 'none' }}
          >
            {params.value}
          </Link>
        ),
      },
      {
        headerName: 'Urdu Name (مالک کا نام)',
        field: 'urduName',
        width: 150,
        cellRenderer: (params: any) => (
          <Box sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI', fontWeight: 700 }}>
            {params.value}
          </Box>
        ),
      },
      {
        headerName: 'CNIC (شناختی کارڈ)',
        field: 'cnic',
        width: 150,
        cellRenderer: (params: any) => (
          <Box sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{params.value}</Box>
        ),
      },
      {
        headerName: 'Father / Husband Name',
        field: 'fatherOrHusbandName',
        width: 180,
        cellRenderer: (params: any) => (
          <span>
            {params.value} ({params.data?.relationType})
          </span>
        ),
      },
      {
        headerName: 'Contact #',
        field: 'contactNumber',
        width: 130,
      },
      {
        headerName: 'Mouza (موضع)',
        field: 'mouzaName',
        width: 130,
      },
      {
        headerName: 'Holding (رقبہ)',
        field: 'totalLandArea.formatted',
        width: 150,
        cellRenderer: (params: any) => (
          <Box sx={{ fontWeight: 700 }}>{params.value}</Box>
        ),
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 120,
        cellRenderer: (params: any) => <StatusChip status={params.value} />,
      },
      {
        headerName: 'Actions',
        width: 140,
        pinned: 'right',
        sortable: false,
        filter: false,
        cellRenderer: (params: any) => (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              size="small"
              component={Link}
              href={`/landowners/${params.data?.id}`}
              title="Inspect Landowner"
              color="primary"
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onEdit(params.data)}
              title="Edit Landowner"
              color="inherit"
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              component={Link}
              href={`/fard?ownerCnic=${params.data?.cnic}`}
              title="Issue Fard"
              color="secondary"
            >
              <PrintIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
      },
    ],
    [onEdit]
  );

  return (
    <DlrmsAgGrid<Landowner>
      rowData={data}
      columnDefs={columnDefs}
      title="Registered Landowners Register"
      urduTitle="رجسٹرڈ مالکانِ اراضی"
      subtitle="Complete list of verified revenue account holders indexed with NADRA CNIC records"
      actions={
        <Button variant="contained" color="primary" onClick={onAddNew}>
          Add New Landowner (نیا اندراج)
        </Button>
      }
    />
  );
};
