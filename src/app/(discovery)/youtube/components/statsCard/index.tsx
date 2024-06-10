import { ReactNode } from 'react';

interface StatsCard {
  status?: string | null | undefined;
  icon: ReactNode;
  name: string;
  value: number | string | null;
  setStatus?: ((status: string | null) => void) | null | undefined;
  hover?: boolean;
}

const StatsCard = ({ icon, name, value, setStatus = null, status, hover }: StatsCard) => {
  return (
    <div
      className={`rounded-xl border shadow-lg bg-white cursor-pointer text-black ${hover && 'hover:scale-105'}`}
      onClick={() => {
        if (setStatus !== null && status !== undefined) {
          setStatus(status);
        }
      }}
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
