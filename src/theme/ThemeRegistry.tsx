'use client';

import * as React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { useAppStore } from '../store/useAppStore';
import { getAppTheme } from './theme';

function createEmotionCache(isRtl: boolean) {
  if (isRtl) {
    return createCache({
      key: 'muirtl',
      stylisPlugins: [prefixer, rtlPlugin],
    });
  }
  return createCache({
    key: 'mui',
  });
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const { direction, language } = useAppStore();
  const isRtl = direction === 'rtl';

  const cache = React.useMemo(() => createEmotionCache(isRtl), [isRtl]);
  const theme = React.useMemo(() => getAppTheme(direction, language), [direction, language]);

  React.useEffect(() => {
    document.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
