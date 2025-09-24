import { useContext } from 'react';
import { KPIContext } from '../context/KPIContext.context';

/**
 * Custom hook to access KPI context.
 * Must be used within a KPIProvider.
 */
export function useKPI() {
  const context = useContext(KPIContext);
  if (!context) throw new Error('useKPI must be used within a KPIProvider');
  return context;
}
