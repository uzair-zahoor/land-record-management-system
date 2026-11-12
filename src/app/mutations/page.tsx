'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useAppStore } from '../../store/useAppStore';
import { useRevenueStore } from '../../store/useRevenueStore';
import { PageHeader } from '../../components/common/PageHeader';
import { MutationAgGrid } from '../../features/mutations/MutationAgGrid';
import { MutationModal } from '../../features/mutations/MutationModal';

export default function MutationsPage() {
  const { showNotification } = useAppStore();
  const { mutations, addMutation } = useRevenueStore();

  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateMutation = (formData: any) => {
    addMutation({
      mutationType: formData.mutationType,
      applicantName: formData.applicantName,
      applicantCnic: formData.applicantCnic,
      applicantPhone: formData.applicantPhone,
      mouzaId: 'MOUZA-CH45',
      mouzaName: formData.mouzaName,
      urduMouzaName: 'چک 45 آر بی',
      khewatNumber: formData.khewatNumber,
      khasraNumbers: [formData.khasraNumber],
      transferArea: {
        kanals: formData.kanals || 0,
        marlas: formData.marlas || 0,
        totalSqFt: ((formData.kanals || 0) * 20 + (formData.marlas || 0)) * 272.25,
        formatted: `${formData.kanals || 0} Kanal ${formData.marlas || 0} Marla`,
        formattedUrdu: `${formData.kanals || 0} کنال ${formData.marlas || 0} مرلہ`,
      },
      previousOwners: [
        {
          name: formData.sellerName,
          cnic: formData.sellerCnic,
          fatherName: 'Previous Co-sharer',
          shareTransferred: '1/2',
          role: 'Seller/Donor/Deceased',
        },
      ],
      newOwners: [
        {
          name: formData.buyerName,
          cnic: formData.buyerCnic,
          fatherName: 'New Holder Father',
          shareTransferred: '1/2',
          role: 'Buyer/Donee/Heir',
        },
      ],
      assignedOfficer: 'Malik Tariq Mehmood (Tehsildar)',
      assignedPatwari: 'Nadeem Abbas Virk (Patwari)',
      feePaidPkr: formData.feePaidPkr || 500,
      challanNumber: `CHL-${Math.floor(100000 + Math.random() * 900000)}`,
      verificationChecklist: [
        { title: 'NADRA CNIC Verification', completed: false },
        { title: 'Registered Sale Deed / Sub-Registrar Verification', completed: false },
        { title: 'Field Possession & Shajra Aks Verification', completed: false },
        { title: 'Public Notice (Jalsa-e-Aam)', completed: false },
      ],
      documents: [],
    });

    showNotification('Mutation application submitted successfully.', 'success');
    setModalOpen(false);
  };

  return (
    <Box>
      <PageHeader
        title="Mutation (Intiqal) Applications"
        urduTitle="اندراج و تصدیق انتقالاتِ اراضی"
        subtitle="Manage land transfers: Sale/Purchase (بیع), Inheritance (وراثت), Gift (ہبہ), and Partition (تقسیم)"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Transactions', href: '/mutations' },
          { label: 'Mutations' },
        ]}
      />

      <MutationAgGrid
        data={mutations}
        onAddNew={() => setModalOpen(true)}
      />

      <MutationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateMutation}
      />
    </Box>
  );
}
