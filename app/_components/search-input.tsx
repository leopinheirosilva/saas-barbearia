"use client";

// Imports
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const [search, setSearch] = useState(""); // Estado para o valor do input de busca
  const router = useRouter(); // Hook para navegação entre páginas

  const handleSearch = () => {
    if (search.trim()) { // Verifica se o campo de busca não está vazio
      // Navega para a página de barbearias com o termo de busca
      router.push(`/barbershops?search=${encodeURIComponent(search)}`); 
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Função para lidar com a tecla pressionada
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Pesquise serviços ou barbearias"
        className="rounded-full border-2 p-5"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button
        variant="default"
        size="icon"
        className="rounded-full bg-green-900"
        onClick={handleSearch}
      >
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchInput;
