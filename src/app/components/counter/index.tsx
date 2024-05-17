interface Counter {
  limit: number;
  total: number | undefined;
}

const Counter = ({ limit, total }: Counter) => {
  return (
    <div className="flex py-5">
      <div className="w-[30%]">
        <div className="text-black font-bold">
          Showing {0} - {limit} of {total !== undefined && total.toLocaleString('EN')} channels
        </div>
      </div>
    </div>
  );
};

export default Counter;
