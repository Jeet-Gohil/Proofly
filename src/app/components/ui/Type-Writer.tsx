"use client";
import { TypewriterEffect } from "@/components/ui/TypWriterEffect";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "Welcome",
    },
    {
      text: "to",
    },
    {
      text: "the",
    },
    {
      text: "Proofly.com",
      className: "text-purple dark:text-blue-500"
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center ">
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Please Drag here 
        </button>
      </div>
    </div>
  );
}
