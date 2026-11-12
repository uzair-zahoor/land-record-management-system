'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import { dlrmsPalette } from '../../theme/palette';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TerrainIcon from '@mui/icons-material/Terrain';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DescriptionIcon from '@mui/icons-material/Description';
import GrassIcon from '@mui/icons-material/Grass';
import MapIcon from '@mui/icons-material/Map';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const DRAWER_WIDTH = 280;

interface NavItem {
  label: string;
  urduLabel: string;
  href: string;
  badge?: string | number;
  badgeColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

interface NavGroup {
  id: string;
  title: string;
  urduTitle: string;
  icon: React.ReactNode;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { language, direction, sidebarOpen } = useAppStore();
  const t = translations[language];

  const router = useRouter();

  // Open groups state
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({
    dashboard: true,
    revenueAdmin: false,
    landManagement: true,
    transactions: true,
    landRecords: true,
    documents: false,
    administration: false,
  });

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const navGroups: NavGroup[] = [
    {
      id: 'dashboard',
      title: t.dashboard,
      urduTitle: 'ڈیش بورڈ',
      icon: <DashboardIcon fontSize="small" />,
      items: [
        { label: t.overview, urduLabel: 'عمومی جائزہ', href: '/dashboard' },
      ],
    },
    {
      id: 'revenueAdmin',
      title: t.revenueAdmin,
      urduTitle: 'محکمہ مال کی تقسیم',
      icon: <AccountBalanceIcon fontSize="small" />,
      items: [
        { label: t.provinces, urduLabel: 'صوبے', href: '/revenue-admin?tab=provinces' },
        { label: t.divisions, urduLabel: 'ڈویژنز', href: '/revenue-admin?tab=divisions' },
        { label: t.districts, urduLabel: 'اضلاع', href: '/revenue-admin?tab=districts' },
        { label: t.tehsils, urduLabel: 'تحصیلیں', href: '/revenue-admin?tab=tehsils' },
        { label: t.qanoongoHalqas, urduLabel: 'قانونگو حلقے', href: '/revenue-admin?tab=halqas' },
        { label: t.patwarCircles, urduLabel: 'پٹوار سرکلز', href: '/revenue-admin?tab=circles' },
        { label: t.mouzas, urduLabel: 'موضعات / دیہات', href: '/revenue-admin?tab=mouzas' },
      ],
    },
    {
      id: 'landManagement',
      title: t.landManagement,
      urduTitle: 'انتظام اراضی',
      icon: <TerrainIcon fontSize="small" />,
      items: [
        { label: t.landowners, urduLabel: 'مالکانِ اراضی', href: '/landowners', badge: '6' },
        { label: t.landParcels, urduLabel: 'اراضی خسرہ جات', href: '/land-parcels' },
        { label: t.khewatRecords, urduLabel: 'کھاتہ / کھیوٹ ریکارڈ', href: '/khewat' },
        { label: t.khatauniRecords, urduLabel: 'کھتونی ریکارڈ', href: '/khatauni' },
        { label: t.jamabandi, urduLabel: 'رجسٹر جمع بندی', href: '/jamabandi' },
      ],
    },
    {
      id: 'transactions',
      title: t.transactions,
      urduTitle: 'انتقالات و رجسٹری',
      icon: <SwapHorizIcon fontSize="small" />,
      items: [
        { label: t.mutationApplications, urduLabel: 'تمام انتقالات', href: '/mutations', badge: '3 Pending', badgeColor: 'warning' },
        { label: t.salePurchase, urduLabel: 'انتقال برائے بیع', href: '/mutations?type=sale' },
        { label: t.inheritance, urduLabel: 'انتقال وراثت', href: '/inheritance' },
        { label: t.giftHiba, urduLabel: 'انتقال ہبہ', href: '/mutations?type=gift' },
        { label: t.partition, urduLabel: 'تقسیم اراضی', href: '/mutations?type=partition' },
      ],
    },
    {
      id: 'landRecords',
      title: t.landRecords,
      urduTitle: 'دستاویزاتِ اراضی',
      icon: <HistoryEduIcon fontSize="small" />,
      items: [
        { label: t.fardManagement, urduLabel: 'اجراء فرد ملکیت', href: '/fard' },
        { label: t.girdawari, urduLabel: 'گرداوری فصلی', href: '/girdawari' },
        { label: t.historicalRecords, urduLabel: 'تاریخی ریکارڈ', href: '/historical-records' },
        { label: t.shajraMaps, urduLabel: 'شجرہ کشتوار و نقشہ', href: '/shajra' },
      ],
    },
    {
      id: 'documents',
      title: t.documents,
      urduTitle: 'دستاویزی آرکائیو',
      icon: <FolderSpecialIcon fontSize="small" />,
      items: [
        { label: t.documentRepository, urduLabel: 'مخزن دستاویزات', href: '/documents' },
        { label: t.scannedRegisters, urduLabel: 'اسکین شدہ مسلیں', href: '/documents?category=scanned' },
      ],
    },
    {
      id: 'administration',
      title: t.administration,
      urduTitle: 'نظامت و اختیارات',
      icon: <AdminPanelSettingsIcon fontSize="small" />,
      items: [
        { label: t.usersRoles, urduLabel: 'صارفین اور عہدے', href: '/administration/users' },
        { label: t.auditLogs, urduLabel: 'آڈٹ لاگز', href: '/administration/audit-logs' },
        { label: t.settings, urduLabel: 'ترتیباتِ نظام', href: '/administration/settings' },
      ],
    },
  ];

  return (
    <Drawer
      variant="persistent"
      anchor={direction === 'rtl' ? 'right' : 'left'}
      open={sidebarOpen}
      sx={{
        // width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: '#FFFFFF',
          borderRight: direction === 'ltr' ? `1px solid ${dlrmsPalette.divider}` : 'none',
          borderLeft: direction === 'rtl' ? `1px solid ${dlrmsPalette.divider}` : 'none',
        },
      }}
    >
      {/* Brand Header */}
      <Box
        sx={{
          p: 2.5,
          borderBottom: `1px solid ${dlrmsPalette.divider}`,
          backgroundColor: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          cursor: "pointer"
        }}
        onClick={() => router.push('/dashboard')}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            backgroundColor: dlrmsPalette.primary.main,
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}

        >
          <VerifiedUserIcon sx={{ fontSize: 24 }} />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: dlrmsPalette.primary.main, letterSpacing: '0.03em' }}>
            {t.appShortName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.72rem' }}>
            Board of Revenue Punjab
          </Typography>
        </Box>
      </Box>

      {/* Navigation Group Items */}
      <Box sx={{ overflowY: 'auto', py: 1.5 }}>
        <List component="nav" disablePadding>
          {navGroups.map((group) => {
            const isGroupOpen = !!openGroups[group.id];
            return (
              <Box key={group.id} sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => toggleGroup(group.id)}
                  sx={{
                    py: 1,
                    px: 2,
                    mx: 1,
                    borderRadius: 1.5,
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: '#F1F5F9',
                      color: 'text.primary',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                    {group.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                          {group.title}
                        </Typography>
                        {language === 'ur' && (
                          <Typography variant="caption" sx={{ color: 'primary.main', fontSize: '0.75rem' }}>
                            {group.urduTitle}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                  {isGroupOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                </ListItemButton>

                <Collapse in={isGroupOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: direction === 'ltr' ? 2 : 0, pr: direction === 'rtl' ? 2 : 0 }}>
                    {group.items.map((item) => {
                      const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href.split('?')[0]) && item.href !== '/mutations');
                      return (
                        <ListItemButton
                          key={item.href}
                          component={Link}
                          href={item.href}
                          sx={{
                            py: 0.85,
                            px: 2,
                            mx: 1,
                            my: 0.25,
                            borderRadius: 1.5,
                            backgroundColor: isActive ? 'rgba(20, 83, 45, 0.08)' : 'transparent',
                            color: isActive ? dlrmsPalette.primary.main : dlrmsPalette.text.primary,
                            borderLeft: isActive && direction === 'ltr' ? `3px solid ${dlrmsPalette.primary.main}` : 'none',
                            borderRight: isActive && direction === 'rtl' ? `3px solid ${dlrmsPalette.primary.main}` : 'none',
                            '&:hover': {
                              backgroundColor: isActive ? 'rgba(20, 83, 45, 0.12)' : '#F8FAFC',
                            },
                          }}
                        >
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: isActive ? 700 : 500,
                                    fontSize: '0.8125rem',
                                  }}
                                >
                                  {item.label}
                                </Typography>
                                {item.badge && (
                                  <Chip
                                    size="small"
                                    label={item.badge}
                                    color={item.badgeColor || 'default'}
                                    sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }}
                                  />
                                )}
                              </Box>
                            }
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </Box>
            );
          })}
        </List>
      </Box>

      {/* Sidebar Footer Jurisdiction Badge */}
      <Box
        sx={{
          mt: 'auto',
          p: 2,
          borderTop: `1px solid ${dlrmsPalette.divider}`,
          backgroundColor: '#F8FAFC',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SecurityIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary', display: 'block' }}>
              Secure Govt Network
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              DLRMS Punjab v2.4 (SSL Encrypted)
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};
