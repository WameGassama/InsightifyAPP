interface DeatilsProps {
  id: string;
  icon: {
    padding: string;
    component: React.ReactNode;
  };
  title: string;
  children: React.ReactNode;
}

const Details: React.FC<DeatilsProps> = ({ id, icon, title, children }) => {
  return (
    <div id={id} className="flex flex-shrink-0 gap-4 py-8">
      <div className="flex gap-4 w-1/12">
        <div className={`flex items-center rounded-full bg-[#EFF3FB] ${icon.padding} w-14 h-14`}>{icon.component}</div>
      </div>
      <div className="w-11/12">
        <div className="flex items-center h-14">
          <h2 className="font-bold text-3xl text-black">{title}</h2>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Details;
