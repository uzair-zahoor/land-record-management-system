'use client';

import React, { useMemo } from 'react';
import { ColDef } from 'ag-grid-community';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Link from 'next/link';

import { DlrmsAgGrid } from '../../components/tables/DlrmsAgGrid';
import { StatusChip } from '../../components/common/StatusChip';
import { KhewatRecord } from '../../types';

interface KhewatAgGridProps {
  data: KhewatRecord[];
}

export const KhewatAgGrid: React.FC<KhewatAgGridProps> = ({ data }) => {
  const columnDefs = useMemo<ColDef<KhewatRecord>[]>(
    () => [
      {
        headerName: 'Khewat # (کھیوٹ نمبر)',
        field: 'khewatNumber',
        width: 140,
        pinned: 'left',
        cellRenderer: (params: any) => (
          <Box sx={{ fontWeight: 800, color: '#14532D', fontSize: '1rem' }}>
            #{params.value}
          </Box>
        ),
      },
      {
        headerName: 'Mouza (موضع)',
        field: 'mouzaName',
        width: 160,
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
        headerName: 'Registered Owners & Shares (مالکان و حصہ داری)',
        field: 'owners',
        width: 280,
        cellRenderer: (params: any) => (
          <Box>
            {params.value?.map((o: any, idx: number) => (
              <Box key={idx} sx={{ mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {o.ownerName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Share: <strong>{o.shares}</strong> ({o.sharePercentage.toFixed(1)}%)
                </Typography>
              </Box>
            ))}
          </Box>
        ),
      },
      {
        headerName: 'Total Khewat Area (کل رقبہ)',
        field: 'totalArea.formatted',
        width: 160,
        cellRenderer: (params: any) => <strong>{params.value}</strong>,
      },
      {
        headerName: 'Related Khasras (خسرہ جات)',
        field: 'relatedKhasraNumbers',
        width: 200,
        cellRenderer: (params: any) => (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {params.value?.map((k: string) => (
              <Chip key={k} size="small" label={`Khasra ${k}`} sx={{ height: 22, fontSize: '0.7rem' }} />
            ))}
          </Box>
        ),
      },
      {
        headerName: 'Jamabandi Period',
        field: 'jamabandiYear',
        width: 140,
      },
      {
        headerName: 'Assessed Tax',
        field: 'revenueTaxAssessed',
        width: 130,
        cellRenderer: (params: any) => (
          <Box sx={{ fontWeight: 700, color: '#14532D' }}>PKR {params.value}</Box>
        ),
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 120,
        cellRenderer: (params: any) => <StatusChip status={params.value} />,
      },
      {
        headerName: 'Ledger',
        width: 140,
        pinned: 'right',
        sortable: false,
        filter: false,
        cellRenderer: (params: any) => (
          <Button
            component={Link}
            href={`/jamabandi?khewat=${params.data?.khewatNumber}`}
            size="small"
            variant="outlined"
          >
            Jamabandi
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <DlrmsAgGrid<KhewatRecord>
      rowData={data}
      columnDefs={columnDefs}
      title="Khewat (Ownership Account) Master Register"
      urduTitle="رجسٹر کھاتہ / کھیوٹ مالکان"
      subtitle="Primary ownership ledgers detailing joint co-shares and assessed provincial land revenue"
    />
  );
};
