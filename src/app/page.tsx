'use client';
import Link from "next/link";
import { DraggableCardDemo } from "./components/ui/DraggableCards";
import { SVGMaskEffectDemo } from "./components/ui/Mask-Effect";
import React from "react";

const title = 'Boost your website conversions by 15% in under 15 minutes';
const title1 = `We believe customer-obsessed marketing is the best kind of marketing. Proof makes it easy. Make your website delightfully human.`;

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#0f172a] text-white">
        {/* Background Gradient Blobs (Desktop Only) */}
        <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] bg-[#3ec6ff] opacity-30 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000 top-[-100px] left-[-100px]"></div>
          <div className="absolute w-[400px] h-[400px] bg-[#0ea5e9] opacity-30 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000 top-[200px] left-[300px]"></div>
          <div className="absolute w-[600px] h-[600px] bg-[#38bdf8] opacity-30 rounded-full mix-blend-screen filter blur-3xl animate-blob top-[400px] left-[-200px]"></div>
        </div>

        {/* Desktop Content */}
        <div className="relative z-10 hidden md:grid max-w-6xl mx-auto grid-cols-2 items-center gap-30 py-5 px-4">
          <div className="space-y-4">
            <SVGMaskEffectDemo />
            <p className="text-sm text-gray-300 mt-4">
              <span className="text-green-400 font-semibold">1,000+ people</span> started a free trial in the last 30 days
            </p>
          </div>
          <div className="relative">
            <img
              src="https://uploads-ssl.webflow.com/59318798d83bff2781822428/5f7b7e04b4ac83ac14c65bfa_Rachel%203x%20(1).jpg"
              alt="Customer"
              className="w-full h-auto object-cover rounded-[40px] shadow-2xl hover:scale-105 transition duration-500"
            />
            <div className="absolute bottom-4 right-4 bg-white text-black rounded-xl shadow-xl p-4 w-[250px]">
              <p className="text-sm text-gray-500 mb-1">Featured customer</p>
              <p className="font-bold text-sm">Rachel Pedersen</p>
              <p className="text-blue-600 text-sm mb-2">
                Founder of Social Media &<br />The Viral Touch
              </p>
              <p className="text-xl font-semibold text-gray-800">+300%</p>
              <p className="text-sm text-gray-500">leads last 30 days</p>
              <div className="mt-1 h-1.5 bg-gradient-to-r from-cyan-400 to-teal-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Mobile Only Title & Subtitle */}
        <div className="md:hidden text-center px-6 py-10">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-base text-gray-300">{title1}</p>
        </div>
      </section>

      {/* Trusted Section — Show on all screens */}
      <section className="text-center px-6 md:px-16 py-16 md:py-24 bg-white text-[#374151]">
        <p className="text-base text-gray-500 mb-6">
          Trusted by the world’s fastest growing companies including:
        </p>
        <div className="flex flex-wrap justify-center gap-8 items-center mb-16 opacity-80">
          <img src="https://uploads-ssl.webflow.com/59318798d83bff2781822428/5f7bbb41584a121016993c10_Oprah%20%26%20Deepak.svg" alt="Oprah & Deepak" className="h-6" />
          <img src="https://uploads-ssl.webflow.com/59318798d83bff2781822428/5f7bbb4444bfe38a3af91617_Appcues%20logo.svg" alt="Appcues" className="h-6" />
          <img src="https://uploads-ssl.webflow.com/59318798d83bff2781822428/5f7bbb4288362a2135332b7f_Digital%20Marketer.svg" alt="Digital Marketer" className="h-6" />
          <img src="https://uploads-ssl.webflow.com/59318798d83bff2781822428/5f7bbb43ae9871f50584dc79_Bench.svg" alt="Bench" className="h-6" />
          <img src="https://uploads-ssl.webflow.com/59318798d83bff2781822428/5f7bbb430d35ec73a37c25a5_Klientboost.svg" alt="KlientBoost" className="h-6" />
          <img src="https://uploads-ssl.webflow.com/59318798d83bff2781822428/5f7bbb447c007628c8183689_Foundr%20logo.svg" alt="Foundr" className="h-6" />
        </div>
        <p className="text-sm font-bold tracking-wide text-blue-600 uppercase mb-2">
          Most Popular Product
        </p>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#2e3a59] mb-6">
          25,000+ online businesses use Proof to convert visitors into leads and sales.
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
          The fastest way to convert visitors into leads and sales on your website is
          with Social Proof Marketing. That’s why 25,000+ businesses use Proof.
        </p>
        <Link href="/HowItWorks" className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded font-medium text-base inline-block">
          How it Works?
        </Link>
      </section>

      {/* Carousel Section — Show on all screens */}
      <section className="bg-[#ffffff] py-12 text-center px-6 md:px-4">
        <h2 className="text-3xl md:text-5xl font-semibold text-[#3e528b] mb-6">
          Oodles of great personalization content
        </h2>
        <p className="text-base md:text-lg text-[#6f82a1] max-w-2xl mx-auto leading-relaxed mb-6">
          We collaborate with experts on topics including growth experimentation,
          personalization strategies, and life as a fast-growing startup.
        </p>
        <DraggableCardDemo />
        <p className="text-base"><span className="font-bold">Fun fact :-</span> you can actually Drag this cards.</p>
      </section>
    </div>
  );
}
