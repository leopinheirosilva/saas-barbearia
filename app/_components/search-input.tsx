import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchInput = () => {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Pesquise serviços ou barbearias"
        className="rounded-full border-2 p-5"
      />
      <Button variant="default" size="icon" className="rounded-full bg-green-900">
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchInput;
