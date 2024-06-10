'use client';

import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

const GoBackButton = () => {
  const router = useRouter();
  return (
    <div className="my-10 flex justify-between text-black" onClick={() => router.back()}>
      <button className="flex space-x-1 items-center">
        <IoArrowBack size={20} />
        <div className="font-bold text-lg">Back</div>
      </button>
    </div>
  );
};

export default GoBackButton;
