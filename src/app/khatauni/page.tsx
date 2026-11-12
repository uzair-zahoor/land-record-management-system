'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { useRevenueStore } from '../../store/useRevenueStore';
import { PageHeader } from '../../components/common/PageHeader';
import { KhatauniAgGrid } from '../../features/khatauni/KhatauniAgGrid';

export default function KhatauniPage() {
  const { khataunis } = useRevenueStore();

  return (
    <Box>
      <PageHeader
        title="Khatauni Records Management"
        urduTitle="کھتونی کاشتکار ریکارڈز"
        subtitle="Registers of physical cultivation, tenant status (Muzara/Kashtkar), and rent/crop sharing terms"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Land Management', href: '/khatauni' },
          { label: 'Khatauni Records' },
        ]}
      />

      <KhatauniAgGrid data={khataunis} />
    </Box>
  );
}
