import * as yup from 'yup';

// NADRA CNIC regex pattern: 35202-1234567-1 (5 digits - 7 digits - 1 digit)
const CNIC_REGEX = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
const PAK_PHONE_REGEX = /^(03[0-9]{2})-[0-9]{7}$/;

export const landownerSchema = yup.object({
  name: yup.string().required('Full Name in English is required').min(3, 'At least 3 characters'),
  urduName: yup.string().required('Urdu Name is required (مالک کا نام مطلوب ہے)'),
  cnic: yup
    .string()
    .required('CNIC is required')
    .matches(CNIC_REGEX, 'CNIC must match format 35202-1234567-1'),
  fatherOrHusbandName: yup.string().required('Father / Husband name is required'),
  fatherOrHusbandUrduName: yup.string().default(''),
  relationType: yup.string().oneOf(['s/o', 'd/o', 'w/o']).default('s/o'),
  gender: yup.string().oneOf(['Male', 'Female', 'Other']).default('Male'),
  dateOfBirth: yup.string().optional(),
  contactNumber: yup
    .string()
    .required('Mobile contact is required')
    .default('0300-1234567'),
  permanentAddress: yup.string().required('Permanent address is required'),
  province: yup.string().default('Punjab'),
  district: yup.string().default('Lahore'),
  tehsil: yup.string().default('Raiwind'),
  mouzaName: yup.string().required('Mouza is required'),
  kanals: yup.number().min(0, 'Must be positive').default(0),
  marlas: yup.number().min(0, 'Must be positive').max(19, 'Marlas cannot exceed 19').default(0),
  status: yup.string().oneOf(['Active', 'Deceased', 'Disputed', 'Blocked']).default('Active'),
});

export const parcelSchema = yup.object({
  khasraNumber: yup.string().required('Khasra Number is required (e.g. 125/2)'),
  mouzaName: yup.string().required('Mouza is required'),
  khewatNumber: yup.string().required('Khewat Number is required'),
  khatauniNumber: yup.string().required('Khatauni Number is required'),
  kanals: yup.number().min(0).required('Kanals required'),
  marlas: yup.number().min(0).max(19).required('Marlas required'),
  landType: yup.string().required('Land classification required'),
  primaryOwner: yup.string().required('Primary Owner is required'),
});

export const mutationSchema = yup.object({
  mutationType: yup.string().required('Mutation Type is required'),
  applicantName: yup.string().required('Applicant Full Name is required'),
  applicantCnic: yup
    .string()
    .required('Applicant CNIC is required')
    .matches(CNIC_REGEX, 'CNIC must match format 35202-1234567-1'),
  applicantPhone: yup.string().required('Applicant Phone is required'),
  mouzaName: yup.string().required('Mouza is required'),
  khewatNumber: yup.string().required('Khewat Number is required'),
  khasraNumber: yup.string().required('Khasra Number is required'),
  kanals: yup.number().min(0).default(0),
  marlas: yup.number().min(0).max(19).default(0),
  sellerName: yup.string().required('Seller / Transferor name is required'),
  sellerCnic: yup.string().required('Seller CNIC is required'),
  buyerName: yup.string().required('Buyer / Transferee name is required'),
  buyerCnic: yup.string().required('Buyer CNIC is required'),
  feePaidPkr: yup.number().min(0).default(500),
});

export const girdawariSchema = yup.object({
  khasraNumber: yup.string().required('Khasra Number is required'),
  mouzaName: yup.string().required('Mouza is required'),
  season: yup.string().required('Season is required'),
  cropType: yup.string().required('Crop Type is required'),
  cultivatorName: yup.string().required('Cultivator Name is required'),
  cultivatorFatherName: yup.string().required('Father Name is required'),
  kanals: yup.number().min(0).required(),
  marlas: yup.number().min(0).max(19).required(),
  sourceOfIrrigation: yup.string().required(),
  condition: yup.string().required(),
  remarks: yup.string().default(''),
});
