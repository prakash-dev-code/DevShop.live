'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ModalProvider } from '../context/QuickViewModalContext';
import { CartModalProvider } from '../context/CartSidebarModalContext';
import QuickViewModal from '@/components/Common/QuickViewModal';
import CartSidebarModal from '@/components/Common/CartSidebarModal';
import { PreviewSliderProvider } from '../context/PreviewSliderContext';
import PreviewSliderModal from '@/components/Common/PreviewSlider';
import ScrollToTop from '@/components/Common/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import CartInitializer from '@/components/Auth/CartInitializer';
import AuthInitializer from '@/components/Auth/AuthInitializer';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function InnerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.auth.user);
  const shouldShowNavbar = !user || user.role === 'user' || user.role === 'staff';

  // 🛡️ Protect routes for admin
  useEffect(() => {
    if (user?.role === 'admin') {
      const allowedAdminPaths = [
        '/dashboard',
        '/dashboard/products',
        '/dashboard/orders',
        '/dashboard/users',
      ];

      const isAllowed = allowedAdminPaths.some(path => pathname.startsWith(path));

      // Redirect if admin tries to access any other route (like /)
      if (!isAllowed) {
        router.replace('/dashboard');
      }
    }
  }, [user, pathname, router]);
  return (
    <>
      <CartInitializer />
      <AuthInitializer />
      <CartModalProvider>
        <ModalProvider>
          <PreviewSliderProvider>
            {shouldShowNavbar && <Header />}
            {children}
            <QuickViewModal />
            <CartSidebarModal />
            <PreviewSliderModal />
          </PreviewSliderProvider>
        </ModalProvider>
        {shouldShowNavbar && <Footer />}
      </CartModalProvider>
      <ScrollToTop />
      <Toaster reverseOrder={false} />
    </>
  );
}
