'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import VerifiedIcon from '@mui/icons-material/Verified';

import { useAppStore } from '../../store/useAppStore';
import { useRevenueStore } from '../../store/useRevenueStore';
import { PageHeader } from '../../components/common/PageHeader';
import { DocumentAgGrid } from '../../features/documents/DocumentAgGrid';
import { DocumentItem } from '../../types';

export default function DocumentsPage() {
  const { showNotification } = useAppStore();
  const { documents, addDocument } = useRevenueStore();

  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'Sale Deed / Registry' as any,
    mouzaName: 'Chak 45-RB',
    khasraNumber: '125/2',
    notes: '',
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.title) {
      showNotification('Please enter a document title.', 'error');
      return;
    }

    addDocument({
      title: uploadForm.title,
      category: uploadForm.category,
      mouzaName: uploadForm.mouzaName,
      khasraNumber: uploadForm.khasraNumber,
      fileName: `${uploadForm.title.replace(/\s+/g, '_')}.pdf`,
      fileSize: '2.4 MB',
      fileType: 'PDF',
      uploadedBy: 'Malik Tariq Mehmood (Tehsildar)',
      verified: true,
      notes: uploadForm.notes,
    });

    showNotification('Document archived in repository successfully.', 'success');
    setUploadDialogOpen(false);
  };

  return (
    <Box>
      <PageHeader
        title="Document Repository & Archival"
        urduTitle="مخزنِ مصدقہ دستاویزات"
        subtitle="Digitized repository of registered sale deeds, court orders, and Aks Shajra cadastral traces"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Documents' },
        ]}
      />

      <DocumentAgGrid
        data={documents}
        onPreview={(doc) => setPreviewDoc(doc)}
        onUpload={() => setUploadDialogOpen(true)}
      />

      {/* Preview Dialog */}
      {previewDoc && (
        <Dialog open={Boolean(previewDoc)} onClose={() => setPreviewDoc(null)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{previewDoc.title}</span>
            <Chip label={previewDoc.category} color="primary" size="small" />
          </DialogTitle>
          <DialogContent dividers sx={{ backgroundColor: '#F8FAFC', minHeight: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box
              sx={{
                width: '100%',
                maxHeight: 460,
                p: 4,
                backgroundColor: '#FFFFFF',
                borderRadius: 2,
                border: '1px solid #CBD5E1',
                textAlign: 'center',
              }}
            >
              <PictureAsPdfIcon sx={{ fontSize: 64, color: '#DC2626', mb: 1.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {previewDoc.fileName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 460, mx: 'auto', mb: 2 }}>
                {previewDoc.notes || 'Official computerized document image registered and verified with Punjab Land Revenue Administration archives.'}
              </Typography>
              <Chip
                icon={<VerifiedIcon sx={{ fontSize: 16 }} />}
                label="Digitally Signed & Authenticated Record"
                color="success"
                sx={{ mb: 3 }}
              />
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  onClick={() => alert(`Downloading verified copy of ${previewDoc.fileName}...`)}
                >
                  Download Certified Copy
                </Button>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setPreviewDoc(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleUploadSubmit}>
          <DialogTitle sx={{ fontWeight: 700 }}>Upload & Archive Document</DialogTitle>
          <DialogContent dividers sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Document Title"
                  required
                  placeholder="e.g. Registered Sale Deed #412"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={uploadForm.category}
                    label="Category"
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value as any })}
                  >
                    <MenuItem value="Sale Deed / Registry">Sale Deed / Registry</MenuItem>
                    <MenuItem value="Mutation (Intiqal)">Mutation Sanction Order</MenuItem>
                    <MenuItem value="CNIC">CNIC Document</MenuItem>
                    <MenuItem value="Inheritance / Fard-e-Haqooq">Inheritance / FRC</MenuItem>
                    <MenuItem value="Court Order">Court Order</MenuItem>
                    <MenuItem value="Shajra Aks">Shajra Aks Map Trace</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Khasra Number (Optional)"
                  value={uploadForm.khasraNumber}
                  onChange={(e) => setUploadForm({ ...uploadForm, khasraNumber: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Archival Notes / Attestation"
                  value={uploadForm.notes}
                  onChange={(e) => setUploadForm({ ...uploadForm, notes: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save to Archive
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
