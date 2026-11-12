'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAppStore } from '../../store/useAppStore';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  urduTitle?: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  urduTitle,
  subtitle,
  breadcrumbs,
  actions,
}) => {
  const { language } = useAppStore();
  const isUrdu = language === 'ur';

  return (
    <Box sx={{ mb: 3 }}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" sx={{ color: 'text.secondary', transform: isUrdu ? 'rotate(180deg)' : 'none' }} />}
          sx={{ mb: 1 }}
        >
          {breadcrumbs.map((item, index) =>
            item.href ? (
              <Link
                key={index}
                href={item.href}
                style={{ textDecoration: 'none', color: '#64748B', fontSize: '0.8125rem' }}
              >
                {item.label}
              </Link>
            ) : (
              <Typography key={index} variant="caption" sx={{ color: '#1E293B', fontWeight: 600, fontSize: '0.8125rem' }}>
                {item.label}
              </Typography>
            )
          )}
        </Breadcrumbs>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {title}
            </Typography>
            {urduTitle && (
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                ({urduTitle})
              </Typography>
            )}
          </Box>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        {actions && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>{actions}</Box>}
      </Box>
    </Box>
  );
};
