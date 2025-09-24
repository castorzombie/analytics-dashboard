import { gql } from '@apollo/client';
import client from './apolloClient';

export const charges_kpi_query = gql`
  query chargesdaterangekpi($start: Int, $end: Int) {
    chargesDateRangeKPI(start: $start, end: $end) {
      currency
      total {
        succeededCount
        succeededAmount
        capturedCount
        capturedAmount
        failedCount
        failedAmount
        refundedCount
        refundedAmount
      }
    }
  }
`;

export type chargeskpiresult = {
  chargesDateRangeKPI: {
    currency: string;
    total: {
      succeededCount: number;
      succeededAmount: number;
      capturedCount: number;
      capturedAmount: number;
      failedCount: number;
      failedAmount: number;
      refundedCount: number;
      refundedAmount: number;
    };
  };
};

export async function fetchchargeskpi(start: number, end: number) {
  const { data } = await client.query<chargeskpiresult>({
    query: charges_kpi_query,
    variables: { start, end },
    fetchPolicy: 'network-only',
  });
  return data;
}
