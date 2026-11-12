'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { useRevenueStore } from '../../store/useRevenueStore';
import { PageHeader } from '../../components/common/PageHeader';
import { KhewatAgGrid } from '../../features/khewat/KhewatAgGrid';

export default function KhewatPage() {
  const { khewats } = useRevenueStore();

  return (
    <Box>
      <PageHeader
        title="Khewat Records Management"
        urduTitle="کھاتہ / کھیوٹ ریکارڈز"
        subtitle="Primary ownership account ledgers indicating joint holding and assessed land revenue"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Land Management', href: '/khewat' },
          { label: 'Khewat Records' },
        ]}
      />

      <KhewatAgGrid data={khewats} />
    </Box>
  );
}
