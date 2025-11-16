import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import BookingItem from "@/app/_components/booking-item";
import { getUserBookings } from "@/app/_actions/get-user-bookings";
import {
  PageContainer,
  PageSection,
  PageSectionTitle,
} from "@/app/_components/ui/page";

const BookingsPage = async () => {
  const { confirmedBookings, finalizedBookings } = await getUserBookings();

  return (
    <main>
      <Header />
      <PageContainer>
        {confirmedBookings.length > 0 && (
          <PageSection>
            <PageSectionTitle>Confirmados</PageSectionTitle>
            <div className="flex flex-col gap-3">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  serviceName={booking.service.name}
                  barbershopName={booking.barbershop.name}
                  barbershopImageUrl={booking.barbershop.imageUrl}
                  date={booking.date}
                />
              ))}
            </div>
          </PageSection>
        )}

        {finalizedBookings.length > 0 && (
          <PageSection>
            <PageSectionTitle>Finalizados</PageSectionTitle>
            <div className="flex flex-col gap-3">
              {finalizedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  serviceName={booking.service.name}
                  barbershopName={booking.barbershop.name}
                  barbershopImageUrl={booking.barbershop.imageUrl}
                  date={booking.date}
                />
              ))}
            </div>
          </PageSection>
        )}

        {confirmedBookings.length === 0 && finalizedBookings.length === 0 && (
          <PageSection>
            <p className="text-center text-muted-foreground">
              Você não possui agendamentos
            </p>
          </PageSection>
        )}
      </PageContainer>
      <Footer />
    </main>
  );
};

export default BookingsPage;
