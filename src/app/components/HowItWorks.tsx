'use client';

import React from 'react';
import { CheckCircleIcon } from 'lucide-react';

const steps = [
  {
    title: '1. Connect Your Site',
    description: 'Login to your dashboard and add your website URL and details to get started.',
  },
  {
    title: '2. Embed the Tracking Script',
    description: 'Copy the personalized JavaScript snippet and embed it into your website’s <head>.',
  },
  {
    title: '3. Start Tracking in Real-Time',
    description: 'Once visitors land on your site, watch real-time analytics stream into your dashboard.',
  },
  {
    title: '4. Gain Deep Insights',
    description: 'Understand visitor behavior, session trends, heatmaps, and improve conversions.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1f2937] py-20 px-6 sm:px-10 lg:px-20 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How <span className="text-indigo-400">Proofly</span> Works
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#1e293b] border border-[#2a2e36] rounded-xl p-6 shadow-lg transition hover:shadow-indigo-700/20"
            >
              <div className="flex items-start space-x-4">
                <CheckCircleIcon className="h-7 w-7 text-indigo-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-400 mb-4">Ready to track smarter?</p>
          <a
            href="/login"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
