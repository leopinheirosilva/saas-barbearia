"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/_components/ui/avatar";
import { Separator } from "@/app/_components/ui/separator";
import { LogOutIcon, HomeIcon, CalendarIcon, LogInIcon } from "lucide-react";

interface MenuSheetProps {
  triggerButton?: ReactNode;
}

const MenuSheet = ({ triggerButton }: MenuSheetProps) => {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    setOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
    setOpen(false);
  };

  const categories = [
    "Cabelo",
    "Barba",
    "Acabamento",
    "Sombrancelha",
    "Massagem",
    "Hidratação",
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {triggerButton && <SheetTrigger asChild>{triggerButton}</SheetTrigger>}
      <SheetContent side="right" className="w-full max-w-sm p-0">
        {session ? (
          // Usuário Logado
          <>
            <SheetHeader className="border-b">
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarImage
                    src={session.user?.image || ""}
                    alt="User avatar"
                  />
                  <AvatarFallback>
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <h2 className="text-base font-semibold">
                    {session.user?.name}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {session.user?.email}
                  </p>
                </div>
              </div>
            </SheetHeader>

            <div className="flex flex-col gap-4 px-4 py-6">
              {/* Menu Items */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleNavigation("/")}
                  className="hover:bg-secondary flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors"
                >
                  <HomeIcon className="size-5" />
                  Início
                </button>

                <button
                  onClick={() => handleNavigation("/bookings")}
                  className="hover:bg-secondary flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors"
                >
                  <CalendarIcon className="size-5" />
                  Agendamentos
                </button>
              </div>

              <Separator />

              {/* Categories */}
              <div>
                <p className="text-muted-foreground mb-3 px-4 text-xs font-semibold uppercase">
                  Categorias
                </p>
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="hover:bg-secondary cursor-default rounded-lg px-4 py-2 text-left text-sm transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <SheetFooter className="border-t">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={handleLogout}
              >
                <LogOutIcon className="size-5" />
                Sair da conta
              </Button>
            </SheetFooter>
          </>
        ) : (
          // Usuário Deslogado
          <>
            <SheetHeader className="border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
            </SheetHeader>

            <div className="flex flex-col gap-4 px-4 py-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sl font-semibold">Olá. Faça seu login!</p>
                <Button
                  onClick={handleLogin}
                  className="rounded-md bg-green-900 p-4 text-white w-13"
                >
                  <LogInIcon />
                </Button>
              </div>

              {/* Navigation Items (disabled) */}
              <div className="flex flex-col gap-3">
                <button
                  disabled
                  className="text-muted-foreground flex cursor-not-allowed items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium opacity-50"
                >
                  <HomeIcon className="size-5" />
                  Início
                </button>

                <button
                  disabled
                  className="text-muted-foreground flex cursor-not-allowed items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium opacity-50"
                >
                  <CalendarIcon className="size-5" />
                  Agendamentos
                </button>
              </div>

              <Separator />

              {/* Categories */}
              <div>
                <p className="text-muted-foreground mb-3 px-4 text-xs font-semibold uppercase">
                  Categorias
                </p>
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      disabled
                      className="text-muted-foreground cursor-default rounded-lg px-4 py-2 text-left text-sm opacity-50"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <SheetFooter className="border-t">
              <button
                disabled
                className="text-muted-foreground flex w-full cursor-not-allowed items-center justify-start gap-2 rounded-lg px-4 py-3 text-sm font-medium opacity-50"
              >
                <LogOutIcon className="size-5" />
                Sair da conta
              </button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
