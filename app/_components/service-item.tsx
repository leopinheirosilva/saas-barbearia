import { BarbershopService } from "../generated/prisma/client";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Image from "next/image";

interface ServiceItemProps {
  service: BarbershopService;
}

export function ServiceItem({ service }: ServiceItemProps) {
  const priceInReais = (service.priceInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return (
    <Card className="border-border bg-card flex flex-row items-center gap-3 p-3">
      <div className="relative size-[100px] shrink-0 overflow-hidden rounded-md">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch">
        <div className="flex flex-col gap-1">
          <p className="text-card-foreground text-sm font-bold">
            {service.name}
          </p>
          <p className="text-muted-foreground text-sm">{service.description}</p>
        </div>

        <div className="flex w-full items-center justify-between">
          <p className="whitespace-pre text-sm font-bold leading-[1.4] text-card-foreground">
            {priceInReais}
          </p>
          <Button className="rounded-full px-4 py-2 bg-green-900">Reservar</Button>
        </div>
      </div>
    </Card>
  );
}