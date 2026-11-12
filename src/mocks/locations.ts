import { Province, Division, District, Tehsil, QanoongoHalqa, PatwarCircle, Mouza } from '../types';

export const mockProvinces: Province[] = [
  { id: 'PRV-PB', name: 'Punjab', urduName: 'پنجاب', code: 'PB', divisionsCount: 10, districtsCount: 42 },
  { id: 'PRV-SD', name: 'Sindh', urduName: 'سندھ', code: 'SD', divisionsCount: 7, districtsCount: 30 },
  { id: 'PRV-KP', name: 'Khyber Pakhtunkhwa', urduName: 'خیبر پختونخوا', code: 'KP', divisionsCount: 7, districtsCount: 36 },
  { id: 'PRV-BA', name: 'Balochistan', urduName: 'بلوچستان', code: 'BA', divisionsCount: 8, districtsCount: 36 },
  { id: 'PRV-ICT', name: 'Islamabad Capital Territory', urduName: 'اسلام آباد', code: 'ICT', divisionsCount: 1, districtsCount: 1 },
];

export const mockDivisions: Division[] = [
  { id: 'DIV-LHR', provinceId: 'PRV-PB', name: 'Lahore Division', urduName: 'ڈویژن لاہور', districtsCount: 4 },
  { id: 'DIV-FSD', provinceId: 'PRV-PB', name: 'Faisalabad Division', urduName: 'ڈویژن فیصل آباد', districtsCount: 4 },
  { id: 'DIV-RWP', provinceId: 'PRV-PB', name: 'Rawalpindi Division', urduName: 'ڈویژن راولپنڈی', districtsCount: 4 },
  { id: 'DIV-MLT', provinceId: 'PRV-PB', name: 'Multan Division', urduName: 'ڈویژن ملتان', districtsCount: 4 },
  { id: 'DIV-GUJ', provinceId: 'PRV-PB', name: 'Gujranwala Division', urduName: 'ڈویژن گوجرانوالہ', districtsCount: 6 },
];

export const mockDistricts: District[] = [
  { id: 'DST-LHR', divisionId: 'DIV-LHR', provinceId: 'PRV-PB', name: 'Lahore', urduName: 'ضلع لاہور', tehsilsCount: 5, deputyCommissioner: 'Rafia Haider (PAS)' },
  { id: 'DST-KAS', divisionId: 'DIV-LHR', provinceId: 'PRV-PB', name: 'Kasur', urduName: 'ضلع قصور', tehsilsCount: 4, deputyCommissioner: 'Muhammad Arshad (PAS)' },
  { id: 'DST-SKP', divisionId: 'DIV-LHR', provinceId: 'PRV-PB', name: 'Sheikhupura', urduName: 'ضلع شیخوپورہ', tehsilsCount: 5, deputyCommissioner: 'Dr. Waqar Khan' },
  { id: 'DST-RWP', divisionId: 'DIV-RWP', provinceId: 'PRV-PB', name: 'Rawalpindi', urduName: 'ضلع راولپنڈی', tehsilsCount: 7, deputyCommissioner: 'Hassan Waqar' },
  { id: 'DST-FSD', divisionId: 'DIV-FSD', provinceId: 'PRV-PB', name: 'Faisalabad', urduName: 'ضلع فیصل آباد', tehsilsCount: 6, deputyCommissioner: 'Abdullah Nayyar' },
];

export const mockTehsils: Tehsil[] = [
  { id: 'THS-RWND', districtId: 'DST-LHR', name: 'Raiwind', urduName: 'تحصیل رائے ونڈ', tehsildarName: 'Malik Tariq Mehmood', qanoongoHalqasCount: 4, mouzasCount: 68 },
  { id: 'THS-LCTY', districtId: 'DST-LHR', name: 'Lahore City', urduName: 'تحصیل سٹی لاہور', tehsildarName: 'Chaudhry Naveed Aslam', qanoongoHalqasCount: 6, mouzasCount: 45 },
  { id: 'THS-LCNT', districtId: 'DST-LHR', name: 'Lahore Cantt', urduName: 'تحصیل کینٹ لاہور', tehsildarName: 'Rana Zulfiqar Ali', qanoongoHalqasCount: 5, mouzasCount: 52 },
  { id: 'THS-MDLT', districtId: 'DST-LHR', name: 'Model Town', urduName: 'تحصیل ماڈل ٹاؤن', tehsildarName: 'Mian Usman Farooq', qanoongoHalqasCount: 4, mouzasCount: 39 },
  { id: 'THS-SHAL', districtId: 'DST-LHR', name: 'Shalimar', urduName: 'تحصیل شالیمار', tehsildarName: 'Sardar Khurram Shahzad', qanoongoHalqasCount: 5, mouzasCount: 48 },
];

export const mockQanoongoHalqas: QanoongoHalqa[] = [
  { id: 'QNH-RWND-1', tehsilId: 'THS-RWND', name: 'Raiwind Urban Halqa', urduName: 'حلقہ قانونگوئی رائے ونڈ شہری', qanoongoName: 'Bashir Ahmed Siddiqui', patwarCirclesCount: 6 },
  { id: 'QNH-RWND-2', tehsilId: 'THS-RWND', name: 'Manga Mandi Halqa', urduName: 'حلقہ قانونگوئی مانگا منڈی', qanoongoName: 'Muhammad Saeed Akhtar', patwarCirclesCount: 5 },
  { id: 'QNH-RWND-3', tehsilId: 'THS-RWND', name: 'Paji Halqa', urduName: 'حلقہ قانونگوئی پاجی', qanoongoName: 'Abdul Ghafoor Dogar', patwarCirclesCount: 5 },
  { id: 'QNH-RWND-4', tehsilId: 'THS-RWND', name: 'Sundar Halqa', urduName: 'حلقہ قانونگوئی سندر', qanoongoName: 'Niamat Ali Wattoo', patwarCirclesCount: 4 },
];

export const mockPatwarCircles: PatwarCircle[] = [
  { id: 'PWC-SHPR', halqaId: 'QNH-RWND-1', tehsilId: 'THS-RWND', name: 'Shahpur Circle', urduName: 'پٹوار سرکل شاہ پور', patwariName: 'Muhammad Aslam Patwari', patwariContact: '0300-8451290', mouzasCount: 3 },
  { id: 'PWC-CH45', halqaId: 'QNH-RWND-1', tehsilId: 'THS-RWND', name: 'Chak 45 Circle', urduName: 'پٹوار سرکل چک 45', patwariName: 'Nadeem Abbas Virk', patwariContact: '0321-4198274', mouzasCount: 2 },
  { id: 'PWC-KHNA', halqaId: 'QNH-RWND-3', tehsilId: 'THS-RWND', name: 'Kahna Circle', urduName: 'پٹوار سرکل کاہنہ نو', patwariName: 'Irfan Ullah Cheema', patwariContact: '0333-4902187', mouzasCount: 4 },
  { id: 'PWC-SNDR', halqaId: 'QNH-RWND-4', tehsilId: 'THS-RWND', name: 'Sundar Circle', urduName: 'پٹوار سرکل سندر', patwariName: 'Hafiz Muhammad Shafiq', patwariContact: '0301-7890123', mouzasCount: 3 },
];

export const mockMouzas: Mouza[] = [
  {
    id: 'MOUZA-SHPR',
    patwarCircleId: 'PWC-SHPR',
    tehsilId: 'THS-RWND',
    districtId: 'DST-LHR',
    name: 'Shahpur',
    urduName: 'شاہ پور',
    hadbastNumber: '114',
    totalAreaKanal: 3450,
    totalKhasras: 520,
    totalKhewats: 84,
    jamabandiYear: '2020-2024',
  },
  {
    id: 'MOUZA-CH45',
    patwarCircleId: 'PWC-CH45',
    tehsilId: 'THS-RWND',
    districtId: 'DST-LHR',
    name: 'Chak 45-RB',
    urduName: 'چک 45 آر بی',
    hadbastNumber: '128',
    totalAreaKanal: 4890,
    totalKhasras: 730,
    totalKhewats: 112,
    jamabandiYear: '2020-2024',
  },
  {
    id: 'MOUZA-KHNA',
    patwarCircleId: 'PWC-KHNA',
    tehsilId: 'THS-RWND',
    districtId: 'DST-LHR',
    name: 'Kahna Nau',
    urduName: 'کاہنہ نو',
    hadbastNumber: '92',
    totalAreaKanal: 2800,
    totalKhasras: 410,
    totalKhewats: 67,
    jamabandiYear: '2019-2023',
  },
  {
    id: 'MOUZA-SNDR',
    patwarCircleId: 'PWC-SNDR',
    tehsilId: 'THS-RWND',
    districtId: 'DST-LHR',
    name: 'Sundar Sharif',
    urduName: 'سندر شریف',
    hadbastNumber: '145',
    totalAreaKanal: 5120,
    totalKhasras: 890,
    totalKhewats: 140,
    jamabandiYear: '2021-2025',
  },
  {
    id: 'MOUZA-NZBG',
    patwarCircleId: 'PWC-SHPR',
    tehsilId: 'THS-RWND',
    districtId: 'DST-LHR',
    name: 'Niaz Baig',
    urduName: 'نیاز بیگ',
    hadbastNumber: '88',
    totalAreaKanal: 4200,
    totalKhasras: 640,
    totalKhewats: 98,
    jamabandiYear: '2020-2024',
  },
];
