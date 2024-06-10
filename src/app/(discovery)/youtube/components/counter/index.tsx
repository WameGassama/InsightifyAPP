interface Counter {
  limit: number | undefined;
}

const Counter = ({ limit }: Counter) => {
  return (
    <div className="flex py-5">
      <div className="w-[30%]">
        <div className="text-black font-bold">
          Showing {0} - {limit} channels
        </div>
      </div>
    </div>
  );
};

export default Counter;
