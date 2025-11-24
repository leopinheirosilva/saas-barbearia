"use client";

// Imports
import { useState } from "react";
import { BarbershopService } from "../generated/prisma/client";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAction } from "next-safe-action/hooks";
import { createBooking } from "../_actions/create-booking";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getDateAvailableTimeSlots } from "../_actions/get-date-available-time-slots";

// Estilo do calendário
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
  // Recebe as props necessárias
  isOpen: boolean;
  onClose: () => void;
  service: BarbershopService;
  barbershopName: string;
}

export function BookingSheet({
  // Componente BookingSheet
  isOpen, // Controla se o sheet está aberto
  onClose, // Função para fechar o sheet
  service,
  barbershopName,
}: BookingSheetProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  // Estado para a data selecionada
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    // Estado para o horário selecionado
    undefined,
  );
  const { executeAsync, isPending } = useAction(createBooking);
  // Hook para executar a ação de criar agendamento
  const { data: availableTimeSlots } = useQuery({
    // Hook para buscar os horários disponíveis
    queryKey: ["date-available-time-slots", service.barbeshopId, selectedDate],
    queryFn: () =>
      getDateAvailableTimeSlots({
        barbershopId: service.barbeshopId,
        date: selectedDate!,
      }),
    enabled: !!selectedDate, // Só executa a query se uma data estiver selecionada
  });

  const handleDateSelect = (date: Date | undefined) => {
    // Função para lidar com a seleção de data
    setSelectedDate(date);
  };

  const priceInReaisInteger = Math.floor(service.priceInCents / 100);
  const isConfirmEnabled = selectedDate && selectedTime; // Verifica se a confirmação está habilitada

  const handleConfirm = async () => {
    // Função para lidar com a confirmação do agendamento
    if (!selectedTime || !selectedDate) {
      // Verifica se a data e o horário estão selecionados
      return;
    }
    const timeSplitted = selectedTime?.split(":"); // Divide o horário em horas e minutos
    const hours = timeSplitted[0];
    const minutes = timeSplitted[1];
    const date = new Date(selectedDate);
    date.setHours(Number(hours), Number(minutes));

    const result = await executeAsync({
      // Executa a ação de criar agendamento
      serviceId: service.id,
      date,
    });
    if (result.serverError || result.validationErrors) {
      toast.error("Erro ao criar agendamento.");
      return;
    }
    toast.success("Agendamento criado com sucesso.");
    setSelectedDate(undefined);
    setSelectedTime(undefined);

    if (selectedDate && selectedTime) {
      // Loga os detalhes do agendamento: nome do serviço, preço, data, horário e nome da barbearia
      console.log({
        service: service.name,
        price: priceInReaisInteger,
        date: selectedDate,
        time: selectedTime,
        barbershop: barbershopName,
      });
      onClose(); // Fecha o sheet após a confirmação
      setSelectedDate(undefined); // Reseta a data selecionada
      setSelectedTime(undefined); // Reseta o horário selecionado
    }
  };

  const handleSheetOpenChange = (open: boolean) => {
    // Função para lidar com a mudança de estado do sheet
    if (!open) {
      // Se o sheet for fechado
      setSelectedDate(undefined);
      setSelectedTime(undefined);
    }
    onClose(); // Chama a função de fechar o sheet
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
      <style>{calendarStyle}</style>{" "}
      {/* Estilo customizado para o calendário */}
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="border-border border-b p-4">
          <SheetTitle>Fazer Reserva</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto pt-6 pb-20">
          <div className="flex flex-col gap-6">
            {/* Calendário */}
            <div className="flex flex-col gap-4 px-4">
              <h3 className="text-base font-semibold">
                {format(new Date(), "MMMM", { locale: ptBR })}
              </h3>
              <div className="booking-calendar flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
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
                    {availableTimeSlots?.data?.map((time) => (
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

            {/* Resumo dos serviços */}
            {selectedDate && selectedTime && (
              <div className="border-border flex flex-col gap-4 border-t px-4 pt-4">
                <Card className="bg-muted/30 border-border p-4">
                  <h3 className="text-xm font-bold">{service.name}</h3>
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

        {/* Botão confirmar */}
        <div className="border-muted bg-background border-t border-dashed px-4 py-4">
          <Button
            className="h-12 w-full rounded-full bg-green-900 font-semibold hover:bg-green-800"
            disabled={!isConfirmEnabled || isPending}
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
