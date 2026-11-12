'use client';

import React, { use } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Link from 'next/link';

// Icons
import PrintIcon from '@mui/icons-material/Print';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import BadgeIcon from '@mui/icons-material/Badge';
import TerrainIcon from '@mui/icons-material/Terrain';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

import { useAppStore } from '../../../store/useAppStore';
import { useRevenueStore } from '../../../store/useRevenueStore';
import { PageHeader } from '../../../components/common/PageHeader';
import { StatusChip } from '../../../components/common/StatusChip';
import { EmptyState } from '../../../components/common/EmptyState';
import { dlrmsPalette } from '../../../theme/palette';

export default function LandownerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { landowners, parcels, mutations, khewats } = useRevenueStore();

  const owner = landowners.find((o) => o.id === id) || landowners[0];

  // Associated parcels
  const associatedParcels = parcels.filter((p) =>
    p.currentOwnership.some((own) => own.ownerId === owner.id || own.ownerName.includes(owner.name))
  );

  // Associated mutations
  const associatedMutations = mutations.filter((m) =>
    m.applicantCnic === owner.cnic ||
    m.previousOwners.some((p) => p.cnic === owner.cnic) ||
    m.newOwners.some((n) => n.cnic === owner.cnic)
  );

  return (
    <Box>
      <PageHeader
        title={`Landowner: ${owner.name}`}
        urduTitle={owner.urduName}
        subtitle={`CNIC: ${owner.cnic} | Mouza: ${owner.mouzaName} | Account: ${owner.id}`}
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Landowners', href: '/landowners' },
          { label: owner.name },
        ]}
        actions={
          <Button
            component={Link}
            href={`/fard?ownerCnic=${owner.cnic}`}
            variant="contained"
            color="primary"
            startIcon={<PrintIcon />}
          >
            Issue Fard (اجراء فرد)
          </Button>
        }
      />

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', pt: 4 }}>
              <Avatar
                sx={{
                  width: 84,
                  height: 84,
                  mx: 'auto',
                  mb: 2,
                  backgroundColor: dlrmsPalette.primary.main,
                  fontSize: '2rem',
                  fontWeight: 700,
                }}
              >
                {owner.name.charAt(0)}
              </Avatar>

              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {owner.name}
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI', color: 'primary.main', mb: 1 }}>
                {owner.urduName}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
                <StatusChip status={owner.status} />
                <Chip
                  icon={<VerifiedIcon sx={{ fontSize: 16 }} />}
                  label="NADRA Verified"
                  size="small"
                  color="success"
                  variant="outlined"
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BadgeIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">CNIC (قومی شناختی کارڈ)</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                      {owner.cnic}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BadgeIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Father / Husband (ولدیت/زوجیت)</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {owner.fatherOrHusbandName} ({owner.fatherOrHusbandUrduName})
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Contact Number</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {owner.contactNumber}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <HomeIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Permanent Address (سکونت)</Typography>
                    <Typography variant="body2">
                      {owner.permanentAddress}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  backgroundColor: '#F0FDF4',
                  borderRadius: 2,
                  border: '1px solid #BBF7D0',
                }}
              >
                <Typography variant="caption" sx={{ color: '#166534', fontWeight: 600, display: 'block' }}>
                  Total Consolidated Estate Holding
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#14532D' }}>
                  {owner.totalLandArea.formatted}
                </Typography>
                <Typography variant="caption" sx={{ color: '#15803D' }}>
                  ({owner.totalLandArea.formattedUrdu})
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Land Parcels & Ownership History */}
        <Grid item xs={12} md={8}>
          {/* Associated Land Parcels */}
          <Card sx={{ mb: 3 }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TerrainIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Associated Land Parcels (خسرہ جات و ملکیتی رقبہ)
                  </Typography>
                </Box>
              }
              subheader="Khasra records where this citizen holds registered ownership shares"
            />
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Khasra #</TableCell>
                    <TableCell>Khewat</TableCell>
                    <TableCell>Khatauni</TableCell>
                    <TableCell>Classification</TableCell>
                    <TableCell>Total Parcel Area</TableCell>
                    <TableCell>Citizen Share Area</TableCell>
                    <TableCell align="right">View Parcel</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {associatedParcels.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
                        No direct parcels linked in this demo view.
                      </TableCell>
                    </TableRow>
                  ) : (
                    associatedParcels.map((parcel) => {
                      const share = parcel.currentOwnership.find((o) => o.ownerId === owner.id || o.ownerName.includes(owner.name));
                      return (
                        <TableRow key={parcel.id} hover>
                          <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {parcel.khasraNumber}
                          </TableCell>
                          <TableCell>{parcel.khewatNumber}</TableCell>
                          <TableCell>{parcel.khatauniNumber}</TableCell>
                          <TableCell>{parcel.landType}</TableCell>
                          <TableCell>{parcel.area.formatted}</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#16A34A' }}>
                            {share ? `${share.shareArea.formatted} (${share.shareRatio})` : parcel.area.formatted}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              component={Link}
                              href={`/land-parcels/${parcel.id}`}
                              size="small"
                              variant="outlined"
                            >
                              Inspect
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Mutation & Transaction History */}
          <Card sx={{ mb: 3 }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SwapHorizIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Transaction & Mutation History (سابقہ انتقالات)
                  </Typography>
                </Box>
              }
            />
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Mutation #</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Application Date</TableCell>
                    <TableCell>Area Transferred</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Workflow</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {associatedMutations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
                        No mutation transactions recorded for this owner.
                      </TableCell>
                    </TableRow>
                  ) : (
                    associatedMutations.map((mut) => (
                      <TableRow key={mut.id} hover>
                        <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {mut.mutationNumber}
                        </TableCell>
                        <TableCell>{mut.mutationType}</TableCell>
                        <TableCell>{mut.applicationDate}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{mut.transferArea.formatted}</TableCell>
                        <TableCell>
                          <StatusChip status={mut.currentStatus} />
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            component={Link}
                            href={`/mutations/${mut.id}`}
                            size="small"
                            variant="outlined"
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Khewat Accounts and Shajra Pedigree */}
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <HistoryEduIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Khewat Accounts & Revenue Assessment
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                This landowner is enrolled under Khewat accounts: <strong>{owner.associatedKhewatNumbers.join(', ')}</strong> in Mouza <strong>{owner.mouzaName}</strong>. All land tax (Maalia) assessments are cleared for the ongoing Quadrennial Jamabandi cycle.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button
                  component={Link}
                  href={`/jamabandi?khewat=${owner.associatedKhewatNumbers[0]}`}
                  variant="outlined"
                  size="small"
                >
                  View in Jamabandi Register
                </Button>
                <Button
                  component={Link}
                  href={`/shajra?mouza=${owner.mouzaName}`}
                  variant="outlined"
                  size="small"
                >
                  View on Cadastral Map
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
