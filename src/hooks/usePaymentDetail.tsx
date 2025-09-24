import { useContext } from 'react';
import { PaymentDetailContext } from '../context/PaymentDetailContext.context';

/**
 * Custom hook to access payment detail context.
 * Must be used within a PaymentDetailProvider.
 */
import type { PaymentDetailContextValue } from '../context/PaymentDetailContext';

export function usePaymentDetail(): PaymentDetailContextValue {
  const context = useContext(PaymentDetailContext);
  if (!context) throw new Error('usePaymentDetail must be used within a PaymentDetailProvider');
  return context!;
}
