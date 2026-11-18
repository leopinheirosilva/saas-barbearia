"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const [search, setSearch] = useState(""); 
  const router = useRouter(); 

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/barbershops?search=${encodeURIComponent(search)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="pesquise por serviços ou barbearias"
        className="border-muted rounded-full p-5 text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button
        variant="default"
        size="icon"
        className="bg-primary rounded-full hover:cursor-pointer lg:size-10"
        onClick={handleSearch}
      >
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchInput;
