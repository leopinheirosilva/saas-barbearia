/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { MessageCircleIcon } from "lucide-react";
import MenuSheet from "./menu-sheet";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ChatPopup } from "./chat-popup";

const Header = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg";

  return (
    <>
      <header className="bg-background flex items-center justify-between px-5 py-6 lg:px-35 lg:py-0">
        <Link href={"/"}>
          <Image
            src={logoSrc}
            alt="Aparatus logo"
            width={100}
            height={26.09}
            className="lg:size-30"
          />
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            variant="outline"
            size="icon"
            className="hidden hover:cursor-pointer lg:flex"
            onClick={() => setIsChatOpen((prev) => !prev)}
            aria-label="Abrir chat"
          >
            <MessageCircleIcon />
          </Button>
          <Button variant="outline" size="icon" asChild className="lg:hidden">
            <Link href="/chat">
              <MessageCircleIcon />
            </Link>
          </Button>

          <MenuSheet />
        </div>
      </header>

      {isChatOpen && (
        <div className="hidden lg:block">
          <ChatPopup onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
