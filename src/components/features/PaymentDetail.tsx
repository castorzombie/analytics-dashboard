import { useParams } from 'react-router-dom';
import React from 'react';
import { DotsSpinner } from '../ui/Spinners';
import { PaymentDetailProvider } from '../../context/PaymentDetailContext';
import { usePaymentDetail } from '../../hooks/usePaymentDetail';

function formatdate(unix: number) {
  return new Date(unix * 1000).toLocaleString();
}

const PaymentDetailContent: React.FC = () => {
  const { data, loading, error } = usePaymentDetail();
  const c = data?.charge;

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <DotsSpinner size={18} color="#64748b" />
      </div>
    );
  if (error)
    return <div className="text-red-600 text-center mt-10">Failed to load payment detail</div>;
  if (!c) return <div className="text-center text-gray-600 mt-10">Payment not found</div>;

  // Status badge color
  const statusColors: Record<string, string> = {
  Captured: 'bg-green-100 text-green-700',
  Succeeded: 'bg-green-100 text-green-700',
  Failed: 'bg-red-100 text-red-700',
  Refunded: 'bg-yellow-100 text-yellow-700',
  Pending: 'bg-blue-100 text-blue-700',
  default: 'bg-gray-100 text-gray-700',
  };
  const statusClass = statusColors[c.status] || statusColors.default;

  return (
    <div className="flex flex-col items-center min-h-screen py-8 px-2 bg-slate-900">
      <div className="bg-slate-900 shadow-xl rounded-2xl p-8 w-full max-w-2xl border border-slate-800">
        <div className="mb-8 flex flex-col items-start">
          <h2 className="text-2xl font-bold tracking-tight text-gray-100 mb-1">Payment</h2>
          <div
            className="text-lg font-mono text-gray-400 mb-2 break-words whitespace-pre-line"
            style={{ wordBreak: 'break-all' }}
          >
            #{c.id}
          </div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border border-opacity-30 border-current ${statusClass.replace('bg-', 'bg-opacity-30 bg-').replace('text-', 'text-')}`}
          >
            {c.status}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          <div className="p-3 bg-slate-800 rounded-lg">
            <div className="text-xs text-gray-400 font-medium mb-1">Amount</div>
            <div className="text-lg font-semibold text-gray-100">
              €{(c.amount / 100)?.toLocaleString()}
            </div>
          </div>
          <div className="p-3 bg-slate-800 rounded-lg">
            <div className="text-xs text-gray-400 font-medium mb-1">Date</div>
            <div className="text-base text-gray-200">{formatdate(c.createdAt)}</div>
          </div>
          <div className="p-3 bg-slate-800 rounded-lg">
            <div className="text-xs text-gray-400 font-medium mb-1">Description</div>
            <div className="text-base text-gray-200">{c.description || '-'}</div>
          </div>
          <div className="p-3 bg-slate-800 rounded-lg">
            <div className="text-xs text-gray-400 font-medium mb-1">Currency</div>
            <div className="text-base text-gray-200 uppercase">{c.currency || '-'}</div>
          </div>
          <div className="p-3 bg-slate-800 rounded-lg">
            <div className="text-xs text-gray-400 font-medium mb-1">Customer</div>
            <div className="text-base text-gray-200">
              {c.customer?.name || c.customer?.email || '-'}
            </div>
          </div>
          <div className="p-3 bg-slate-800 rounded-lg">
            <div className="text-xs text-gray-400 font-medium mb-1">Payment Method</div>
            <div className="text-base text-gray-200">
              {c.paymentMethod?.method || '-'}
              {c.paymentMethod?.card ? (
                <span className="ml-2 text-gray-400 text-sm">
                  ({c.paymentMethod.card.brand} ****{c.paymentMethod.card.last4})
                </span>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="sm:col-span-2 p-3 bg-slate-800 rounded-lg">
            <div className="text-xs text-gray-400 font-medium mb-1">Status Message</div>
            <div className="text-base text-gray-200">{c.statusMessage || '-'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <div className="text-center text-gray-600 mt-10">No payment ID provided</div>;
  return (
    <PaymentDetailProvider id={id}>
      <PaymentDetailContent />
    </PaymentDetailProvider>
  );
};

export default PaymentDetail;
