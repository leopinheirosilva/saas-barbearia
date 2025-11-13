import Image from "next/image"; // Next.js Image component
import Header from "./_components/header"; // Header component import
import SearchInput from "./_components/search-input"; // SearchInput component import
import banner from "../public/banner.png"; // Import banner image
import BookingItem from "./_components/booking-item"; // BookingItem component import

const Home = () => {
  // Home page component
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
        <h2 className="text-foreground text-xs font-semibold uppercase">Agendamentos</h2>
        <BookingItem
          serviceName="Corte de Cabelo"
          barbershopName="Barbearia do Zé"
          barbershopImageUrl="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
          date={new Date("2024-06-15T14:30:00")}
        />
      </div>
    </main>
  );
};
export default Home;
