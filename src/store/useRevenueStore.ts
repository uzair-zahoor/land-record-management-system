import { create } from 'zustand';
import {
  Landowner,
  LandParcel,
  KhewatRecord,
  KhatauniRecord,
  JamabandiRecord,
  MutationRecord,
  FardDocument,
  InheritanceCase,
  GirdawariRecord,
  DocumentItem,
  User,
  AuditLogItem,
  MutationStatus,
} from '../types';
import {
  mockLandowners,
  mockParcels,
  mockKhewatRecords,
  mockKhatauniRecords,
  mockJamabandiRecords,
  mockMutations,
  mockFards,
  mockInheritanceCases,
  mockGirdawariRecords,
  mockDocuments,
  mockUsers,
  mockAuditLogs,
} from '../mocks';

interface RevenueState {
  landowners: Landowner[];
  parcels: LandParcel[];
  khewats: KhewatRecord[];
  khataunis: KhatauniRecord[];
  jamabandis: JamabandiRecord[];
  mutations: MutationRecord[];
  fards: FardDocument[];
  inheritanceCases: InheritanceCase[];
  girdawariRecords: GirdawariRecord[];
  documents: DocumentItem[];
  users: User[];
  auditLogs: AuditLogItem[];

  // CRUD & Actions
  addLandowner: (owner: Omit<Landowner, 'id' | 'registeredDate'>) => Landowner;
  updateLandowner: (id: string, data: Partial<Landowner>) => void;
  deleteLandowner: (id: string) => void;

  addLandParcel: (parcel: Omit<LandParcel, 'id'>) => LandParcel;
  updateLandParcel: (id: string, data: Partial<LandParcel>) => void;

  addMutation: (mutation: Omit<MutationRecord, 'id' | 'mutationNumber' | 'applicationDate' | 'currentStatus' | 'currentStepIndex' | 'timeline'>) => MutationRecord;
  updateMutationStatus: (id: string, status: MutationStatus, remarks?: string, officerName?: string) => void;
  advanceMutationStep: (id: string, remarks?: string, officerName?: string) => void;

  issueFard: (fardData: Omit<FardDocument, 'id' | 'referenceNumber' | 'barcodeNumber' | 'issueDate' | 'qrVerificationUrl'>) => FardDocument;

  addGirdawari: (record: Omit<GirdawariRecord, 'id'>) => GirdawariRecord;
  addDocument: (doc: Omit<DocumentItem, 'id' | 'uploadedAt'>) => DocumentItem;
  addAuditLog: (log: Omit<AuditLogItem, 'id' | 'timestamp'>) => void;
}

export const useRevenueStore = create<RevenueState>((set, get) => ({
  landowners: mockLandowners,
  parcels: mockParcels,
  khewats: mockKhewatRecords,
  khataunis: mockKhatauniRecords,
  jamabandis: mockJamabandiRecords,
  mutations: mockMutations,
  fards: mockFards,
  inheritanceCases: mockInheritanceCases,
  girdawariRecords: mockGirdawariRecords,
  documents: mockDocuments,
  users: mockUsers,
  auditLogs: mockAuditLogs,

  addLandowner: (ownerData) => {
    const id = `OWN-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOwner: Landowner = {
      ...ownerData,
      id,
      registeredDate: new Date().toISOString().split('T')[0],
    };
    set((state) => ({
      landowners: [newOwner, ...state.landowners],
    }));
    get().addAuditLog({
      userName: 'Current Officer',
      userRole: 'Tehsildar',
      action: 'CREATE',
      module: 'Landowners',
      recordId: id,
      description: `Registered new landowner: ${newOwner.name} (${newOwner.cnic})`,
      ipAddress: '127.0.0.1',
      status: 'SUCCESS',
    });
    return newOwner;
  },

  updateLandowner: (id, data) => {
    set((state) => ({
      landowners: state.landowners.map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
    get().addAuditLog({
      userName: 'Current Officer',
      userRole: 'Tehsildar',
      action: 'UPDATE',
      module: 'Landowners',
      recordId: id,
      description: `Updated landowner details for ID: ${id}`,
      ipAddress: '127.0.0.1',
      status: 'SUCCESS',
    });
  },

  deleteLandowner: (id) => {
    set((state) => ({
      landowners: state.landowners.filter((item) => item.id !== id),
    }));
  },

  addLandParcel: (parcelData) => {
    const id = `PRC-${Math.floor(100 + Math.random() * 900)}`;
    const newParcel: LandParcel = {
      ...parcelData,
      id,
    };
    set((state) => ({
      parcels: [newParcel, ...state.parcels],
    }));
    return newParcel;
  },

  updateLandParcel: (id, data) => {
    set((state) => ({
      parcels: state.parcels.map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  },

  addMutation: (mutationData) => {
    const id = `MUT-2024-${Math.floor(100 + Math.random() * 900)}`;
    const mutationNumber = `INT-${Math.floor(4000 + Math.random() * 2000)}`;
    const newMutation: MutationRecord = {
      ...mutationData,
      id,
      mutationNumber,
      applicationDate: new Date().toISOString().split('T')[0],
      currentStatus: 'Submitted',
      currentStepIndex: 1,
      timeline: [
        {
          step: 'Application Submitted',
          status: 'Submitted',
          timestamp: new Date().toLocaleString(),
          officer: 'Citizen Service Center Operator',
          comments: 'Online citizen application submitted for revenue verification.',
        },
      ],
    };
    set((state) => ({
      mutations: [newMutation, ...state.mutations],
    }));
    get().addAuditLog({
      userName: 'Citizen Service Center',
      userRole: 'Data Entry Operator',
      action: 'CREATE',
      module: 'Mutations',
      recordId: id,
      description: `Filed new mutation application #${mutationNumber} for ${newMutation.applicantName}`,
      ipAddress: '127.0.0.1',
      status: 'SUCCESS',
    });
    return newMutation;
  },

  updateMutationStatus: (id, status, remarks, officerName = 'Malik Tariq Mehmood (Tehsildar)') => {
    set((state) => ({
      mutations: state.mutations.map((mut) => {
        if (mut.id !== id) return mut;
        const newTimeline = [
          ...mut.timeline,
          {
            step: `Status Changed to ${status}`,
            status,
            timestamp: new Date().toLocaleString(),
            officer: officerName,
            comments: remarks || `Status officially updated to ${status}.`,
          },
        ];
        return {
          ...mut,
          currentStatus: status,
          officerRemarks: remarks || mut.officerRemarks,
          timeline: newTimeline,
        };
      }),
    }));
    get().addAuditLog({
      userName: officerName,
      userRole: 'Tehsildar',
      action: status === 'Approved' ? 'APPROVE' : status === 'Rejected' ? 'REJECT' : 'UPDATE',
      module: 'Mutations',
      recordId: id,
      description: `Mutation ${id} status updated to ${status}. Remarks: ${remarks || 'None'}`,
      ipAddress: '127.0.0.1',
      status: 'SUCCESS',
    });
  },

  advanceMutationStep: (id, remarks, officerName = 'Malik Tariq Mehmood (Tehsildar)') => {
    const steps = [
      'Application Submitted',
      'Document Verification',
      'Ownership Verification',
      'Revenue Officer Review',
      'Approval / Rejection',
      'Updated Ownership Record',
    ];

    set((state) => ({
      mutations: state.mutations.map((mut) => {
        if (mut.id !== id) return mut;
        const nextStepIndex = Math.min(mut.currentStepIndex + 1, 5);
        let nextStatus: MutationStatus = mut.currentStatus;
        if (nextStepIndex === 2) nextStatus = 'Under Verification';
        if (nextStepIndex === 3) nextStatus = 'Pending Approval';
        if (nextStepIndex === 4) nextStatus = 'Approved';
        if (nextStepIndex === 5) nextStatus = 'Approved';

        const updatedChecklist = mut.verificationChecklist.map((chk, i) => {
          if (i <= nextStepIndex) {
            return { ...chk, completed: true, verifiedBy: officerName, verifiedAt: new Date().toLocaleDateString() };
          }
          return chk;
        });

        const newTimeline = [
          ...mut.timeline,
          {
            step: steps[nextStepIndex],
            status: 'Completed',
            timestamp: new Date().toLocaleString(),
            officer: officerName,
            comments: remarks || `Advanced to step: ${steps[nextStepIndex]}`,
          },
        ];

        return {
          ...mut,
          currentStepIndex: nextStepIndex,
          currentStatus: nextStatus,
          verificationChecklist: updatedChecklist,
          timeline: newTimeline,
          officerRemarks: remarks || mut.officerRemarks,
        };
      }),
    }));
  },

  issueFard: (fardData) => {
    const num = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `FD-PB-2024-${num}-ARC`;
    const barcodeNumber = `8921${num}4512`;
    const newFard: FardDocument = {
      ...fardData,
      id: `FRD-2024-${num}`,
      referenceNumber,
      barcodeNumber,
      issueDate: new Date().toISOString().split('T')[0],
      qrVerificationUrl: `https://dlrms.punjab.gov.pk/verify/${referenceNumber}`,
    };
    set((state) => ({
      fards: [newFard, ...state.fards],
    }));
    get().addAuditLog({
      userName: fardData.issuingOfficer,
      userRole: 'Patwari',
      action: 'PRINT',
      module: 'Fard',
      recordId: newFard.id,
      description: `Issued official Fard Malkiat: ${referenceNumber} for ${fardData.owner.name}`,
      ipAddress: '127.0.0.1',
      status: 'SUCCESS',
    });
    return newFard;
  },

  addGirdawari: (recordData) => {
    const id = `GRD-2024-${Math.floor(100 + Math.random() * 900)}`;
    const newRecord: GirdawariRecord = {
      ...recordData,
      id,
    };
    set((state) => ({
      girdawariRecords: [newRecord, ...state.girdawariRecords],
    }));
    get().addAuditLog({
      userName: recordData.inspectionOfficer,
      userRole: 'Patwari',
      action: 'CREATE',
      module: 'Girdawari',
      recordId: id,
      description: `Logged Girdawari for Khasra ${recordData.khasraNumber} (${recordData.cropType})`,
      ipAddress: '127.0.0.1',
      status: 'SUCCESS',
    });
    return newRecord;
  },

  addDocument: (docData) => {
    const id = `DOC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDoc: DocumentItem = {
      ...docData,
      id,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    set((state) => ({
      documents: [newDoc, ...state.documents],
    }));
    return newDoc;
  },

  addAuditLog: (logData) => {
    const id = `AUD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLog: AuditLogItem = {
      ...logData,
      id,
      timestamp: new Date().toLocaleString(),
    };
    set((state) => ({
      auditLogs: [newLog, ...state.auditLogs],
    }));
  },
}));
