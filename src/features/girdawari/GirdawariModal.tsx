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

import { girdawariSchema } from '../../lib/validation/schemas';

interface GirdawariModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const GirdawariModal: React.FC<GirdawariModalProps> = ({ open, onClose, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(girdawariSchema),
    defaultValues: {
      khasraNumber: '125/2',
      mouzaName: 'Chak 45-RB',
      season: 'Rabi (ربیع)',
      cropType: 'Wheat (گندم)',
      cultivatorName: 'Muhammad Ahmed',
      cultivatorFatherName: 'Muhammad Akram',
      kanals: 8,
      marlas: 0,
      sourceOfIrrigation: 'Canal (نہر)',
      condition: 'Excellent',
      remarks: 'Healthy crop growth, timely canal warabandi.',
    },
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Record Seasonal Girdawari (اندراج گرداوری)</DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="khasraNumber"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Khasra Number" error={Boolean(errors.khasraNumber)} />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="mouzaName"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Mouza</InputLabel>
                    <Select {...field} label="Mouza">
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
                name="season"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Season</InputLabel>
                    <Select {...field} label="Season">
                      <MenuItem value="Rabi (ربیع)">Rabi (ربیع)</MenuItem>
                      <MenuItem value="Kharif (خریف)">Kharif (خریف)</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="cropType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Crop Type</InputLabel>
                    <Select {...field} label="Crop Type">
                      <MenuItem value="Wheat (گندم)">Wheat (گندم)</MenuItem>
                      <MenuItem value="Rice (دھان/چاول)">Rice (دھان/چاول)</MenuItem>
                      <MenuItem value="Cotton (کپاس)">Cotton (کپاس)</MenuItem>
                      <MenuItem value="Sugarcane (کماد)">Sugarcane (کماد)</MenuItem>
                      <MenuItem value="Fodder (چارہ)">Fodder (چارہ)</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="cultivatorName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Cultivator Name" error={Boolean(errors.cultivatorName)} />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="cultivatorFatherName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Cultivator Father Name" error={Boolean(errors.cultivatorFatherName)} />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="kanals"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth type="number" label="Area (Kanals)" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="marlas"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth type="number" label="Area (Marlas)" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="sourceOfIrrigation"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Irrigation Source</InputLabel>
                    <Select {...field} label="Irrigation Source">
                      <MenuItem value="Canal (نہر)">Canal (نہر)</MenuItem>
                      <MenuItem value="Tube well (ٹیوب ویل)">Tube well (ٹیوب ویل)</MenuItem>
                      <MenuItem value="Rain-fed (بارانی)">Rain-fed (بارانی)</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="condition"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Crop Condition</InputLabel>
                    <Select {...field} label="Crop Condition">
                      <MenuItem value="Excellent">Excellent</MenuItem>
                      <MenuItem value="Good">Good</MenuItem>
                      <MenuItem value="Average">Average</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="remarks"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth multiline rows={2} label="Remarks" />
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
            Save Girdawari Entry
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
