import { gql } from '@apollo/client';
import client from './apolloClient';

export const charges_query = gql`
  query charges($size: Int, $from: Int, $filter: SearchableChargeFilterInput) {
    charges(size: $size, from: $from, filter: $filter) {
      items {
        id
        amount
        createdAt
        status
        description
        currency
      }
      total
    }
  }
`;

export type charge = {
  id: string;
  amount: number;
  createdAt: number;
  status: string;
  description?: string;
  currency?: string;
};

export type chargesresult = {
  charges: {
    items: charge[];
    total: number;
  };
};

export async function fetchcharges(variables: any) {
  const { data } = await client.query<chargesresult>({
    query: charges_query,
    variables,
    fetchPolicy: 'network-only',
  });
  return data;
}
