'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import VerifiedIcon from '@mui/icons-material/Verified';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { FardDocument } from '../../types';
import { dlrmsPalette } from '../../theme/palette';

interface FardDocumentViewProps {
  document: FardDocument;
  onPrint?: () => void;
  onDownload?: () => void;
}

export const FardDocumentView: React.FC<FardDocumentViewProps> = ({
  document,
  onPrint,
  onDownload,
}) => {
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <Box>
      {/* Top Action Toolbar */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mb: 2, '@media print': { display: 'none' } }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
        >
          Print Document (پرنٹ کریں)
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={onDownload || (() => alert('Downloading official PDF extract...'))}
        >
          Download PDF (پی ڈی ایف)
        </Button>
      </Box>

      {/* Official Government Extract Paper */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          backgroundColor: '#FFFFFF',
          border: '2px solid #14532D',
          position: 'relative',
          overflow: 'hidden',
          '@media print': {
            boxShadow: 'none',
            border: '2px solid #000',
            p: 2,
          },
        }}
      >
        {/* Security Watermark Background */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-35deg)',
            fontSize: { xs: '3rem', md: '5rem' },
            fontWeight: 900,
            color: 'rgba(20, 83, 45, 0.05)',
            userSelect: 'none',
            pointerEvents: 'none',
            textAlign: 'center',
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            zIndex: 0,
          }}
        >
          SAMPLE / DEMO COPY
          <br />
          غیر مصدقہ نمونہ
        </Box>

        {/* Content Container (above watermark) */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', pb: 2, borderBottom: '2px solid #14532D' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 0.5 }}>
              <VerifiedIcon sx={{ color: '#14532D', fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#14532D', letterSpacing: '0.05em' }}>
                GOVERNMENT OF THE PUNJAB – BOARD OF REVENUE
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI', fontWeight: 700, color: '#14532D' }}>
              حکومتِ پنجاب – بورڈ آف ریونیو (ڈیجیٹل لینڈ ریکارڈ مینجمنٹ سسٹم)
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 1, letterSpacing: '0.1em', color: '#1E293B' }}>
              FARD MALKIAT / RECORD OF RIGHTS EXTRACT (فرد ملکیت برائے ریکارڈ)
            </Typography>
            <Typography variant="caption" sx={{ color: '#DC2626', fontWeight: 700, display: 'block', mt: 0.5 }}>
              * DISCLAIMER: DEMONSTRATION RECORD ONLY – NOT AN OFFICIAL LEGAL INSTRUMENT *
            </Typography>
          </Box>

          {/* Reference & Barcode Bar */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1.5,
              px: 2,
              mt: 1.5,
              backgroundColor: '#F8FAFC',
              borderRadius: 1,
              border: '1px solid #E2E8F0',
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Reference / Verification No:
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'monospace', color: '#14532D' }}>
                {document.referenceNumber}
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                Barcode: {document.barcodeNumber}
              </Typography>
              <Box
                sx={{
                  letterSpacing: '0.25em',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  fontWeight: 900,
                  color: '#1E293B',
                }}
              >
                |||||||| | |||||| ||||| |||||||
              </Box>
            </Box>

            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                Date of Issuance:
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {document.issueDate}
              </Typography>
            </Box>
          </Box>

          {/* Jurisdiction Information */}
          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#14532D', mb: 1 }}>
              REVENUE JURISDICTION (انتظامی حدودِ مال)
            </Typography>
            <Grid container spacing={2} sx={{ backgroundColor: '#FFFFFF', p: 1.5, border: '1px solid #E2E8F0', borderRadius: 1 }}>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Province (صوبہ):</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{document.jurisdiction.province}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">District (ضلع):</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{document.jurisdiction.district}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Tehsil (تحصیل):</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{document.jurisdiction.tehsil}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Qanoongo Halqa (حلقہ قانونگوئی):</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{document.jurisdiction.qanoongoHalqa}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Patwar Circle (پٹوار سرکل):</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{document.jurisdiction.patwarCircle}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Mouza / Hadbast (موضع و حدبست):</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {document.jurisdiction.mouza} (Hadbast #{document.jurisdiction.hadbastNumber})
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Jamabandi Year (سال جمع بندی):</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{document.jamabandiYear}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Purpose (مقصدِ اجراء):</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#16A34A' }}>{document.purpose}</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Owner Details */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#14532D', mb: 1 }}>
              LANDOWNER PARTICULARS (تفصیلاتِ مالک اراضی)
            </Typography>
            <Grid container spacing={2} sx={{ backgroundColor: '#F8FAFC', p: 1.5, border: '1px solid #E2E8F0', borderRadius: 1 }}>
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" color="text.secondary">Owner Name (نام مالک):</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {document.owner.name} ({document.owner.urduName})
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" color="text.secondary">Father / Husband Name (ولدیت/زوجیت):</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {document.owner.fatherName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" color="text.secondary">NADRA CNIC (قومی شناختی کارڈ):</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                  {document.owner.cnic}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Khewat / Khatauni Summary */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#14532D', mb: 1 }}>
              KHEWAT & SHARE PARTICULARS (کھاتہ و تفصیل حصہ داری)
            </Typography>
            <Grid container spacing={2} sx={{ p: 1.5, border: '1px solid #E2E8F0', borderRadius: 1 }}>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Khewat No (کھاتہ / کھیوٹ نمبر):</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#14532D' }}>{document.khewatNumber}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Khatauni No (کھتونی نمبر):</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{document.khatauniNumber}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Total Khewat Area (کل رقبہ کھاتہ):</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{document.totalKhewatArea.formatted}</Typography>
                <Typography variant="caption" color="text.secondary">({document.totalKhewatArea.formattedUrdu})</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Owner Share Area (مملوکہ رقبہ مالک):</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: '#14532D' }}>
                  {document.ownerTotalShareArea.formatted}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#16A34A', display: 'block' }}>
                  {document.ownerShareRatio}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Khasra Details Table */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#14532D', mb: 1 }}>
              KHASRA-WISE BREAKDOWN (تفصیل خسرہ جات و رقبہ)
            </Typography>
            <TableContainer sx={{ border: '1px solid #E2E8F0', borderRadius: 1 }}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: '#14532D' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#FFFFFF', fontWeight: 700 }}>Sr. # (نمبر شمار)</TableCell>
                    <TableCell sx={{ color: '#FFFFFF', fontWeight: 700 }}>Khasra No. (خسرہ نمبر)</TableCell>
                    <TableCell sx={{ color: '#FFFFFF', fontWeight: 700 }}>Land Classification (قسمِ زمین)</TableCell>
                    <TableCell sx={{ color: '#FFFFFF', fontWeight: 700 }}>Total Khasra Area (کل رقبہ)</TableCell>
                    <TableCell sx={{ color: '#FFFFFF', fontWeight: 700 }}>Owner Share Area (حصہ ملکیت)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {document.khasraDetails.map((khasra, index) => (
                    <TableRow key={index} sx={{ '&:nth-of-type(even)': { backgroundColor: '#F8FAFC' } }}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#14532D' }}>{khasra.khasraNo}</TableCell>
                      <TableCell>{khasra.landType}</TableCell>
                      <TableCell>{khasra.totalArea}</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>{khasra.ownerShareArea}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Footer & Verification Seal */}
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'inline-block', p: 1, border: '1px dashed #CBD5E1', borderRadius: 1 }}>
                <QrCode2Icon sx={{ fontSize: 72, color: '#14532D' }} />
                <Typography variant="caption" display="block" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
                  Scan to verify online
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" display="block">
                Fee Paid: PKR {document.feePaidPkr}/- (Challan Cleared)
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Issuing Authority: {document.issuingOfficer}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Computerized Land Record Management System, Board of Revenue Punjab
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ width: 140, borderBottom: '1px solid #1E293B', mx: 'auto', mb: 0.5 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, display: 'block' }}>
                  Digital Signature & Official Stamp
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Revenue Officer / Incharge ARC
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
