'use client';

import React, { useMemo } from 'react';
import { ColDef } from 'ag-grid-community';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MapIcon from '@mui/icons-material/Map';
import Link from 'next/link';

import { DlrmsAgGrid } from '../../components/tables/DlrmsAgGrid';
import { StatusChip } from '../../components/common/StatusChip';
import { LandParcel } from '../../types';

interface ParcelAgGridProps {
  data: LandParcel[];
  onAddNew: () => void;
}

export const ParcelAgGrid: React.FC<ParcelAgGridProps> = ({ data, onAddNew }) => {
  const columnDefs = useMemo<ColDef<LandParcel>[]>(
    () => [
      {
        headerName: 'Khasra # (خسرہ نمبر)',
        field: 'khasraNumber',
        width: 140,
        pinned: 'left',
        cellRenderer: (params: any) => (
          <Link
            href={`/land-parcels/${params.data?.id}`}
            style={{ fontWeight: 800, color: '#14532D', textDecoration: 'none' }}
          >
            {params.value}
          </Link>
        ),
      },
      {
        headerName: 'Mouza (موضع)',
        field: 'mouzaName',
        width: 150,
        cellRenderer: (params: any) => (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {params.value}
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI', color: 'text.secondary' }}>
              {params.data?.urduMouzaName}
            </Typography>
          </Box>
        ),
      },
      {
        headerName: 'Khewat # (کھاتہ)',
        field: 'khewatNumber',
        width: 120,
        cellRenderer: (params: any) => <strong>#{params.value}</strong>,
      },
      {
        headerName: 'Khatauni # (کھتونی)',
        field: 'khatauniNumber',
        width: 120,
      },
      {
        headerName: 'Total Area (رقبہ)',
        field: 'area.formatted',
        width: 150,
        cellRenderer: (params: any) => (
          <Box sx={{ fontWeight: 700, color: '#14532D' }}>{params.value}</Box>
        ),
      },
      {
        headerName: 'Classification (قسمِ زمین)',
        field: 'landType',
        width: 160,
        cellRenderer: (params: any) => (
          <Chip size="small" label={params.value} sx={{ fontSize: '0.72rem', fontWeight: 600 }} />
        ),
      },
      {
        headerName: 'Registered Ownership',
        field: 'currentOwnership',
        width: 220,
        cellRenderer: (params: any) => (
          <Box>
            {params.value?.map((own: any, idx: number) => (
              <Typography key={idx} variant="caption" display="block">
                {own.ownerName} ({own.shareRatio})
              </Typography>
            ))}
          </Box>
        ),
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 130,
        cellRenderer: (params: any) => <StatusChip status={params.value} />,
      },
      {
        headerName: 'Actions',
        width: 110,
        pinned: 'right',
        sortable: false,
        filter: false,
        cellRenderer: (params: any) => (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              size="small"
              component={Link}
              href={`/land-parcels/${params.data?.id}`}
              title="Inspect Details"
              color="primary"
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              component={Link}
              href={`/shajra?khasra=${params.data?.khasraNumber}`}
              title="View on Map"
              color="secondary"
            >
              <MapIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <DlrmsAgGrid<LandParcel>
      rowData={data}
      columnDefs={columnDefs}
      title="Cadastral Land Parcels (Khasra) Register"
      urduTitle="رجسٹر اراضی خسرہ جات"
      subtitle="Comprehensive surveyed parcels, boundary coordinates, and legal ownership distribution"
      actions={
        <Button variant="contained" color="primary" onClick={onAddNew}>
          Add New Parcel (نیا خسرہ)
        </Button>
      }
    />
  );
};
