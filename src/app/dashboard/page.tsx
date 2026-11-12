'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Link from 'next/link';

// Charts
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
} from 'recharts';

// Icons
import DomainIcon from '@mui/icons-material/Domain';
import PeopleIcon from '@mui/icons-material/People';
import TerrainIcon from '@mui/icons-material/Terrain';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PrintIcon from '@mui/icons-material/Print';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useAppStore } from '../../store/useAppStore';
import { useRevenueStore } from '../../store/useRevenueStore';
import { translations } from '../../i18n/translations';
import { StatCard } from '../../components/common/StatCard';
import { StatusChip } from '../../components/common/StatusChip';
import { dlrmsPalette } from '../../theme/palette';

export default function DashboardPage() {
  const { language, selectedTehsil, selectedDistrict } = useAppStore();
  const { landowners, parcels, mutations, fards, updateMutationStatus } = useRevenueStore();
  const t = translations[language];

  // Realistic Charts Data
  const landDistributionData = [
    { name: 'Nehri (نہری)', value: 18450, color: '#14532D' },
    { name: 'Chahi (چاہی)', value: 6200, color: '#16A34A' },
    { name: 'Residential (رہائشی)', value: 2400, color: '#38BDF8' },
    { name: 'Commercial (کمرشل)', value: 950, color: '#F59E0B' },
    { name: 'Barani / Other', value: 450, color: '#94A3B8' },
  ];

  const mutationStatusData = [
    { status: 'Approved', count: 142, urdu: 'منظور شدہ' },
    { status: 'Verification', count: 38, urdu: 'زیرِ تصدیق' },
    { status: 'Pending Review', count: 19, urdu: 'زیرِ التواء' },
    { status: 'Draft', count: 12, urdu: 'مسودہ' },
    { status: 'Rejected', count: 6, urdu: 'مسترد' },
  ];

  const monthlyFardData = [
    { month: 'Nov', count: 820 },
    { month: 'Dec', count: 950 },
    { month: 'Jan', count: 1100 },
    { month: 'Feb', count: 1240 },
    { month: 'Mar', count: 1380 },
    { month: 'Apr', count: 1480 },
  ];

  const districtRecordsData = [
    { district: 'Lahore', parcels: 28450, mutations: 1240 },
    { district: 'Kasur', parcels: 19200, mutations: 890 },
    { district: 'Faisalabad', parcels: 34100, mutations: 1560 },
    { district: 'Rawalpindi', parcels: 22800, mutations: 980 },
    { district: 'Sheikhupura', parcels: 17500, mutations: 740 },
  ];

  return (
    <Box>
      {/* Executive Welcome Bar */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: dlrmsPalette.primary.main }}>
            {t.appName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t.govDepartment} – Jurisdiction: <strong>{selectedTehsil}, {selectedDistrict}</strong>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            component={Link}
            href="/fard"
            variant="outlined"
            color="primary"
            startIcon={<PrintIcon />}
          >
            {t.generateFard}
          </Button>
          <Button
            component={Link}
            href="/mutations"
            variant="contained"
            color="primary"
            startIcon={<PendingActionsIcon />}
          >
            {t.applyMutation}
          </Button>
        </Box>
      </Box>

      {/* 6 Statistics Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            title={t.totalMouzas}
            urduTitle="کل موضعات"
            value="68"
            trend="+2.1%"
            color={dlrmsPalette.primary.main}
            icon={<DomainIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            title={t.registeredLandowners}
            urduTitle="رجسٹرڈ مالکان"
            value={landowners.length.toLocaleString()}
            trend="+5.4%"
            color={dlrmsPalette.secondary.main}
            icon={<PeopleIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            title={t.totalLandParcels}
            urduTitle="کل خسرہ جات"
            value="28,450"
            trend="+1.8%"
            color="#0284C7"
            icon={<TerrainIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            title={t.activeKhewatAccounts}
            urduTitle="فعال کھاتہ جات"
            value="3,120"
            trend="+3.2%"
            color="#D97706"
            icon={<AccountBalanceWalletIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            title={t.pendingMutations}
            urduTitle="زیرِ التواء انتقالات"
            value="14"
            trend="-8.0%"
            trendPositive={true}
            color="#DC2626"
            icon={<PendingActionsIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            title={t.issuedFardDocuments}
            urduTitle="جاری کردہ فردات"
            value={fards.length.toLocaleString()}
            trend="+12.5%"
            color="#7C3AED"
            icon={<PrintIcon />}
          />
        </Grid>
      </Grid>

      {/* Analytics Charts Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Monthly Fard Trend Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Monthly Fard Issuance Volume (اجراء فرد ماہانہ شرح)
                </Typography>
              }
              subheader="Trends over the past 6 billing cycles in Arazi Record Centers"
            />
            <CardContent sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyFardData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fardGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={dlrmsPalette.primary.main} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={dlrmsPalette.primary.main} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <RechartsTooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke={dlrmsPalette.primary.main}
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#fardGradient)"
                    name="Fards Issued"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Land Classification Donut */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Land Classification (قسمِ اراضی)
                </Typography>
              }
              subheader="Distribution of surveyed Khasra parcels"
            />
            <CardContent sx={{ height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={landDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {landDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {landDistributionData.map((item) => (
                  <Chip
                    key={item.name}
                    label={`${item.name}`}
                    size="small"
                    sx={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                      fontWeight: 700,
                      fontSize: '0.68rem',
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Second Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Mutation Applications by Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Mutation Applications by Status (انتقالات بلحاظِ کیفیت)
                </Typography>
              }
              subheader="Active workflow stages across Tehsildar & Patwari desks"
            />
            <CardContent sx={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mutationStatusData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis type="number" stroke="#64748B" fontSize={12} />
                  <YAxis type="category" dataKey="status" stroke="#64748B" fontSize={12} />
                  <RechartsTooltip />
                  <Bar dataKey="count" fill={dlrmsPalette.secondary.main} radius={[0, 4, 4, 0]} name="Applications" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* District Revenue Records Comparison */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  District Revenue Load (ڈسٹرکٹ اراضی موازنہ)
                </Typography>
              }
              subheader="Comparison of total parcels surveyed vs mutations processed"
            />
            <CardContent sx={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={districtRecordsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="district" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="parcels" fill={dlrmsPalette.primary.main} name="Total Parcels" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="mutations" fill="#F59E0B" name="Mutations Filed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Operational Widgets Grid */}
      <Grid container spacing={3}>
        {/* Recent Mutation Applications Table */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Recent Mutation Applications (حالیہ انتقالات)
                  </Typography>
                  <Button
                    component={Link}
                    href="/mutations"
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                  >
                    View All
                  </Button>
                </Box>
              }
            />
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Mutation #</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Applicant</TableCell>
                    <TableCell>Mouza</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mutations.slice(0, 4).map((mut) => (
                    <TableRow key={mut.id} hover>
                      <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {mut.mutationNumber}
                      </TableCell>
                      <TableCell>{mut.mutationType}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {mut.applicantName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {mut.applicantCnic}
                        </Typography>
                      </TableCell>
                      <TableCell>{mut.mouzaName}</TableCell>
                      <TableCell>
                        <StatusChip status={mut.currentStatus} />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          component={Link}
                          href={`/mutations/${mut.id}`}
                          size="small"
                          variant="outlined"
                          startIcon={<VisibilityIcon />}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Pending Approvals & Quick Sanction Widget */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Pending Officer Actions (تصدیق طلب)
                </Typography>
              }
              subheader="Awaiting Tehsildar open hearing sanction"
            />
            <CardContent sx={{ pt: 0 }}>
              {mutations
                .filter((m) => m.currentStatus === 'Pending Approval')
                .map((m) => (
                  <Box
                    key={m.id}
                    sx={{
                      p: 2,
                      mb: 1.5,
                      backgroundColor: '#FFFBEB',
                      border: '1px solid #FDE68A',
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#92400E' }}>
                        {m.mutationNumber} – {m.mutationType}
                      </Typography>
                      <Chip label="Sanction Ready" size="small" color="warning" sx={{ height: 20, fontSize: '0.65rem' }} />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Applicant: {m.applicantName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Mouza: {m.mouzaName} | Area: {m.transferArea.formatted}
                    </Typography>

                    <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        startIcon={<CheckCircleOutlineIcon />}
                        onClick={() => updateMutationStatus(m.id, 'Approved', 'Approved in Public Jalsa')}
                        sx={{ fontSize: '0.75rem', py: 0.5 }}
                      >
                        Sanction (منظور)
                      </Button>
                      <Button
                        component={Link}
                        href={`/mutations/${m.id}`}
                        size="small"
                        variant="outlined"
                        color="inherit"
                        sx={{ fontSize: '0.75rem', py: 0.5 }}
                      >
                        Review
                      </Button>
                    </Box>
                  </Box>
                ))}

              {/* Recent Landowners preview */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 3, mb: 1.5 }}>
                Recently Registered Landowners
              </Typography>
              {landowners.slice(0, 2).map((owner) => (
                <Box key={owner.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Avatar sx={{ width: 36, height: 36, backgroundColor: dlrmsPalette.secondary.main, fontSize: '0.85rem' }}>
                    {owner.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {owner.name} ({owner.urduName})
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {owner.cnic} • {owner.mouzaName}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {owner.totalLandArea.formatted}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
