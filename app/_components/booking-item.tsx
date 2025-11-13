import { Avatar, AvatarImage } from "./ui/avatar"; // Avatar importado do componente UI
import { Badge } from "./ui/badge"; // Badge importado do componente UI
import { Card } from "./ui/card"; // Card importado do componente UI
import Image from "next/image"; // Componente de imagem do Next.js

interface BookingItemProps {
  serviceName: string;
  barbershopName: string;
  barbershopImageUrl: string;
  date: Date;
}

const BookingItem = ({
  serviceName,
  barbershopName,
  barbershopImageUrl,
  date,
}: BookingItemProps) => {
  return (
    <Card className="flex w-full min-w-full flex-row items-center justify-between p-0">
      {/* ESQUERDA */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Badge className="bg-green-900">Confirmado</Badge>
        <div className="flex flex-col gap-2">
          <p className="font-bold">{serviceName}</p> {/* Nome do serviço */}
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={barbershopImageUrl} alt={barbershopName} />
            </Avatar>
            <p className="text-muted-foreground text-sm">{barbershopName}</p>
          </div>
        </div>
      </div>
      {/* DIREITA */}
      <div className="flex h-full w-30 flex-col items-center justify-center border-l p-6 py-4">
        <p className="text-xs capitalize font-semibold">
          {date.toLocaleDateString("pt-BR", { month: "long" })}
        </p>
        <p>{date.toLocaleDateString("pt-BR", { day: "2-digit" })}</p>
        <p className="text-xs capitalize font-semibold">
          {date.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </Card>
  );
};

export default BookingItem;
