"use client";

// Imports
import { useState, useEffect } from "react";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import BookingItem from "@/app/_components/booking-item";
import { getUserBookings } from "@/app/_actions/get-user-bookings";
import {
  PageContainer,
  PageSection,
  PageSectionTitle,
} from "@/app/_components/ui/page";
import {
  Booking,
  BarbershopService,
  Barbershop,
} from "@/app/generated/prisma/client";

type BookingWithRelations = Booking & {
  // Inclui as relações service e barbershop
  service: BarbershopService;
  barbershop: Barbershop;
};

const BookingsPage = () => {
  // Estado para armazenar os agendamentos confirmados e finalizados
  const [confirmedBookings, setConfirmedBookings] = useState<
    BookingWithRelations[]
  >([]);
  const [finalizedBookings, setFinalizedBookings] = useState<
    BookingWithRelations[]
  >([]);

  useEffect(() => {
    // Função para carregar os agendamentos do usuário
    const loadBookings = async () => {
      const data = await getUserBookings();
      setConfirmedBookings(data.confirmedBookings);
      setFinalizedBookings(data.finalizedBookings);
    };
    loadBookings();
  }, []);

  const handleBookingCancelled = (bookingId: string) => {
    // Atualiza os estados ao cancelar um agendamento
    setConfirmedBookings((prev) =>
      prev.filter((booking) => booking.id !== bookingId),
    );
    setFinalizedBookings((prev) =>
      prev.filter((booking) => booking.id !== bookingId),
    );
  };

  return (
    <main className="flex h-screen min-h-screen flex-col">
      <Header />
      <div>
        <PageContainer>
          {confirmedBookings.length > 0 && ( // Se houver agendamentos confirmados...
            <PageSection>
              {/* Seçao de agendamentos confirmados */}
              <PageSectionTitle>Confirmados</PageSectionTitle>
              <div className="flex flex-col gap-3">
                {confirmedBookings.map((booking) => (
                  <BookingItem
                    key={booking.id}
                    booking={booking}
                    onBookingCancelled={handleBookingCancelled}
                  />
                ))}
              </div>
            </PageSection>
          )}
          {finalizedBookings.length > 0 && ( // Se houver agendamentos finalizados...
            <PageSection>
              {/* Seçao de agendamentos finalizados */}
              <PageSectionTitle>Finalizados</PageSectionTitle>
              <div className="flex flex-col gap-3">
                {finalizedBookings.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            </PageSection>
          )}
          {confirmedBookings.length === 0 &&
            finalizedBookings.length === 0 && ( // Se não houver agendamentos...
              <PageSection>
                {/* Tela com o texto: "Voce nao possui agendamentos" */}
                <p className="text-muted-foreground text-center">
                  Você não possui agendamentos
                </p>
              </PageSection>
            )}
        </PageContainer>
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
};

export default BookingsPage;
