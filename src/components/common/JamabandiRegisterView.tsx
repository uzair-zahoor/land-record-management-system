'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { JamabandiRecord } from '../../types';
import { dlrmsPalette } from '../../theme/palette';

interface JamabandiRegisterViewProps {
  records: JamabandiRecord[];
  mouzaName: string;
  quadrennialYear: string;
  tehsil: string;
  district: string;
  onPrint?: () => void;
}

export const JamabandiRegisterView: React.FC<JamabandiRegisterViewProps> = ({
  records,
  mouzaName,
  quadrennialYear,
  tehsil,
  district,
  onPrint,
}) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, '@media print': { display: 'none' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoStoriesIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Register Haqdaran-e-Zameen (رجسٹر حقدارانِ زمین - چہار سالہ جمع بندی)
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<PrintIcon />}
          onClick={onPrint || (() => window.print())}
        >
          Print Register (پرنٹ رجسٹر)
        </Button>
      </Box>

      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, md: 3 },
          border: '1px solid #CBD5E1',
          backgroundColor: '#FFFDF9', // Traditional parchment light tint
          overflowX: 'auto',
          '@media print': {
            backgroundColor: '#FFFFFF',
            boxShadow: 'none',
            border: '1px solid #000',
          },
        }}
      >
        {/* Register Top Ledger Title */}
        <Box sx={{ textAlign: 'center', pb: 2, mb: 2, borderBottom: '2px double #14532D' }}>
          <Typography variant="h5" sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI', fontWeight: 800, color: '#14532D' }}>
            رجسٹر حقدارانِ زمین (جمع بندی) – چار سالہ دورانیہ: {quadrennialYear}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              موضع / چک: <strong>{mouzaName}</strong>
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              تحصیل: <strong>{tehsil}</strong>
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              ضلع: <strong>{district}</strong>
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              صوبہ: <strong>پنجاب</strong>
            </Typography>
          </Box>
        </Box>

        {/* Traditional 10-12 Column Revenue Register */}
        <TableContainer sx={{ border: '1px solid #0F172A' }}>
          <Table size="small" sx={{ minWidth: 950 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#14532D' }}>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 700, border: '1px solid #0F172A', textAlign: 'center', width: 50 }}>
                  نمبر شمار<br />Sr.
                </TableCell>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 700, border: '1px solid #0F172A', textAlign: 'center', width: 90 }}>
                  کھیوٹ نمبر<br />Khewat
                </TableCell>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 700, border: '1px solid #0F172A', textAlign: 'center', width: 90 }}>
                  کھتونی نمبر<br />Khatauni
                </TableCell>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 700, border: '1px solid #0F172A', width: 220 }}>
                  نام مع ولدیت و سکونت مالک اراضی<br />Owner & Shares
                </TableCell>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 700, border: '1px solid #0F172A', width: 180 }}>
                  نام کاشتکار مع تفصیل لگان<br />Cultivator & Tenancy
                </TableCell>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 700, border: '1px solid #0F172A', textAlign: 'center', width: 100 }}>
                  خسرہ نمبر<br />Khasra
                </TableCell>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 700, border: '1px solid #0F172A', textAlign: 'center', width: 140 }}>
                  رقبہ مع قسمِ زمین<br />Area & Classification
                </TableCell>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 700, border: '1px solid #0F172A', width: 120 }}>
                  مالیہ یا لگان<br />Revenue Rate
                </TableCell>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 700, border: '1px solid #0F172A', width: 220 }}>
                  کیفیت و احکامات انتقال<br />Remarks / Sanctions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((rec, index) => (
                <TableRow
                  key={rec.id}
                  sx={{
                    '&:hover': { backgroundColor: '#F1F5F9' },
                    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                  }}
                >
                  <TableCell sx={{ border: '1px solid #CBD5E1', textAlign: 'center', fontWeight: 600 }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #CBD5E1', textAlign: 'center', fontWeight: 700, color: '#14532D' }}>
                    {rec.khewatNumber}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #CBD5E1', textAlign: 'center', fontWeight: 600 }}>
                    {rec.khatauniNumber}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {rec.ownersText}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
                    <Typography variant="body2">
                      {rec.cultivatorText}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #CBD5E1', textAlign: 'center', fontWeight: 700, color: '#14532D' }}>
                    {rec.khasraNumber}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #CBD5E1', textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {rec.area.formatted}
                    </Typography>
                    <Chip
                      size="small"
                      label={rec.landClassification}
                      sx={{ mt: 0.5, fontSize: '0.65rem', height: 20, backgroundColor: '#E2E8F0' }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #CBD5E1', fontSize: '0.8rem' }}>
                    {rec.revenueAssessed}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #CBD5E1', fontSize: '0.8rem', color: '#334155' }}>
                    {rec.mutationRemarks}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            * مصدقہ نقل بمطابق اصل پرتِ سرکار رجسٹر حقدارانِ زمین محفوظ در ریکارڈ روم
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            Total Entries: {records.length}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
