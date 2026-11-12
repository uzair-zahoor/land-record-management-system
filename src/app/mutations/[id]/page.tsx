'use client';

import React, { useState, use } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Chip from '@mui/material/Chip';

// Icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DescriptionIcon from '@mui/icons-material/Description';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { useAppStore } from '../../../store/useAppStore';
import { useRevenueStore } from '../../../store/useRevenueStore';
import { PageHeader } from '../../../components/common/PageHeader';
import { StatusChip } from '../../../components/common/StatusChip';
import { dlrmsPalette } from '../../../theme/palette';

export default function MutationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { showNotification } = useAppStore();
  const { mutations, advanceMutationStep, updateMutationStatus } = useRevenueStore();

  const mutation = mutations.find((m) => m.id === id) || mutations[0];

  const steps = [
    '1. Application Filed',
    '2. Document Verification',
    '3. Ownership Verification',
    '4. Revenue Officer Review',
    '5. Approval / Rejection',
    '6. Record of Rights Updated',
  ];

  // Action Dialogs
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [remarksInput, setRemarksInput] = useState('');

  const handleAdvance = () => {
    advanceMutationStep(mutation.id, 'Workflow advanced to next stage after verification review.');
    showNotification('Mutation workflow successfully advanced.', 'success');
  };

  const handleApprove = () => {
    updateMutationStatus(
      mutation.id,
      'Approved',
      remarksInput || 'Sanctioned and approved in public Jalsa-e-Aam after biometric identification.',
      'Malik Tariq Mehmood (Tehsildar)'
    );
    setApproveDialogOpen(false);
    showNotification('Mutation officially sanctioned & approved (منظور شدہ).', 'success');
  };

  const handleReject = () => {
    updateMutationStatus(
      mutation.id,
      'Rejected',
      remarksInput || 'Rejected due to title discrepancy or dispute raised during public notice.',
      'Malik Tariq Mehmood (Tehsildar)'
    );
    setRejectDialogOpen(false);
    showNotification('Mutation application rejected (مسترد شدہ).', 'error');
  };

  return (
    <Box>
      <PageHeader
        title={`Mutation #${mutation.mutationNumber}`}
        urduTitle={`انتقال نمبر ${mutation.mutationNumber}`}
        subtitle={`Type: ${mutation.mutationType} | Mouza: ${mutation.mouzaName} | Khewat: ${mutation.khewatNumber} | Challan: ${mutation.challanNumber}`}
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Mutations', href: '/mutations' },
          { label: mutation.mutationNumber },
        ]}
        actions={
          <Box sx={{ display: 'flex', gap: 1 }}>
            {mutation.currentStatus !== 'Approved' && mutation.currentStatus !== 'Rejected' && (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<PendingActionsIcon />}
                  onClick={handleAdvance}
                >
                  Advance Step (اگلا مرحلہ)
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => setApproveDialogOpen(true)}
                >
                  Sanction & Approve (منظور کریں)
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => setRejectDialogOpen(true)}
                >
                  Reject (مسترد)
                </Button>
              </>
            )}
          </Box>
        }
      />

      {/* Legal Simulation Alert Banner */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle sx={{ fontWeight: 700 }}>Simulation Notice (نوٹس برائے نقلی کارروائی)</AlertTitle>
        These workflow actions simulate the official sanctioning process of the Punjab Revenue Administration. In accordance with guidelines, these UI simulations are for system testing only and do not convey legal title or official certification.
      </Alert>

      {/* Visual Workflow Stepper */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
          Revenue Workflow Stepper (مراحلِ تصدیق انتقال)
        </Typography>
        <Stepper activeStep={mutation.currentStepIndex} alternativeLabel>
          {steps.map((label, index) => {
            const isCompleted = index < mutation.currentStepIndex || mutation.currentStatus === 'Approved';
            return (
              <Step key={label} completed={isCompleted}>
                <StepLabel>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Card>

      <Grid container spacing={3}>
        {/* Left Column: Parties & Details */}
        <Grid item xs={12} lg={8}>
          {/* Transfer Parties Card */}
          <Card sx={{ mb: 3 }}>
            <CardHeader
              title="Transfer Parties & Ownership Shares (فریقینِ انتقال)"
              subheader={`Affected Land Area: ${mutation.transferArea.formatted} (${mutation.transferArea.formattedUrdu})`}
            />
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Party Role</TableCell>
                    <TableCell>Name (مع ولدیت)</TableCell>
                    <TableCell>CNIC</TableCell>
                    <TableCell>Share Transferred</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mutation.previousOwners.map((p, idx) => (
                    <TableRow key={`prev-${idx}`} sx={{ backgroundColor: '#FFF5F5' }}>
                      <TableCell sx={{ fontWeight: 700, color: 'error.main' }}>
                        Seller / Donor / Deceased
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{p.name}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{p.cnic}</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>{p.shareTransferred}</TableCell>
                    </TableRow>
                  ))}
                  {mutation.newOwners.map((n, idx) => (
                    <TableRow key={`new-${idx}`} sx={{ backgroundColor: '#F0FDF4' }}>
                      <TableCell sx={{ fontWeight: 700, color: 'success.main' }}>
                        Buyer / Donee / Heir
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{n.name}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{n.cnic}</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>{n.shareTransferred}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Verification Checklist */}
          <Card sx={{ mb: 3 }}>
            <CardHeader
              title="Statutory Verification Checklist (قانونی جانچ پڑتال)"
              subheader="Verification items required prior to Tehsildar open hearing sanction"
            />
            <CardContent>
              {mutation.verificationChecklist.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1.25,
                    borderBottom: '1px solid #E2E8F0',
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox checked={item.completed} color="primary" disabled />}
                    label={
                      <Typography variant="body2" sx={{ fontWeight: item.completed ? 600 : 400 }}>
                        {item.title}
                      </Typography>
                    }
                  />
                  {item.completed ? (
                    <Chip
                      size="small"
                      color="success"
                      icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                      label={item.verifiedBy ? `Verified: ${item.verifiedBy}` : 'Completed'}
                      sx={{ height: 22, fontSize: '0.7rem' }}
                    />
                  ) : (
                    <Chip size="small" label="Pending Verification" sx={{ height: 22, fontSize: '0.7rem' }} />
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Supporting Documents */}
          <Card>
            <CardHeader title="Attached Supporting Documents (منسلکہ دستاویزات)" />
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>File Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Uploaded Date</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mutation.documents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
                        No documents attached.
                      </TableCell>
                    </TableRow>
                  ) : (
                    mutation.documents.map((doc) => (
                      <TableRow key={doc.id} hover>
                        <TableCell sx={{ fontWeight: 600 }}>{doc.name}</TableCell>
                        <TableCell><Chip label={doc.type} size="small" /></TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>{doc.uploadedAt}</TableCell>
                        <TableCell align="right">
                          <Button size="small" variant="outlined" onClick={() => alert(`Opening ${doc.name}...`)}>
                            Preview
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Right Column: Case Summary & Timeline */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Case Status & Officer Remarks" />
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">Current Status</Typography>
                <Box sx={{ mt: 0.5 }}>
                  <StatusChip status={mutation.currentStatus} size="medium" />
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">Assigned Revenue Officer</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {mutation.assignedOfficer}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">Field Patwari</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {mutation.assignedPatwari}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">Challan Fee Cleared</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  PKR {mutation.feePaidPkr.toLocaleString()} ({mutation.challanNumber})
                </Typography>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="caption" color="text.secondary" display="block">
                Officer Remarks (کیفیت افسر مجاز):
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 0.5, color: '#334155' }}>
                "{mutation.officerRemarks || 'Verification process progressing as per standard revenue protocols.'}"
              </Typography>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader title="Activity Timeline (تاریخ وار کارروائی)" />
            <CardContent sx={{ pt: 0 }}>
              {mutation.timeline.map((entry, idx) => (
                <Box
                  key={idx}
                  sx={{
                    position: 'relative',
                    pl: 2.5,
                    pb: 2,
                    borderLeft: idx !== mutation.timeline.length - 1 ? '2px solid #CBD5E1' : 'none',
                    '&:last-child': { pb: 0 },
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      left: -5,
                      top: 0,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: dlrmsPalette.primary.main,
                    }}
                  />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {entry.step}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {entry.timestamp} • {entry.officer}
                  </Typography>
                  {entry.comments && (
                    <Typography variant="body2" sx={{ fontSize: '0.8rem', mt: 0.5, color: '#475569' }}>
                      {entry.comments}
                    </Typography>
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sanction Approve Dialog */}
      <Dialog open={approveDialogOpen} onClose={() => setApproveDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: 'success.main' }}>
          Sanction & Approve Mutation (تصدیق و منظوری انتقال)
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Confirm sanctioning Mutation <strong>#{mutation.mutationNumber}</strong> ({mutation.mutationType}) in open public hearing (Jalsa-e-Aam).
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Officer Sanction Remarks (حکم نامہ تصدیق)"
            value={remarksInput}
            onChange={(e) => setRemarksInput(e.target.value)}
            placeholder="e.g. Sanctioned in open Jalsa-e-Aam with mutual biometric verification."
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setApproveDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="success" onClick={handleApprove}>
            Approve & Sanction
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: 'error.main' }}>
          Reject Mutation Application (مسترد درخواست انتقال)
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Specify the legal ground or objection for rejecting Mutation #{mutation.mutationNumber}:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Reason for Rejection (وجوہاتِ مستردگی)"
            value={remarksInput}
            onChange={(e) => setRemarksInput(e.target.value)}
            placeholder="e.g. Title dispute raised or failure of biometric identification."
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setRejectDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleReject}>
            Reject Application
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
