'use client';

import { formatNumber } from '@/utils/formatNumber';
import { getInitials } from '@/utils/getInitials';
import { randomColor } from '@/utils/randomColor';
import Link from 'next/link';

interface Props {
  initials: string;
  display_name: string;
  handle: string;
  subscribers: number;
  uploads: number;
  views: number;
  color: string;
}

const ListItem = ({ initials, display_name, handle, subscribers, uploads, views, color }: Props) => {
  return (
    <li className="bg-white py-7 px-10 flex rounded-lg shadow-lg">
      <div className="flex w-[30%]">
        <div className="w-[25%]">
          <div className={`rounded-full w-16 h-16 flex justify-center items-center`} style={{ backgroundColor: color }}>
            <div className="text-white font-bold text-xl" data-testid="initials">
              {getInitials(initials)}
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-3 justify-center w-[75%]">
          <div className="text-black font-bold text-xl" data-testid="display name">
            {display_name}
          </div>
          <div>
            <Link className=" text-blue-500 font-bold" href={`https://www.youtube.com/${handle}`} data-testid="handle">
              {handle}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-[45%]">
        <div className="flex flex-col ml-3 justify-center w-4/12">
          <div className="text-black font-bold text-xl" data-testid="subscribers">
            {formatNumber(subscribers)}
          </div>
          <div className=" text-zinc-400">Subscribers</div>
        </div>
        <div className="flex flex-col ml-3 justify-center w-4/12">
          <div className="text-black font-bold text-xl" data-testid="uploads">
            {uploads}
          </div>
          <div className=" text-zinc-400">Uploads</div>
        </div>
        <div className="flex flex-col ml-3 justify-center w-4/12">
          <div className="text-black font-bold text-xl" data-testid="views">
            {formatNumber(views)}
          </div>
          <div className=" text-zinc-400">Views</div>
        </div>
      </div>
      <div className="w-[25%]">
        <div className="w-1/12"></div>
        <div className="w-1/12"></div>
        <div className="w-1/12"></div>
      </div>
    </li>
  );
};

export default ListItem;
