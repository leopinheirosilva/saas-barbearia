"use client";

// Imports
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
import Link from "next/link";

interface MenuSheetProps {
  triggerButton?: ReactNode;
}

const MenuSheet = ({ triggerButton }: MenuSheetProps) => {
  // Componente MenuSheet
  const [open, setOpen] = useState(false); // Estado para controlar a abertura do sheet
  const { data: session } = authClient.useSession(); // Hook para obter a sessão do usuário
  const router = useRouter(); // Hook para navegação entre páginas

  const handleLogout = async () => {
    // Função para logout
    await authClient.signOut();
    setOpen(false);
  };

  const handleNavigation = (path: string) => {
    // Função para navegação
    router.push(path);
    setOpen(false);
  };

  const handleLogin = async () => {
    // Função para login
    await authClient.signIn.social({
      provider: "google",
    });
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Botão que dispara o sheet */}
      {triggerButton && <SheetTrigger asChild>{triggerButton}</SheetTrigger>}
      <SheetContent side="right" className="max-w-sm p-0">
        {session ? ( // Usuário Logado
          <main className="mt-5 space-y-5">
            {/* Informações de login */}
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

            <div className="flex flex-col gap-4 px-2 space-y-2">
              {/* Menu Items */}
              <div className="flex flex-col gap-5">
                <button
                  onClick={() => handleNavigation("/")}
                  className="hover:bg-secondary flex items-center gap-3 rounded-lg px-4 text-left text-sm font-medium transition-colors"
                >
                  <HomeIcon className="size-6" />
                  <h2 className="font-semibold">Início</h2>
                </button>

                <button
                  onClick={() => handleNavigation("/bookings")}
                  className="hover:bg-secondary flex items-center gap-3 rounded-lg px-4 text-left text-sm font-medium transition-colors"
                >
                  <CalendarIcon className="size-6" />
                  <h2 className="font-semibold">Agendamentos</h2>
                </button>
              </div>

              <Separator />

              {/* Categorias */}
              <div>
                <p className="text-muted-foreground mb-3 px-4 text-xs font-semibold uppercase">
                  Categorias
                </p>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/barbershops?search=barba"
                    className="h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:bg-transparent"
                  >
                    <span className="text-sm font-medium">Barba</span>
                  </Link>
                  <Link
                    href="/barbershops?search=cabelo"
                    className="h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:bg-transparent"
                  >
                    <span className="text-sm font-medium">Cabelo</span>
                  </Link>
                  <Link
                    href="/barbershops?search=acabamento"
                    className="h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:bg-transparent"
                  >
                    <span className="text-sm font-medium">Acabamento</span>
                  </Link>
                  <Link
                    href="/barbershops?search=sobrancelha"
                    className="h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:bg-transparent"
                  >
                    <span className="text-sm font-medium">Sobrancelha</span>
                  </Link>
                  <Link
                    href="/barbershops?search=pézinho"
                    className="h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:bg-transparent"
                  >
                    <span className="text-sm font-medium">Pézinho</span>
                  </Link>
                  <Link
                    href="/barbershops?search=progressiva"
                    className="h-10 w-full cursor-default justify-start rounded-full px-5 py-3 hover:bg-transparent"
                  >
                    <span className="text-sm font-medium">Progressiva</span>
                  </Link>
                </div>
              </div>
            </div>

            <SheetFooter className="border-t">
              <Button
                variant="outline"
                className="w-full justify-start p-5"
                onClick={handleLogout}
              >
                <LogOutIcon className="size-5" />
                Sair da conta
              </Button>
            </SheetFooter>
          </main>
        ) : (
          // Usuário Deslogado
          <main>
            <div className="mt-7 flex flex-col gap-4 px-4 py-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xm pl-3">Olá. Faça seu login!</p>
                <Button
                  onClick={handleLogin}
                  className="bg-primary w-12 rounded-md p-4 text-white"
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
