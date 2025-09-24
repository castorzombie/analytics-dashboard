import { useContext } from 'react';
import { KPIContext } from '../context/KPIContext.context';
import type { KPIContextValue } from '../context/KPIContext.context';

export function useKPI(): KPIContextValue {
  const context = useContext(KPIContext);
  if (!context) throw new Error('useKPI must be used within a KPIProvider');
  return context;
}