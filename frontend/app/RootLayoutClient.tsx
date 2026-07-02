'use client';

import { QueryProvider } from '@/lib/query/provider';
import { StoreHydrator } from '@/store/StoreHydrator';
import ErrorMonitoringProvider from '@/components/error/ErrorMonitoringProvider';
import NetworkStatusBanner from '@/components/error/NetworkStatusBanner';
import RateLimitNotifier from '@/components/error/RateLimitNotifier';
import { ErrorProvider } from '@/components/error/ErrorProvider';
import PwaController from '@/components/pwa/PwaController';
import { ModalProvider } from '@/contexts/ModalContext';
import { ModalManager } from '@/components/modals';
import { OfflineIndicator } from '@/components/offline';
import { ToastProvider } from '@/components/ui';
import { RouteAnnouncer } from '@/components/accessibility/RouteAnnouncer';

import Footer from '@/components/Footer';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ModalProvider>
        <ErrorProvider>
          <StoreHydrator />
          <ErrorMonitoringProvider />
          <PwaController />
          <NetworkStatusBanner />
          <RateLimitNotifier />
          <RouteAnnouncer />

          <a
            href="#main-content"
            suppressHydrationWarning
            className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-600 focus:border focus:border-blue-600 focus:rounded-md font-semibold shadow-md"
          >
            Skip to main content
          </a>

          <main id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </main>

          <Footer />

          <ModalManager />
          <OfflineIndicator />
          <ToastProvider />
        </ErrorProvider>
      </ModalProvider>
    </QueryProvider>
  );
}
