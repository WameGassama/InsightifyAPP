'use client';

import { keepPreviousData, useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import ListItem from '../listItem';
import { Fragment, useMemo, useState } from 'react';
import Counter from '../counter';
import GraphqlRequest from '@/server/action';
import channels from '@/graphql/channels';
import LoadMore from '../loadMore';
import { CiBookmark, CiBookmarkCheck, CiBookmarkRemove, CiUser } from 'react-icons/ci';
import StatsCard from '../statsCard';
import { useRouter, useSearchParams } from 'next/navigation';
import NoListItem from '../noListItem';

const ListView = () => {
  const [limit, setLimit] = useState({
    all_channels: 10,
    pending_channels: 10,
    accepted_channels: 10,
    rejected_channels: 10,
  });

  const all_channels = useQuery({
    queryKey: ['channels', limit.all_channels],
    queryFn: async () =>
      await GraphqlRequest(channels.getChannelsQuery, {
        offeset: 0,
        limit: limit.all_channels,
        status: { _in: ['Pending', 'null'] },
      }),
    placeholderData: keepPreviousData,
  });

  const pending_channels = useQuery({
    queryKey: ['pending_channels', limit.pending_channels],
    queryFn: async () =>
      await GraphqlRequest(channels.getChannelsQuery, {
        offeset: 0,
        limit: limit.pending_channels,
        status: { _eq: 'Pending' },
      }),
    placeholderData: keepPreviousData,
  });
  const accepted_channels = useQuery({
    queryKey: ['accepted_channels', limit.accepted_channels],
    queryFn: async () =>
      await GraphqlRequest(channels.getChannelsQuery, {
        offeset: 0,
        limit: limit.accepted_channels,
        status: { _eq: 'Accepted' },
      }),
    placeholderData: keepPreviousData,
  });
  const rejected_channels = useQuery({
    queryKey: ['rejected_channels', limit.rejected_channels],
    queryFn: async () =>
      await GraphqlRequest(channels.getChannelsQuery, {
        offeset: 0,
        limit: limit.rejected_channels,
        status: { _eq: 'Rejected' },
      }),
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
      queryClient.invalidateQueries({ queryKey: ['pending_channels', limit.pending_channels] });
      queryClient.invalidateQueries({ queryKey: ['accepted_channels', limit.pending_channels] });
      queryClient.invalidateQueries({ queryKey: ['rejected_channels', limit.pending_channels] });
      queryClient.invalidateQueries({ queryKey: ['total_count'] });
      queryClient.invalidateQueries({ queryKey: ['accepted_count'] });
      queryClient.invalidateQueries({ queryKey: ['rejected_count'] });
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
    if (all_channels || pending_channels || accepted_channels || rejected_channels) {
      if (status === null) {
        return {
          type: 'all_channels',
          data: all_channels,
          loadMore: total_count?.channels_aggregate && total_count?.channels_aggregate.count > limit.all_channels,
        };
      }
      if (status === 'pending') {
        return {
          type: 'pending_channels',
          data: pending_channels,
          loadMore:
            pending_count?.channels_aggregate && pending_count?.channels_aggregate.count > limit.pending_channels,
        };
      }
      if (status === 'accepted') {
        return {
          type: 'accepted_channels',
          data: accepted_channels,
          loadMore:
            accepted_count?.channels_aggregate && accepted_count?.channels_aggregate.count > limit.accepted_channels,
        };
      }
      if (status === 'rejected') {
        return {
          type: 'rejected_channels',
          data: rejected_channels,
          loadMore:
            rejected_count?.channels_aggregate && rejected_count?.channels_aggregate.count > limit.rejected_channels,
        };
      }
    }
  }, [
    status,
    all_channels,
    pending_channels,
    accepted_channels,
    rejected_channels,
    accepted_count?.channels_aggregate,
    limit.accepted_channels,
    limit.all_channels,
    limit.pending_channels,
    limit.rejected_channels,
    pending_count?.channels_aggregate,
    rejected_count?.channels_aggregate,
    total_count?.channels_aggregate,
  ]);

  const loadMore = () => {
    setLimit((prev) => {
      return {
        all_channels: filtered?.type === 'all_channels' ? prev.all_channels + 10 : prev.all_channels,
        pending_channels: filtered?.type === 'pending_channels' ? prev.pending_channels + 10 : prev.pending_channels,
        accepted_channels:
          filtered?.type === 'accepted_channels' ? prev.accepted_channels + 10 : prev.accepted_channels,
        rejected_channels:
          filtered?.type === 'rejected_channels' ? prev.rejected_channels + 10 : prev.rejected_channels,
      };
    });
    filtered && filtered.data.refetch();
  };

  console.log(filtered?.data.data?.channels);

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
          value={total_count !== undefined ? total_count.channels_aggregate.count : null}
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
          {filtered.data.data.channels.length === 0 ? (
            <NoListItem route={status} />
          ) : (
            <Fragment>
              <Counter limit={filtered.data.data?.channels.length} />
              <div>
                <div>
                  <ul className={`flex flex-col gap-10 ${filtered.loadMore ? 'mb-10' : 'mb-[84px]'}`}>
                    {filtered.data.data?.channels.map((channel) => {
                      return (
                        <ListItem
                          key={channel.id}
                          id={channel.id}
                          avatar={channel.avatar}
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
                </div>
              </div>
              {filtered.loadMore && <LoadMore onClick={loadMore} isFetching={filtered.data.isFetching} />}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ListView;
