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
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../../components/common/PageHeader';
import { translations } from '../../i18n/translations';

interface HistoricalRecord {
  id: string;
  registerType: string;
  urduRegisterType: string;
  settlementYear: string;
  mouzaName: string;
  tehsil: string;
  district: string;
  volumeNumber: string;
  archivalStatus: string;
  scannedPages: number;
}

export const mockHistoricalRegisters: HistoricalRecord[] = [
  {
    id: 'HIST-1965-01',
    registerType: 'Misal-e-Haqeeqat (بندوبست قدیم)',
    urduRegisterType: 'مسل حقیقت بندوبست قدیم',
    settlementYear: '1965',
    mouzaName: 'Shahpur',
    tehsil: 'Raiwind',
    district: 'Lahore',
    volumeNumber: 'Vol #4, Record Room',
    archivalStatus: 'Fully Digitized',
    scannedPages: 142,
  },
  {
    id: 'HIST-1972-02',
    registerType: 'Consolidation Register (مسلِ چک بندی و استحکام)',
    urduRegisterType: 'مسلِ چک بندی و استحکام اراضی',
    settlementYear: '1972-1974',
    mouzaName: 'Chak 45-RB',
    tehsil: 'Raiwind',
    district: 'Lahore',
    volumeNumber: 'Vol #12, Sub-Div Room',
    archivalStatus: 'Fully Digitized',
    scannedPages: 98,
  },
  {
    id: 'HIST-1988-03',
    registerType: 'Quadrennial Jamabandi Archive (سابقہ جمع بندی)',
    urduRegisterType: 'چہار سالہ رجسٹر جمع بندی قدیم',
    settlementYear: '1988-1992',
    mouzaName: 'Kahna Nau',
    tehsil: 'Raiwind',
    district: 'Lahore',
    volumeNumber: 'Vol #8',
    archivalStatus: 'Fully Digitized',
    scannedPages: 210,
  },
  {
    id: 'HIST-2004-04',
    registerType: 'Pre-Computerization Register Haqdaran',
    urduRegisterType: 'پرتِ سرکار رجسٹر حقداران قبل از کمپیوٹرائزیشن',
    settlementYear: '2004-2008',
    mouzaName: 'Sundar Sharif',
    tehsil: 'Raiwind',
    district: 'Lahore',
    volumeNumber: 'Vol #15',
    archivalStatus: 'Fully Digitized',
    scannedPages: 185,
  },
];

export default function HistoricalRecordsPage() {
  const { language } = useAppStore();
  const t = translations[language];

  const [search, setSearch] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<HistoricalRecord | null>(null);

  const filtered = mockHistoricalRegisters.filter(
    (h) =>
      h.registerType.toLowerCase().includes(search.toLowerCase()) ||
      h.mouzaName.toLowerCase().includes(search.toLowerCase()) ||
      h.settlementYear.includes(search)
  );

  return (
    <Box>
      <PageHeader
        title={t.historicalRecords}
        urduTitle="تاریخی و سابقہ مسلیں (محفوظات)"
        subtitle="Permanent digital archives of historical settlement registers (Misal-e-Haqeeqat), pre-digitization registers, and cloth maps"
        breadcrumbs={[
          { label: t.dashboard, href: '/dashboard' },
          { label: t.landRecords, href: '/historical-records' },
          { label: t.historicalRecords },
        ]}
      />

      <Card sx={{ p: 2, mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search historical registers by Mouza or Settlement Year..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 380 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
      </Card>

      <Card>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Register Identification</TableCell>
                <TableCell>Classification</TableCell>
                <TableCell>Settlement Year / Period</TableCell>
                <TableCell>Mouza / Village</TableCell>
                <TableCell>Physical Record Room Volume</TableCell>
                <TableCell>Scanned Folios</TableCell>
                <TableCell>Digital Preservation</TableCell>
                <TableCell align="right">Archive Viewer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell sx={{ fontWeight: 800, color: 'primary.main' }}>
                    {item.id}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {item.registerType}
                    </Typography>
                    <Typography variant="caption" sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI', color: 'text.secondary' }}>
                      {item.urduRegisterType}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{item.settlementYear}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{item.mouzaName}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{item.volumeNumber}</TableCell>
                  <TableCell>{item.scannedPages} Pages</TableCell>
                  <TableCell>
                    <Chip size="small" label={item.archivalStatus} color="success" sx={{ height: 20, fontSize: '0.68rem' }} />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<VisibilityIcon />}
                      onClick={() => setSelectedRecord(item)}
                    >
                      Inspect Folio
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Inspect Folio Dialog */}
      {selectedRecord && (
        <Dialog open={Boolean(selectedRecord)} onClose={() => setSelectedRecord(null)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>
            Historical Settlement Record: {selectedRecord.registerType}
          </DialogTitle>
          <DialogContent dividers sx={{ backgroundColor: '#FFFDF9', textAlign: 'center', py: 4 }}>
            <AutoStoriesIcon sx={{ fontSize: 72, color: '#14532D', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {selectedRecord.urduRegisterType} (دورانیہ: {selectedRecord.settlementYear})
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 480, mx: 'auto' }}>
              Historical Misal preserved under Government of Punjab Archives Act. Original physical ledger housed in District Record Room Lahore, {selectedRecord.volumeNumber}.
            </Typography>
            <Chip
              label="300 DPI High-Resolution Cloth Ledger Scan"
              color="primary"
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setSelectedRecord(null)}>Close</Button>
            <Button variant="contained" color="primary" onClick={() => alert('Opening digitized folio viewer...')}>
              View Full Register Scan ({selectedRecord.scannedPages} Pages)
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
