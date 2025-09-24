import React, { useState, useCallback } from 'react';
import { PaymentsContext } from './PaymentsContext.context';
import type { ReactNode } from 'react';
import { fetchcharges} from '../services/chargesService';
import type { chargesresult } from '../services/chargesService';

export type PaymentsContextValue = {
  data: chargesresult | undefined;
  loading: boolean;
  error: string | null;
  refetch: (variables?: Record<string, unknown>) => Promise<void>;
};


/**
 * PaymentsProvider supplies payment list data and loading/error state to consumers via context.
 * @param children - React children to wrap with provider
 */
export const PaymentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<chargesresult | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const refetch = useCallback(async (variables?: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchcharges(variables || {});
      setData(result);
    } catch {
      setError('Failed to load payments');
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <PaymentsContext.Provider value={{ data, loading, error, refetch }}>
      {children}
    </PaymentsContext.Provider>
  );
};

