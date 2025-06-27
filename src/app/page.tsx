'use client';
import Link from "next/link";
import { DraggableCardDemo } from "./components/ui/DraggableCards";
import { SVGMaskEffectDemo } from "./components/ui/Mask-Effect";
import React from "react";
import MosaicImage from "@/components/ui/Mosaic-Image";
import { CardHoverEffectDemo } from "./components/ui/CardHoverEffect";
import Hero from "./components/PhoneHeroSection";
import { BackgroundLines } from "@/components/ui/BackgroundLine";
import AnimatedJourney from "./components/TimeLine";
import WhyProofly from "./components/Features";




export default function Home() {
  return (
    <div>
      
      <section className="relative overflow-hidden bg-black text-white HeroSection bg-cover">

  {/* ✅ BackgroundLines & Desktop Grid – Hidden on small screens */}
  <div className="hidden md:block">
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <div className="relative z-10 grid max-w-6xl mx-auto grid-cols-2 items-center gap-15 py-2 px-1">
        {/* Left */}
        <div className="space-y-4">
          <SVGMaskEffectDemo />
          <p className="text-sm text-gray-300 mt-4">
            <span className="text-green-400 font-semibold">1,000+ people</span> started a free trial in the last 30 days
          </p>
        </div>
        {/* Right */}
        <div className="relative">
          <div>
            <AnimatedJourney />
          </div>
        </div>
      </div>
    </BackgroundLines>
  </div>

  {/* ✅ Hero section for all screens, mostly visible on mobile */}
  <Hero />
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
        <Link href="/HowItWorks" className="bg-indigo-600 hover:bg-indigo-400 transition text-white px-6 py-3 rounded font-medium text-base inline-block">
          How it Works?
        </Link>
      </section>
      <WhyProofly/>

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

    {/* how to get started*/}
    <section className="bg-gray-800 py-12 text-center px-6 md:px-4 getStartedSection">
      <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6">
          How to get Started !
        </h2>
        <p className="text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed mb-6">
          Please follow the below given steps !
        </p>
        <CardHoverEffectDemo/>
    </section>
    </div>
  );
}
