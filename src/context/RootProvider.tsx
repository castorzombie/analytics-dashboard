import React from 'react';
import { KPIProvider } from './KPIContext';
import { PaymentsProvider } from './PaymentsContext';

/**
 * RootProvider combines all context providers for the app.
 * Add more providers here as needed.
 */
export const RootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <KPIProvider>
    <PaymentsProvider>{children}</PaymentsProvider>
  </KPIProvider>
);
