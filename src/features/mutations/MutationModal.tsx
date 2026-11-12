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

import { mutationSchema } from '../../lib/validation/schemas';

interface MutationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const MutationModal: React.FC<MutationModalProps> = ({ open, onClose, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(mutationSchema),
    defaultValues: {
      mutationType: 'Sale / Purchase (بیع)',
      applicantName: '',
      applicantCnic: '',
      applicantPhone: '0300-1234567',
      mouzaName: 'Chak 45-RB',
      khewatNumber: '45',
      khasraNumber: '125/2',
      kanals: 4,
      marlas: 0,
      sellerName: 'Chaudhry Bashir Ahmed',
      sellerCnic: '35201-1234567-3',
      buyerName: 'Muhammad Ahmed',
      buyerCnic: '35202-1489023-1',
      feePaidPkr: 8500,
    },
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTitle sx={{ fontWeight: 700 }}>
          File Mutation Application (نیا اندراجِ انتقال)
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="mutationType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel>Mutation Type (قسمِ انتقال)</InputLabel>
                    <Select {...field} label="Mutation Type (قسمِ انتقال)">
                      <MenuItem value="Sale / Purchase (بیع)">Sale / Purchase (بیع)</MenuItem>
                      <MenuItem value="Inheritance (وراثت)">Inheritance (وراثت)</MenuItem>
                      <MenuItem value="Gift / Hiba (ہبہ)">Gift / Hiba (ہبہ)</MenuItem>
                      <MenuItem value="Partition (تقسیم)">Partition (تقسیم)</MenuItem>
                      <MenuItem value="Court Order (حکم عدالت)">Court Order (حکم عدالت)</MenuItem>
                    </Select>
                  </FormControl>
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
                name="applicantName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Applicant Full Name"
                    error={Boolean(errors.applicantName)}
                    helperText={errors.applicantName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="applicantCnic"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Applicant CNIC (35202-xxxxxxx-x)"
                    error={Boolean(errors.applicantCnic)}
                    helperText={errors.applicantCnic?.message}
                  />
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
                name="khasraNumber"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Khasra Number" error={Boolean(errors.khasraNumber)} />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="kanals"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth type="number" label="Transfer Area (Kanals)" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="marlas"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth type="number" label="Transfer Area (Marlas)" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="sellerName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Seller / Transferor Name" error={Boolean(errors.sellerName)} />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="buyerName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Buyer / Transferee Name" error={Boolean(errors.buyerName)} />
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
            Submit Application
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
