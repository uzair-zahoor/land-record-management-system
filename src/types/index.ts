// Core Data Types for Digital Land Record Management System (DLRMS) - Pakistan

export type Language = 'en' | 'ur';
export type Direction = 'ltr' | 'rtl';

export type UserRole =
  | 'Super Administrator'
  | 'Revenue Administrator'
  | 'Tehsildar'
  | 'Naib Tehsildar'
  | 'Qanoongo'
  | 'Patwari'
  | 'Data Entry Operator'
  | 'Read-only Auditor';

export interface User {
  id: string;
  name: string;
  urduName?: string;
  email: string;
  role: UserRole;
  jurisdiction: string;
  district: string;
  tehsil: string;
  patwarCircle?: string;
  active: boolean;
  avatar?: string;
}

// Administrative Hierarchy
export interface Province {
  id: string;
  name: string;
  urduName: string;
  code: string;
  divisionsCount: number;
  districtsCount: number;
}

export interface Division {
  id: string;
  provinceId: string;
  name: string;
  urduName: string;
  districtsCount: number;
}

export interface District {
  id: string;
  divisionId: string;
  provinceId: string;
  name: string;
  urduName: string;
  tehsilsCount: number;
  deputyCommissioner: string;
}

export interface Tehsil {
  id: string;
  districtId: string;
  name: string;
  urduName: string;
  tehsildarName: string;
  qanoongoHalqasCount: number;
  mouzasCount: number;
}

export interface QanoongoHalqa {
  id: string;
  tehsilId: string;
  name: string;
  urduName: string;
  qanoongoName: string;
  patwarCirclesCount: number;
}

export interface PatwarCircle {
  id: string;
  halqaId: string;
  tehsilId: string;
  name: string;
  urduName: string;
  patwariName: string;
  patwariContact: string;
  mouzasCount: number;
}

export interface Mouza {
  id: string;
  patwarCircleId: string;
  tehsilId: string;
  districtId: string;
  name: string;
  urduName: string;
  hadbastNumber: string; // حد بست نمبر
  totalAreaKanal: number;
  totalKhasras: number;
  totalKhewats: number;
  jamabandiYear: string;
}

// Land Measurement Units
export type LandAreaUnit = 'Kanal' | 'Marla' | 'Acre' | 'Murabba' | 'Sarsahi' | 'SqFt';

export interface LandArea {
  kanals: number;
  marlas: number;
  sarsahis?: number;
  sqFt?: number;
  totalSqFt: number;
  formatted: string;
  formattedUrdu: string;
}

// Landowner
export interface Landowner {
  id: string;
  name: string;
  urduName: string;
  cnic: string;
  fatherOrHusbandName: string;
  fatherOrHusbandUrduName: string;
  relationType: 's/o' | 'd/o' | 'w/o';
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth?: string;
  contactNumber: string;
  permanentAddress: string;
  province: string;
  district: string;
  tehsil: string;
  mouzaId: string;
  mouzaName: string;
  associatedKhewatNumbers: string[];
  totalLandArea: LandArea;
  status: 'Active' | 'Deceased' | 'Disputed' | 'Blocked';
  registeredDate: string;
  photoUrl?: string;
}

// Land Parcel (Khasra)
export interface LandParcel {
  id: string;
  khasraNumber: string; // خسرہ نمبر
  mouzaId: string;
  mouzaName: string;
  urduMouzaName: string;
  khewatNumber: string; // کھاتہ / کھیوٹ نمبر
  khatauniNumber: string; // کھتونی نمبر
  area: LandArea;
  landType: 'Agricultural (Nehri)' | 'Agricultural (Chahi)' | 'Barani' | 'Residential' | 'Commercial' | 'Ghair Mumkin';
  urduLandType: string;
  currentOwnership: {
    ownerId: string;
    ownerName: string;
    urduOwnerName: string;
    shareRatio: string; // e.g., "1/2", "1/4"
    shareFraction: number; // 0.5
    shareArea: LandArea;
  }[];
  status: 'Verified' | 'Pending Mutation' | 'Under Dispute' | 'Mortgaged';
  coordinates?: [number, number][]; // Polygon coordinates
  centerCoordinates?: [number, number];
  shajraPieceNumber?: string;
}

// Khewat (Ownership Account)
export interface KhewatRecord {
  id: string;
  khewatNumber: string; // کھیوٹ نمبر
  mouzaId: string;
  mouzaName: string;
  urduMouzaName: string;
  totalArea: LandArea;
  owners: {
    ownerId: string;
    ownerName: string;
    urduOwnerName: string;
    fatherName: string;
    shares: string; // e.g. "80/160"
    sharePercentage: number;
  }[];
  relatedKhasraNumbers: string[];
  jamabandiYear: string;
  revenueTaxAssessed: number; // مapplied Maalia / Lagaan
  status: 'Active' | 'Under Revision' | 'Historical';
}

// Khatauni (Tenancy / Cultivation Account)
export interface KhatauniRecord {
  id: string;
  khatauniNumber: string; // کھتونی نمبر
  khewatNumber: string;
  mouzaId: string;
  mouzaName: string;
  cultivatorName: string;
  urduCultivatorName: string;
  cultivatorRelation: 'Khud Kasht' | 'Muzara (Tenant)' | 'Hissadar (Co-sharer)' | 'Batai';
  cultivatorFatherName: string;
  rentOrTaxDetails: string;
  khasraNumbers: string[];
  area: LandArea;
  remarks: string;
}

// Jamabandi (Record of Rights / رجسٹر حقداران زمین)
export interface JamabandiRecord {
  id: string;
  mouzaId: string;
  mouzaName: string;
  urduMouzaName: string;
  tehsil: string;
  district: string;
  quadrennialYear: string; // e.g. "2020-2024"
  khewatNumber: string;
  khatauniNumber: string;
  ownersText: string;
  cultivatorText: string;
  khasraNumber: string;
  landClassification: string;
  area: LandArea;
  revenueAssessed: string;
  mutationRemarks: string; // کفیت
  historicalVersion: number;
}

// Mutation (انتقال)
export type MutationType =
  | 'Sale / Purchase (بیع)'
  | 'Inheritance (وراثت)'
  | 'Gift / Hiba (ہبہ)'
  | 'Partition (تقسیم)'
  | 'Court Order (حکم عدالت)'
  | 'Mortgage (رہن)';

export type MutationStatus =
  | 'Draft'
  | 'Submitted'
  | 'Under Verification'
  | 'Pending Approval'
  | 'Approved'
  | 'Rejected'
  | 'Cancelled';

export interface MutationParty {
  name: string;
  urduName?: string;
  cnic: string;
  fatherName: string;
  shareTransferred: string;
  role: 'Seller/Donor/Deceased' | 'Buyer/Donee/Heir';
}

export interface MutationRecord {
  id: string;
  mutationNumber: string; // انتقال نمبر
  mutationType: MutationType;
  applicantName: string;
  applicantCnic: string;
  applicantPhone: string;
  mouzaId: string;
  mouzaName: string;
  urduMouzaName: string;
  khewatNumber: string;
  khasraNumbers: string[];
  transferArea: LandArea;
  previousOwners: MutationParty[];
  newOwners: MutationParty[];
  applicationDate: string;
  currentStatus: MutationStatus;
  currentStepIndex: number; // 0 to 5
  assignedOfficer: string;
  assignedPatwari: string;
  patwariReportDate?: string;
  qanoongoVerificationDate?: string;
  tehsildarSanctionDate?: string;
  feePaidPkr: number;
  challanNumber: string;
  officerRemarks?: string;
  verificationChecklist: {
    title: string;
    completed: boolean;
    verifiedBy?: string;
    verifiedAt?: string;
  }[];
  timeline: {
    step: string;
    status: string;
    timestamp: string;
    officer: string;
    comments?: string;
  }[];
  documents: {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedAt: string;
  }[];
}

// Fard (فرد ملکیت)
export interface FardDocument {
  id: string;
  referenceNumber: string; // Verification reference number e.g. FD-2024-LHR-8921
  barcodeNumber: string;
  issueDate: string;
  purpose: 'Personal Record (برائے تسلی ریکارڈ)' | 'Bank Loan (برائے قرضہ)' | 'Court (برائے عدالت)' | 'Sale (برائے بیع)' | 'Bail (برائے ضمانت)';
  jurisdiction: {
    province: string;
    district: string;
    tehsil: string;
    qanoongoHalqa: string;
    patwarCircle: string;
    mouza: string;
    hadbastNumber: string;
  };
  owner: {
    id: string;
    name: string;
    urduName: string;
    fatherName: string;
    cnic: string;
  };
  khewatNumber: string;
  khatauniNumber: string;
  totalKhewatArea: LandArea;
  ownerShareRatio: string;
  ownerTotalShareArea: LandArea;
  khasraDetails: {
    khasraNo: string;
    totalArea: string;
    ownerShareArea: string;
    landType: string;
  }[];
  jamabandiYear: string;
  issuingOfficer: string;
  feePaidPkr: number;
  status: 'Valid' | 'Expired' | 'Revoked';
  qrVerificationUrl: string;
}

// Inheritance (وراثت)
export interface LegalHeir {
  id: string;
  name: string;
  urduName: string;
  cnic: string;
  relationship: 'Son' | 'Daughter' | 'Wife' | 'Husband' | 'Mother' | 'Father' | 'Brother' | 'Sister';
  urduRelationship: string;
  shareFractionText: string; // e.g. "1/8", "7/24"
  sharePercentage: number;
  calculatedArea: LandArea;
  contactNumber?: string;
  status: 'Verified' | 'Pending Biometric' | 'Objection Raised';
}

export interface InheritanceCase {
  id: string;
  caseNumber: string;
  deceasedOwnerId: string;
  deceasedName: string;
  urduDeceasedName: string;
  deceasedCnic: string;
  dateOfDeath: string;
  deathCertificateNumber: string;
  mouzaName: string;
  khewatNumbers: string[];
  totalEstateArea: LandArea;
  heirs: LegalHeir[];
  linkedMutationId?: string;
  status: 'Under Verification' | 'Shariat Certificate Issued' | 'Mutation Pending' | 'Sanctioned';
  notes: string;
}

// Girdawari (گرداوری - Crop Inspection)
export interface GirdawariRecord {
  id: string;
  mouzaId: string;
  mouzaName: string;
  urduMouzaName: string;
  khasraNumber: string;
  season: 'Kharif (خریف)' | 'Rabi (ربیع)' | 'Zaid Kharif' | 'Zaid Rabi';
  year: number;
  cropType: 'Wheat (گندم)' | 'Rice (دھان/چاول)' | 'Cotton (کپاس)' | 'Sugarcane (کماد)' | 'Maize (مکئی)' | 'Fodder (چارہ)' | 'Fallow (خالی)';
  urduCropType: string;
  cultivatorName: string;
  urduCultivatorName: string;
  cultivatorFatherName: string;
  cultivatedArea: LandArea;
  inspectionDate: string;
  inspectionOfficer: string;
  officerRole: 'Patwari' | 'Qanoongo' | 'Naib Tehsildar';
  sourceOfIrrigation: 'Canal (نہر)' | 'Tube well (ٹیوب ویل)' | 'Rain-fed (بارانی)' | 'Well (کنواں)';
  condition: 'Excellent' | 'Good' | 'Average' | 'Damaged/Pest Attack';
  remarks: string;
}

// Document Management
export interface DocumentItem {
  id: string;
  title: string;
  urduTitle?: string;
  category: 'CNIC' | 'Sale Deed / Registry' | 'Mutation (Intiqal)' | 'Inheritance / Fard-e-Haqooq' | 'Court Order' | 'Historical Register Scan' | 'Shajra Aks';
  mouzaName?: string;
  khasraNumber?: string;
  khewatNumber?: string;
  fileName: string;
  fileSize: string;
  fileType: 'PDF' | 'JPEG' | 'PNG' | 'TIFF';
  uploadedBy: string;
  uploadedAt: string;
  verified: boolean;
  notes?: string;
}

// Audit Log
export interface AuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: UserRole;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VERIFY' | 'APPROVE' | 'REJECT' | 'PRINT' | 'LOGIN';
  module: 'Landowners' | 'Land Parcels' | 'Khewat' | 'Khatauni' | 'Jamabandi' | 'Mutations' | 'Fard' | 'Inheritance' | 'Girdawari' | 'Documents' | 'Users';
  recordId: string;
  description: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
}
