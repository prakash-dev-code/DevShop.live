'use client';
import { useState, useEffect } from 'react';
import '../css/euclid-circular-a-font.css';
import '../css/style.css';

import { ReduxProvider } from '@/redux/provider';
import PreLoader from '@/components/Common/PreLoader';
import { InnerLayout } from './innerLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <ReduxProvider>
            <InnerLayout>{children}</InnerLayout>
          </ReduxProvider>
        )}
      </body>
    </html>
  );
}
