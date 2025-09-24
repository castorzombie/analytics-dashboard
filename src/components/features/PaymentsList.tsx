import React, { useState } from 'react';
import { table as Table } from '../ui/table';
import type { charge } from '../../services/chargesService';
// import { useQuery } from '@apollo/client/react';
// import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../ui/DatePicker';
import { Select } from '../ui/select';
import { RotateCcw } from 'lucide-react';

import { usePayments } from '../../hooks/usePayments';

const statusOptions = [
  { value: '', label: 'All' },
  { value: 'SUCCEEDED', label: 'Succeeded' },
  { value: 'FAILED', label: 'Failed' },
  { value: 'CANCELED', label: 'Canceled' },
  { value: 'EXPIRED', label: 'Expired' },
];

function formatdate(unix: number) {
  return new Date(unix * 1000).toLocaleString();
}

const PaymentsList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  // Data and refetch come from context. Variables for filtering are managed here and passed to refetch.
  const { data, loading, error, refetch } = usePayments();
  const items = React.useMemo(() => data?.charges?.items || [], [data]);
  const [cachedItems, setCachedItems] = useState<charge[]>([]);

  React.useEffect(() => {
    if (!loading && items.length > 0) {
      setCachedItems(items);
    }
  }, [items, loading]);

  // Build variables for the query
  const variables = {
    size: rowsPerPage,
    from: page * rowsPerPage,
    filter: {
      ...(status && { status: { eq: status } }),
      ...(from &&
        to && {
          createdAt: {
            gte: Math.floor(new Date(from).getTime() / 1000),
            lte: Math.floor(new Date(to).getTime() / 1000),
          },
        }),
    },
  };

  // Fetch data on mount and whenever filters/page change
  React.useEffect(() => {
    refetch(variables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, from, to, status]);

  const handleChangePage = (newPage: number) => setPage(newPage);
  const rowsPerPageOptions = [5, 10, 25, 50].map((n) => ({
    value: n.toString(),
    label: n.toString(),
  }));
  const handleChangeRowsPerPage = (val: string) => {
  setRowsPerPage(parseInt(val, 10));
  setPage(0);
  };

  const handleclear = () => {
  setFrom('');
  setTo('');
  setStatus('');
  setPage(0);
  };

  if (error) return <div className="text-red-600 text-center">Failed to load payments</div>;

  const columns = [
    {
      key: 'amount',
      label: 'Amount',
      render: (row: charge) => `€${(row.amount / 100).toLocaleString()}`,
      className: 'w-32',
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (row: charge) => formatdate(row.createdAt),
      className: 'w-48',
    },
    {
      key: 'status',
      label: 'Status',
      className: 'w-32',
    },
    {
      key: 'description',
      label: 'Reference ID',
  render: (row: charge) => row.description || '-',
      className: 'w-64',
    },
  ];

  return (
  <div className="bg-slate-900 shadow rounded-lg relative">
      <form
        className="flex flex-col sm:flex-row flex-wrap gap-2 mb-4 items-stretch sm:items-end"
        onSubmit={(e) => e.preventDefault()}
      >
        <DatePicker
          value={from}
          onChange={setFrom}
          label="From"
          className="w-full sm:w-auto min-w-[120px]"
        />
        <DatePicker
          value={to}
          onChange={setTo}
          label="To"
          className="w-full sm:w-auto min-w-[120px]"
        />
        <Select
          value={status}
          onChange={setStatus}
          options={statusOptions}
          label="Status"
          className="w-full sm:w-auto min-w-[120px]"
        />
        <button
          type="button"
          onClick={handleclear}
          className="flex items-center justify-center gap-1 bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg text-sm transition-colors border border-slate-600 w-full sm:w-auto mt-2 sm:mt-0"
        >
          <RotateCcw className="w-4 h-4" />
          Clear
        </button>
      </form>
      <Table
    columns={columns}
  data={loading ? cachedItems : items}
  loading={loading}
  emptyText="No payments found"
  onRowClick={(row: charge) => navigate(`/payments/${row.id}`)}
  className="mb-4"
      />
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
        <div>
          <span className="text-sm text-gray-400">
            Page {page + 1} of {Math.ceil((data?.charges?.total ?? 0) / rowsPerPage) || 1}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-2 border rounded-lg disabled:opacity-50 bg-slate-800 border-slate-700 text-slate-100 text-sm transition-colors duration-150 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
          >
            Prev
          </button>
          <button
            type="button"
            className="px-3 py-2 border rounded-lg disabled:opacity-50 bg-slate-800 border-slate-700 text-slate-100 text-sm transition-colors duration-150 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => handleChangePage(page + 1)}
            disabled={(page + 1) * rowsPerPage >= (data?.charges?.total ?? 0)}
          >
            Next
          </button>
          <Select
            value={rowsPerPage.toString()}
            onChange={handleChangeRowsPerPage}
            options={rowsPerPageOptions}
            className="min-w-[70px]"
            dropdownPosition="top-left"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentsList;
