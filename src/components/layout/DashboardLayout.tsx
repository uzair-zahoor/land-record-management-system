'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useAppStore } from '../../store/useAppStore';

const DRAWER_WIDTH = 280;

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { sidebarOpen, notification, hideNotification, direction } = useAppStore();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
          ...(sidebarOpen && {
            ...(direction === 'ltr' ? { ml: `${DRAWER_WIDTH}px` } : { mr: `${DRAWER_WIDTH}px` }),
          }),
        }}
      >
        {/* Top Navigation Bar */}
        <TopBar />

        {/* Dynamic Page Container */}
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, flexGrow: 1 }}>
          {children}
        </Box>
      </Box>

      {/* Global Application Snackbar Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={hideNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'rtl' ? 'left' : 'right' }}
      >
        <Alert onClose={hideNotification} severity={notification.severity} sx={{ width: '100%', fontWeight: 600 }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
