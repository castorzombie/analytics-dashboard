import { useContext } from 'react';
import { PaymentsContext } from '../context/PaymentsContext.context';

/**
 * Custom hook to access payment list context.
 * Must be used within a PaymentsProvider.
 */
export function usePayments() {
  const context = useContext(PaymentsContext);
  if (!context) throw new Error('usePayments must be used within a PaymentsProvider');
  return context;
}
