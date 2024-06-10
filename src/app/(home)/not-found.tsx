import { Fragment } from 'react';
import Image from 'next/image';
import { BsArrowRight } from 'react-icons/bs';

export default function NotFound() {
  return (
    <Fragment>
      <section className="bg-white max-w-7xl mx-auto p-6 pb-16">
        <div className="bg-[#f3f1f2] rounded-xl h-[510px] w-full bg-no-repeat p-10 lg:p-20 gap-5 justify-center flex flex-col-reverse lg:grid lg:grid-cols-5">
          <div className="gap-5 flex flex-col lg:col-span-3 my-auto">
            <div>
              <h1 className="text-[#191919] lg:text-4xl font-bold lg:col-span-8 mx-auto text-2xl md:text-3xl text-center lg:text-left">
                Oops! You shouldn&apos;t see this!
              </h1>
            </div>
            <div className="flex">
              <div className="text-[#191919] col-span-6 text-center lg:text-left">
                <p>
                  The page you are looking for no longer exists. Click back to the home page to start over with yours
                  search.
                </p>
              </div>
            </div>
            <div className="mx-auto lg:mx-0">
              <a
                href="/"
                className="text-base font-bold leading-6 text-white bg-[#0756FB] py-2.5 px-6 rounded-full flex items-center gap-2 w-fit"
              >
                Home
                <BsArrowRight />
              </a>
            </div>
          </div>
          <div className="relative w-full lg:w-96 lg:h-full h-96 mx-auto">
            <Image src={'/assets/404.svg'} alt={'404'} fill />
          </div>
        </div>
      </section>
    </Fragment>
  );
}
