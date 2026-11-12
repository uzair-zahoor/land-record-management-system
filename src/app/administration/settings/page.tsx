'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import SaveIcon from '@mui/icons-material/Save';

import { useAppStore } from '../../../store/useAppStore';
import { PageHeader } from '../../../components/common/PageHeader';

export default function SettingsPage() {
  const { language, setLanguage, showNotification } = useAppStore();

  const [measurementStandard, setMeasurementStandard] = useState('Standard Punjab (1 Kanal = 20 Marlas, 1 Marla = 272.25 sq ft)');
  const [quadrennialCycle, setQuadrennialCycle] = useState('2020-2024');
  const [nadraIntegration, setNadraIntegration] = useState(true);
  const [biometricRequired, setBiometricRequired] = useState(true);

  const handleSave = () => {
    showNotification('System settings and land measurement standards saved successfully.', 'success');
  };

  return (
    <Box>
      <PageHeader
        title="System Settings & Revenue Rules (ترتیباتِ نظام)"
        urduTitle="ترتیبات و ضوابطِ مال"
        subtitle="Configure revenue units, quadrennial Jamabandi years, NADRA Verisys biometric verification, and language preferences"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Administration', href: '/administration/users' },
          { label: 'Settings' },
        ]}
        actions={
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save Settings (محفوظ کریں)
          </Button>
        }
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Land Measurement Standards (پیمائش اراضی)" />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Measurement Standard</InputLabel>
                <Select
                  value={measurementStandard}
                  label="Measurement Standard"
                  onChange={(e) => setMeasurementStandard(e.target.value)}
                >
                  <MenuItem value="Standard Punjab (1 Kanal = 20 Marlas, 1 Marla = 272.25 sq ft)">
                    Standard Punjab (1 Kanal = 20 Marlas, 1 Marla = 272.25 sq ft)
                  </MenuItem>
                  <MenuItem value="Karam Scale (1 Karam = 5.5 ft / 66 inches)">
                    Karam Scale (1 Karam = 5.5 ft / 66 inches)
                  </MenuItem>
                  <MenuItem value="Square Yards / Metric (1 Acre = 4840 sq yd)">
                    Square Yards / Metric (1 Acre = 4840 sq yd)
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                size="small"
                label="Current Quadrennial Jamabandi Cycle (دورانیہ جمع بندی)"
                value={quadrennialCycle}
                onChange={(e) => setQuadrennialCycle(e.target.value)}
              />

              <TextField
                fullWidth
                size="small"
                label="Government Department Header (انگریزی)"
                defaultValue="Government of the Punjab – Board of Revenue"
              />

              <TextField
                fullWidth
                size="small"
                label="Government Department Header (Urdu - اردو)"
                defaultValue="حکومت پنجاب – بورڈ آف ریونیو"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Integration & Security Verification (سیکیورٹی ضوابط)" />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={nadraIntegration}
                    onChange={(e) => setNadraIntegration(e.target.checked)}
                    color="primary"
                  />
                }
                label="NADRA Verisys Real-time CNIC Verification (آن لائن نادرا تصدیق)"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={biometricRequired}
                    onChange={(e) => setBiometricRequired(e.target.checked)}
                    color="primary"
                  />
                }
                label="Mandatory Citizen Biometric Thumb Impression for Mutations"
              />

              <Divider sx={{ my: 1 }} />

              <FormControl fullWidth size="small">
                <InputLabel>Default Interface Language (زبان)</InputLabel>
                <Select
                  value={language}
                  label="Default Interface Language (زبان)"
                  onChange={(e) => setLanguage(e.target.value as any)}
                >
                  <MenuItem value="en">English (LTR Interface)</MenuItem>
                  <MenuItem value="ur">اردو (Urdu - RTL Interface)</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ mt: 2, p: 2, backgroundColor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0' }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  System Build Version: <strong>DLRMS-PB-v2.4.0 (Production Mock)</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Database Schema: <strong>GraphQL Ready / PostgreSQL Revenue Ledger</strong>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
