"use client";

import {
  Booking,
  BarbershopService,
  Barbershop,
} from "../generated/prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

interface BookingItemProps {
  booking: Booking & {
    service: BarbershopService;
    barbershop: Barbershop;
  };
  onBookingCancelled?: (bookingId: string) => void;
}

const BookingItemOverview = ({ booking }: BookingItemProps) => {
  return (
    <>
      <Card className="flex w-[full] min-w-full flex-row items-center justify-between rounded-4xl p-3 transition-opacity">
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <p className="font-bold not-last-of-type:text-lg">
              {booking.service.name}
            </p>
            <div className="flex items-center gap-2">
              <Avatar className="size-14">
                <AvatarImage
                  src={booking.barbershop.imageUrl}
                  alt={booking.barbershop.name}
                />
              </Avatar>
              <p className="text-muted-foreground text-base">
                {booking.barbershop.name}
              </p>
            </div>
          </div>
        </div>
        <div className="flex h-full w-30 flex-col items-center justify-center border-l p-6 py-4">
          <p className="text-base font-semibold capitalize">
            {booking.date.toLocaleDateString("pt-BR", { month: "long" })}
          </p>
          <p className="text-lg">
            {booking.date.toLocaleDateString("pt-BR", { day: "2-digit" })}
          </p>
          <p className="text-base font-semibold capitalize">
            {booking.date.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </Card>
    </>
  );
};

export default BookingItemOverview;
