"use client";
import { MaskContainer } from "@/components/ui/MaskEffecct";
import { TypewriterEffectDemo } from "./Type-Writer";

export function SVGMaskEffectDemo() {
  return (
    <div>
      <MaskContainer
        revealText={
            <div>
          <TypewriterEffectDemo/>
          </div>
        }
        className="text-purple dark:text-black"
      >
        <div>
            <p className="text-base mb-3 flex gap-2">
                            <span className="text-xl">👋</span>
                            <span className="text-yellow-300 font-medium">Welcome to Proofly !!!</span>
                          </p>
                          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Boost your website <br />
                conversions by <span className="text-violet-500 ">15% in</span> <br />
                under 15 minutes
              </h1>
                          <div className="text-[#99ABCE] mb-8">
                            <div className="text-base">We believe customer-obsessed marketing is the best kind of marketing.
                  Proof makes it easy. Make your website delightfully human.</div>
                            <br />
                          </div>
        </div>
      </MaskContainer>
    </div>
  );
}
