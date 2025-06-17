import { HoverEffect } from "@/components/ui/Hover-Card";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Step 1 :- Log In",
    description:
      "Login through Google or peronal credentials",
    link: "/login",
  },
  {
    title: "Step :- 2  ",
    description:
      "Register your site and get your tracker script",
    link: "#",
  },
  {
    title: "Step :- 3",
    description:
      "Embed the tracker script in your codebase",
    link: "https://google.com",
  }
];
