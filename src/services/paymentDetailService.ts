import { gql } from '@apollo/client';
import client from './apolloClient';

export const payment_detail_query = gql`
  query paymentdetail($id: ID!) {
    charge(id: $id) {
      id
      amount
      createdAt
      status
      description
      currency
      customer {
        email
        name
      }
      paymentMethod {
        method
        card {
          brand
          last4
        }
      }
      statusMessage
    }
  }
`;

export type paymentdetailresult = {
  charge: {
    id: string;
    amount: number;
    createdAt: number;
    status: string;
    description?: string;
    currency?: string;
    customer?: {
      email?: string;
      name?: string;
    };
    paymentMethod?: {
      method: string;
      card?: {
        brand: string;
        last4: string;
      };
    };
    statusMessage?: string;
  };
};

export async function fetchpaymentdetail(id: string) {
  const { data } = await client.query<paymentdetailresult>({
    query: payment_detail_query,
    variables: { id },
    fetchPolicy: 'network-only',
  });
  return data;
}
