import { Area, AreaConfig } from '@ant-design/plots';
import { LuLineChart } from 'react-icons/lu';

const LineChart = ({ config, stats }: { stats: string; config: AreaConfig }) => {
  return (
    <div className="bg-white shadow-lg border rounded-lg p-6 w-full">
      <div className="text-black pb-10 flex gap-3 items-center">
        <div>
          <LuLineChart size={20} />
        </div>
        <div className="font-bold">{`Last 7 days (Gained ${stats})`}</div>
      </div>
      <Area {...config} />
    </div>
  );
};

export default LineChart;
