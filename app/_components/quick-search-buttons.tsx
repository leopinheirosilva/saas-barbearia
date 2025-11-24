"use client";

// Imports
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

const quickSearchOptions = [ // Opções de busca rápida
  { label: "Cabelo", icon: Scissors },
  { label: "Barba", icon: Zap },
  { label: "Acabamento", icon: Crown },
  { label: "Sobrancelha", icon: Eye },
  { label: "Pézinho", icon: Footprints },
  { label: "Hidratação", icon: Droplets },
  { label: "Massagem", icon: Hand },
];

const QuickSearchButtons = () => {
  // Componente de botões de busca rápida
  const router = useRouter();

  const handleQuickSearch = (label: string) => {
    // Função para navegar para a página de barbearias com o filtro aplicado
    router.push(`/barbershops?search=${encodeURIComponent(label)}`);
  };

  return (
    <PageSectionScroller>
      {quickSearchOptions.map(({ label, icon: Icon }) => ( // Mapeia o botão para cada opção de busca rápida
        <Button
          key={label}
          variant="outline"
          className="hover:bg-gray-10 flex items-center gap-2 rounded-full p-3 whitespace-nowrap"
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
