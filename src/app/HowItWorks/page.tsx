import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FaCrown } from 'react-icons/fa6';
import { HiOutlineUserGroup } from 'react-icons/hi';
import Link from 'next/link';
import HowItWorks from '../components/HowItWorks';

const HeroSection: React.FC = () => {
  return (
    <div>
    <section className="bg-[#08083D] text-white py-20 px-4 md:px-12 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Convert up to <span className="text-white">300% more visitors</span><br />
          into <span className="text-white">leads, demos, and sales.</span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-[#A3A3C2] max-w-2xl mx-auto">
          Adding Proof to your marketing funnel is proven to build visitor&apos;s trust,
          create urgency, and increase conversions by 10–15% per page.
        </p>

        <div className="mt-8 flex justify-center">
          <Link href = {"/pricing"} className="bg-[#3366FF] hover:bg-blue-700 text-white text-base font-semibold py-3 px-6 rounded-md transition">
            Start your free trial
          </Link>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-[#A3A3C2]">
          <div className="flex items-center gap-1">
            {Array(5).fill(0).map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
            <span className="ml-2">Rated 4.7/5 stars</span>
          </div>

          <div className="flex items-center gap-4 mt-2 sm:mt-0 sm:ml-4">
          <HiOutlineUserGroup className="text-white w-6 h-6" />
            <FaCrown className="text-white w-5 h-5" />
            <span className="sr-only">Capterra and G2Crowd logos</span>
          </div>
        </div>
      </div>
    </section>
    {/* <HotStreaksSection/>  
    <LiveVisitorCount/>
    <RecentActivitySection/> */}
    <HowItWorks/>
    </div>
  );
};

export default HeroSection;
