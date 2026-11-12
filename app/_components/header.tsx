/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon, MessageCircleIcon } from "lucide-react";
import MenuSheet from "./menu-sheet";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Header = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted && theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg";

  return (
    <header className="flex items-center justify-between bg-background px-5 py-6">
      <Link href={"/"}>
        <Image src={logoSrc} alt="Aparatus logo" width={100} height={26.09} />
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
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
