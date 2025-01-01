import React from "react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
export default function page() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "apps",
    },
    {
      text: "with",
    },
    {
      text: "Manjaro.",
      className: "text-green-500 dark:text-green-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      
    </div>
  );
  }