"use client";

import { useState } from "react";
import { BarbershopService } from "../generated/prisma/client";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const calendarStyle = `
  :where(.booking-calendar [data-selected-single=true]) {
    background-color: rgb(20, 83, 45) !important;
    border-radius: 8px;
    color: white !important;
  }
  
  .time-slots-scroll::-webkit-scrollbar {
    display: none;
  }
  
  .time-slots-scroll {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

interface BookingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  service: BarbershopService;
  barbershopName: string;
}

const TIME_SLOTS = Array.from({ length: 19 }, (_, i) => {
  const hours = Math.floor(i / 2) + 9;
  const minutes = (i % 2) * 30;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});

export function BookingSheet({
  isOpen,
  onClose,
  service,
  barbershopName,
}: BookingSheetProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );

  const priceInReaisInteger = Math.floor(service.priceInCents / 100);
  const isConfirmEnabled = selectedDate && selectedTime;

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      console.log({
        service: service.name,
        price: priceInReaisInteger,
        date: selectedDate,
        time: selectedTime,
        barbershop: barbershopName,
      });
      onClose();
      setSelectedDate(undefined);
      setSelectedTime(undefined);
    }
  };

  const handleSheetOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedDate(undefined);
      setSelectedTime(undefined);
    }
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
      <style>{calendarStyle}</style>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="border-border border-b p-4">
          <SheetTitle>Fazer Reserva</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto pt-6 pb-20">
          <div className="flex flex-col gap-6">
            {/* Calendar */}
            <div className="flex flex-col gap-4 px-4">
              <h3 className="text-base font-semibold">
                {format(new Date(), "MMMM", { locale: ptBR })}
              </h3>
              <div className="booking-calendar flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  locale={ptBR}
                />
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="border-border flex flex-col gap-3 border-t px-4 pt-4">
                <h3 className="text-base font-semibold">Horário</h3>
                <div className="time-slots-scroll -mx-4 overflow-x-auto px-4">
                  <div className="flex gap-2 pb-2">
                    {TIME_SLOTS.map((time) => (
                      <Button
                        key={time}
                        variant="outline"
                        size="sm"
                        className={`shrink-0 rounded-full px-6 ${
                          selectedTime === time
                            ? "border-green-900 bg-green-900 text-white hover:bg-green-900"
                            : "hover:bg-green-900/10"
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Service Summary */}
            {selectedDate && selectedTime && (
              <div className="border-border flex flex-col gap-4 border-t px-4 pt-4">

                <Card className="bg-muted/30 border-border p-4">
                <h3 className="font-bold text-xm">{service.name}</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-muted-foreground text-xs">Data</p>
                        <p className="text-foreground text-sm font-semibold">
                          {format(selectedDate, "dd 'de' MMMM", {
                            locale: ptBR,
                          })}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1 text-right">
                        <p className="text-muted-foreground text-xs">Horário</p>
                        <p className="text-foreground text-sm font-semibold">
                          {selectedTime}
                        </p>
                      </div>
                    </div>

                    <div className="border-muted border-t pt-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-muted-foreground text-xs">
                          Barbearia
                        </span>
                        <span className="text-foreground text-sm font-semibold">
                          {barbershopName}
                        </span>
                      </div>

                      <div className="border-muted flex items-center justify-between border-t pt-2">
                        <span className="text-muted-foreground text-xs">
                          Preço
                        </span>
                        <span className="text-foreground text-lg font-bold">
                          R${priceInReaisInteger},00
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Footer with button */}
        <div className="border-muted bg-background border-t border-dashed px-4 py-4">
          <Button
            className="h-12 w-full rounded-full bg-green-900 font-semibold hover:bg-green-800"
            disabled={!isConfirmEnabled}
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
