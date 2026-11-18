"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Scissors,
  Zap,
  Crown,
  Eye,
  Footprints,
  Droplets,
  Hand,
} from "lucide-react";
import { PageSectionScroller } from "./ui/page";

const quickSearchOptions = [
  { label: "Cabelo", icon: Scissors },
  { label: "Barba", icon: Zap },
  { label: "Acabamento", icon: Crown },
  { label: "Sobrancelha", icon: Eye },
  { label: "Pézinho", icon: Footprints },
  { label: "Hidratação", icon: Droplets },
  { label: "Massagem", icon: Hand },
];

const QuickSearchButtons = () => {
  const router = useRouter();

  const handleQuickSearch = (label: string) => {
    router.push(`/barbershops?search=${encodeURIComponent(label)}`);
  };

  return (
    <PageSectionScroller>
      {quickSearchOptions.map(({ label, icon: Icon }) => (
        <Button
          key={label}
          variant="outline"
          className="flex items-center gap-2 rounded-full p-5 whitespace-nowrap hover:cursor-pointer"
          onClick={() => handleQuickSearch(label)}
        >
          <Icon size={18} />
          {label}
        </Button>
      ))}
    </PageSectionScroller>
  );
};

export default QuickSearchButtons;
