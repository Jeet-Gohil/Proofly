import React from "react";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const LiveVisitorCount: React.FC = () => {
  return (
    <section className="w-full px-4 py-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left - Image with overlay count */}
        <div className="relative w-full md:w-1/2">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image src= "/LiveVisitor.jpeg" alt="loading..." fill className="w-full object-cover" />
          </div>

          {/* Visitor Count Badge */}
          <div className="absolute -bottom-6 left-6 bg-white shadow-lg rounded-full px-4 py-2 flex items-center space-x-4 w-fit">
            <div className="bg-pink-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold">
              79
            </div>
            <div className="text-left">
              <p className="text-gray-900 font-medium text-sm sm:text-base">
                79 people
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">
                are viewing this page
              </p>
              <div className="flex items-center text-xs sm:text-sm text-blue-600 font-medium mt-1">
                <CheckCircle className="w-4 h-4 mr-1 text-blue-600" />
                Verified by Proof
              </div>
            </div>
          </div>
        </div>

        {/* Right - Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Create scarcity with <br />
            <span className="text-slate-800">Live Visitor Count.</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
            Live Visitor Count shows the number of people currently viewing a page or your whole site.
            Great for offers with limited inventory such as physical products, booking, and event ticket sales pages.
          </p>
          <p className="text-indigo-600 font-medium text-sm sm:text-base">
            Average conversion lift: 8%
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveVisitorCount;
