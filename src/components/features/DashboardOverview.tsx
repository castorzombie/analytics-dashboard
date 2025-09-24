import React from 'react';
import { useKPI } from '../../context/KPIContext';
import { Card, CardContent } from '../ui/card';
import { Banknote, BanknoteX, BanknoteArrowDown, BanknoteArrowUp, EuroIcon } from 'lucide-react';
import { DotsSpinner } from '../ui/Spinners';

const DashboardOverview: React.FC = () => {
  const { kpi, loading, error } = useKPI();

  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[...Array(5)].map((_, i) => (
          <Card
            key={i}
            className="bg-slate-800 border border-slate-700 shadow rounded-lg flex flex-col items-center"
          >
            <CardContent className="flex flex-col items-center justify-center pt-4 pb-4 px-4 h-full min-h-[120px]">
              <DotsSpinner size={18} color="#64748b" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  const cards = [
    {
      label: 'Total Amount',
      value: kpi?.succeededAmount ? `€${(kpi.succeededAmount / 100).toLocaleString()}` : '-',
      icon: <EuroIcon className="w-6 h-6 text-blue-400 mb-2" />,
    },
    {
      label: 'Total Payments',
      value: kpi?.succeededCount ?? '-',
      icon: <Banknote className="w-6 h-6 text-green-400 mb-2" />,
    },
    {
      label: 'Captured Amount',
      value: kpi?.capturedAmount ? `€${(kpi.capturedAmount / 100).toLocaleString()}` : '-',
      icon: <BanknoteArrowUp className="w-6 h-6 text-indigo-400 mb-2" />,
    },
    {
      label: 'Failed Count',
      value: kpi?.failedCount ?? '-',
      icon: <BanknoteX className="w-6 h-6 text-red-400 mb-2" />,
    },
    {
      label: 'Refunded Amount',
      value: kpi?.refundedAmount ? `€${(kpi.refundedAmount / 100).toLocaleString()}` : '-',
      icon: <BanknoteArrowDown className="w-6 h-6 text-yellow-400 mb-2" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      {cards.map((card) => (
        <Card
          key={card.label}
          className="bg-slate-800 border border-slate-700 text-background-foreground shadow rounded-lg flex flex-col items-center"
        >
          <CardContent className="flex flex-col items-center justify-center pt-4 pb-4 px-4 h-full">
            {card.icon}
            <div className="text-gray-400 text-sm mb-2">{card.label}</div>
            <div className="text-2xl font-bold text-white">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardOverview;
