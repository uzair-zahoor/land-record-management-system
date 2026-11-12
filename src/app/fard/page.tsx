'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import PrintIcon from '@mui/icons-material/Print';
import VerifiedIcon from '@mui/icons-material/Verified';
import Alert from '@mui/material/Alert';

import { useAppStore } from '../../store/useAppStore';
import { useRevenueStore } from '../../store/useRevenueStore';
import { PageHeader } from '../../components/common/PageHeader';
import { FardDocumentView } from '../../components/common/FardDocumentView';
import { translations } from '../../i18n/translations';
import { FardDocument } from '../../types';

export default function FardPage() {
  const { language, showNotification } = useAppStore();
  const { fards, landowners, issueFard } = useRevenueStore();
  const t = translations[language];

  // Search parameters
  const [searchCnic, setSearchCnic] = useState('35202-1489023-1');
  const [selectedMouza, setSelectedMouza] = useState('Chak 45-RB');
  const [fardPurpose, setFardPurpose] = useState<any>('Personal Record (برائے تسلی ریکارڈ)');

  // Active Fard Document
  const [activeFard, setActiveFard] = useState<FardDocument>(fards[0]);

  const handleSearchAndGenerate = () => {
    const matchedOwner = landowners.find(
      (o) => o.cnic.includes(searchCnic) || o.name.toLowerCase().includes(searchCnic.toLowerCase())
    );

    if (matchedOwner) {
      const generated = issueFard({
        purpose: fardPurpose,
        jurisdiction: {
          province: 'Punjab',
          district: 'Lahore',
          tehsil: 'Raiwind',
          qanoongoHalqa: 'Raiwind Urban Halqa',
          patwarCircle: 'Chak 45 Circle',
          mouza: matchedOwner.mouzaName,
          hadbastNumber: '128',
        },
        owner: {
          id: matchedOwner.id,
          name: matchedOwner.name,
          urduName: matchedOwner.urduName,
          fatherName: `${matchedOwner.fatherOrHusbandName} (${matchedOwner.fatherOrHusbandUrduName})`,
          cnic: matchedOwner.cnic,
        },
        khewatNumber: matchedOwner.associatedKhewatNumbers[0] || '45',
        khatauniNumber: '78',
        totalKhewatArea: matchedOwner.totalLandArea,
        ownerShareRatio: '16/24 (2/3 Share)',
        ownerTotalShareArea: matchedOwner.totalLandArea,
        khasraDetails: [
          {
            khasraNo: '125/2',
            totalArea: matchedOwner.totalLandArea.formatted,
            ownerShareArea: matchedOwner.totalLandArea.formatted,
            landType: 'Agricultural (Nehri)',
          },
        ],
        jamabandiYear: '2020-2024',
        issuingOfficer: 'Arazi Record Center (ARC) Raiwind Desk #2',
        feePaidPkr: 500,
        status: 'Valid',
      });

      setActiveFard(generated);
      showNotification(`Official Fard #${generated.referenceNumber} generated successfully.`, 'success');
    } else {
      showNotification('No matching landowner found for given CNIC/Name.', 'error');
    }
  };

  return (
    <Box>
      <PageHeader
        title={t.fardManagement}
        urduTitle="اجراء و تصدیق فرد ملکیت"
        subtitle="Search land ownership extract from computerized Record of Rights and generate official verified Fard"
        breadcrumbs={[
          { label: t.dashboard, href: '/dashboard' },
          { label: t.landRecords, href: '/fard' },
          { label: t.fardManagement },
        ]}
      />

      {/* Official Government Disclaimer */}
      <Alert severity="warning" sx={{ mb: 3 }}>
        <strong>Official Notice:</strong> Fard issued through this portal is an authentic computerized extract of the Record of Rights maintained under the Punjab Land Revenue Act. Watermarked "SAMPLE / DEMO" for simulation mode.
      </Alert>

      {/* Search & Issuance Form Card */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Search Citizen & Generate Fard (تلاش و اجراء فرد)
        </Typography>

        <Grid container spacing={2.5} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              label="Citizen CNIC or Owner Name"
              value={searchCnic}
              onChange={(e) => setSearchCnic(e.target.value)}
              placeholder="e.g. 35202-1489023-1 or Muhammad Ahmed"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Mouza (موضع)</InputLabel>
              <Select
                value={selectedMouza}
                label="Mouza (موضع)"
                onChange={(e) => setSelectedMouza(e.target.value)}
              >
                <MenuItem value="Chak 45-RB">Chak 45-RB</MenuItem>
                <MenuItem value="Shahpur">Shahpur</MenuItem>
                <MenuItem value="Kahna Nau">Kahna Nau</MenuItem>
                <MenuItem value="Sundar Sharif">Sundar Sharif</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Purpose of Fard (مقصدِ فرد)</InputLabel>
              <Select
                value={fardPurpose}
                label="Purpose of Fard (مقصدِ فرد)"
                onChange={(e) => setFardPurpose(e.target.value)}
              >
                <MenuItem value="Personal Record (برائے تسلی ریکارڈ)">Personal Record (برائے تسلی ریکارڈ)</MenuItem>
                <MenuItem value="Bank Loan (برائے قرضہ)">Bank Loan (برائے قرضہ)</MenuItem>
                <MenuItem value="Court (برائے عدالت)">Court (برائے عدالت)</MenuItem>
                <MenuItem value="Sale (برائے بیع)">Sale (برائے بیع)</MenuItem>
                <MenuItem value="Bail (برائے ضمانت)">Bail (برائے ضمانت)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<VerifiedIcon />}
              onClick={handleSearchAndGenerate}
              sx={{ py: 0.9 }}
            >
              Issue Fard
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Official Fard Document Preview */}
      {activeFard && <FardDocumentView document={activeFard} />}
    </Box>
  );
}
