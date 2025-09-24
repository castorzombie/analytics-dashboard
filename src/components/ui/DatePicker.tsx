import * as React from 'react';
import { format, parse } from 'date-fns';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface datepickerprops {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

export const DatePicker: React.FC<datepickerprops> = ({
  value,
  onChange,
  placeholder = 'Select date',
  className = '',
  label,
}) => {
  const [open, setOpen] = React.useState(false);
  const selectedDate = value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1 select-none">{label}</label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-full flex items-center justify-between border rounded-lg px-3 py-2 text-sm bg-slate-800 text-slate-100 border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow transition-colors duration-150 placeholder-slate-400 hover:border-blue-400 focus:border-blue-500"
          >
            <span
              className={selectedDate ? '' : 'text-slate-400'}
              style={{ minWidth: '7.5em', display: 'inline-block' }}
            >
              {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : placeholder}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="3" y="7" width="18" height="14" rx="2" fill="none" stroke="currentColor" />
              <path d="M16 3v4M8 3v4M3 11h18" stroke="currentColor" />
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-0 sm:w-auto sm:min-w-[18rem] p-0 bg-slate-800 border-slate-700 text-slate-100">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date: Date | undefined) => {
              setOpen(false);
              if (date) onChange(format(date, 'yyyy-MM-dd'));
            }}
            initialFocus
            className="bg-slate-800 text-slate-100 rounded-lg shadow"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
