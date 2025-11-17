"use client";

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
import { useAction } from "next-safe-action/hooks";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { PhoneItem } from "./phone-item";
import { MapPin } from "lucide-react";

interface CancelBookingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking & {
    service: BarbershopService;
    barbershop: Barbershop;
  };
  onBookingCancelled?: () => void;
}

export function CancelBookingSheet({
  isOpen,
  onClose,
  booking,
  onBookingCancelled,
}: CancelBookingSheetProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const { executeAsync, isPending } = useAction(cancelBooking);

  const now = new Date();
  const isFutureBooking = booking.date > now;
  const status = isFutureBooking ? "Confirmado" : "Finalizado";
  const statusColor = isFutureBooking ? "bg-green-900" : "bg-muted";

  const handleCancel = async () => {
    const result = await executeAsync({
      bookingId: booking.id,
    });

    if (result.serverError || result.validationErrors) {
      const errorMessage =
        result.validationErrors?._errors?.[0] ||
        "Erro ao cancelar agendamento.";
      toast.error(errorMessage);
      return;
    }

    toast.success("Agendamento cancelado com sucesso.");
    setIsConfirming(false);
    onBookingCancelled?.();
    onClose();
  };

  const handleSheetOpenChange = (open: boolean) => {
    if (!open) {
      setIsConfirming(false);
    }
    onClose();
  };

  const priceInReaisInteger = Math.floor(booking.service.priceInCents / 100);

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="border-border border-b p-4">
          <SheetTitle>
            {isConfirming ? "Cancelar Reserva" : "Detalhes da Reserva"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {!isConfirming ? (
            <div className="flex flex-col gap-6 p-4">
              {/* Status e Informações do Serviço */}
              <div className="flex flex-col gap-4">
                <Badge className={statusColor}>{status}</Badge>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{booking.service.name}</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={booking.barbershop.imageUrl}
                        alt={booking.barbershop.name}
                      />
                    </Avatar>
                    <p className="text-muted-foreground text-sm">
                      {booking.barbershop.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Resumo do Preço */}
              <div className="border-border flex flex-col gap-3 border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Preço</span>
                  <span className="text-foreground text-lg font-bold">
                    R${priceInReaisInteger},00
                  </span>
                </div>
              </div>

              {/* Localização */}
              <div className="border-border flex flex-col gap-3 border-t pt-4">
                <h3 className="text-base font-semibold">Localização</h3>
                <div className="relative h-40 w-full overflow-hidden rounded-lg">
                  <Image
                    width={400}
                    height={160}
                    src="/map.png"
                    alt="Mapa da barbearia"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="text-muted-foreground mt-1 h-4 w-4 shrink-0" />
                  <p className="text-foreground text-sm">
                    {booking.barbershop.address}
                  </p>
                </div>
              </div>

              {/* Data e Hora */}
              <div className="border-border flex flex-col gap-3 border-t pt-4">
                <h3 className="text-base font-semibold">Data e Hora</h3>
                <Card className="bg-muted/30 border-border p-4">
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
                </Card>
              </div>

              {/* Telefones */}
              <div className="border-border flex flex-col gap-3 border-t pt-4">
                <h3 className="text-base font-semibold">Contato</h3>
                <div className="flex flex-col gap-3">
                  {booking.barbershop.phones.map((phone) => (
                    <PhoneItem key={phone} phone={phone} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 p-4 pt-8">
              <div className="bg-destructive/10 rounded-full p-4">
                <svg
                  className="text-destructive h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4v2m0 4v2M6.228 6.228a9 9 0 010 12.728m12.728 0a9 9 0 010-12.728M6.228 6.228L4.343 4.343m12.728 12.728l1.885 1.885"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-foreground font-semibold">
                  Cancelar Reserva?
                </p>
                <p className="text-muted-foreground text-sm">
                  Tem certeza que deseja cancelar este agendamento?
                </p>
              </div>
              <Card className="bg-muted/30 border-border w-full p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
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
            </div>
          )}
        </div>

        {/* Footer with buttons */}
        <div className="border-muted bg-background border-t border-dashed px-4 py-4">
          {!isConfirming ? (
            <Button
              className="bg-destructive hover:bg-destructive/90 h-12 w-full rounded-full font-semibold"
              onClick={() => setIsConfirming(true)}
              disabled={!isFutureBooking}
            >
              Cancelar Reserva
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="h-12 flex-1 rounded-full"
                onClick={() => setIsConfirming(false)}
                disabled={isPending}
              >
                Voltar
              </Button>
              <Button
                className="bg-destructive hover:bg-destructive/90 h-12 flex-1 rounded-full font-semibold"
                onClick={handleCancel}
                disabled={isPending}
              >
                {isPending ? "Cancelando..." : "Confirmar"}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
