'use client';

import { Fragment } from 'react';
import { BsExclamationCircle, BsFileTextFill } from 'react-icons/bs';
import { FaUser, FaCheck, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import Details from '../details';
import GoBackButton from '../goBackButton';
import Overview from '../overview';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import GraphqlRequest from '@/server/action';
import channels from '@/graphql/channels';
import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';
import { IoShareSocial } from 'react-icons/io5';
import StatsCard from '@/app/(discovery)/youtube/components/statsCard';
import { CiUser, CiVideoOn } from 'react-icons/ci';
import { formatNumber } from '@/utils/formatNumber';
import { FiEye } from 'react-icons/fi';
import { IoIosStats } from 'react-icons/io';
import { Area, AreaConfig } from '@ant-design/plots';
import LineChart from '../lineChart';
import Socials from '../socials';
import Summary from '../summary';

const Main = () => {
  const params: { handle: string } = useParams();

  const { data } = useQuery({
    queryKey: ['channel', params.handle],
    queryFn: async () => await GraphqlRequest(channels.getChannelQuery, { handle: { _eq: `@${params.handle}` } }),
    staleTime: 0,
  });

  if (data?.channel !== undefined) {
    return (
      <Fragment>
        <section className="relative bg-transparent">
          <div className="bg-[#EFF3FB] min-h-[370px] w-full absolute"></div>
          <main className="mx-auto flex flex-col max-w-7xl p-6 lg:px-8 relative">
            <GoBackButton />
            <div className="flex gap-8 mx-auto w-full">
              <div className="w-[70%] flex flex-col">
                <Overview
                  avatar={data.channel.avatar}
                  bio={data.channel.bio}
                  country={data.channel.country}
                  display_name={data.channel.display_name}
                  status={data.channel.status}
                  url={data.channel.url}
                />
                <Summary total={data.channel.statistics.total} daily={data.channel.statistics.daily} />
              </div>
              <div className="flex flex-col w-[30%] h-auto pb-8">
                <Socials
                  facebookLink={data.channel.socials.facebook}
                  instagramLink={data.channel.socials.instagram}
                  tiktokLink={data.channel.socials.tiktok}
                  twitterLink={data.channel.socials.twitter}
                />
              </div>
            </div>
          </main>
        </section>
      </Fragment>
    );
  }
};

export default Main;
