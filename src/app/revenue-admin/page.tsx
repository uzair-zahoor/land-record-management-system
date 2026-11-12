'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

// Icons
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DomainIcon from '@mui/icons-material/Domain';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PlaceIcon from '@mui/icons-material/Place';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import { PageHeader } from '../../components/common/PageHeader';
import {
  mockProvinces,
  mockDivisions,
  mockDistricts,
  mockTehsils,
  mockQanoongoHalqas,
  mockPatwarCircles,
  mockMouzas,
} from '../../mocks';

export default function RevenueAdminPage() {
  const [activeTab, setActiveTab] = useState(0);

  // Dependent dropdown filter state
  const [selectedProvinceId, setSelectedProvinceId] = useState('PRV-PB');
  const [selectedDistrictId, setSelectedDistrictId] = useState('DST-LHR');
  const [selectedTehsilId, setSelectedTehsilId] = useState('THS-RWND');

  const districtsInProvince = mockDistricts.filter((d) => d.provinceId === selectedProvinceId);
  const tehsilsInDistrict = mockTehsils.filter((t) => t.districtId === selectedDistrictId);
  const halqasInTehsil = mockQanoongoHalqas.filter((h) => h.tehsilId === selectedTehsilId);
  const circlesInTehsil = mockPatwarCircles.filter((c) => c.tehsilId === selectedTehsilId);
  const mouzasInTehsil = mockMouzas.filter((m) => m.tehsilId === selectedTehsilId);

  return (
    <Box>
      <PageHeader
        title="Revenue Administration (محکمہ مال کی انتظامی تقسیم)"
        urduTitle="انتظامی ڈھانچہ و حلقہ بندیاں"
        subtitle="Manage hierarchical revenue jurisdictions: Province → Division → District → Tehsil → Qanoongo Halqa → Patwar Circle → Mouza"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Revenue Administration' },
        ]}
      />

      {/* Dependent Cascading Dropdowns Bar */}
      <Card sx={{ p: 2.5, mb: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: 'primary.main' }}>
          Active Cascading Jurisdiction Filter (دائرہ کار مال کا انتخاب)
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Province (صوبہ)</InputLabel>
              <Select
                value={selectedProvinceId}
                label="Province (صوبہ)"
                onChange={(e) => setSelectedProvinceId(e.target.value)}
              >
                {mockProvinces.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name} ({p.urduName})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>District (ضلع)</InputLabel>
              <Select
                value={selectedDistrictId}
                label="District (ضلع)"
                onChange={(e) => setSelectedDistrictId(e.target.value)}
              >
                {districtsInProvince.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name} ({d.urduName})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Tehsil (تحصیل)</InputLabel>
              <Select
                value={selectedTehsilId}
                label="Tehsil (تحصیل)"
                onChange={(e) => setSelectedTehsilId(e.target.value)}
              >
                {tehsilsInDistrict.map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.name} ({t.urduName})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      {/* Tabs */}
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newVal) => setActiveTab(newVal)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          <Tab label="1. Provinces (صوبے)" />
          <Tab label="2. Divisions (ڈویژنز)" />
          <Tab label="3. Districts (اضلاع)" />
          <Tab label="4. Tehsils (تحصیلیں)" />
          <Tab label="5. Qanoongo Halqas (قانونگو حلقے)" />
          <Tab label="6. Patwar Circles (پٹوار سرکلز)" />
          <Tab label="7. Mouzas / Villages (موضعات)" />
        </Tabs>
      </Card>

      {/* Tab 1: Provinces */}
      {activeTab === 0 && (
        <Card>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Province Code</TableCell>
                  <TableCell>Province Name</TableCell>
                  <TableCell>Urdu Name (صوبہ)</TableCell>
                  <TableCell>Divisions Count</TableCell>
                  <TableCell>Districts Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockProvinces.map((p) => (
                  <TableRow key={p.id} hover>
                    <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>{p.code}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{p.name}</TableCell>
                    <TableCell sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI', fontWeight: 700 }}>
                      {p.urduName}
                    </TableCell>
                    <TableCell>{p.divisionsCount}</TableCell>
                    <TableCell>{p.districtsCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Tab 2: Divisions */}
      {activeTab === 1 && (
        <Card>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Division ID</TableCell>
                  <TableCell>Division Name</TableCell>
                  <TableCell>Urdu Name</TableCell>
                  <TableCell>Districts Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockDivisions.map((d) => (
                  <TableRow key={d.id} hover>
                    <TableCell sx={{ fontWeight: 700 }}>{d.id}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{d.name}</TableCell>
                    <TableCell sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI' }}>{d.urduName}</TableCell>
                    <TableCell>{d.districtsCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Tab 3: Districts */}
      {activeTab === 2 && (
        <Card>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>District</TableCell>
                  <TableCell>Urdu Name</TableCell>
                  <TableCell>Deputy Commissioner (افسرِ مجاز)</TableCell>
                  <TableCell>Total Tehsils</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockDistricts.map((d) => (
                  <TableRow key={d.id} hover>
                    <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>{d.name}</TableCell>
                    <TableCell sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI' }}>{d.urduName}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{d.deputyCommissioner}</TableCell>
                    <TableCell>{d.tehsilsCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Tab 4: Tehsils */}
      {activeTab === 3 && (
        <Card>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Tehsil</TableCell>
                  <TableCell>Urdu Name</TableCell>
                  <TableCell>Designated Tehsildar</TableCell>
                  <TableCell>Qanoongo Halqas</TableCell>
                  <TableCell>Total Mouzas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockTehsils.map((t) => (
                  <TableRow key={t.id} hover>
                    <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>{t.name}</TableCell>
                    <TableCell sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI' }}>{t.urduName}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{t.tehsildarName}</TableCell>
                    <TableCell>{t.qanoongoHalqasCount}</TableCell>
                    <TableCell>{t.mouzasCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Tab 5: Qanoongo Halqas */}
      {activeTab === 4 && (
        <Card>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Qanoongo Halqa</TableCell>
                  <TableCell>Urdu Name</TableCell>
                  <TableCell>Assigned Qanoongo</TableCell>
                  <TableCell>Patwar Circles Under Jurisdiction</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {halqasInTehsil.map((h) => (
                  <TableRow key={h.id} hover>
                    <TableCell sx={{ fontWeight: 700 }}>{h.name}</TableCell>
                    <TableCell sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI' }}>{h.urduName}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{h.qanoongoName}</TableCell>
                    <TableCell>{h.patwarCirclesCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Tab 6: Patwar Circles */}
      {activeTab === 5 && (
        <Card>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Patwar Circle</TableCell>
                  <TableCell>Urdu Name</TableCell>
                  <TableCell>Field Patwari</TableCell>
                  <TableCell>Contact Mobile</TableCell>
                  <TableCell>Mouzas Assigned</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {circlesInTehsil.map((c) => (
                  <TableRow key={c.id} hover>
                    <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>{c.name}</TableCell>
                    <TableCell sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI' }}>{c.urduName}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{c.patwariName}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace' }}>{c.patwariContact}</TableCell>
                    <TableCell>{c.mouzasCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Tab 7: Mouzas / Villages */}
      {activeTab === 6 && (
        <Card>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Mouza / Village</TableCell>
                  <TableCell>Urdu Name (موضع)</TableCell>
                  <TableCell>Hadbast # (حد بست)</TableCell>
                  <TableCell>Total Area (Kanal)</TableCell>
                  <TableCell>Khasras Surveyed</TableCell>
                  <TableCell>Khewat Accounts</TableCell>
                  <TableCell>Jamabandi Period</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mouzasInTehsil.map((m) => (
                  <TableRow key={m.id} hover>
                    <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>{m.name}</TableCell>
                    <TableCell sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI', fontWeight: 600 }}>
                      {m.urduName}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>#{m.hadbastNumber}</TableCell>
                    <TableCell>{m.totalAreaKanal.toLocaleString()} Kanal</TableCell>
                    <TableCell>{m.totalKhasras}</TableCell>
                    <TableCell>{m.totalKhewats}</TableCell>
                    <TableCell><Chip label={m.jamabandiYear} size="small" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Box>
  );
}
