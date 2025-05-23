'use client'
import { useState } from 'react';
import { Check } from 'lucide-react';

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = {
    monthly: {
      title: "Pro Monthly",
      price: "$79",
      frequency: "/mo",
      description: "Show social proof notifications to increase leads and sales.",
      cta: "Start your free 14-day trial",
      savings: ""
    },
    annual: {
      title: "Pro Annual",
      price: "$66",
      frequency: "/mo billed annually",
      description: "Show social proof notifications to increase leads and sales.",
      cta: "Start your free 14-day trial",
      savings: "You save $158 per year."
    }
  };

  const features = [
    "10,000 unique visitors",
    "Unlimited domains",
    "Unlimited notifications",
    "A/B testing",
    "Conversion analytics",
    "Live chat support",
    "Recent Activity notification",
    "Live Visitor Count notification",
    "Hot Streaks notification"
  ];

  const currentPlan = isAnnual ? pricingPlans.annual : pricingPlans.monthly;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Pricing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 text-sm font-medium rounded-md ${isAnnual ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              Annual
            </button>
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 text-sm font-medium rounded-md ${!isAnnual ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentPlan.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {currentPlan.description}
            </p>

            <div className="mb-6">
              <div className="flex items-baseline gap-x-1">
                <span className="text-4xl font-bold text-gray-900">
                  {currentPlan.price}
                </span>
                <span className="text-lg font-semibold text-gray-600">
                  {currentPlan.frequency}
                </span>
              </div>
              {currentPlan.savings && (
                <p className="mt-2 text-sm font-medium text-green-600">
                  {currentPlan.savings}
                </p>
              )}
            </div>

            <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors mb-8">
              {currentPlan.cta}
            </button>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Pro plans includes:
              </h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
                    <span className="ml-3 text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          No credit card required. Cancel anytime during trial period.
        </p>
      </div>
    </div>
  );
}