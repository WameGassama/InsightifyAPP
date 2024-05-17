'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ListItem from '../listItem';
import getChannels, { getChannelsAggregate } from '@/server/action';
import { Fragment, useState } from 'react';
import LoadMore from '../loadMore';
import Counter from '../counter';

const ListView = () => {
  const [limit, setLimit] = useState(10);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['channels', limit],
    queryFn: async () => await getChannels(0, limit),
    placeholderData: keepPreviousData,
  });

  const { data: count } = useQuery({
    queryKey: ['channels_aggregate'],
    queryFn: async () => await getChannelsAggregate(),
  });

  const loadMore = () => {
    setLimit((prev) => prev + 10); // Update limit
    refetch();
  };

  return (
    <Fragment>
      <Counter limit={limit} total={count?.channels_aggregate.count} />
      {data && (
        <ul className="flex flex-col space-y-10">
          {data.channels.map((channel, index) => {
            return (
              <ListItem
                key={index}
                color={channel.color}
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
      <LoadMore onClick={loadMore} isFetching={isFetching} />
    </Fragment>
  );
};

export default ListView;
