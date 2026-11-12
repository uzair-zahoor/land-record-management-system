'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LayersIcon from '@mui/icons-material/Layers';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { dlrmsPalette } from '../../theme/palette';

interface MapViewerProps {
  highlightKhasra?: string;
  mouzaName?: string;
  height?: number | string;
}

export const MapViewer: React.FC<MapViewerProps> = ({
  highlightKhasra = '125/2',
  mouzaName = 'Chak 45-RB, Raiwind, Lahore',
  height = 420,
}) => {
  const [activeLayer, setActiveLayer] = useState<'cadastral' | 'satellite' | 'hybrid'>('cadastral');
  const [selectedParcel, setSelectedParcel] = useState<string>(highlightKhasra);

  const parcels = [
    { id: '125/1', x: 40, y: 50, w: 120, h: 90, type: 'Agricultural (Nehri)', area: '8K 0M', owner: 'Muhammad Bilal' },
    { id: '125/2', x: 170, y: 50, w: 140, h: 100, type: 'Agricultural (Nehri)', area: '8K 0M', owner: 'Muhammad Ahmed' },
    { id: '126', x: 320, y: 50, w: 160, h: 110, type: 'Agricultural (Chahi)', area: '16K 12M', owner: 'Muhammad Ahmed & Zainab' },
    { id: '127/1', x: 40, y: 150, w: 130, h: 110, type: 'Agricultural (Barani)', area: '10K 4M', owner: 'Abdul Rasheed' },
    { id: '127/2', x: 180, y: 160, w: 140, h: 120, type: 'Residential', area: '4K 0M', owner: 'Sanaullah Khan' },
    { id: '128', x: 330, y: 170, w: 150, h: 110, type: 'Commercial', area: '6K 8M', owner: 'Tariq Mehmood' },
  ];

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${dlrmsPalette.divider}`,
        position: 'relative',
      }}
    >
      {/* Top Map Controls */}
      <Box
        sx={{
          p: 1.5,
          backgroundColor: '#FFFFFF',
          borderBottom: `1px solid ${dlrmsPalette.divider}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LayersIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Cadastral GIS Map (شجرہ کشتوار نقشہ) – {mouzaName}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ButtonGroup size="small" variant="outlined">
            <Button
              variant={activeLayer === 'cadastral' ? 'contained' : 'outlined'}
              onClick={() => setActiveLayer('cadastral')}
            >
              Cadastral (شجرہ)
            </Button>
            <Button
              variant={activeLayer === 'satellite' ? 'contained' : 'outlined'}
              onClick={() => setActiveLayer('satellite')}
            >
              Satellite (سیٹلائٹ)
            </Button>
            <Button
              variant={activeLayer === 'hybrid' ? 'contained' : 'outlined'}
              onClick={() => setActiveLayer('hybrid')}
            >
              Hybrid
            </Button>
          </ButtonGroup>
        </Box>
      </Box>

      {/* Cadastral Map View Canvas */}
      <Box
        sx={{
          height,
          backgroundColor: activeLayer === 'satellite' ? '#1E293B' : '#F1F5F9',
          backgroundImage:
            activeLayer === 'satellite'
              ? 'radial-gradient(#334155 1px, transparent 1px)'
              : 'radial-gradient(#CBD5E1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 540 320" style={{ cursor: 'pointer' }}>
          {/* Water Canal line */}
          <path
            d="M 10 30 Q 150 40 280 20 T 520 25"
            fill="none"
            stroke="#0284C7"
            strokeWidth="6"
            strokeDasharray="4 2"
          />
          <text x="240" y="15" fill="#0284C7" fontSize="10" fontWeight="bold">
            Rajbah / Water Course (نہر / کھال)
          </text>

          {/* Road */}
          <path
            d="M 10 300 Q 200 290 530 305"
            fill="none"
            stroke="#64748B"
            strokeWidth="8"
          />
          <text x="220" y="315" fill="#475569" fontSize="10" fontWeight="bold">
            Pakka Road (پختہ سڑک)
          </text>

          {/* Khasra Parcels */}
          {parcels.map((p) => {
            const isSelected = selectedParcel === p.id;
            return (
              <g key={p.id} onClick={() => setSelectedParcel(p.id)}>
                <rect
                  x={p.x}
                  y={p.y}
                  width={p.w}
                  height={p.h}
                  rx="4"
                  fill={
                    isSelected
                      ? 'rgba(20, 83, 45, 0.35)'
                      : p.type.includes('Nehri')
                      ? 'rgba(22, 163, 74, 0.15)'
                      : p.type.includes('Chahi')
                      ? 'rgba(56, 189, 248, 0.15)'
                      : 'rgba(217, 119, 6, 0.15)'
                  }
                  stroke={isSelected ? '#14532D' : '#64748B'}
                  strokeWidth={isSelected ? 3 : 1.5}
                />
                <text
                  x={p.x + p.w / 2}
                  y={p.y + p.h / 2 - 10}
                  textAnchor="middle"
                  fill={isSelected ? '#14532D' : '#1E293B'}
                  fontWeight={isSelected ? 'bold' : '600'}
                  fontSize="12"
                >
                  Khasra {p.id}
                </text>
                <text
                  x={p.x + p.w / 2}
                  y={p.y + p.h / 2 + 8}
                  textAnchor="middle"
                  fill="#475569"
                  fontSize="10"
                >
                  {p.area}
                </text>
                <text
                  x={p.x + p.w / 2}
                  y={p.y + p.h / 2 + 22}
                  textAnchor="middle"
                  fill="#64748B"
                  fontSize="9"
                >
                  {p.type}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Map Floating Controls */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
          }}
        >
          <ButtonGroup orientation="vertical" size="small" variant="contained">
            <Button sx={{ minWidth: 36, px: 1 }}>
              <AddIcon fontSize="small" />
            </Button>
            <Button sx={{ minWidth: 36, px: 1 }}>
              <RemoveIcon fontSize="small" />
            </Button>
            <Button sx={{ minWidth: 36, px: 1 }}>
              <MyLocationIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </Box>

        {/* Selected Parcel Badge info */}
        {selectedParcel && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              p: 1.5,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(4px)',
              borderRadius: 1.5,
              border: `1px solid ${dlrmsPalette.divider}`,
              maxWidth: 260,
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Khasra: {selectedParcel}
              </Typography>
              <Chip label="Selected" size="small" color="primary" sx={{ height: 18, fontSize: '0.65rem' }} />
            </Box>
            <Typography variant="caption" color="text.secondary" display="block">
              Coordinates: 31.242° N, 74.215° E
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary', display: 'block' }}>
              Cadastral Survey Piece: #45-B
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
