'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { dlrmsPalette } from '../../theme/palette';

interface StatCardProps {
  title: string;
  urduTitle?: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendPositive?: boolean;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  urduTitle,
  value,
  icon,
  trend,
  trendPositive = true,
  color = dlrmsPalette.primary.main,
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0px 8px 16px -2px rgba(15, 23, 42, 0.08)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: color,
        }}
      />
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            {urduTitle && (
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.8rem' }}>
                {urduTitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 2,
              backgroundColor: `${color}14`,
              color: color,
            }}
          >
            {icon}
          </Box>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: dlrmsPalette.text.primary }}>
          {value}
        </Typography>

        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: trendPositive ? dlrmsPalette.success.main : dlrmsPalette.error.main,
              }}
            >
              {trend}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              vs last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
