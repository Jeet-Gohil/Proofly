"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/components/Exp-Cards";

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref :  React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));
  


  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-5xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Ben Altman",
    title: "charismaoncommand.com",
    src: "https://cdn.prod.website-files.com/594d8d64dc2b583adddea915/5f36b65f8ce4df5035810eb8_Ben%20Altman.jpg",
    ctaText: "View",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          I started using Proof on my opt-in pages and saw an 8.2% increase in opt-ins. What an effortless way to grow our email list and our revenue :-)
        </p>
      );
    },
  },
  {
    description: "Nathan Chan",
    title: "foundr.com",
    src: "https://cdn.prod.website-files.com/594d8d64dc2b583adddea915/5f36b61605e3247688750e5b_Nathan%20Chan.jpg",
    ctaText: "View",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Proof allows us to increase conversions for every part of the funnel and also gives a great element of social proof to our brand. Highly recommend this software..
        </p>
      );
    },
  },

  {
    description: "Mike Kelly",
    title: "membervault.co",
    src: "https://cdn.prod.website-files.com/594d8d64dc2b583adddea915/5f36be3a79f8c67405c05b5d_5c17f5d0c934d05dff5c5237_qJndIp7x_150x150.jpg",
    ctaText: "View",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          I'm always impressed by how much @UseProof gives a shit about their users. Y'all are an inspiration for what every SaaS company should strive to be!
        </p>
      );
    },
  },
  {
    description: "Dave Robertson",
    title: "https://www.flipperforce.com/",
    src: "https://cdn.prod.website-files.com/594d8d64dc2b583adddea915/5f32b68676d850663e749f91_5c00597ca8e61ae2d6d969b0_Dave%20Robertson-p-500%20(1).png",
    ctaText: "View",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          I recently launched a new SaaS startup and Proof has given my company instant credibility and 'social proof' which has increased conversions and new user sign-ups!
        </p>
      );
    },
  },
  {
    description: "Cyrus Khambatta",
    title: "masteringdiabetes.org",
    src: "https://cdn.prod.website-files.com/594d8d64dc2b583adddea915/5f36b6aa347d8d4fb3fd7934_Cyrus%20Khambatta.jpg",
    ctaText: "View",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
         Proof is an indispensable tool for our business that is VERY effective at making prospective clients feel compelled to sign up for an offer or purchase a product. We know from experience that people are very "enticed" when they see many proof notifications.
        </p>
      );
    },
  },
];
