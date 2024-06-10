'use client';

import Image from 'next/image';
import { FaCheck, FaFacebookF, FaInstagram, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';
import { HiOutlinePhone } from 'react-icons/hi';
import { CiBookmarkCheck } from 'react-icons/ci';
import Tooltip from '@/components/ui/tooltip';
import { useState } from 'react';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { extractEmail } from '@/utils/extractEmail';
import Bagde from '../bagde';

interface Props {
  avatar: string | null;
  url: string;
  country: string | null;
  display_name: string | null;
  bio: string | null;
  status: string | null;
}

const Overview = ({ avatar, bio, country, display_name, status, url }: Props) => {
  const [showMoreBio, setShowMoreBio] = useState(false);

  const email = bio ? extractEmail(bio) : null;

  return (
    <div className="flex gap-6 bg-white py-16 px-10 rounded-2xl border shadow-[0_2px_8px_0_rgba(42,42,43,.06)] mb-16">
      <div id="logo" className="flex-shrink-0">
        {avatar && <Image className="rounded-full" src={avatar} width={150} height={150} alt="" />}
      </div>
      <div id="content" className="w-full">
        <div className="mb-2 font-bold text-[#0756FB] text-lg ">{country}</div>
        <div className="flex items-center gap-3 mb-2">
          <Link href={url}>
            <h1 className="font-bold text-4xl text-[#1B1A27] cursor-pointer">{display_name}</h1>
          </Link>
          <Bagde status={status} />
        </div>
        <p
          className={`font-light text-gray-600 mb-4 ${!showMoreBio && 'line-clamp-3'} cursor-pointer`}
          onClick={() => setShowMoreBio((prev) => !prev)}
        >
          {bio !== null ? bio : "This influencer doesn't have a bio."}
        </p>
        {bio && email && (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2 border rounded-full px-6 py-2.5 items-center hover:border-secondary cursor-pointer">
              <HiOutlineEnvelope size={20} color="#0756FB" />
              <div className="font-semibold text-black">{email}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
