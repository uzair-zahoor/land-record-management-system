import { create } from 'zustand';
import { Language, Direction, UserRole, User } from '../types';

interface AppState {
  language: Language;
  direction: Direction;
  currentUser: User;
  selectedProvince: string;
  selectedDistrict: string;
  selectedTehsil: string;
  selectedMouza: string;
  sidebarOpen: boolean;
  notification: {
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
  };
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  setJurisdiction: (jurisdiction: { province?: string; district?: string; tehsil?: string; mouza?: string }) => void;
  setCurrentUserRole: (role: UserRole) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  showNotification: (message: string, severity?: 'success' | 'info' | 'warning' | 'error') => void;
  hideNotification: () => void;
}

export const defaultUser: User = {
  id: 'USR-8921',
  name: 'Malik Tariq Mehmood',
  urduName: 'ملک طارق محمود',
  email: 'tariq.mehmood@punjab.gov.pk',
  role: 'Tehsildar',
  jurisdiction: 'Tehsil Raiwind, District Lahore',
  district: 'Lahore',
  tehsil: 'Raiwind',
  patwarCircle: 'Chak 45 Circle',
  active: true,
};

export const useAppStore = create<AppState>((set, get) => ({
  language: 'en',
  direction: 'ltr',
  currentUser: defaultUser,
  selectedProvince: 'Punjab',
  selectedDistrict: 'Lahore',
  selectedTehsil: 'Raiwind',
  selectedMouza: 'Mouza Shahpur (موضع شاہ پور)',
  sidebarOpen: true,
  notification: {
    open: false,
    message: '',
    severity: 'success',
  },

  setLanguage: (lang: Language) => {
    const direction: Direction = lang === 'ur' ? 'rtl' : 'ltr';
    if (typeof document !== 'undefined') {
      document.documentElement.dir = direction;
      document.documentElement.lang = lang;
    }
    set({ language: lang, direction });
  },

  toggleLanguage: () => {
    const newLang: Language = get().language === 'en' ? 'ur' : 'en';
    get().setLanguage(newLang);
  },

  setJurisdiction: (jurisdiction) => {
    set((state) => ({
      selectedProvince: jurisdiction.province ?? state.selectedProvince,
      selectedDistrict: jurisdiction.district ?? state.selectedDistrict,
      selectedTehsil: jurisdiction.tehsil ?? state.selectedTehsil,
      selectedMouza: jurisdiction.mouza ?? state.selectedMouza,
    }));
  },

  setCurrentUserRole: (role: UserRole) => {
    set((state) => ({
      currentUser: {
        ...state.currentUser,
        role,
      },
    }));
  },

  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  showNotification: (message: string, severity = 'success') => {
    set({
      notification: {
        open: true,
        message,
        severity,
      },
    });
  },

  hideNotification: () => {
    set((state) => ({
      notification: {
        ...state.notification,
        open: false,
      },
    }));
  },
}));
