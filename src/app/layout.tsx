import type { Metadata } from 'next';
import ThemeRegistry from '../theme/ThemeRegistry';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import './globals.css';

export const metadata: Metadata = {
  title: 'Digital Land Record Management System (DLRMS) – Pakistan',
  description: 'Enterprise Land Revenue Administration Portal, Patwar Khana & Arazi Records Management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeRegistry>
          <DashboardLayout>{children}</DashboardLayout>
        </ThemeRegistry>
      </body>
    </html>
  );
}
