"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import MenuSheet from "./menu-sheet";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white px-5 py-6">
      <Image src="/logo.svg" alt="Aparatus logo" width={100} height={26.09} />
      <div className="flex items-center gap-2">
        <MenuSheet
          triggerButton={
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          }
        />
      </div>
    </header>
  );
};

export default Header;
