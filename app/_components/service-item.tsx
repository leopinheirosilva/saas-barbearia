"use client";

import { useState } from "react";
import { BarbershopService } from "../generated/prisma/client";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Image from "next/image";
import { BookingSheet } from "./booking-sheet";

interface ServiceItemProps {
  service: BarbershopService;
  barbershopName: string;
}

export function ServiceItem({ service, barbershopName }: ServiceItemProps) {
  const [isBookingSheetOpen, setIsBookingSheetOpen] = useState(false);
  const priceInReais = (service.priceInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <main>
      <Card className="border-border bg-card flex flex-row items-center gap-3 p-3 lg:p-5">
        <div className="relative size-25 shrink-0 overflow-hidden rounded-md lg:size-30">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch">
          <div className="flex flex-col gap-1">
            <p className="text-card-foreground text-sm font-bold lg:text-lg">
              {service.name}
            </p>
            <p className="text-muted-foreground text-sm lg:text-base">
              {service.description}
            </p>
          </div>

          <div className="flex w-full items-center justify-between">
            <p className="text-card-foreground text-sm leading-[1.4] font-bold whitespace-pre lg:text-base">
              {priceInReais}
            </p>
            <Button
              className="bg-primary rounded-full px-4 py-2 hover:cursor-pointer lg:px-10 lg:py-5 lg:font-semibold"
              onClick={() => setIsBookingSheetOpen(true)}
            >
              Reservar
            </Button>
          </div>
        </div>
      </Card>

      <BookingSheet
        isOpen={isBookingSheetOpen}
        onClose={() => setIsBookingSheetOpen(false)}
        service={service}
        barbershopName={barbershopName}
      />
    </main>
  );
}
