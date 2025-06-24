'use client';
import { useState, useEffect } from 'react';
import '../css/euclid-circular-a-font.css';
import '../css/style.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { ModalProvider } from '../context/QuickViewModalContext';
import { CartModalProvider } from '../context/CartSidebarModalContext';
import { ReduxProvider } from '@/redux/provider';
import QuickViewModal from '@/components/Common/QuickViewModal';
import CartSidebarModal from '@/components/Common/CartSidebarModal';
import { PreviewSliderProvider } from '../context/PreviewSliderContext';
import PreviewSliderModal from '@/components/Common/PreviewSlider';

import ScrollToTop from '@/components/Common/ScrollToTop';
import PreLoader from '@/components/Common/PreLoader';
import AuthInitializer from '@/components/Auth/AuthInitializer';
import { Toaster } from 'react-hot-toast';
import CartInitializer from '@/components/Auth/CartInitializer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <>
            <ReduxProvider>
              <CartInitializer />
              <AuthInitializer />
              <CartModalProvider>
                <ModalProvider>
                  <PreviewSliderProvider>
                    <Header />
                    {children}

                    <QuickViewModal />
                    <CartSidebarModal />
                    <PreviewSliderModal />
                  </PreviewSliderProvider>
                </ModalProvider>
                <Footer />
              </CartModalProvider>
            </ReduxProvider>
            <ScrollToTop />
            <Toaster reverseOrder={false} />
          </>
        )}
      </body>
    </html>
  );
}
