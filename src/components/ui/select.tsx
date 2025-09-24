import * as React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface statusoption {
  value: string;
  label: string;
}

interface selectprops {
  value: string;
  onChange: (value: string) => void;
  options: statusoption[];
  label?: string;
  className?: string;
  placeholder?: string;
  dropdownPosition?: 'bottom' | 'top' | 'left' | 'right' | 'top-left' | 'bottom-left';
}

export const Select: React.FC<selectprops> = ({
  value,
  onChange,
  options,
  label,
  className = '',
  placeholder = 'Select status',
  dropdownPosition = 'bottom',
}) => {
  const [open, setOpen] = React.useState(false);
  const selected = options.find((opt: statusoption) => opt.value === value);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1 select-none">{label}</label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-full flex items-center justify-between border rounded-lg px-3 py-2 text-sm bg-slate-800 text-slate-100 border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow transition-colors duration-150 hover:border-blue-400 focus:border-blue-500"
          >
            <span className={selected ? '' : 'text-slate-400'}>
              {selected ? selected.label : placeholder}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-slate-300 ml-2"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M6 8l4 4 4-4"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className={`p-0 bg-slate-800 border-slate-700 text-slate-100 rounded-lg shadow mt-1 ${dropdownPosition === 'top' || dropdownPosition === 'top-left' ? 'mb-1' : ''}`}
          side={
            dropdownPosition === 'top' || dropdownPosition === 'top-left'
              ? 'top'
              : dropdownPosition === 'left'
                ? 'left'
                : dropdownPosition === 'right'
                  ? 'right'
                  : 'bottom'
          }
          align={
            dropdownPosition === 'top-left' || dropdownPosition === 'bottom-left'
              ? 'start'
              : 'center'
          }
        >
          <ul
            className="py-1 w-full"
            style={{ maxHeight: 220, overflowY: 'auto', minWidth: 80, width: '100%' }}
          >
            {options.map((opt: statusoption) => (
              <li key={opt.value} className="w-full">
                <button
                  type="button"
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition-colors duration-100 whitespace-normal break-words ${value === opt.value ? 'bg-blue-600 text-white' : ''}`}
                  style={{ width: '100%', wordBreak: 'break-word' }}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};
