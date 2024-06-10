import { Dispatch, ReactNode, SetStateAction } from 'react';

interface Stats {
  icon: ReactNode;
  name: string;
  value: number | string | null;
  stats: string;
  setStats: Dispatch<SetStateAction<string>>;
}

const Stats = ({ icon, name, value, stats, setStats }: Stats) => {
  return (
    <div
      className={`rounded-xl border shadow-lg bg-white cursor-pointer text-black 'hover:scale-105 ${
        stats.toLowerCase() === name.toLowerCase() && 'border-[#0756FB]'
      }`}
      onClick={() => setStats(name)}
    >
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm">{name}</h3>
        {icon}
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default Stats;
