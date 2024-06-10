import Image from 'next/image';

const Home = () => {
  return (
    <section className="bg-[#01143D] mx-auto flex flex-col items-center">
      <div className="relative max-w-7xl pt-10 bg-primary h-110 md:h-99 md:flex  md:py-28 lg:px-8">
        <div className="flex flex-col items-center md:w-1/2 md:items-baseline justify-center">
          <div className="mb-5 text-lg text-center text-white font-bold sm:text-xl md:text-left font-quicksand md:text-xl md:pb-0 lg:text-4xl">
            <h1>Find the Right YouTubers with YouTube Influencer Discovery</h1>
          </div>
          <div className="mb-5 font-thin text-white md:flex md:flex-col font-quicksand">
            Pinpoint the best YouTube channels for your brand with Insightify’s YouTube influencer database.
          </div>
          <div className="flex items-center max-w-lg space-x-2"></div>
        </div>
        <div className="md:justify-end md:w-1/2 md:flex lg:mt-0 lg:items-center">
          <Image src="/assets/chart.svg" width={400} height={400} alt="compare softwares" priority={true} />
        </div>
      </div>
    </section>
  );
};

export default Home;
