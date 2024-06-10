'use client';

import { formatNumber } from '@/utils/formatNumber';
import { getInitials } from '@/utils/getInitials';
import { randomColor } from '@/utils/randomColor';
import Link from 'next/link';
import { BsBookmarkFill } from 'react-icons/bs';
import { FaRegTimesCircle, FaTimesCircle } from 'react-icons/fa';
import { FaCircleCheck, FaRegCircleCheck } from 'react-icons/fa6';
import { FiBookmark } from 'react-icons/fi';
import Image from 'next/image';

interface Props {
  id: string;
  route: string | null;
  avatar: string | null;
  initials: string;
  status: string;
  display_name: string;
  handle: string;
  subscribers: number;
  uploads: number;
  views: number;
  color: string;
  updateChannel: (id: string, status: string | null) => void;
}

const ListItem = ({
  id,
  avatar,
  route,
  status,
  initials,
  display_name,
  handle,
  subscribers,
  uploads,
  views,
  color,
  updateChannel,
}: Props) => {
  return (
    <li className="bg-white flex rounded-lg shadow-lg overflow-hidden" style={{ overflowAnchor: 'none' }}>
      <Link className="flex w-[75%] py-7 cursor-pointer pl-10" href={`/youtube/${handle.replace('@', '')}`}>
        <div className="flex w-[35%]">
          <div className="w-[25%]">
            {avatar ? (
              <div className={`rounded-full border shadow-lg w-16 h-16 flex justify-center items-center relative`}>
                <Image
                  className="rounded-full"
                  src={avatar}
                  fill
                  alt={''}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div
                className={`rounded-full w-16 h-16 flex justify-center items-center`}
                style={{ backgroundColor: color }}
              >
                <div className="text-white font-bold text-xl" data-testid="initials">
                  {getInitials(initials)}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col ml-3 justify-center w-[75%]">
            <div className="text-black font-bold text-xl" data-testid="display name">
              {display_name}
            </div>
            <div className=" text-blue-500 font-bold" data-testid="handle">
              {handle}
            </div>
          </div>
        </div>
        <div className="flex w-[65%]">
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
      </Link>
      <div className="flex w-[25%] gap-5 py-7 pr-10">
        <div className={`${route === 'rejected' && 'order-last'} w-1/2 flex flex-col justify-center`}>
          {(route === 'pending' || route === 'rejected') && (
            <button
              onClick={() => updateChannel(id, 'Rejected')}
              className={`flex gap-2 rounded-full bg-white border border-black  text-black  hover:scale-105 font-bold py-2 px-5 items-center`}
              disabled={status === 'Rejected' ? true : false}
            >
              {status === 'Rejected' ? (
                <FaTimesCircle size={15} color="#000" />
              ) : (
                <FaRegTimesCircle size={17} color="#000" />
              )}
              {status === 'Rejected' ? 'Rejected' : 'Reject'}
            </button>
          )}
        </div>
        <div className="w-1/2 flex flex-col justify-center">
          {(route === 'pending' || route === 'accepted') && (
            <button
              onClick={() => updateChannel(id, 'Accepted')}
              className="flex gap-2 rounded-full bg-black text-white hover:scale-105 font-bold py-2 px-5 items-center"
              disabled={status === 'Accepted' ? true : false}
            >
              {status === 'Accepted' ? (
                <>
                  <FaCircleCheck size={15} color="#fff" />
                  Accepted
                </>
              ) : (
                <>
                  <FaRegCircleCheck size={17} color="#fff" />
                  Accept
                </>
              )}
            </button>
          )}
          {route === null && (
            <button
              onClick={() => updateChannel(id, status === 'Pending' ? null : 'Pending')}
              className="flex gap-2 rounded-full bg-white border text-black border-black hover:scale-105 font-bold py-2 px-5 items-center"
            >
              {status === 'Pending' ? <BsBookmarkFill size={15} color="#000" /> : <FiBookmark size={17} color="#000" />}
              {status === 'Pending' ? 'Saved' : 'Save'}
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default ListItem;
