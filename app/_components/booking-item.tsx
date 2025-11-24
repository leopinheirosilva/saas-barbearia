"use client";

// Imports
import { useState } from "react";
import {
  Booking,
  BarbershopService,
  Barbershop,
} from "../generated/prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { CancelBookingSheet } from "./cancel-booking-sheet"; // Verify the correct path to this file

interface BookingItemProps {
  // Recebe as props do agendamento
  booking: Booking & {
    service: BarbershopService;
    barbershop: Barbershop;
  };
  onBookingCancelled?: (bookingId: string) => void; // Callback para quando o agendamento for cancelado
}

const getStatus = (booking: Pick<Booking, "cancelled" | "date">) => {
  // Determina o status do agendamento
  if (booking.cancelled) {
    // Verifica se o agendamento foi cancelado
    return "CANCELADO";
  }
  const date = new Date(booking.date);
  const now = new Date();
  //  Determina se o agendamento está confirmado ou finalizado
  return !booking.cancelled && date >= now ? "CONFIRMADO" : "FINALIZADO";
};

const BookingItem = ({ booking, onBookingCancelled }: BookingItemProps) => {
  // Estado para controlar a abertura da tela de cancelamento
  const [isCancelSheetOpen, setIsCancelSheetOpen] = useState(false);

  const now = new Date();
  // Verifica se o agendamento é futuro e não foi cancelado
  const isFutureBooking = booking.date > now && !booking.cancelled;
  const status = getStatus(booking);
  // Define o estilo dos status confirmado e finalizado
  const statusColor = isFutureBooking
    ? "bg-muted text-green-700 p-2"
    : "bg-muted text-foreground p-2";

  return (
    <main>
      <Card
        className="flex w-full min-w-full cursor-pointer flex-row items-center justify-between p-0 transition-opacity hover:opacity-80"
        onClick={() => setIsCancelSheetOpen(true)}
      >
        {/* ESQUERDA */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Status da barberia: confirmado ou finalizado*/}
          <Badge className={statusColor}>{status}</Badge>
          <div className="flex flex-col gap-2">
            {/* Informações da barberia e serviço */}
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
        {/* DIREITA */}
        <div className="flex h-full w-30 flex-col items-center justify-center border-l p-6 py-4">
          {/* Informações do agendamento (data e horário) */}
          <p className="text-xs font-semibold capitalize">
            {booking.date.toLocaleDateString("pt-BR", { month: "long" })}
          </p>
          <p>{booking.date.toLocaleDateString("pt-BR", { day: "2-digit" })}</p>
          <p className="text-xs font-semibold capitalize">
            {booking.date.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </Card>

      {/* Chama a tela de cancelamento */}
      <CancelBookingSheet
        isOpen={isCancelSheetOpen}
        onClose={() => setIsCancelSheetOpen(false)}
        booking={booking}
        onBookingCancelled={() => {
          setIsCancelSheetOpen(false);
          onBookingCancelled?.(booking.id);
        }}
      />
    </main>
  );
};

export default BookingItem;
