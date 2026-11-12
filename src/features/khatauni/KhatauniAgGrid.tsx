'use client';

import React, { useMemo } from 'react';
import { ColDef } from 'ag-grid-community';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Link from 'next/link';

import { DlrmsAgGrid } from '../../components/tables/DlrmsAgGrid';
import { KhatauniRecord } from '../../types';

interface KhatauniAgGridProps {
  data: KhatauniRecord[];
}

export const KhatauniAgGrid: React.FC<KhatauniAgGridProps> = ({ data }) => {
  const columnDefs = useMemo<ColDef<KhatauniRecord>[]>(
    () => [
      {
        headerName: 'Khatauni # (کھتونی)',
        field: 'khatauniNumber',
        width: 140,
        pinned: 'left',
        cellRenderer: (params: any) => (
          <Box sx={{ fontWeight: 800, color: '#14532D', fontSize: '1rem' }}>
            #{params.value}
          </Box>
        ),
      },
      {
        headerName: 'Parent Khewat',
        field: 'khewatNumber',
        width: 130,
        cellRenderer: (params: any) => (
          <Link href="/khewat" style={{ fontWeight: 700, color: '#16A34A', textDecoration: 'none' }}>
            Khewat #{params.value}
          </Link>
        ),
      },
      {
        headerName: 'Mouza (موضع)',
        field: 'mouzaName',
        width: 140,
        cellRenderer: (params: any) => <strong>{params.value}</strong>,
      },
      {
        headerName: 'Cultivator / Possessor (کاشتکار)',
        field: 'cultivatorName',
        width: 220,
        cellRenderer: (params: any) => (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {params.value}
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI', color: 'text.secondary' }}>
              {params.data?.urduCultivatorName}
            </Typography>
          </Box>
        ),
      },
      {
        headerName: 'Tenancy Status',
        field: 'cultivatorRelation',
        width: 150,
        cellRenderer: (params: any) => (
          <Chip
            size="small"
            label={params.value}
            color={params.value === 'Khud Kasht' ? 'success' : 'info'}
            sx={{ fontWeight: 600, fontSize: '0.72rem' }}
          />
        ),
      },
      {
        headerName: 'Rent / Tax Terms (لگان و معاہدہ)',
        field: 'rentOrTaxDetails',
        width: 200,
      },
      {
        headerName: 'Related Khasras',
        field: 'khasraNumbers',
        width: 160,
        cellRenderer: (params: any) => (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {params.value?.map((k: string) => (
              <Chip key={k} size="small" label={`Khasra ${k}`} sx={{ height: 20, fontSize: '0.68rem' }} />
            ))}
          </Box>
        ),
      },
      {
        headerName: 'Area (رقبہ)',
        field: 'area.formatted',
        width: 140,
        cellRenderer: (params: any) => <strong>{params.value}</strong>,
      },
      {
        headerName: 'Remarks',
        field: 'remarks',
        width: 200,
      },
    ],
    []
  );

  return (
    <DlrmsAgGrid<KhatauniRecord>
      rowData={data}
      columnDefs={columnDefs}
      title="Khatauni (Tenancy & Cultivation) Register"
      urduTitle="رجسٹر کھتونی کاشتکاران"
      subtitle="Official register recording physical tenancy, cultivation possession, and produce sharing arrangements"
    />
  );
};
