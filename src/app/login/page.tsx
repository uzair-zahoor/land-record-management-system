'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { dlrmsPalette } from '../../theme/palette';
import { useAppStore } from '../../store/useAppStore';

export default function LoginPage() {
  const router = useRouter();
  const { showNotification } = useAppStore();

  const [email, setEmail] = useState('tariq.mehmood@punjab.gov.pk');
  const [password, setPassword] = useState('••••••••••');
  const [role, setRole] = useState('Tehsildar');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification('Secure authentication successful. Redirecting to executive dashboard...', 'success');
    router.push('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 440,
          width: '100%',
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.1)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: dlrmsPalette.primary.main,
              color: '#FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1.5,
            }}
          >
            <VerifiedUserIcon sx={{ fontSize: 32 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: dlrmsPalette.primary.main }}>
            DLRMS Portal
          </Typography>
          <Typography variant="subtitle2" sx={{ fontFamily: 'Noto Nastaliq Urdu, Segoe UI', color: 'text.secondary' }}>
            بورڈ آف ریونیو، حکومتِ پنجاب
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
            Revenue Administration & Arazi Records Login
          </Typography>
        </Box>

        <form onSubmit={handleLogin}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Official Email or CNIC"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              size="small"
              type="password"
              label="Password (پاس ورڈ)"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormControl fullWidth size="small">
              <InputLabel>Designated Role (عہدہ)</InputLabel>
              <Select
                value={role}
                label="Designated Role (عہدہ)"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="Tehsildar">Tehsildar (تحصیلدار)</MenuItem>
                <MenuItem value="Naib Tehsildar">Naib Tehsildar (نائب تحصیلدار)</MenuItem>
                <MenuItem value="Patwari">Patwari (پٹواری)</MenuItem>
                <MenuItem value="Qanoongo">Qanoongo (قانونگو)</MenuItem>
                <MenuItem value="Data Entry Operator">Data Entry Operator</MenuItem>
                <MenuItem value="Super Administrator">Super Administrator</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mt: 1, py: 1.2, fontWeight: 700 }}
            >
              Sign In to Portal (لاگ ان)
            </Button>

            <Divider sx={{ my: 1 }}>OR</Divider>

            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              startIcon={<FingerprintIcon />}
              onClick={handleLogin}
              sx={{ fontWeight: 600 }}
            >
              NADRA Biometric Login
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
}
