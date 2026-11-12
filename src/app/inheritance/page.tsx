'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Link from 'next/link';

// Icons
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PeopleIcon from '@mui/icons-material/People';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import { useAppStore } from '../../store/useAppStore';
import { useRevenueStore } from '../../store/useRevenueStore';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusChip } from '../../components/common/StatusChip';
import { FamilyTree } from '../../components/common/FamilyTree';
import { translations } from '../../i18n/translations';

export default function InheritancePage() {
  const { language } = useAppStore();
  const { inheritanceCases } = useRevenueStore();
  const t = translations[language];

  const currentCase = inheritanceCases[0];

  return (
    <Box>
      <PageHeader
        title={t.inheritance}
        urduTitle="وراثت و تقسیمِ ترکہ"
        subtitle="Manage legal heir identification, NADRA Family Tree (Shajarah Nasab), and Shariah estate share distribution"
        breadcrumbs={[
          { label: t.dashboard, href: '/dashboard' },
          { label: t.transactions, href: '/inheritance' },
          { label: t.inheritance },
        ]}
        actions={
          currentCase.linkedMutationId && (
            <Button
              component={Link}
              href={`/mutations/${currentCase.linkedMutationId}`}
              variant="contained"
              color="primary"
              startIcon={<SwapHorizIcon />}
            >
              Linked Mutation Workflow (انتقال وراثت)
            </Button>
          )
        }
      />

      {/* Case Overview Card */}
      <Card sx={{ p: 2.5, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={3}>
            <Typography variant="caption" color="text.secondary">Case Reference</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {currentCase.caseNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="caption" color="text.secondary">Deceased Landowner (متوفیٰ)</Typography>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {currentCase.deceasedName}
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI' }}>
              {currentCase.urduDeceasedName} (CNIC: {currentCase.deceasedCnic})
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="caption" color="text.secondary">Total Estate Land Area (کل ترکہ)</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {currentCase.totalEstateArea.formatted}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ({currentCase.totalEstateArea.formattedUrdu})
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="caption" color="text.secondary">Case Status</Typography>
            <Box sx={{ mt: 0.5 }}>
              <StatusChip status={currentCase.status} size="medium" />
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Visual Family Tree Component */}
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccountTreeIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Visual Family Tree & Shajarah Nasab (شجرہ نسب وارثان)
              </Typography>
            </Box>
          }
          subheader="Computerized genealogical pedigree tree linked with NADRA Family Registration Certificate"
        />
        <CardContent>
          <FamilyTree
            deceasedName={currentCase.deceasedName}
            urduDeceasedName={currentCase.urduDeceasedName}
            deceasedCnic={currentCase.deceasedCnic}
            totalArea={currentCase.totalEstateArea.formatted}
            heirs={currentCase.heirs}
          />
        </CardContent>
      </Card>

      {/* Legal Heirs Allocation Table */}
      <Card>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PeopleIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Legal Heirs & Estate Allocation Breakdown (تفصیلِ ورثاء و حصص)
              </Typography>
            </Box>
          }
          subheader="Certified by Union Council & verified by Halqa Qanoongo"
        />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Heir Name</TableCell>
                <TableCell>Urdu Name (وارث کا نام)</TableCell>
                <TableCell>CNIC</TableCell>
                <TableCell>Relationship</TableCell>
                <TableCell>Shariah Share (حصہ شرعی)</TableCell>
                <TableCell>Percentage</TableCell>
                <TableCell>Allocated Land Area</TableCell>
                <TableCell>Verification Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCase.heirs.map((heir) => (
                <TableRow key={heir.id} hover>
                  <TableCell sx={{ fontWeight: 700 }}>{heir.name}</TableCell>
                  <TableCell sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI', fontWeight: 600 }}>
                    {heir.urduName}
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{heir.cnic}</TableCell>
                  <TableCell>
                    <Chip label={`${heir.relationship} (${heir.urduRelationship})`} size="small" />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {heir.shareFractionText}
                  </TableCell>
                  <TableCell>{heir.sharePercentage.toFixed(1)}%</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    {heir.calculatedArea.formatted}
                  </TableCell>
                  <TableCell>
                    <StatusChip status={heir.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
