"use client";

import { useState, useEffect } from "react";
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
import Header from "../_components/header";
import Footer from "../_components/footer";

type BookingWithRelations = Booking & {
  service: BarbershopService;
  barbershop: Barbershop;
};

const BookingsPage = () => {
  const [confirmedBookings, setConfirmedBookings] = useState<
    BookingWithRelations[]
  >([]);
  const [finalizedBookings, setFinalizedBookings] = useState<
    BookingWithRelations[]
  >([]);

  useEffect(() => {
    const loadBookings = async () => {
      const data = await getUserBookings();
      setConfirmedBookings(data.confirmedBookings);
      setFinalizedBookings(data.finalizedBookings);
    };
    loadBookings();
  }, []);

  const handleBookingCancelled = (bookingId: string) => {
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
          <div className="space-y-5 p-5">
            {confirmedBookings.length > 0 && (
              <PageSection>
                <div className="lg:px-30">
                  <PageSectionTitle>Confirmados</PageSectionTitle>
                </div>
                <div className="flex flex-col gap-3 lg:px-30">
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
            {finalizedBookings.length > 0 && (
              <PageSection>
                <div className="lg:px-30">
                  <PageSectionTitle>Finalizados</PageSectionTitle>
                </div>
                <div className="flex flex-col gap-3 lg:px-30">
                  {finalizedBookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </div>
              </PageSection>
            )}
            {confirmedBookings.length === 0 &&
              finalizedBookings.length === 0 && (
                <PageSection>
                  <p className="text-muted-foreground text-center">
                    Você não possui agendamentos
                  </p>
                </PageSection>
              )}
          </div>
        </PageContainer>
        <Footer />
      </div>
    </main>
  );
};

export default BookingsPage;
