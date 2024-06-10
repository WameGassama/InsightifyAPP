import { ClipLoader } from 'react-spinners';

interface LoadMore {
  onClick: () => void;
  isFetching: boolean;
}

const LoadMore = ({ onClick, isFetching }: LoadMore) => {
  return (
    <button
      className={`flex items-center py-3 mx-auto text-sm font-light text-white rounded-full cursor-pointer px-7 bg-[#61CE70] hover:bg-opacity-90 font-filson`}
      onClick={onClick}
      style={{ overflowAnchor: 'none' }}
    >
      <span className="not-italic font-normal font-filson">Load More</span>
      <span className="flex my-auto ml-2">{isFetching && <ClipLoader color={'#FFFFFF'} size={15} />}</span>
    </button>
  );
};

export default LoadMore;
