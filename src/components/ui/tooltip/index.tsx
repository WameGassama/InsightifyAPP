import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  content: string;
}

const Tooltip: React.FC<Props> = ({ children, content }) => {
  return (
    <div id="tooltip" className="relative cursor-pointer group">
      <div>{children}</div>
      <span
        className={
          'absolute hidden group-hover:inline-block bg-neutral-900 text-white text-xs p-2 whitespace-nowrap rounded left-1/2 -translate-x-1/2 bottom-[calc(100%+5px)] w-auto mb-2'
        }
      >
        {content}
      </span>
      <span
        className={
          'absolute hidden group-hover:inline-block border-[6px] left-1/2 -translate-x-1/2 bottom-full border-l-transparent border-r-transparent border-b-0 border-t-neutral-900 mb-2'
        }
      ></span>
    </div>
  );
};

export default Tooltip;
