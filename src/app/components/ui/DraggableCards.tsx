import React from "react";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/Draggable-Cards";

export function DraggableCardDemo() {
  return (
    <DraggableCardContainer className="relative my-10 flex min-h-screen w-full justify-center overflow-clip">
      <div className="grid w-full max-w-5xl grid-cols-1 items-center justify-center gap-10 md:grid-cols-3">
        <Container>
          <DraggableCardBody>
            <img
              src="https://www.ringcentral.com/content/dam/rc-www/en_us/images/content/seo/online-meeting-software/online-meeting-software.jpg"
              alt="Some mountains"
              className="pointer-events-none relative z-10 h-80 w-full object-cover"
            />
            <p className="mt-4 text-center text-lg font-bold text-neutral-700 dark:text-neutral-300">
            Scale or Die ep. 01: founder of Drift on SaaS growth strategies
            </p>
            <p className="mt-4 text-center text-md  text-neutral-700 dark:text-neutral-300">
              Serial SaaS entrepreneur, David Cancel, shares how his company Drift has become a category creator with 50k customers in just 5 years.
            </p>
          </DraggableCardBody>
        </Container>
        <Container>
          <DraggableCardBody>
            <img
              src="https://uploads-ssl.webflow.com/59318798d83bff2781822428/5e1d036773c54c2630c371f0_Profitwell%20Case%20Study%20(1).svg"
              alt="Some mountains"
              className="pointer-events-none relative z-10 h-80 w-full object-cover"
            />
            <p className="mt-4 text-center text-lg font-bold text-neutral-700 dark:text-neutral-300">
            How Profitwell increased content downloads by 162%
            </p>
            <p className="mt-4 text-center text-md  text-neutral-700 dark:text-neutral-300">
              Read how the fast growing startup, ProfitWell, personalized their blog with Experiences to achieve a massive increase in leads.
            </p>
          </DraggableCardBody>
        </Container>
        <Container>
          <DraggableCardBody>
            <img
              src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/GetReadyToMeet_RWJPiD?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=2000&hei=1200&qlt=90&fit=constrain"
              alt="Some mountains"
              className="pointer-events-none relative z-10 h-80 w-full object-cover"
            />
              <p className="mt-4 text-center text-lg font-bold text-neutral-700 dark:text-neutral-300">
            The 6-lesson course to learn website personalization
            </p>
            <p className="mt-4 text-center text-md  text-neutral-700 dark:text-neutral-300">
              Advance your skills and hit your company's growth goals by learning website personalization to boost conversions.
            </p>
          </DraggableCardBody>
        </Container>
      </div>
    </DraggableCardContainer>
  );
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex items-center justify-center rounded-lg bg-gray-200 dark:bg-neutral-800">
      {children}
    </div>
  );
};
