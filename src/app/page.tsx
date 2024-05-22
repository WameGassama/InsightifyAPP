import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ListView from './components/listView';
import GraphqlRequest from '@/server/action';
import channels from '@/graphql/channels';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['channels', 10],
    queryFn: async () => await GraphqlRequest(channels.getChannelsQuery, { offset: 0, limit: 10 }),
  });

  await queryClient.prefetchQuery({
    queryKey: ['channels', 'Pending', 10],
    queryFn: async () => await GraphqlRequest(channels.getChannelsQuery, { offset: 0, limit: 10, status: 'Pending' }),
  });

  await queryClient.prefetchQuery({
    queryKey: ['total_count'],
    queryFn: async () => await GraphqlRequest(channels.getCountQuery),
  });

  await queryClient.prefetchQuery({
    queryKey: ['pending_count'],
    queryFn: async () => await GraphqlRequest(channels.getCountQuery, { _eq: 'Pending' }),
  });

  await queryClient.prefetchQuery({
    queryKey: ['rejected_count'],
    queryFn: async () => await GraphqlRequest(channels.getCountQuery, { _eq: 'Rejected' }),
  });

  await queryClient.prefetchQuery({
    queryKey: ['accepted_count'],
    queryFn: async () => await GraphqlRequest(channels.getCountQuery, { _eq: 'Accepted' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex flex-col bg-gray-100 items-center">
        <div className="max-w-7xl w-full lg:px-8 py-6 mb-20">
          <ListView />
        </div>
      </main>
    </HydrationBoundary>
  );
}
