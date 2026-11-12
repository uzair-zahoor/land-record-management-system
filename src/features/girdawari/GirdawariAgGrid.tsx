'use client';

import React, { useMemo } from 'react';
import { ColDef } from 'ag-grid-community';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

import { DlrmsAgGrid } from '../../components/tables/DlrmsAgGrid';
import { GirdawariRecord } from '../../types';

interface GirdawariAgGridProps {
  data: GirdawariRecord[];
  onAddNew: () => void;
}

export const GirdawariAgGrid: React.FC<GirdawariAgGridProps> = ({ data, onAddNew }) => {
  const columnDefs = useMemo<ColDef<GirdawariRecord>[]>(
    () => [
      {
        headerName: 'Khasra # (خسرہ نمبر)',
        field: 'khasraNumber',
        width: 130,
        pinned: 'left',
        cellRenderer: (params: any) => (
          <Box sx={{ fontWeight: 800, color: '#14532D' }}>{params.value}</Box>
        ),
      },
      {
        headerName: 'Mouza (موضع)',
        field: 'mouzaName',
        width: 140,
      },
      {
        headerName: 'Season & Year',
        field: 'season',
        width: 150,
        cellRenderer: (params: any) => (
          <Chip
            size="small"
            label={`${params.value} ${params.data?.year}`}
            color={params.value?.includes('Rabi') ? 'primary' : 'secondary'}
            sx={{ fontWeight: 600, fontSize: '0.72rem' }}
          />
        ),
      },
      {
        headerName: 'Crop Type (جنس فصل)',
        field: 'cropType',
        width: 160,
        cellRenderer: (params: any) => <strong>{params.value}</strong>,
      },
      {
        headerName: 'Cultivator (کاشتکار)',
        field: 'cultivatorName',
        width: 180,
        cellRenderer: (params: any) => (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              s/o {params.data?.cultivatorFatherName}
            </Typography>
          </Box>
        ),
      },
      {
        headerName: 'Cultivated Area',
        field: 'cultivatedArea.formatted',
        width: 150,
        cellRenderer: (params: any) => <strong>{params.value}</strong>,
      },
      {
        headerName: 'Irrigation Source',
        field: 'sourceOfIrrigation',
        width: 150,
        cellRenderer: (params: any) => (
          <Chip
            size="small"
            icon={<WaterDropIcon sx={{ fontSize: 14 }} />}
            label={params.value}
            sx={{ height: 22, fontSize: '0.7rem' }}
          />
        ),
      },
      {
        headerName: 'Crop Health',
        field: 'condition',
        width: 120,
        cellRenderer: (params: any) => (
          <Chip
            size="small"
            label={params.value}
            color={params.value === 'Excellent' ? 'success' : params.value === 'Good' ? 'info' : 'warning'}
            sx={{ height: 20, fontSize: '0.7rem' }}
          />
        ),
      },
      {
        headerName: 'Inspection Officer',
        field: 'inspectionOfficer',
        width: 180,
        cellRenderer: (params: any) => (
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>
              {params.value} ({params.data?.officerRole})
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.data?.inspectionDate}
            </Typography>
          </Box>
        ),
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
    <DlrmsAgGrid<GirdawariRecord>
      rowData={data}
      columnDefs={columnDefs}
      title="Seasonal Girdawari (Crop Inspection) Register"
      urduTitle="رجسٹر گرداوری فصلی"
      subtitle="Biannual field inspection of crops, standing harvest, and agricultural water usage"
      actions={
        <Button variant="contained" color="primary" onClick={onAddNew}>
          Record Inspection (اندراج گرداوری)
        </Button>
      }
    />
  );
};
