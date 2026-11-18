"use client";

import { useState } from "react";
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
import {
  LogOutIcon,
  HomeIcon,
  CalendarIcon,
  LogInIcon,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";

const MenuSheet = () => {
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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant="outline" size="icon" className="hover:cursor-pointer">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="max-w-sm p-0">
        {session ? (
          <main className="mt-5 space-y-5">
            <SheetHeader>
              <div className="flex items-center gap-4">
                <Avatar className="size-10">
                  <AvatarImage
                    src={session.user?.image || ""}
                    alt="User avatar"
                  />
                  <AvatarFallback>
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h2 className="text-base font-semibold">
                    {session.user?.name}
                  </h2>
                  <p className="text-muted-foreground text-xs">
                    {session.user?.email}
                  </p>
                </div>
              </div>
            </SheetHeader>

            <Separator />

            <div className="flex flex-col gap-4 space-y-2 px-2">
              <div className="flex flex-col gap-5">
                <button
                  onClick={() => handleNavigation("/")}
                  className="hover:text-muted-foreground flex items-center gap-3 rounded-lg px-4 text-left text-sm font-medium transition-colors hover:cursor-pointer"
                >
                  <HomeIcon className="size-6" />
                  <h2 className="font-semibold">Início</h2>
                </button>

                <button
                  onClick={() => handleNavigation("/bookings")}
                  className="hover:text-muted-foreground flex items-center gap-3 rounded-lg px-4 text-left text-sm font-medium transition-colors hover:cursor-pointer"
                >
                  <CalendarIcon className="size-6" />
                  <h2 className="font-semibold">Agendamentos</h2>
                </button>
              </div>

              <Separator />

              <div>
                <p className="text-muted-foreground mb-3 px-4 text-xs font-semibold uppercase">
                  Categorias
                </p>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/barbershops?search=barba"
                    className="hover:text-muted-foreground h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:cursor-pointer"
                  >
                    <span className="text-sm font-medium">Barba</span>
                  </Link>
                  <Link
                    href="/barbershops?search=cabelo"
                    className="hover:text-muted-foreground h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:cursor-pointer"
                  >
                    <span className="text-sm font-medium">Cabelo</span>
                  </Link>
                  <Link
                    href="/barbershops?search=acabamento"
                    className="hover:text-muted-foreground h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:cursor-pointer"
                  >
                    <span className="text-sm font-medium">Acabamento</span>
                  </Link>
                  <Link
                    href="/barbershops?search=sobrancelha"
                    className="hover:text-muted-foreground h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:cursor-pointer"
                  >
                    <span className="text-sm font-medium">Sobrancelha</span>
                  </Link>
                  <Link
                    href="/barbershops?search=pézinho"
                    className="hover:text-muted-foreground h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:cursor-pointer"
                  >
                    <span className="text-sm font-medium">Pézinho</span>
                  </Link>
                  <Link
                    href="/barbershops?search=progressiva"
                    className="hover:text-muted-foreground h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:cursor-pointer"
                  >
                    <span className="text-sm font-medium">Progressiva</span>
                  </Link>
                </div>
              </div>
            </div>

            <SheetFooter className="border-t">
              <Button
                variant="outline"
                className="w-full justify-start p-5 hover:cursor-pointer"
                onClick={handleLogout}
              >
                <LogOutIcon className="size-5" />
                Sair da conta
              </Button>
            </SheetFooter>
          </main>
        ) : (
          <main>
            <div className="mt-7 flex flex-col gap-4 px-4 py-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xm pl-3">Olá. Faça seu login!</p>
                <Button
                  onClick={handleLogin}
                  className="bg-primary w-12 rounded-md p-4 text-white hover:cursor-pointer"
                >
                  <LogInIcon />
                </Button>
              </div>
            </div>
          </main>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
