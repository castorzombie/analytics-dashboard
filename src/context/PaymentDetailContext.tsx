import React, { useState, useCallback } from 'react';
import { PaymentDetailContext } from './PaymentDetailContext.context';
import type { ReactNode } from 'react';
import { fetchpaymentdetail } from '../services/paymentDetailService';
import type {  paymentdetailresult } from '../services/paymentDetailService';

export type PaymentDetailContextValue = {
  data: paymentdetailresult | undefined;
  loading: boolean;
  error: string | null;
  refetch: (id: string) => Promise<void>;
};


/**
 * PaymentDetailProvider supplies payment detail data and loading/error state to consumers via context.
 * @param children - React children to wrap with provider
 */
export const PaymentDetailProvider: React.FC<{ id: string; children: ReactNode }> = ({ id, children }) => {
  const [data, setData] = useState<paymentdetailresult | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /**
   * Refetches payment detail data from the API.
   * @param id - Payment ID
   */
  const refetch = useCallback(async (idParam: string) => {
    setLoading(true);
    setError(null);
    try {
  const result = await fetchpaymentdetail(idParam);
      setData(result);
    } catch {
      setError('Failed to load payment detail');
      setData(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (id) {
      refetch(id);
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <PaymentDetailContext.Provider value={{ data, loading, error, refetch }}>
      {children}
    </PaymentDetailContext.Provider>
  );
};

