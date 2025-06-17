import React from "react";
import { Flame } from "lucide-react";
import image from "../../../public/HotStreaks.jpeg"
import Image from "next/image";

const HotStreaksSection: React.FC = () => {
  return (
    <section className="bg-white box w-full py-16 px-4 sm:px-8 lg:px-20 xl:px-40 mt-4">
      {/* Trusted By */}
      <div className="text-center text-sm text-gray-400 mb-6">
        Trusted by 20,000+ high converting sites including...
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-gray-300 text-lg font-semibold mb-12">
        {["OPRAH&DEEPAK", "speedo", "demio", "HARRY’S", "KlientBoost"].map((brand) => (
          <div key={brand} className="uppercase tracking-wide">
            {brand}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div>
          <div className="text-pink-500 text-3xl mb-2">~</div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">
            Build credibility with <br className="hidden sm:block" /> Hot Streaks.
          </h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-6">
            Hot Streaks shows the total number of people who have recently taken action
            on your site. Great for high-traffic pages such as content opt-ins, webinar
            registrations, and free-trials.
          </p>
          <p className="text-blue-600 text-base font-medium">Average conversion lift: 15%</p>
        </div>

        {/* Image & Card */}
        <div className="relative w-full">
          {/* Browser Mockup Image */}
          <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            <Image fill src= {image} alt={"Loading..."} className="w-full h-auto"/>
          </div>

          {/* Floating Hot Streak Card */}
          <div className="absolute bottom-[-30px] left-6 sm:left-16 bg-white rounded-full sm:rounded-2xl shadow-xl flex items-center px-4 py-2 sm:px-6 sm:py-4 gap-4 w-fit">
            <div className="bg-pink-100 text-pink-600 p-2 sm:p-3 rounded-full">
              <Flame size={24} />
            </div>
            <div className="text-sm sm:text-base text-gray-800">
              <span className="font-bold text-black">13 people</span>{" "}
              <span className="text-gray-500">started a free trial</span>
              <br />
              <span className="text-gray-400 text-xs">in the last 24 hours</span>
              <br />
              <span className="text-blue-600 text-xs font-medium">✔ Verified by Proof</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotStreaksSection;
