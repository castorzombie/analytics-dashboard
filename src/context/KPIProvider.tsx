import React, { useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { fetchchargeskpi } from '../services/chargesKPIService';
import { KPIContext } from './KPIContext.context';
import type { KPIContextValue } from './KPIContext.context';

export const KPIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { now, oneYearAgo } = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    return { now, oneYearAgo: now - 365 * 24 * 60 * 60 };
  }, []);

  const [kpi, setKpi] = useState<KPIContextValue['kpi']>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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