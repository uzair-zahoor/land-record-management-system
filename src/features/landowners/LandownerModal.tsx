'use client';

import React, { useEffect } from 'react';
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

import { landownerSchema } from '../../lib/validation/schemas';
import { Landowner } from '../../types';

interface LandownerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: Landowner | null;
}

export const LandownerModal: React.FC<LandownerModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(landownerSchema),
    defaultValues: {
      name: '',
      urduName: '',
      cnic: '',
      fatherOrHusbandName: '',
      fatherOrHusbandUrduName: '',
      relationType: 's/o',
      gender: 'Male',
      dateOfBirth: '1985-01-01',
      contactNumber: '0300-1234567',
      permanentAddress: 'Chak 45-RB, Tehsil Raiwind, Lahore',
      province: 'Punjab',
      district: 'Lahore',
      tehsil: 'Raiwind',
      mouzaName: 'Chak 45-RB',
      kanals: 8,
      marlas: 0,
      status: 'Active',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        urduName: initialData.urduName,
        cnic: initialData.cnic,
        fatherOrHusbandName: initialData.fatherOrHusbandName,
        fatherOrHusbandUrduName: initialData.fatherOrHusbandUrduName,
        relationType: initialData.relationType,
        gender: initialData.gender,
        dateOfBirth: initialData.dateOfBirth || '',
        contactNumber: initialData.contactNumber,
        permanentAddress: initialData.permanentAddress,
        province: initialData.province,
        district: initialData.district,
        tehsil: initialData.tehsil,
        mouzaName: initialData.mouzaName,
        kanals: initialData.totalLandArea.kanals,
        marlas: initialData.totalLandArea.marlas,
        status: initialData.status,
      });
    } else {
      reset({
        name: '',
        urduName: '',
        cnic: '',
        fatherOrHusbandName: '',
        fatherOrHusbandUrduName: '',
        relationType: 's/o',
        gender: 'Male',
        dateOfBirth: '1985-01-01',
        contactNumber: '0300-1234567',
        permanentAddress: 'Chak 45-RB, Raiwind, Lahore',
        province: 'Punjab',
        district: 'Lahore',
        tehsil: 'Raiwind',
        mouzaName: 'Chak 45-RB',
        kanals: 8,
        marlas: 0,
        status: 'Active',
      });
    }
  }, [initialData, reset, open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {initialData ? 'Edit Landowner (ترمیم کوائف مالک)' : 'Register New Landowner (نیا اندراجِ مالک)'}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Full Name (English)"
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="urduName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Urdu Name (مالک کا نام)"
                    error={Boolean(errors.urduName)}
                    helperText={errors.urduName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="cnic"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="NADRA CNIC (35202-xxxxxxx-x)"
                    error={Boolean(errors.cnic)}
                    helperText={errors.cnic?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <Controller
                name="relationType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Relation</InputLabel>
                    <Select {...field} label="Relation">
                      <MenuItem value="s/o">s/o (ولد)</MenuItem>
                      <MenuItem value="d/o">d/o (دختر)</MenuItem>
                      <MenuItem value="w/o">w/o (زوجہ)</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="fatherOrHusbandName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Father / Husband Name"
                    error={Boolean(errors.fatherOrHusbandName)}
                    helperText={errors.fatherOrHusbandName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="fatherOrHusbandUrduName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Father / Husband Name (Urdu)" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Gender (جنس)</InputLabel>
                    <Select {...field} label="Gender (جنس)">
                      <MenuItem value="Male">Male (مرد)</MenuItem>
                      <MenuItem value="Female">Female (عورت)</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Controller
                name="contactNumber"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Mobile Phone" />
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

            <Grid item xs={12} sm={3}>
              <Controller
                name="kanals"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth type="number" label="Holding (Kanal)" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Controller
                name="marlas"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth type="number" label="Holding (Marla)" />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="permanentAddress"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Permanent Address (مستقل رہائشی پتہ)" />
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
            {initialData ? 'Update Records' : 'Register Landowner'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
