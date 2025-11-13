import Image from "next/image"; // Next.js Image component
import Header from "./_components/header"; // Header component import
import SearchInput from "./_components/search-input"; // SearchInput component import
import banner from "../public/banner.png"; // Import banner image
import BookingItem from "./_components/booking-item"; // BookingItem component import
import { prisma } from "@/lib/prisma"; // Import prisma client data
import BarbershopItem from "./_components/barbershop-item"; // BarbershopItem component import

const Home = async () => {
  // Home page component
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
      <div className="space-y-4 px-5">
        <SearchInput /> {/* SearchInput component */}
        <Image
          src={banner}
          alt="Agende agora!"
          sizes="100vw"
          className="h-auto w-full"
        />
        <h2 className="text-foreground text-xs font-semibold uppercase">
          Agendamentos
        </h2>
        <BookingItem
          serviceName="Corte de Cabelo"
          barbershopName="Barbearia do Zé"
          barbershopImageUrl="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
          date={new Date("2024-06-15T14:30:00")}
        />
        <h2 className="text-foreground text-xs font-semibold uppercase">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {recommendedBarbershops.map(
            (
              barbershop, // Map over barbershops and display their names
            ) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ),
          )}
        </div>
        <h2 className="text-foreground text-xs font-semibold uppercase">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map(
            (
              barbershop, // Map over barbershops and display their names
            ) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ),
          )}
        </div>
      </div>
    </main>
  );
};
export default Home;
