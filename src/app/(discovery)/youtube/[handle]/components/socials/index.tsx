import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoShareSocial } from 'react-icons/io5';

interface Socials {
  facebookLink: string;
  instagramLink: string;
  tiktokLink: string;
  twitterLink: string;
}

const Socials = ({ facebookLink, instagramLink, tiktokLink, twitterLink }: Socials) => {
  return (
    <div className="flex flex-col items-center bg-white p-8 px-10 rounded-2xl border shadow-[0_2px_8px_0_rgba(42,42,43,.06)] sticky top-8">
      <div className={`flex items-center rounded-full bg-[#EFF3FB] p-4 w-14 h-14 mb-4`}>
        <IoShareSocial color="#0756FB" size={55} />
      </div>
      <h3 className="text-2xl font-bold text-[#1B1A27] text-center mb-4">Socials</h3>
      <p className="font-light text-gray-600 text-center mb-6">
        This influencer can also be found other social media platform.
      </p>
      <div className="flex gap-3">
        {facebookLink && (
          <Link
            href={facebookLink}
            className="flex gap-2 border rounded-full justify-center items-center hover:border-secondary cursor-pointer w-12 h-12 hover:scale-105"
          >
            <FaFacebookF size={18} color="#0756FB" />
          </Link>
        )}
        {instagramLink && (
          <Link
            href={instagramLink}
            className="flex gap-2 border rounded-full justify-center items-center hover:border-secondary cursor-pointer w-12 h-12 hover:scale-105"
          >
            <FaInstagram size={18} color="#0756FB" />
          </Link>
        )}
        {tiktokLink && (
          <Link
            href={tiktokLink}
            className="flex gap-2 border rounded-full justify-center items-center hover:border-secondary cursor-pointer w-12 h-12 hover:scale-105"
          >
            <FaTiktok size={18} color="#0756FB" />
          </Link>
        )}
        {twitterLink && (
          <Link
            href={twitterLink}
            className="flex gap-2 border rounded-full justify-center items-center hover:border-secondary cursor-pointer w-12 h-12 hover:scale-105"
          >
            <FaXTwitter size={18} color="#0756FB" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Socials;
