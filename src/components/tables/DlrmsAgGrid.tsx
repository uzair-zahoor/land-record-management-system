'use client';

import React, { useState, useMemo, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

import { useAppStore } from '../../store/useAppStore';
import { dlrmsPalette } from '../../theme/palette';

interface DlrmsAgGridProps<TData = any> {
  rowData: TData[];
  columnDefs: ColDef<TData>[];
  title?: string;
  urduTitle?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  height?: number | string;
  pageSize?: number;
  onRowClick?: (data: TData) => void;
  enableExport?: boolean;
}

export function DlrmsAgGrid<TData = any>({
  rowData,
  columnDefs,
  title,
  urduTitle,
  subtitle,
  actions,
  height = 480,
  pageSize = 10,
  onRowClick,
  enableExport = true,
}: DlrmsAgGridProps<TData>) {
  const { direction } = useAppStore();
  const isRtl = direction === 'rtl';

  const gridRef = useRef<AgGridReact<TData>>(null);
  const [gridApi, setGridApi] = useState<GridApi<TData> | null>(null);
  const [quickFilterText, setQuickFilterText] = useState('');

  const onGridReady = useCallback((params: GridReadyEvent<TData>) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  }, []);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: false,
      flex: 1,
      minWidth: 120,
    }),
    []
  );

  const handleExportCsv = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        fileName: `${title ? title.replace(/\s+/g, '_') : 'DLRMS_Export'}_${new Date().toISOString().split('T')[0]}.csv`,
      });
    }
  };

  return (
    <Card sx={{ p: 2, borderRadius: 2 }}>
      {/* Header & Controls Toolbar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mb: 2,
        }}
      >
        <Box>
          {title && (
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {title}
              </Typography>
              {urduTitle && (
                <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  ({urduTitle})
                </Typography>
              )}
            </Box>
          )}
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          {/* Quick Search */}
          <TextField
            size="small"
            placeholder="Search all columns..."
            value={quickFilterText}
            onChange={(e) => setQuickFilterText(e.target.value)}
            sx={{ width: { xs: '100%', sm: 260 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: quickFilterText && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setQuickFilterText('')}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {enableExport && (
            <Button
              size="small"
              variant="outlined"
              color="primary"
              startIcon={<FileDownloadIcon />}
              onClick={handleExportCsv}
            >
              Export CSV
            </Button>
          )}

          {actions}
        </Box>
      </Box>

      {/* AG Grid Container */}
      <Box
        className="ag-theme-quartz"
        sx={{
          height,
          width: '100%',
          '--ag-header-background-color': '#F8FAFC',
          '--ag-header-foreground-color': dlrmsPalette.text.primary,
          '--ag-border-color': dlrmsPalette.divider,
          '--ag-row-hover-color': '#F1F5F9',
          '--ag-selected-row-background-color': 'rgba(20, 83, 45, 0.08)',
          '--ag-font-family': isRtl
            ? '"Noto Nastaliq Urdu", "Segoe UI", sans-serif'
            : '"Inter", "Segoe UI", sans-serif',
          '--ag-font-size': '13px',
          borderRadius: 2,
          overflow: 'hidden',
          border: `1px solid ${dlrmsPalette.divider}`,
        }}
      >
        <AgGridReact<TData>
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={pageSize}
          paginationPageSizeSelector={[10, 25, 50, 100]}
          quickFilterText={quickFilterText}
          animateRows={true}
          onGridReady={onGridReady}
          onRowClicked={(event) => {
            if (onRowClick && event.data) {
              onRowClick(event.data);
            }
          }}
          enableRtl={isRtl}
          rowSelection={{ mode: 'singleRow', enableClickSelection: false }}
        />
      </Box>
    </Card>
  );
}
