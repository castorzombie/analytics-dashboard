import { createContext } from 'react';
import type { PaymentDetailContextValue } from './PaymentDetailContext';

export const PaymentDetailContext = createContext<PaymentDetailContextValue | undefined>(undefined);
