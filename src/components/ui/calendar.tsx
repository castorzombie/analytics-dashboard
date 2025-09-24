import * as React from 'react';
import {
  addMonths,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from 'date-fns';

interface calendarprops {
  mode?: string;
  selected?: Date;
  onSelect?: (date: Date) => void;
  initialFocus?: boolean;
  className?: string;
}

export const Calendar: React.FC<calendarprops> = ({
  // mode,
  selected,
  onSelect,
  initialFocus,
  className = '',
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(selected || new Date());
  const startMonth = startOfMonth(currentMonth);
  const endMonth = endOfMonth(currentMonth);
  const startDate = startOfWeek(startMonth, { weekStartsOn: 1 });
  const endDate = endOfWeek(endMonth, { weekStartsOn: 1 });
  const days: Date[] = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div
      className={`p-4 bg-slate-800 text-slate-100 rounded-lg shadow w-full min-w-0 sm:w-72 ${className}`}
      style={{ maxWidth: 400 }}
      tabIndex={initialFocus ? 0 : -1}
    >
      <div className="flex justify-between items-center mb-2">
        <button
          className="p-1 rounded hover:bg-slate-700"
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
          aria-label="Previous month"
        >
          <span className="text-lg">&#8592;</span>
        </button>
        <span className="font-semibold">{format(currentMonth, 'MMMM yyyy')}</span>
        <button
          className="p-1 rounded hover:bg-slate-700"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          aria-label="Next month"
        >
          <span className="text-lg">&#8594;</span>
        </button>
      </div>
      <div className="grid grid-cols-7 text-xs mb-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <div key={d} className="text-center text-slate-400">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => {
          const isCurrentMonth = isSameMonth(d, currentMonth);
          const isSelected = selected && isSameDay(d, selected);
          return (
            <button
              key={d.toISOString()}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-100
                ${isSelected ? 'bg-blue-600 text-white' : isCurrentMonth ? 'hover:bg-slate-700' : 'text-slate-500'}`}
              disabled={!isCurrentMonth}
              onClick={() => onSelect && onSelect(d)}
              tabIndex={isCurrentMonth ? 0 : -1}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
