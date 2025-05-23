import React from "react";
import { ExpandableCardDemo } from "../components/ExpandableCards";



const PulseAd: React.FC = () => {
  return (
    <div>
    <div className=" mt-4 max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left side - Text content */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            See why <span className="text-blue-600">20,000 sites</span> use Pulse to boost conversions and credibility.
          </h1>
          
          <p className="text-gray-600 mb-4">
            Show notifications of real people taking action on your website. Read why  
            Pulse has an average review rating of <span className="font-semibold">4.8/5 stars</span>.
          </p>
          
          {/* Note: The original text had "14.8/5 stars" which seems like a typo, so I used 4.8/5 */}
        </div>
        
        {/* Right side - CTA button */}
       
      </div>
    </div>
    <section className="mt-8 mb-4">
        <ExpandableCardDemo/>
      </section>
    </div>
  );
};

export default PulseAd;