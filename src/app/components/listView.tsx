'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ListItem from './listItem';
import getChannels from '@/server/action';
import { randomColor } from '@/utils/randomColor';
import { Fragment, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const ListView = () => {
  const [load, setLoad] = useState({ start: 0, end: 10 });
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ['channels', page],
    queryFn: () => getChannels(page),
    placeholderData: keepPreviousData,
  });

  return (
    <Fragment>
      <div className="flex py-5">
        <div className="w-[30%]">
          {/* <div className="text-black font-bold">
            Showing {0} - {load.end} of {count?.channels.length.toLocaleString('EN')} channels
          </div> */}
        </div>
      </div>
      {data && (
        <ul className="flex flex-col space-y-10">
          {data.channels.slice(load.start, load.end).map((channel, index) => {
            return (
              <ListItem
                key={index}
                color={randomColor()}
                initials={channel.display_name}
                display_name={channel.display_name}
                handle={channel.handle}
                subscribers={channel.statistics.total.subscribers}
                uploads={channel.statistics.total.uploads}
                views={channel.statistics.total.views}
              />
            );
          })}
        </ul>
      )}
      <div className="z-10 flex py-14">
        <button
          className="flex items-center py-3 mx-auto text-sm font-light text-white rounded-full cursor-pointer px-7 bg-[#61CE70] hover:bg-opacity-90 font-filson"
          onClick={() => {
            setPage((prev) => prev + 1);
            setLoad((prev) => {
              return { start: prev.start, end: prev.end + 10 };
            });
          }}
        >
          <span className="not-italic font-normal font-filson">Load More</span>
          <span className="flex my-auto ml-2">{isFetching && <ClipLoader color={'#FFFFFF'} size={15} />}</span>
        </button>
      </div>
    </Fragment>
  );
};

export default ListView;
