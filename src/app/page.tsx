import getChannels, { getChannelsAggregate } from '@/server/action';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ListView from './components/listView';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['channels', 10],
    queryFn: async () => await getChannels(0, 10),
  });

  await queryClient.prefetchQuery({
    queryKey: ['channels_aggregate'],
    queryFn: async () => await getChannelsAggregate(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex flex-col bg-gray-100 items-center">
        <div className="max-w-7xl w-full lg:px-8 py-6">
          <ListView />
        </div>
      </main>
    </HydrationBoundary>
  );
}
