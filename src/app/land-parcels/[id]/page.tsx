'use client';

import React, { useState, use } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Link from 'next/link';

// Icons
import LayersIcon from '@mui/icons-material/Layers';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import FolderIcon from '@mui/icons-material/Folder';
import MapIcon from '@mui/icons-material/Map';
import PrintIcon from '@mui/icons-material/Print';

import { useRevenueStore } from '../../../store/useRevenueStore';
import { PageHeader } from '../../../components/common/PageHeader';
import { StatusChip } from '../../../components/common/StatusChip';
import { MapViewer } from '../../../components/common/MapViewer';

export default function ParcelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { parcels, mutations, documents } = useRevenueStore();

  const parcel = parcels.find((p) => p.id === id) || parcels[0];
  const [activeTab, setActiveTab] = useState(0);

  // Associated mutations
  const parcelMutations = mutations.filter((m) =>
    m.khasraNumbers.includes(parcel.khasraNumber) || m.mouzaName === parcel.mouzaName
  );

  // Associated documents
  const parcelDocs = documents.filter((d) =>
    d.khasraNumber === parcel.khasraNumber || d.mouzaName === parcel.mouzaName
  );

  // Unit conversion calculations (Pakistani Standard Revenue Scale)
  const totalMarlas = parcel.area.kanals * 20 + parcel.area.marlas;
  const acres = (totalMarlas / 160).toFixed(2);
  const murabba = (totalMarlas / 4000).toFixed(3);
  const sqYards = ((totalMarlas * 272.25) / 9).toFixed(1);

  return (
    <Box>
      <PageHeader
        title={`Khasra Parcel #${parcel.khasraNumber}`}
        urduTitle={`خسرہ نمبر ${parcel.khasraNumber}`}
        subtitle={`Mouza: ${parcel.mouzaName} (${parcel.urduMouzaName}) | Khewat: ${parcel.khewatNumber} | Khatauni: ${parcel.khatauniNumber}`}
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Land Parcels', href: '/land-parcels' },
          { label: `Khasra ${parcel.khasraNumber}` },
        ]}
        actions={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              component={Link}
              href={`/fard?khasra=${parcel.khasraNumber}`}
              variant="outlined"
              color="primary"
              startIcon={<PrintIcon />}
            >
              Generate Fard
            </Button>
            <Button
              component={Link}
              href={`/mutations?khasra=${parcel.khasraNumber}`}
              variant="contained"
              color="primary"
              startIcon={<SwapHorizIcon />}
            >
              Apply Mutation
            </Button>
          </Box>
        }
      />

      {/* Navigation Tabs (6 Required Tabs) */}
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newVal) => setActiveTab(newVal)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          <Tab icon={<LayersIcon fontSize="small" />} iconPosition="start" label="1. Overview (عمومی تفصیل)" />
          <Tab icon={<GroupIcon fontSize="small" />} iconPosition="start" label="2. Ownership (ملکیت و حصے)" />
          <Tab icon={<AccountBalanceIcon fontSize="small" />} iconPosition="start" label="3. Khewat / Khatauni (کھاتہ و کھتونی)" />
          <Tab icon={<SwapHorizIcon fontSize="small" />} iconPosition="start" label="4. Mutation History (انتقالات)" />
          <Tab icon={<FolderIcon fontSize="small" />} iconPosition="start" label="5. Documents (دستاویزات)" />
          <Tab icon={<MapIcon fontSize="small" />} iconPosition="start" label="6. Land Map (شجرہ نقشہ)" />
        </Tabs>
      </Card>

      {/* Tab 1: Overview */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title="Cadastral Attributes & Classification" />
              <CardContent>
                <Grid container spacing={2.5}>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="caption" color="text.secondary">Khasra Number (خسرہ نمبر)</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {parcel.khasraNumber}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <Typography variant="caption" color="text.secondary">Cadastral Status</Typography>
                    <Box sx={{ mt: 0.5 }}>
                      <StatusChip status={parcel.status} />
                    </Box>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <Typography variant="caption" color="text.secondary">Land Classification (قسمِ زمین)</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {parcel.landType} ({parcel.urduLandType})
                    </Typography>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <Typography variant="caption" color="text.secondary">Revenue Village / Mouza</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {parcel.mouzaName} ({parcel.urduMouzaName})
                    </Typography>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <Typography variant="caption" color="text.secondary">Khewat No. (کھاتہ نمبر)</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      Khewat #{parcel.khewatNumber}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <Typography variant="caption" color="text.secondary">Khatauni No. (کھتونی نمبر)</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      Khatauni #{parcel.khatauniNumber}
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4, p: 2, backgroundColor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                    Pakistani Land Measurement Breakdown (پیمائش اراضی)
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" color="text.secondary">Kanal / Marla</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {parcel.area.formatted}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" color="text.secondary">Acre Equivalency</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {acres} Acre
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" color="text.secondary">Murabba Share</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {murabba} Murabba
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" color="text.secondary">Square Yards</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {sqYards} Sq. Yd
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title="Cadastral Map Snapshot" />
              <CardContent>
                <MapViewer highlightKhasra={parcel.khasraNumber} mouzaName={parcel.mouzaName} height={260} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Tab 2: Ownership */}
      {activeTab === 1 && (
        <Card>
          <CardHeader
            title="Co-sharers & Ownership Distribution (شرکائے کھاتہ و حصے داران)"
            subheader="Registered legal shares under the official Record of Rights"
          />
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Owner Name</TableCell>
                  <TableCell>Urdu Name (مالک کا نام)</TableCell>
                  <TableCell>Share Ratio (حصہ شرعی)</TableCell>
                  <TableCell>Percentage</TableCell>
                  <TableCell>Entitled Share Area</TableCell>
                  <TableCell align="right">Owner Profile</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parcel.currentOwnership.map((owner, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell sx={{ fontWeight: 700 }}>{owner.ownerName}</TableCell>
                    <TableCell sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI', fontWeight: 600 }}>
                      {owner.urduOwnerName}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>{owner.shareRatio}</TableCell>
                    <TableCell>{(owner.shareFraction * 100).toFixed(1)}%</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{owner.shareArea.formatted}</TableCell>
                    <TableCell align="right">
                      <Button
                        component={Link}
                        href={`/landowners/${owner.ownerId}`}
                        size="small"
                        variant="outlined"
                      >
                        View Owner
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Tab 3: Khewat / Khatauni */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title={`Parent Khewat Account #${parcel.khewatNumber}`} />
              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Khewat represents the joint ownership holding unit. Total assessed revenue and tax liability are determined at the Khewat level in accordance with the Punjab Land Revenue Act.
                </Typography>
                <Button
                  component={Link}
                  href={`/khewat?number=${parcel.khewatNumber}`}
                  variant="outlined"
                  size="small"
                >
                  View Full Khewat Ledger
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title={`Associated Khatauni #${parcel.khatauniNumber} (Tenancy)`} />
              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Khatauni defines the actual cultivation and physical possession status (Khud Kasht / Muzara / Batai) for this parcel.
                </Typography>
                <Button
                  component={Link}
                  href={`/khatauni?number=${parcel.khatauniNumber}`}
                  variant="outlined"
                  size="small"
                >
                  View Khatauni Tenancy Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Tab 4: Mutation History */}
      {activeTab === 3 && (
        <Card>
          <CardHeader title="Historical Mutations Affecting this Parcel (سابقہ انتقالات)" />
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Mutation #</TableCell>
                  <TableCell>Mutation Type</TableCell>
                  <TableCell>Applicant</TableCell>
                  <TableCell>Application Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parcelMutations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
                      No mutation records logged for this parcel.
                    </TableCell>
                  </TableRow>
                ) : (
                  parcelMutations.map((m) => (
                    <TableRow key={m.id} hover>
                      <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>{m.mutationNumber}</TableCell>
                      <TableCell>{m.mutationType}</TableCell>
                      <TableCell>{m.applicantName}</TableCell>
                      <TableCell>{m.applicationDate}</TableCell>
                      <TableCell><StatusChip status={m.currentStatus} /></TableCell>
                      <TableCell align="right">
                        <Button component={Link} href={`/mutations/${m.id}`} size="small" variant="outlined">
                          Inspect
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Tab 5: Documents */}
      {activeTab === 4 && (
        <Card>
          <CardHeader title="Registered Documents & Scanned Deeds (دستاویزات)" />
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Document Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>File Size</TableCell>
                  <TableCell>Uploaded By</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parcelDocs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
                      No scanned deeds attached to this parcel.
                    </TableCell>
                  </TableRow>
                ) : (
                  parcelDocs.map((doc) => (
                    <TableRow key={doc.id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{doc.title}</TableCell>
                      <TableCell><Chip label={doc.category} size="small" /></TableCell>
                      <TableCell>{doc.fileSize}</TableCell>
                      <TableCell>{doc.uploadedBy}</TableCell>
                      <TableCell align="right">
                        <Button size="small" variant="outlined" onClick={() => alert(`Opening ${doc.fileName}...`)}>
                          Preview
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Tab 6: Land Map */}
      {activeTab === 5 && (
        <Box>
          <MapViewer highlightKhasra={parcel.khasraNumber} mouzaName={parcel.mouzaName} height={480} />
        </Box>
      )}
    </Box>
  );
}
