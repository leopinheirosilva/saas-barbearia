"use client";

import { Button } from "@/app/_components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const ChatHeader = () => {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-between border-b p-5">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        className="rounded-lg"
      >
        <ChevronLeft className="size-5 shrink-0" />
      </Button>
      <h1 className="font-merriweather text-[24px] leading-[1.4] tracking-[-1px] text-nowrap whitespace-pre italic">
        Agenda.ai
      </h1>
      <div className="gap-[15px flex items-center justify-end" />
    </div>
  );
};
