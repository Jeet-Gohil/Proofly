import React from "react";
import { CheckCircle } from "lucide-react";

const RecentActivitySection: React.FC = () => {
  return (
    <section className="w-full px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Left Section - Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <div className="text-pink-500 text-3xl mb-2">~</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Boost confidence <br className="hidden md:block" /> with Recent Activity.
          </h2>
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            Recent Activity shows a live feed of real people who have recently taken action on your site.
            Perfect on high-traffic pages such as your homepage, content opt-ins, and webinar registrations.
          </p>
          <p className="text-indigo-600 font-medium text-sm sm:text-base">
            Average conversion lift: 10%
          </p>
        </div>

        {/* Right Section - Image and Notification Badge */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center">
          {/* Background pattern (optional custom styling) */}
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20 -z-10"></div>

          {/* Main Image */}
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://cdn.prod.website-files.com/59318798d83bff2781822428/5e1554669ba5cbdcc141a159_Screen%20Shot%202020-01-03%20at%203.23%20(1)-p-1080.jpeg"
              alt="Recent Activity Screenshot"
              className="w-full max-w-[500px]"
            />
          </div>

          {/* Notification Bubble */}
          <div className="absolute -bottom-8 left-6 bg-white shadow-lg rounded-full px-4 py-3 flex items-center space-x-4 w-[340px]">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png"
                alt="User Location"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-gray-800 text-sm font-medium">
                Mary <span className="text-gray-500 font-normal">from</span> <span className="text-gray-900">Austin, TX</span>
              </p>
              <p className="text-gray-500 text-sm">Just requested a product demo</p>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                2 min ago
                <CheckCircle className="w-4 h-4 ml-2 text-blue-600" />
                <span className="ml-1">Verified by Proof</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentActivitySection;
