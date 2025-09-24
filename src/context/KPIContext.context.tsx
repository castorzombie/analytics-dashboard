import { createContext } from 'react';
import type { chargeskpiresult } from '../services/chargesKPIService';

export type KPIContextValue = {
  kpi: chargeskpiresult['chargesDateRangeKPI']['total'] | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

export const KPIContext = createContext<KPIContextValue | undefined>(undefined);