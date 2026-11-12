'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';
import { dlrmsPalette } from './palette';
import { Direction, Language } from '../types';

export const getAppTheme = (direction: Direction = 'ltr', language: Language = 'en') => {
  const isUrdu = language === 'ur';

  const fontFamily = isUrdu
    ? '"Noto Nastaliq Urdu", "Jameel Noori Nastaleeq", "Noto Sans Arabic", "Segoe UI", Tahoma, sans-serif'
    : '"Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, sans-serif';

  const themeOptions: ThemeOptions = {
    direction,
    palette: {
      mode: 'light',
      primary: dlrmsPalette.primary,
      secondary: dlrmsPalette.secondary,
      background: dlrmsPalette.background,
      text: dlrmsPalette.text,
      divider: dlrmsPalette.divider,
      warning: dlrmsPalette.warning,
      error: dlrmsPalette.error,
      info: dlrmsPalette.info,
      success: dlrmsPalette.success,
    },
    typography: {
      fontFamily,
      h1: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.25,
        color: dlrmsPalette.text.primary,
      },
      h2: {
        fontSize: '1.75rem',
        fontWeight: 700,
        lineHeight: 1.3,
        color: dlrmsPalette.text.primary,
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.35,
        color: dlrmsPalette.text.primary,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
        color: dlrmsPalette.text.primary,
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.4,
        color: dlrmsPalette.text.primary,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.45,
        color: dlrmsPalette.text.primary,
      },
      subtitle1: {
        fontSize: '0.9375rem',
        fontWeight: 500,
        color: dlrmsPalette.text.secondary,
      },
      subtitle2: {
        fontSize: '0.8125rem',
        fontWeight: 500,
        color: dlrmsPalette.text.secondary,
      },
      body1: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        color: dlrmsPalette.text.primary,
      },
      body2: {
        fontSize: '0.8125rem',
        lineHeight: 1.5,
        color: dlrmsPalette.text.secondary,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.875rem',
      },
      caption: {
        fontSize: '0.75rem',
        color: dlrmsPalette.text.secondary,
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: [
      'none',
      '0px 1px 2px 0px rgba(15, 23, 42, 0.05)',
      '0px 1px 3px 0px rgba(15, 23, 42, 0.08), 0px 1px 2px -1px rgba(15, 23, 42, 0.08)',
      '0px 4px 6px -1px rgba(15, 23, 42, 0.08), 0px 2px 4px -2px rgba(15, 23, 42, 0.08)',
      '0px 10px 15px -3px rgba(15, 23, 42, 0.08), 0px 4px 6px -4px rgba(15, 23, 42, 0.08)',
      '0px 20px 25px -5px rgba(15, 23, 42, 0.08), 0px 8px 10px -6px rgba(15, 23, 42, 0.08)',
      // fill remaining standard shadows
      ...Array(19).fill('0px 4px 12px 0px rgba(15, 23, 42, 0.08)')
    ] as any,
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            border: `1px solid ${dlrmsPalette.divider}`,
            boxShadow: '0px 1px 3px 0px rgba(15, 23, 42, 0.05)',
            backgroundImage: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          rounded: {
            borderRadius: 10,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 1px 2px 0px rgba(15, 23, 42, 0.08)',
            },
          },
          containedPrimary: {
            backgroundColor: dlrmsPalette.primary.main,
            '&:hover': {
              backgroundColor: dlrmsPalette.primary.light,
            },
          },
          containedSecondary: {
            backgroundColor: dlrmsPalette.secondary.main,
            '&:hover': {
              backgroundColor: dlrmsPalette.secondary.dark,
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: dlrmsPalette.divider,
            padding: '12px 16px',
            fontSize: '0.875rem',
          },
          head: {
            fontWeight: 600,
            backgroundColor: '#F8FAFC',
            color: dlrmsPalette.text.primary,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 600,
            fontSize: '0.75rem',
            height: 24,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#FFFFFF',
            color: dlrmsPalette.text.primary,
            boxShadow: 'none',
            borderBottom: `1px solid ${dlrmsPalette.divider}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#FFFFFF',
            borderRight: direction === 'ltr' ? `1px solid ${dlrmsPalette.divider}` : 'none',
            borderLeft: direction === 'rtl' ? `1px solid ${dlrmsPalette.divider}` : 'none',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
        },
      },
      MuiSelect: {
        defaultProps: {
          size: 'small',
        },
      },
    },
  };

  return createTheme(themeOptions);
};
