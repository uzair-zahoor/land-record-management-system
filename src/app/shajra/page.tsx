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
import LayersIcon from '@mui/icons-material/Layers';

import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../../components/common/PageHeader';
import { MapViewer } from '../../components/common/MapViewer';
import { translations } from '../../i18n/translations';

export default function ShajraPage() {
  const { language } = useAppStore();
  const t = translations[language];

  const [selectedMouza, setSelectedMouza] = useState('Chak 45-RB');
  const [selectedKhasra, setSelectedKhasra] = useState('125/2');

  return (
    <Box>
      <PageHeader
        title={t.shajraMaps}
        urduTitle="شجرہ کشتوار و کیڈسٹرل نقشہ جات"
        subtitle="Digitized cadastral field boundary sheets (Aks Shajra), water courses, roads, and parcel geometry"
        breadcrumbs={[
          { label: t.dashboard, href: '/dashboard' },
          { label: t.landRecords, href: '/shajra' },
          { label: t.shajraMaps },
        ]}
        actions={
          <Button
            variant="outlined"
            color="primary"
            startIcon={<PrintIcon />}
            onClick={() => window.print()}
          >
            Print Cadastral Sheet
          </Button>
        }
      />

      <Card sx={{ p: 2.5, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Select Mouza (موضع)</InputLabel>
              <Select
                value={selectedMouza}
                label="Select Mouza (موضع)"
                onChange={(e) => setSelectedMouza(e.target.value)}
              >
                <MenuItem value="Chak 45-RB">Chak 45-RB (چک 45 آر بی)</MenuItem>
                <MenuItem value="Shahpur">Shahpur (شاہ پور)</MenuItem>
                <MenuItem value="Kahna Nau">Kahna Nau (کاہنہ نو)</MenuItem>
                <MenuItem value="Sundar Sharif">Sundar Sharif (سندر شریف)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Focus Khasra (خسرہ منتخب کریں)</InputLabel>
              <Select
                value={selectedKhasra}
                label="Focus Khasra (خسرہ منتخب کریں)"
                onChange={(e) => setSelectedKhasra(e.target.value)}
              >
                <MenuItem value="125/1">Khasra 125/1 (8 Kanal Nehri)</MenuItem>
                <MenuItem value="125/2">Khasra 125/2 (8 Kanal Nehri)</MenuItem>
                <MenuItem value="126">Khasra 126 (16 Kanal Chahi)</MenuItem>
                <MenuItem value="127/1">Khasra 127/1 (10 Kanal Barani)</MenuItem>
                <MenuItem value="127/2">Khasra 127/2 (4 Kanal Residential)</MenuItem>
                <MenuItem value="128">Khasra 128 (6 Kanal Commercial)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      {/* Cadastral Map Canvas Component */}
      <MapViewer highlightKhasra={selectedKhasra} mouzaName={selectedMouza} height={520} />
    </Box>
  );
}
