import Link from "next/link";
import Image from "next/image";
import { FaFacebookSquare } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="border-2 border-secondary" />
      <div className="py-12 bg-[#1A1E23] lg:pt-20 lg:pb-1">
        <div className="px-4 mx-auto md:px-10 lg:px-16 xl:max-w-7xl xl:px-8">
          <div className="flex flex-col lg:grid lg:justify-between grid-cols-9">
            <div className="w-full mb-5 lg:place-items-start relative col-span-5">
              <div className="flex lg:flex-1">
                <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
                  <div className="lg:h-10 lg:w-40 w-32 h-7 relative">
                    <Image
                      fill
                      sizes="(max-width: 1200px) 100vw, 60vw"
                      src="/assets/bygnow-logo-white.svg"
                      alt=""
                    />
                  </div>
                </a>
              </div>
            </div>
            <div className="flex space-x-7 col-span-4">
              <div className="space-x-32 xl:space-x-40 lg:flex w-full">
                <div className="space-y-7 flex flex-col w-full">
                  <label className="font-quicksand font-semibold border-b w-full pb-1 text-white">
                    Navigation
                  </label>
                  <ul className="space-y-4 text-sm font-light font-quicksand w-max text-white">
                    {[{ label: "Startside", link: "/" }].map((navigation) => {
                      return (
                        <li
                          key={navigation.label}
                          className="hover:text-secondary"
                        >
                          <Link href={navigation.link} locale={false}>
                            {navigation.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="space-x-32 xl:space-x-40 lg:flex w-full">
                <div className="space-y-7 flex flex-col w-full">
                  <label className="font-quicksand font-semibold border-b w-full pb-1 text-white">
                    Brancher
                  </label>
                  <ul className="space-y-4 text-sm font-light font-quicksand w-max text-white">
                    {[
                      { label: "Viceværtservice", link: "/vicevaertservice" },
                      { label: "Gulvservice", link: "/gulvservice" },
                      { label: "Glarmester", link: "/glarmester" },
                    ].map((navigation) => {
                      return (
                        <li
                          key={navigation.label}
                          className="hover:text-secondary"
                        >
                          <Link href={navigation.link} locale={false}>
                            {navigation.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center text-white">
            <div className="mt-20 mb-16 text-sm font-quicksand font-light text-center xs:text-left">
              <label>Copyright © {new Date().getFullYear()} · </label>
              <label className="text-secondary">
                <Link href="/" locale={false}>
                  Bygnow
                </Link>
              </label>
              <label> · Alle rettigheder forbeholdes.</label>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
