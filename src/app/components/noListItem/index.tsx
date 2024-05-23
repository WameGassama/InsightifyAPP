import Image from 'next/image';

const NoListItem = ({ route }: { route: string | null }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="bg-white w-1/2 flex flex-col justify-center items-center rounded-xl border shadow-lg py-10 gap-5">
        <Image src={'/assets/no-data.svg'} width={200} height={200} alt={'checklist'} />
        <div className="text-black font-bold text-xl font-quicksand">{`You don't have any ${route} YouTube Channels`}</div>
        <div className="text-black font-light font-quicksand">When you do, you will se them here.</div>
      </div>
    </div>
  );
};

export default NoListItem;
