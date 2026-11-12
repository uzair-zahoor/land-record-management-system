'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { parcelSchema } from '../../lib/validation/schemas';

interface ParcelModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const ParcelModal: React.FC<ParcelModalProps> = ({ open, onClose, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(parcelSchema),
    defaultValues: {
      khasraNumber: '',
      mouzaName: 'Chak 45-RB',
      khewatNumber: '45',
      khatauniNumber: '78',
      kanals: 8,
      marlas: 0,
      landType: 'Agricultural (Nehri)',
      primaryOwner: 'Muhammad Ahmed',
    },
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTitle sx={{ fontWeight: 700 }}>
          Create New Land Parcel (نیا خسرہ درج کریں)
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="khasraNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Khasra Number (خسرہ نمبر)"
                    placeholder="e.g. 128/2"
                    error={Boolean(errors.khasraNumber)}
                    helperText={errors.khasraNumber?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="mouzaName"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Mouza (موضع)</InputLabel>
                    <Select {...field} label="Mouza (موضع)">
                      <MenuItem value="Chak 45-RB">Chak 45-RB</MenuItem>
                      <MenuItem value="Shahpur">Shahpur</MenuItem>
                      <MenuItem value="Kahna Nau">Kahna Nau</MenuItem>
                      <MenuItem value="Sundar Sharif">Sundar Sharif</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="khewatNumber"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Khewat Number" error={Boolean(errors.khewatNumber)} />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="khatauniNumber"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Khatauni Number" error={Boolean(errors.khatauniNumber)} />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="kanals"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth type="number" label="Area (Kanals)" error={Boolean(errors.kanals)} />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="marlas"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth type="number" label="Area (Marlas)" error={Boolean(errors.marlas)} />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="landType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Land Classification</InputLabel>
                    <Select {...field} label="Land Classification">
                      <MenuItem value="Agricultural (Nehri)">Agricultural (Nehri - نہری)</MenuItem>
                      <MenuItem value="Agricultural (Chahi)">Agricultural (Chahi - چاہی)</MenuItem>
                      <MenuItem value="Barani">Barani (بارانی)</MenuItem>
                      <MenuItem value="Residential">Residential (رہائشی)</MenuItem>
                      <MenuItem value="Commercial">Commercial (کمرشل)</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="primaryOwner"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Primary Owner Name" error={Boolean(errors.primaryOwner)} />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save Parcel Record
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
