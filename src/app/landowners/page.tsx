'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useAppStore } from '../../store/useAppStore';
import { useRevenueStore } from '../../store/useRevenueStore';
import { PageHeader } from '../../components/common/PageHeader';
import { LandownerAgGrid } from '../../features/landowners/LandownerAgGrid';
import { LandownerModal } from '../../features/landowners/LandownerModal';
import { Landowner } from '../../types';

export default function LandownersPage() {
  const { showNotification } = useAppStore();
  const { landowners, addLandowner, updateLandowner } = useRevenueStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState<Landowner | null>(null);

  const handleOpenAdd = () => {
    setEditingOwner(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (owner: Landowner) => {
    setEditingOwner(owner);
    setModalOpen(true);
  };

  const handleSubmit = (formData: any) => {
    if (editingOwner) {
      updateLandowner(editingOwner.id, formData);
      showNotification('Landowner records successfully updated.', 'success');
    } else {
      addLandowner({
        ...formData,
        mouzaId: 'MOUZA-CH45',
        associatedKhewatNumbers: ['45'],
        totalLandArea: {
          kanals: formData.kanals || 0,
          marlas: formData.marlas || 0,
          totalSqFt: ((formData.kanals || 0) * 20 + (formData.marlas || 0)) * 272.25,
          formatted: `${formData.kanals || 0} Kanal ${formData.marlas || 0} Marla`,
          formattedUrdu: `${formData.kanals || 0} کنال ${formData.marlas || 0} مرلہ`,
        },
      });
      showNotification('New landowner registered successfully.', 'success');
    }
    setModalOpen(false);
  };

  return (
    <Box>
      <PageHeader
        title="Landowner Management"
        urduTitle="انتظام مالکانِ اراضی"
        subtitle="Manage verified revenue account holders, CNICs, and Mouza holdings"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Land Management', href: '/landowners' },
          { label: 'Landowners' },
        ]}
      />

      <LandownerAgGrid
        data={landowners}
        onEdit={handleOpenEdit}
        onAddNew={handleOpenAdd}
      />

      <LandownerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingOwner}
      />
    </Box>
  );
}
