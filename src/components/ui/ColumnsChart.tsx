import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useKPI } from '../../hooks/useKPI';

// Define color pairs for Amount and Count for each KPI
const KPI_KEYS = [
  { key: 'Succeeded', label: 'Succeeded', amountColor: '#60a5fa', countColor: '#2563eb' },
  { key: 'Captured', label: 'Captured', amountColor: '#818cf8', countColor: '#3730a3' },
  { key: 'Failed', label: 'Failed', amountColor: '#f87171', countColor: '#b91c1c' },
  { key: 'Refunded', label: 'Refunded', amountColor: '#facc15', countColor: '#b45309' },
];

// Transform KPI context data to chart data
import type { chargeskpiresult } from '../../services/chargesKPIService';
interface ChartKPI {
  name: string;
  amount: number;
  count: number;
}
function kpiToChartData(kpi: chargeskpiresult['chargesDateRangeKPI']['total'] | null): ChartKPI[] {
  if (!kpi) return [];
  type KPIMap = {
    succeededCount: number;
    succeededAmount: number;
    capturedCount: number;
    capturedAmount: number;
    failedCount: number;
    failedAmount: number;
    refundedCount: number;
    refundedAmount: number;
  };
  const kpiObj = (kpi ?? {}) as Partial<KPIMap>;
  return KPI_KEYS.map(({ key, label }) => {
    const amountKey = (key.toLowerCase() + 'Amount') as keyof KPIMap;
    const countKey = (key.toLowerCase() + 'Count') as keyof KPIMap;
    return {
      name: label,
      amount: (kpiObj[amountKey] ?? 0) / 100,
      count: kpiObj[countKey] ?? 0,
    };
  });
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: ChartKPI }>;
  label?: string;
}
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const kpi = KPI_KEYS.find((k) => k.label === label);
    return (
      <div
        style={{
          background: '#181f2a',
          border: '2px solid #334155', // always neutral border
          color: '#f1f5f9',
          minWidth: 120,
          borderRadius: 12,
          boxShadow: '0 2px 8px #0008',
          padding: 14,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 6, color: kpi ? kpi.amountColor : '#60a5fa' }}>
          {label}
        </div>
        <div style={{ color: kpi ? kpi.amountColor : '#60a5fa', fontWeight: 500 }}>
          Amount:{' '}
          <span style={{ color: kpi?.amountColor, fontFamily: 'monospace' }}>
            €{data.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div style={{ color: kpi ? kpi.countColor : '#b45309', fontWeight: 500 }}>
          Count:{' '}
          <span style={{ color: kpi?.countColor, fontFamily: 'monospace' }}>{data.count}</span>
        </div>
      </div>
    );
  }
  return null;
};

const ColumnsChart: React.FC = () => {
  const { kpi, loading, error } = useKPI();
  const data = kpiToChartData(kpi);

  if (loading)
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div
      className="w-full flex justify-center items-center select-none focus:outline-none focus:ring-0 focus:border-0 active:outline-none active:ring-0 active:border-0"
      style={{
        outline: 'none',
        border: 'none',
        boxShadow: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
      tabIndex={-1}
    >
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 24, right: 40, left: 40, bottom: 0 }}
          barCategoryGap={'20%'}
          barGap={8}
        >
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            stroke="#cbd5e1"
            tick={{ fill: '#cbd5e1', fontWeight: 600, fontSize: 16 }}
            interval={0}
            padding={{ left: 40, right: 40 }}
            tickFormatter={(value: string) => {
              if (window.innerWidth < 640) return '';
              return value;
            }}
          />
          <YAxis
            stroke="#cbd5e1"
            tick={{ fill: '#cbd5e1', fontWeight: 600, fontSize: 15 }}
            width={window.innerWidth < 640 ? 0 : 90}
            allowDecimals={false}
            tickFormatter={(v) => {
              if (window.innerWidth < 640) return '';
              // Abbreviate large numbers for desktop
              if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M';
              if (v >= 1_000) return (v / 1_000).toFixed(1) + 'k';
              return v.toLocaleString();
            }}
            domain={[0, 'auto']}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#334155', opacity: 0.2 }} />
          <Bar
            dataKey="amount"
            name="Amount"
            isAnimationActive={false}
            barSize={56}
            maxBarSize={80}
            minPointSize={6}
            radius={[10, 10, 0, 0]}
            fill="#60a5fa"
          >
            {data.map((_, index: number) => (
              <Cell key={`cell-${index}`} fill={KPI_KEYS[index]?.amountColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ColumnsChart;
