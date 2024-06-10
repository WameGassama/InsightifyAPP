import { Fragment, Suspense } from 'react';
import GraphqlRequest from '@/server/action';
import channels from '@/graphql/channels';
import { HiOutlinePhone } from 'react-icons/hi';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { IoArrowBack, IoShareSocial } from 'react-icons/io5';
import Image from 'next/image';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import GoBackButton from './components/goBackButton';
import Overview from './components/overview';
import { FaCheck, FaCircleExclamation, FaExclamation, FaUser } from 'react-icons/fa6';
import { BsExclamationCircle } from 'react-icons/bs';
import Details from './components/details';
import Main from './components/main';

export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await GraphqlRequest(channels.getHandlesQuery);

  return await response.channels.map((channel) => ({
    handle: channel.handle.replace('@', ''),
  }));
}

async function ChannelDetails({ params }: { params: { handle: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['channel', params.handle],
    queryFn: async () => await GraphqlRequest(channels.getChannelQuery, { handle: { _eq: `@${params.handle}` } }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <Main />
      </Suspense>
    </HydrationBoundary>
  );
}

export default ChannelDetails;
