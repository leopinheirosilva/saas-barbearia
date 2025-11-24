"use client";

// Imports
import { useState } from "react";
import Image from "next/image";
import {
  Booking,
  BarbershopService,
  Barbershop,
} from "../generated/prisma/client";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { PhoneItem } from "./phone-item";
import { MapPin } from "lucide-react";
import { Separator } from "@/app/_components/ui/separator";

interface CancelBookingSheetProps {
  // Recebe as props necessárias
  isOpen: boolean;
  onClose: () => void;
  booking: Booking & {
    service: BarbershopService;
    barbershop: Barbershop;
  };
  onBookingCancelled?: () => void;
}

export function CancelBookingSheet({
  isOpen, // Controla se o sheet está aberto
  onClose, // Função para fechar o sheet
  booking,
  onBookingCancelled,
}: CancelBookingSheetProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const { executeAsync, isPending } = useAction(cancelBooking);

  const now = new Date();
  // Verifica se o agendamento é futuro
  const isFutureBooking = booking.date > now;
  const status = isFutureBooking ? "Confirmado" : "Finalizado";
  // Define os estilos dos status confirmado e finalizado
  const statusColor = isFutureBooking
    ? "bg-green-900"
    : "bg-muted text-foreground";

  const handleCancel = async () => {
    // Função para lidar com o cancelamento
    const result = await executeAsync({
      // Chama a ação de cancelar agendamento
      bookingId: booking.id,
    });

    if (result.serverError || result.validationErrors) {
      // Verifica se houve erro
      const errorMessage =
        result.validationErrors?._errors?.[0] ||
        "Erro ao cancelar agendamento.";
      toast.error(errorMessage);
      return;
    }

    toast.success("Agendamento cancelado com sucesso."); // Notifica sucesso
    setIsConfirming(false);
    onBookingCancelled?.();
    onClose();
  };

  const handleSheetOpenChange = (open: boolean) => {
    // Função para lidar com a mudança de estado do sheet
    if (!open) {
      setIsConfirming(false);
    }
    onClose();
  };

  const priceInReaisInteger = Math.floor(booking.service.priceInCents / 100); // Calcula o preço em reais

  return (
    <main>
      <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
        <SheetContent className="flex flex-col">
          <SheetHeader className="border-border border-b p-4">
            <SheetTitle>Detalhes da Reserva</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3 p-4 pb-0">
                {/* Informações da barbearia */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={booking.barbershop.imageUrl}
                          alt={booking.barbershop.name}
                        />
                      </Avatar>
                      <p className="text-foreground text-xm font-semibold">
                        {booking.barbershop.name}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Localização e Mapa */}
                <div className="relative h-40 w-full overflow-hidden rounded-lg">
                  <div className="flex items-start gap-2">
                    <MapPin className="text-muted-foreground h-4 w-4 shrink-0" />
                    <p className="text-foreground pb-3 text-sm">
                      {booking.barbershop.address}
                    </p>
                  </div>
                  <Image
                    width={400}
                    height={160}
                    src="/map.png"
                    alt="Mapa da barbearia"
                    className="h-full w-full rounded-md object-cover"
                  ></Image>
                </div>{" "}
                {/* Status do agendamento */}
                <Badge className={statusColor}>{status}</Badge>
              </div>

              {/* Informações do agendamento */}
              <div className="p-4">
                <Card className="bg-muted/30 border-border p-4">
                  <p className="font-bold">{booking.service.name}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-muted-foreground text-xs">Data</p>
                      <p className="text-foreground text-sm font-semibold">
                        {booking.date.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 text-right">
                      <p className="text-muted-foreground text-xs">Horário</p>
                      <p className="text-foreground text-sm font-semibold">
                        {booking.date.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="border-border flex flex-col gap-3 border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Preço
                      </span>
                      <span className="text-foreground text-lg font-bold">
                        R${priceInReaisInteger},00
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              <Separator />

              {/* Telefones */}
              <div className="p-4">
                <h3 className="pb-6 text-base font-semibold">Contato</h3>
                <div className="flex flex-col gap-3">
                  {booking.barbershop.phones.map((phone) => (
                    <PhoneItem key={phone} phone={phone} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Separator />

          {/* Botões voltar e cancelar reserva */}
          <div className="bg-background flex items-center gap-3 px-4 py-4">
            <Button
              className="h-12 w-full shrink rounded-full font-semibold"
              variant="outline"
              onClick={onClose}
            >
              Voltar
            </Button>
            <Button
              className="bg-destructive hover:bg-destructive/90 h-12 w-full shrink rounded-full font-semibold"
              onClick={() => setIsConfirming(true)}
              disabled={!isFutureBooking}
            >
              Cancelar Reserva
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Caixa de alerta para confirmar o cancelamento da reserva */}
      <AlertDialog open={isConfirming} onOpenChange={setIsConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar este agendamento?
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Detalhes do agendamento a ser cancelado */}
          <Card className="bg-muted/30 border-border p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">Barbearia</p>
                <p className="text-foreground text-sm font-semibold">
                  {booking.barbershop.name}
                </p>
              </div>
              <div className="border-muted flex items-center justify-between border-t pt-3">
                <p className="text-muted-foreground text-sm">Serviço</p>
                <p className="text-foreground text-sm font-semibold">
                  {booking.service.name}
                </p>
              </div>
              <div className="border-muted flex items-center justify-between border-t pt-3">
                <p className="text-muted-foreground text-sm">Data</p>
                <p className="text-foreground text-sm font-semibold">
                  {booking.date.toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="border-muted flex items-center justify-between border-t pt-3">
                <p className="text-muted-foreground text-sm">Horário</p>
                <p className="text-foreground text-sm font-semibold">
                  {booking.date.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </Card>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Voltar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={handleCancel}
              disabled={isPending}
            >
              {isPending ? "Cancelando..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
