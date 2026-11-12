'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useAppStore } from '../../store/useAppStore';
import { useRevenueStore } from '../../store/useRevenueStore';
import { PageHeader } from '../../components/common/PageHeader';
import { ParcelAgGrid } from '../../features/land-parcels/ParcelAgGrid';
import { ParcelModal } from '../../features/land-parcels/ParcelModal';

export default function LandParcelsPage() {
  const { showNotification } = useAppStore();
  const { parcels, addLandParcel } = useRevenueStore();

  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateParcel = (formData: any) => {
    addLandParcel({
      khasraNumber: formData.khasraNumber,
      mouzaId: 'MOUZA-CH45',
      mouzaName: formData.mouzaName,
      urduMouzaName: 'چک 45 آر بی',
      khewatNumber: formData.khewatNumber,
      khatauniNumber: formData.khatauniNumber,
      area: {
        kanals: formData.kanals,
        marlas: formData.marlas,
        totalSqFt: (formData.kanals * 20 + formData.marlas) * 272.25,
        formatted: `${formData.kanals} Kanal ${formData.marlas} Marla`,
        formattedUrdu: `${formData.kanals} کنال ${formData.marlas} مرلہ`,
      },
      landType: formData.landType,
      urduLandType: formData.landType,
      currentOwnership: [
        {
          ownerId: 'OWN-1001',
          ownerName: formData.primaryOwner,
          urduOwnerName: 'محمد احمد',
          shareRatio: '1/1',
          shareFraction: 1.0,
          shareArea: {
            kanals: formData.kanals,
            marlas: formData.marlas,
            totalSqFt: (formData.kanals * 20 + formData.marlas) * 272.25,
            formatted: `${formData.kanals} Kanal ${formData.marlas} Marla`,
            formattedUrdu: `${formData.kanals} کنال ${formData.marlas} مرلہ`,
          },
        },
      ],
      status: 'Verified',
      shajraPieceNumber: `Shajra-Piece-${formData.khasraNumber}`,
    });

    showNotification('Land parcel record added successfully.', 'success');
    setModalOpen(false);
  };

  return (
    <Box>
      <PageHeader
        title="Land Parcels (Khasra) Management"
        urduTitle="انتظام اراضی خسرہ جات"
        subtitle="Manage cadastral parcels, land classifications, and boundary geometry"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Land Management', href: '/land-parcels' },
          { label: 'Land Parcels' },
        ]}
      />

      <ParcelAgGrid
        data={parcels}
        onAddNew={() => setModalOpen(true)}
      />

      <ParcelModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateParcel}
      />
    </Box>
  );
}
