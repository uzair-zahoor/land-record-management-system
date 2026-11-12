'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
import HistoryIcon from '@mui/icons-material/History';

import { useAppStore } from '../../store/useAppStore';
import { useRevenueStore } from '../../store/useRevenueStore';
import { PageHeader } from '../../components/common/PageHeader';
import { JamabandiRegisterView } from '../../components/common/JamabandiRegisterView';
import { translations } from '../../i18n/translations';

export default function JamabandiPage() {
  const { language } = useAppStore();
  const { jamabandis } = useRevenueStore();
  const t = translations[language];

  const [selectedMouza, setSelectedMouza] = useState('Chak 45-RB');
  const [selectedPeriod, setSelectedPeriod] = useState('2020-2024');
  const [historyVersion, setHistoryVersion] = useState('Current Quadrennial (2020-2024)');

  const filteredRecords = jamabandis.filter(
    (j) => (selectedMouza === 'ALL' || j.mouzaName === selectedMouza) && j.quadrennialYear === selectedPeriod
  );

  return (
    <Box>
      <PageHeader
        title={t.jamabandi}
        urduTitle="رجسٹر حقدارانِ زمین (چہار سالہ جمع بندی)"
        subtitle="Quadrennial Record of Rights prepared under Section 42 of Punjab Land Revenue Act"
        breadcrumbs={[
          { label: t.dashboard, href: '/dashboard' },
          { label: t.landManagement, href: '/jamabandi' },
          { label: t.jamabandi },
        ]}
      />

      {/* Register Control Panel */}
      <Card sx={{ p: 2.5, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Select Mouza / Village (موضع)</InputLabel>
              <Select
                value={selectedMouza}
                label="Select Mouza / Village (موضع)"
                onChange={(e) => setSelectedMouza(e.target.value)}
              >
                <MenuItem value="Chak 45-RB">Chak 45-RB (چک 45 آر بی)</MenuItem>
                <MenuItem value="Shahpur">Shahpur (شاہ پور)</MenuItem>
                <MenuItem value="Kahna Nau">Kahna Nau (کاہنہ نو)</MenuItem>
                <MenuItem value="Sundar Sharif">Sundar Sharif (سندر شریف)</MenuItem>
                <MenuItem value="Niaz Baig">Niaz Baig (نیاز بیگ)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Quadrennial Period (چہار سالہ دورانیہ)</InputLabel>
              <Select
                value={selectedPeriod}
                label="Quadrennial Period (چہار سالہ دورانیہ)"
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <MenuItem value="2020-2024">Current Cycle: 2020-2024</MenuItem>
                <MenuItem value="2016-2020">Historical Cycle: 2016-2020</MenuItem>
                <MenuItem value="2012-2016">Historical Cycle: 2012-2016</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Version Archive</InputLabel>
              <Select
                value={historyVersion}
                label="Version Archive"
                onChange={(e) => setHistoryVersion(e.target.value)}
              >
                <MenuItem value="Current Quadrennial (2020-2024)">
                  Current (Active Parchah Sarkar)
                </MenuItem>
                <MenuItem value="Archived Parchah Patwar 2016-2020">
                  Archived Parchah Patwar 2016-2020
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      {/* Traditional 12-Column Ledger Component */}
      <JamabandiRegisterView
        records={filteredRecords}
        mouzaName={selectedMouza}
        quadrennialYear={selectedPeriod}
        tehsil="Raiwind"
        district="Lahore"
      />
    </Box>
  );
}
