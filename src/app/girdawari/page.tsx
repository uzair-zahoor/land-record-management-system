'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useAppStore } from '../../store/useAppStore';
import { useRevenueStore } from '../../store/useRevenueStore';
import { PageHeader } from '../../components/common/PageHeader';
import { GirdawariAgGrid } from '../../features/girdawari/GirdawariAgGrid';
import { GirdawariModal } from '../../features/girdawari/GirdawariModal';

export default function GirdawariPage() {
  const { showNotification } = useAppStore();
  const { girdawariRecords, addGirdawari } = useRevenueStore();

  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateGirdawari = (formData: any) => {
    addGirdawari({
      mouzaId: 'MOUZA-CH45',
      mouzaName: formData.mouzaName,
      urduMouzaName: 'چک 45 آر بی',
      khasraNumber: formData.khasraNumber,
      season: formData.season,
      year: 2024,
      cropType: formData.cropType,
      urduCropType: formData.cropType,
      cultivatorName: formData.cultivatorName,
      urduCultivatorName: formData.cultivatorName,
      cultivatorFatherName: formData.cultivatorFatherName,
      cultivatedArea: {
        kanals: formData.kanals || 0,
        marlas: formData.marlas || 0,
        totalSqFt: ((formData.kanals || 0) * 20 + (formData.marlas || 0)) * 272.25,
        formatted: `${formData.kanals || 0} Kanal ${formData.marlas || 0} Marla`,
        formattedUrdu: `${formData.kanals || 0} کنال ${formData.marlas || 0} مرلہ`,
      },
      inspectionDate: new Date().toISOString().split('T')[0],
      inspectionOfficer: 'Nadeem Abbas Virk',
      officerRole: 'Patwari',
      sourceOfIrrigation: formData.sourceOfIrrigation,
      condition: formData.condition,
      remarks: formData.remarks || '',
    });

    showNotification('Girdawari inspection recorded successfully.', 'success');
    setModalOpen(false);
  };

  return (
    <Box>
      <PageHeader
        title="Seasonal Girdawari (Crop Inspection)"
        urduTitle="گرداوری فصلی (معائنہ کاشت و پیداوار)"
        subtitle="Biannual field inspection of crops, cultivation possession, and source of irrigation under Section 43 Land Revenue Act"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Land Records', href: '/girdawari' },
          { label: 'Girdawari' },
        ]}
      />

      <GirdawariAgGrid
        data={girdawariRecords}
        onAddNew={() => setModalOpen(true)}
      />

      <GirdawariModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateGirdawari}
      />
    </Box>
  );
}
