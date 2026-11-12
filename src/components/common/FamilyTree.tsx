'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { LegalHeir } from '../../types';
import { dlrmsPalette } from '../../theme/palette';
import PersonIcon from '@mui/icons-material/Person';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

interface FamilyTreeProps {
  deceasedName: string;
  urduDeceasedName: string;
  deceasedCnic: string;
  totalArea: string;
  heirs: LegalHeir[];
}

export const FamilyTree: React.FC<FamilyTreeProps> = ({
  deceasedName,
  urduDeceasedName,
  deceasedCnic,
  totalArea,
  heirs,
}) => {
  const wives = heirs.filter((h) => h.relationship === 'Wife');
  const sons = heirs.filter((h) => h.relationship === 'Son');
  const daughters = heirs.filter((h) => h.relationship === 'Daughter');
  const others = heirs.filter((h) => !['Wife', 'Son', 'Daughter'].includes(h.relationship));

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: '#F8FAFC',
        borderRadius: 2,
        border: `1px solid ${dlrmsPalette.divider}`,
        overflowX: 'auto',
      }}
    >
      <Box sx={{ minWidth: 640, textAlign: 'center' }}>
        {/* Deceased Owner Node */}
        <Box sx={{ display: 'inline-block', position: 'relative', mb: 4 }}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: '#1E293B',
              color: '#FFFFFF',
              minWidth: 260,
              border: `2px solid ${dlrmsPalette.gold.main}`,
            }}
          >
            <Chip
              label="Deceased (متوفیٰ)"
              size="small"
              sx={{
                backgroundColor: dlrmsPalette.gold.main,
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.7rem',
                mb: 1,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
              {deceasedName}
            </Typography>
            <Typography variant="body2" sx={{ color: '#E2E8F0', mb: 0.5 }}>
              {urduDeceasedName}
            </Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block' }}>
              CNIC: {deceasedCnic}
            </Typography>
            <Typography variant="caption" sx={{ color: '#FBBF24', fontWeight: 600, display: 'block', mt: 0.5 }}>
              Total Estate: {totalArea}
            </Typography>
          </Paper>

          {/* Vertical connecting line */}
          <Box
            sx={{
              position: 'absolute',
              bottom: -24,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 2,
              height: 24,
              backgroundColor: dlrmsPalette.gold.main,
            }}
          />
        </Box>

        {/* Level 1: Surviving Spouse (Wife/Husband) */}
        {wives.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1.5 }}>
              Surviving Spouse (بیوہ / زوجہ)
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              {wives.map((wife) => (
                <Paper
                  key={wife.id}
                  sx={{
                    p: 1.5,
                    minWidth: 200,
                    border: '1px solid #E2E8F0',
                    borderTop: `3px solid #EC4899`,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
                    <FemaleIcon sx={{ color: '#EC4899', fontSize: 18 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {wife.name}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {wife.urduName} ({wife.urduRelationship})
                  </Typography>
                  <Chip
                    label={`Share: ${wife.shareFractionText}`}
                    size="small"
                    sx={{ mt: 1, backgroundColor: '#FDF2F8', color: '#BE185D', fontWeight: 600 }}
                  />
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontWeight: 600, color: 'primary.main' }}>
                    {wife.calculatedArea.formatted}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        )}

        {/* Level 2: Children (Sons and Daughters) */}
        <Box>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1.5 }}>
            Legal Heirs - Descendants (اولاد / بیٹا و بیٹی)
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {sons.map((son) => (
              <Grid item key={son.id} xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 1.5,
                    border: '1px solid #E2E8F0',
                    borderTop: `3px solid ${dlrmsPalette.primary.main}`,
                    backgroundColor: '#FFFFFF',
                    height: '100%',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
                    <MaleIcon sx={{ color: dlrmsPalette.primary.main, fontSize: 18 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {son.name}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {son.urduName} ({son.urduRelationship})
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    CNIC: {son.cnic}
                  </Typography>
                  <Chip
                    label={`Share: ${son.shareFractionText}`}
                    size="small"
                    sx={{ mt: 1, backgroundColor: '#F0FDF4', color: '#166534', fontWeight: 600 }}
                  />
                  <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 700, color: dlrmsPalette.primary.main }}>
                    {son.calculatedArea.formatted}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    ({son.calculatedArea.formattedUrdu})
                  </Typography>
                </Paper>
              </Grid>
            ))}

            {daughters.map((daughter) => (
              <Grid item key={daughter.id} xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 1.5,
                    border: '1px solid #E2E8F0',
                    borderTop: `3px solid #8B5CF6`,
                    backgroundColor: '#FFFFFF',
                    height: '100%',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
                    <FemaleIcon sx={{ color: '#8B5CF6', fontSize: 18 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {daughter.name}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {daughter.urduName} ({daughter.urduRelationship})
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    CNIC: {daughter.cnic}
                  </Typography>
                  <Chip
                    label={`Share: ${daughter.shareFractionText}`}
                    size="small"
                    sx={{ mt: 1, backgroundColor: '#F5F3FF', color: '#6D28D9', fontWeight: 600 }}
                  />
                  <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 700, color: dlrmsPalette.primary.main }}>
                    {daughter.calculatedArea.formatted}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    ({daughter.calculatedArea.formattedUrdu})
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
