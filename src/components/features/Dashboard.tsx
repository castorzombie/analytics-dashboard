import ColumnsChart from '../ui/ColumnsChart';
import { ChartSpinner } from '../ui/Spinners';
import { useKPI } from '../../hooks/useKPI';

const Dashboard = () => {
  const { loading } = useKPI();
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-2 sm:p-4 mb-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-200 text-center sm:text-left">
        Payments Overview
      </h2>
      <div className="w-full max-w-full">{loading ? <ChartSpinner /> : <ColumnsChart />}</div>
    </div>
  );
};

export default Dashboard;
