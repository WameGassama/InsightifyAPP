import { ReactNode } from 'react';

interface StatsCard {
  status: string | null;
  icon: ReactNode;
  name: string;
  value: number | null;
  setStatus: (status: string | null) => void;
}

const StatsCard = ({ icon, name, value, setStatus, status }: StatsCard) => {
  return (
    <div
      className="rounded-xl border shadow-lg bg-white cursor-pointer hover:scale-105"
      onClick={() => setStatus(status)}
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

export default StatsCard;
