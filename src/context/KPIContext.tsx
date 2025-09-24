import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { fetchchargeskpi } from '../services/chargesKPIService';
import type { chargeskpiresult } from '../services/chargesKPIService';

type KPIContextValue = {
  kpi: chargeskpiresult['chargesDateRangeKPI']['total'] | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

const KPIContext = createContext<KPIContextValue | undefined>(undefined);

/**
 * KPIProvider supplies KPI data and loading/error state to consumers via context.
 * @param children - React children to wrap with provider
 */
export const KPIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { now, oneYearAgo } = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    return { now, oneYearAgo: now - 365 * 24 * 60 * 60 };
  }, []);

  const [kpi, setKpi] = useState<KPIContextValue['kpi']>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches KPI data for the last year from the API.
   */
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchchargeskpi(oneYearAgo, now);
        if (data && data.chargesDateRangeKPI && data.chargesDateRangeKPI.total) {
          setKpi(data.chargesDateRangeKPI.total);
        } else {
          setKpi(null);
          setError('No KPI data available');
        }
      } catch {
        setError('Failed to fetch KPI data');
        setKpi(null);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <KPIContext.Provider value={{ kpi, loading, error, refresh: fetchData }}>
      {children}
    </KPIContext.Provider>
  );
};

/**
 * Custom hook to access KPI context.
 * Must be used within a KPIProvider.
 */
export function useKPI() {
  const context = useContext(KPIContext);
  if (!context) throw new Error('useKPI must be used within a KPIProvider');
  return context;
}
