import Tooltip from '@/components/ui/tooltip';
import { CiBookmark } from 'react-icons/ci';
import { FaBookmark, FaCheck, FaQuestion, FaRegBookmark, FaTimes } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const Bagde = ({ status }: { status: string | null }) => {
  switch (status) {
    case 'Accepted':
      return (
        <Tooltip content="This influecer was accepted">
          <div className="flex h-6 w-6 bg-green-500 items-center justify-center rounded-full">
            <FaCheck size={14} />
          </div>
        </Tooltip>
      );
    case 'Rejected':
      return (
        <Tooltip content="This influecer was rejected">
          <div className="flex h-6 w-6 bg-red-500 items-center justify-center rounded-full">
            <FaTimes size={14} />
          </div>
        </Tooltip>
      );
    case 'Pending':
      return (
        <Tooltip content="This influecer is pending review.">
          <div className="flex h-6 w-6 bg-yellow-500 items-center justify-center rounded-full">
            <FaQuestion size={14} />
          </div>
        </Tooltip>
      );
  }
};

export default Bagde;
