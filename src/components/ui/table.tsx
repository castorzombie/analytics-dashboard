import React from 'react';
import { DotsSpinner } from './Spinners';

interface column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface tableprops<T> {
  columns: column<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function table<T extends { id?: string | number }>({
  columns,
  data,
  loading,
  emptyText = 'No data found',
  onRowClick,
  className = '',
}: tableprops<T>) {
  const isEmpty = data.length === 0;
  const minHeight = (isEmpty || loading) ? 220 : 'initial';
  return (
    <>
    <div
      className={`relative bg-slate-800 shadow rounded-lg overflow-x-auto ${className}`}
      style={{ WebkitOverflowScrolling: 'touch', minHeight }}
    > 
      <table className="min-w-full text-sm text-slate-100 w-full block sm:table">
  {/* Hide table header on mobile */}
        <thead className="hidden sm:table-header-group">
          <tr className="bg-slate-700 sm:table-row">
            {columns.map((col) => (
              <th
                key={col.key as string}
                className={`p-2 text-left font-semibold whitespace-normal break-words sm:table-cell ${col.className || ''}`}
                style={{ wordBreak: 'break-word' }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block sm:table-row-group">
          {data.length === 0 && !loading && (
            <tr className="block sm:table-row">
              <td
                colSpan={columns.length}
                className="text-center py-4 text-slate-400 block sm:table-cell"
              >
                {emptyText}
              </td>
            </tr>
          )}
          {data.map((row) => (
            <tr
              key={row.id ?? JSON.stringify(row)}
              className={`hover:bg-slate-700 cursor-pointer transition-colors duration-100 block sm:table-row border-b border-slate-700`}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((col) => (
                <td
                  key={col.key as string}
                  className={`p-2 whitespace-normal break-words block sm:table-cell ${col.className || ''}`}
                  style={{ wordBreak: 'break-word' }}
                >
                  {/* On mobile, show the column label as a title above the value */}
                  <span className="block font-semibold text-xs text-slate-400 mb-1 sm:hidden">
                    {col.label}
                  </span>
                  {col.render ? col.render(row) : (row[col.key as keyof T] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none" style={{ background: 'rgba(0,0,0,0.1)' }}>
          <DotsSpinner size={18} color="#64748b" />
        </div>
      )}
    </div></>
  );
}
