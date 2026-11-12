'use client';

import React, { useMemo } from 'react';
import { ColDef } from 'ag-grid-community';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import VerifiedIcon from '@mui/icons-material/Verified';

import { DlrmsAgGrid } from '../../components/tables/DlrmsAgGrid';
import { DocumentItem } from '../../types';

interface DocumentAgGridProps {
  data: DocumentItem[];
  onPreview: (doc: DocumentItem) => void;
  onUpload: () => void;
}

export const DocumentAgGrid: React.FC<DocumentAgGridProps> = ({
  data,
  onPreview,
  onUpload,
}) => {
  const columnDefs = useMemo<ColDef<DocumentItem>[]>(
    () => [
      {
        headerName: 'Format',
        field: 'fileType',
        width: 100,
        pinned: 'left',
        cellRenderer: (params: any) =>
          params.value === 'PDF' ? (
            <PictureAsPdfIcon sx={{ color: '#DC2626', mt: 1 }} />
          ) : (
            <ImageIcon sx={{ color: '#0284C7', mt: 1 }} />
          ),
      },
      {
        headerName: 'Document Title',
        field: 'title',
        width: 250,
        cellRenderer: (params: any) => (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {params.value}
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI', color: 'text.secondary' }}>
              {params.data?.urduTitle}
            </Typography>
          </Box>
        ),
      },
      {
        headerName: 'Category',
        field: 'category',
        width: 170,
        cellRenderer: (params: any) => (
          <Chip size="small" label={params.value} sx={{ fontSize: '0.72rem' }} />
        ),
      },
      {
        headerName: 'Mouza / Khasra',
        field: 'mouzaName',
        width: 160,
        cellRenderer: (params: any) => (
          <span>
            {params.value} {params.data?.khasraNumber && `(Khasra ${params.data.khasraNumber})`}
          </span>
        ),
      },
      {
        headerName: 'File Size',
        field: 'fileSize',
        width: 110,
        cellRenderer: (params: any) => (
          <Box sx={{ fontFamily: 'monospace' }}>{params.value}</Box>
        ),
      },
      {
        headerName: 'Uploaded By',
        field: 'uploadedBy',
        width: 170,
      },
      {
        headerName: 'Verification',
        field: 'verified',
        width: 140,
        cellRenderer: (params: any) =>
          params.value ? (
            <Chip
              size="small"
              icon={<VerifiedIcon sx={{ fontSize: 14 }} />}
              label="Official Copy"
              color="success"
              variant="outlined"
              sx={{ height: 20, fontSize: '0.68rem' }}
            />
          ) : (
            <Chip size="small" label="Unverified" sx={{ height: 20, fontSize: '0.68rem' }} />
          ),
      },
      {
        headerName: 'Actions',
        width: 120,
        pinned: 'right',
        sortable: false,
        filter: false,
        cellRenderer: (params: any) => (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              size="small"
              color="primary"
              title="Preview Document"
              onClick={() => onPreview(params.data)}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="inherit"
              title="Download Document"
              onClick={() => alert(`Downloading certified copy of ${params.data?.fileName}...`)}
            >
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
      },
    ],
    [onPreview]
  );

  return (
    <DlrmsAgGrid<DocumentItem>
      rowData={data}
      columnDefs={columnDefs}
      title="Digitized Document Repository"
      urduTitle="مخزنِ مصدقہ دستاویزات"
      subtitle="Digitized archival deeds, registered Bainama, mutation sanctions, and Aks Shajra traces"
      actions={
        <Button variant="contained" color="primary" onClick={onUpload}>
          Upload Document (دستاویز اپ لوڈ)
        </Button>
      }
    />
  );
};
