"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon, MessageCircleIcon } from "lucide-react";
import MenuSheet from "./menu-sheet";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white px-5 py-6">
      <Image src="/logo.svg" alt="Aparatus logo" width={100} height={26.09} />
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/chat">
            <MessageCircleIcon />
          </Link>
        </Button>
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
