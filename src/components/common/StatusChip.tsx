'use client';

import React from 'react';
import Chip from '@mui/material/Chip';
import { useAppStore } from '../../store/useAppStore';

interface StatusChipProps {
  status: string;
  size?: 'small' | 'medium';
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, size = 'small' }) => {
  const { language } = useAppStore();
  const isUrdu = language === 'ur';

  let color: 'success' | 'warning' | 'error' | 'info' | 'default' = 'default';
  let label = status;

  switch (status.toLowerCase()) {
    case 'active':
    case 'approved':
    case 'verified':
    case 'valid':
    case 'record updated':
      color = 'success';
      if (isUrdu) {
        if (status.toLowerCase() === 'active') label = 'فعال';
        if (status.toLowerCase() === 'approved') label = 'منظور شدہ';
        if (status.toLowerCase() === 'verified') label = 'مصدقہ';
      }
      break;

    case 'pending approval':
    case 'pending':
    case 'pending mutation':
    case 'under verification':
    case 'under revision':
    case 'in progress':
      color = 'warning';
      if (isUrdu) {
        if (status.toLowerCase() === 'under verification') label = 'زیرِ تصدیق';
        if (status.toLowerCase() === 'pending approval') label = 'زیرِ التواء منظوری';
      }
      break;

    case 'rejected':
    case 'cancelled':
    case 'disputed':
    case 'under dispute':
    case 'blocked':
    case 'deceased':
      color = 'error';
      if (isUrdu) {
        if (status.toLowerCase() === 'rejected') label = 'مسترد';
        if (status.toLowerCase() === 'deceased') label = 'مرحوم';
        if (status.toLowerCase() === 'under dispute') label = 'متنازعہ';
      }
      break;

    case 'draft':
    case 'submitted':
      color = 'info';
      if (isUrdu) {
        if (status.toLowerCase() === 'draft') label = 'مسودہ';
        if (status.toLowerCase() === 'submitted') label = 'جمع شدہ';
      }
      break;

    default:
      color = 'default';
  }

  return (
    <Chip
      size={size}
      color={color}
      label={label}
      sx={{
        fontWeight: 600,
        letterSpacing: '0.02em',
      }}
    />
  );
};
