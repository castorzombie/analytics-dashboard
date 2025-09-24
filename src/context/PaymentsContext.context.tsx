import { createContext } from 'react';
import type { PaymentsContextValue } from './PaymentsContext';

export const PaymentsContext = createContext<PaymentsContextValue | undefined>(undefined);
