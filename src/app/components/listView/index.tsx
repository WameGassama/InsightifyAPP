'use client';

import { keepPreviousData, useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import ListItem from '../listItem';
import { Fragment, useEffect, useMemo, useState } from 'react';
import Counter from '../counter';
import GraphqlRequest from '@/server/action';
import channels from '@/graphql/channels';
import LoadMore from '../loadMore';
import { CiBookmark, CiBookmarkCheck, CiBookmarkRemove, CiUser } from 'react-icons/ci';
import StatsCard from '../statsCard';
import { useRouter, useSearchParams } from 'next/navigation';

const ListView = () => {
  const [limit, setLimit] = useState({ all_channels: 10, pending_channels: 10 });

  const all_channels = useQuery({
    queryKey: ['channels', limit.all_channels],
    queryFn: async () => await GraphqlRequest(channels.getChannelsQuery, { offeset: 0, limit: limit.all_channels }),
    placeholderData: keepPreviousData,
  });

  const pending_channels = useQuery({
    queryKey: ['channels', 'pending', limit.pending_channels],
    queryFn: async () =>
      await GraphqlRequest(channels.getChannelsQuery, { offeset: 0, limit: limit.pending_channels, status: 'Pending' }),
    placeholderData: keepPreviousData,
  });

  const { data: total_count, isFetching: total_count_fetching } = useQuery({
    queryKey: ['total_count'],
    queryFn: async () => await GraphqlRequest(channels.getCountQuery),
    placeholderData: keepPreviousData,
  });

  const { data: pending_count } = useQuery({
    queryKey: ['pending_count'],
    queryFn: async () => await GraphqlRequest(channels.getCountQuery, { _eq: 'Pending' }),
    placeholderData: keepPreviousData,
  });

  const { data: rejected_count } = useQuery({
    queryKey: ['rejected_count'],
    queryFn: async () => await GraphqlRequest(channels.getCountQuery, { _eq: 'Rejected' }),
    placeholderData: keepPreviousData,
  });

  const { data: accepted_count } = useQuery({
    queryKey: ['accepted_count'],
    queryFn: async () => await GraphqlRequest(channels.getCountQuery, { _eq: 'Accepted' }),
    placeholderData: keepPreviousData,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string | null }) =>
      await GraphqlRequest(channels.updateChannelMutation, { id, status }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['channels', limit.all_channels] });
      queryClient.invalidateQueries({ queryKey: ['channels', 'pending', limit.pending_channels] });
      queryClient.invalidateQueries({ queryKey: ['pending_count'] });
      queryClient.setQueryData(['channels', limit, variables.id], data.update_channel);
      queryClient.setQueryData(['channels', limit], (prev: Channels) => {
        const result = {
          channels: prev.channels.map((channel) => (channel.id === variables.id ? data.update_channel : channel)),
        };

        return result;
      });
    },
  });

  const params = useSearchParams();

  const status = params.get('status');

  const router = useRouter();

  const setStatus = (status: string | null) => {
    if (status) {
      router.push(`?status=${status}`);
    }

    if (!status) {
      router.push('/');
    }
  };

  const filtered = useMemo(() => {
    if (all_channels || pending_channels) {
      if (status === null) {
        return { type: 'all_channels', data: all_channels };
      } else {
        return { type: 'pending_channels', data: pending_channels };
      }
    }
  }, [status, all_channels, pending_channels]);

  const loadMore = () => {
    setLimit((prev) => {
      return {
        all_channels: filtered?.type === 'all_channels' ? prev.all_channels + 10 : prev.all_channels,
        pending_channels: filtered?.type === 'pending_channels' ? prev.pending_channels + 10 : prev.pending_channels,
      };
    });
    filtered && filtered.data.refetch();
  };

  const UpdateChannel = (id: string, status: string | null) => {
    mutate({
      id,
      status,
    });
  };

  return (
    <Fragment>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-black my-8">
        <StatsCard
          icon={<CiUser color="black" size={20} />}
          name="Total YouTube Channels"
          value={!total_count_fetching && total_count !== undefined ? total_count.channels_aggregate.count : null}
          status={null}
          setStatus={setStatus}
        />
        <StatsCard
          icon={<CiBookmarkCheck color="#22c55e" size={20} />}
          name="Accepted YouTube Channels"
          value={accepted_count !== undefined ? accepted_count.channels_aggregate.count : null}
          status={'accepted'}
          setStatus={setStatus}
        />
        <StatsCard
          icon={<CiBookmarkRemove color="#dc2626" size={20} />}
          name="Rejected YouTube Channels"
          value={rejected_count !== undefined ? rejected_count.channels_aggregate.count : null}
          status={'rejected'}
          setStatus={setStatus}
        />
        <StatsCard
          icon={<CiBookmark color="#fbbf24" size={20} />}
          name="Potential YouTube Channels"
          value={pending_count !== undefined ? pending_count.channels_aggregate.count : null}
          status={'pending'}
          setStatus={setStatus}
        />
      </div>

      {filtered?.data.data && (
        <Fragment>
          <Counter limit={filtered.data.data?.channels.length} />
          <ul className="flex flex-col space-y-10">
            {filtered.data.data?.channels.map((channel) => {
              return (
                <ListItem
                  key={channel.id}
                  id={channel.id}
                  route={status}
                  color={channel.color}
                  initials={channel.display_name}
                  display_name={channel.display_name}
                  handle={channel.handle}
                  subscribers={channel.statistics.total.subscribers}
                  uploads={channel.statistics.total.uploads}
                  views={channel.statistics.total.views}
                  status={channel.status}
                  updateChannel={UpdateChannel}
                />
              );
            })}
          </ul>
          {filtered.data.data.channels.length >= 10 && (
            <LoadMore onClick={loadMore} isFetching={filtered.data.isFetching} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ListView;
