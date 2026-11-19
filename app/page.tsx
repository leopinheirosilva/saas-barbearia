import Image from "next/image";
import SearchInput from "./_components/search-input";
import QuickSearchButtons from "./_components/quick-search-buttons";
import banner from "../public/banner.png";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { getUserBookings } from "./_actions/get-user-bookings";
import {
  PageContainer,
  PageSection,
  PageSectionScroller,
  PageSectionTitle,
} from "./_components/ui/page";
import Link from "next/link";
import Header from "./_components/header";
import Footer from "./_components/footer";
import BookingItemOverview from "./_components/booking-item-overview";

const Home = async () => {
  const { confirmedBookings } = await getUserBookings();
  const recommendedBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <main>
      <Header />
      <PageContainer>
        <div className="lg:flex">
          <div className="lg:w-[70vw] lg:pl-30">
            <div className="p-5 pl-0">
              <SearchInput />
            </div>
            <QuickSearchButtons />
            <div className="hidden lg:block">
              <div className="flex gap-3 pt-10">
                <PageSectionTitle>Agendamentos Confirmados</PageSectionTitle>
                <Link href="/bookings">
                  <p className="text-muted-foreground text-sm">
                    ver meus agendamentos
                  </p>
                </Link>
              </div>
              {confirmedBookings.length > 0 ? (
                <div className="mt-3 grid grid-cols-2 gap-7">
                  {confirmedBookings.map((booking) => (
                    <BookingItemOverview key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="mt-6 flex h-95 items-center justify-center rounded-lg bg-black/5">
                  <p className="text-muted-foreground text-sm">
                    Você não possui agendamentos
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="p-5">
            <Image
              src={banner}
              alt="Agende agora!"
              sizes="100vw"
              className="h-auto w-full lg:w-125"
            />
          </div>
        </div>

        <PageSection>
          <div className="px-5 lg:px-30">
            <PageSectionTitle>Recomendados</PageSectionTitle>
          </div>
          <div className="lg:hidden">
            <PageSectionScroller>
              {recommendedBarbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </PageSectionScroller>
          </div>
          <div className="hidden grid-cols-5 gap-8 px-30 lg:grid">
            {recommendedBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </PageSection>

        <PageSection>
          <div className="px-5 lg:px-30">
            <PageSectionTitle>Populares</PageSectionTitle>
          </div>
          <div className="lg:hidden">
            <PageSectionScroller>
              {popularBarbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </PageSectionScroller>
          </div>
          <div className="hidden grid-cols-5 gap-8 px-30 lg:grid">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </PageSection>
      </PageContainer>
      <Footer />
    </main>
  );
};
export default Home;
